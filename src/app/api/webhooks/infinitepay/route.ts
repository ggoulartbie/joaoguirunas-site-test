import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { infinitePay } from '@/lib/payment/infinitepay'
import { sendWelcomeInviteEmail } from '@/lib/email/send'
import { generateMagicLink, findOrCreateUser } from '@/lib/payment/webhookHelpers'
import type { Json } from '@/types/database'

export const runtime = 'nodejs'

interface InfinitePayWebhookPayload {
  invoice_slug: string
  amount: number
  paid_amount: number
  installments: number
  capture_method: string
  transaction_nsu: string
  order_nsu: string
  receipt_url?: string
  items?: unknown[]
  // customer info sent by some webhook versions
  customer_email?: string
  customer_name?: string
}

export async function POST(req: NextRequest) {
  let payload: InfinitePayWebhookPayload

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { order_nsu, transaction_nsu, invoice_slug, paid_amount, amount } = payload

  if (!order_nsu || !transaction_nsu || !invoice_slug) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // AC6: idempotência — se payment já está APPROVED, não reprocessar
  const { data: existingPayment } = await supabaseAdmin
    .from('payments')
    .select('id, status')
    .eq('infinitepay_order_nsu', order_nsu)
    .maybeSingle()

  if (existingPayment?.status === 'APPROVED') {
    return NextResponse.json({ received: true, idempotent: true })
  }

  let success = true
  let errorMessage: string | null = null

  try {
    await processWebhook({
      order_nsu,
      transaction_nsu,
      invoice_slug,
      paid_amount,
      amount,
      customer_email: payload.customer_email,
      customer_name: payload.customer_name,
    })
  } catch (err) {
    success = false
    errorMessage = err instanceof Error ? err.message : String(err)
    Sentry.captureException(err, {
      tags: { webhook: 'infinitepay', order_nsu },
    })
    console.error('[infinitepay webhook] processing error:', errorMessage)
  }

  // AC4: registrar em webhook_events para auditoria
  await supabaseAdmin.from('webhook_events').insert({
    stripe_event_id: `ip_${order_nsu}`,
    event_type: 'infinitepay.payment',
    payload: payload as unknown as Json,
    success,
    error_message: errorMessage,
  })

  if (!success) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function processWebhook(params: {
  order_nsu: string
  transaction_nsu: string
  invoice_slug: string
  paid_amount: number
  amount: number
  customer_email?: string
  customer_name?: string
}) {
  const { order_nsu, transaction_nsu, invoice_slug, paid_amount, amount } = params

  // 1. Busca payment PENDING pelo order_nsu
  const { data: payment } = await supabaseAdmin
    .from('payments')
    .select('id, user_id, cohort_id, membership_id, status, amount_cents')
    .eq('infinitepay_order_nsu', order_nsu)
    .maybeSingle()

  if (!payment) {
    console.warn(`[infinitepay webhook] no payment found for order_nsu=${order_nsu}`)
    return
  }

  if (payment.status === 'APPROVED') return

  // 2. Busca cohort
  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, name, access_duration_days, start_date')
    .eq('id', payment.cohort_id)
    .single()

  if (!cohort) {
    throw new Error(`Cohort ${payment.cohort_id} not found for order_nsu=${order_nsu}`)
  }

  // AC5: validação server-to-server — NUNCA confiar só no payload
  const check = await infinitePay.verifyPayment({ transactionNsu: transaction_nsu, invoiceSlug: invoice_slug, orderNsu: order_nsu })

  if (!check.paid) {
    console.warn(`[infinitepay webhook] payment_check returned paid=false for order_nsu=${order_nsu}`)
    await supabaseAdmin
      .from('payments')
      .update({ status: 'DECLINED' })
      .eq('id', payment.id)
    return
  }

  const verifiedAmount = check.paidAmount || paid_amount || amount
  if (payment.amount_cents !== null && verifiedAmount < payment.amount_cents) {
    console.error(`[infinitepay webhook] underpayment: paid=${verifiedAmount} expected=${payment.amount_cents} order_nsu=${order_nsu}`)
    Sentry.captureMessage('infinitepay underpayment', {
      level: 'warning',
      tags: { webhook: 'infinitepay', order_nsu },
      extra: { paid: verifiedAmount, expected: payment.amount_cents },
    })
    await supabaseAdmin.from('payments').update({ status: 'DECLINED' }).eq('id', payment.id)
    return
  }

  // 3. Calcula expires_at
  let newExpiresAt: string | null = null
  if (cohort.access_duration_days !== null) {
    const base = new Date()
    base.setDate(base.getDate() + cohort.access_duration_days)
    newExpiresAt = base.toISOString()
  }

  // 4. Resolve user — para compra pública (user_id null), tenta criar via customer_email
  let resolvedUserId: string = payment.user_id ?? ''
  let isNewUser = false

  if (!payment.user_id) {
    if (!params.customer_email) {
      Sentry.captureMessage('infinitepay payment approved without user provisioning', {
        level: 'warning',
        tags: { webhook: 'infinitepay', order_nsu },
        extra: { payment_id: payment.id, reason: 'null user_id and no customer_email' },
      })
      await supabaseAdmin
        .from('payments')
        .update({
          status: 'APPROVED',
          infinitepay_invoice_slug: invoice_slug,
          amount_cents: verifiedAmount,
          paid_at: new Date().toISOString(),
        })
        .eq('id', payment.id)
      return
    }

    const result = await findOrCreateUser(params.customer_email, params.customer_name ?? 'Aluno')
    resolvedUserId = result.userId
    isNewUser = result.isNew

    // Associa user_id ao payment
    await supabaseAdmin
      .from('payments')
      .update({ user_id: resolvedUserId })
      .eq('id', payment.id)
  }

  // 5. Upsert cohort_member — idempotente
  const { data: existingMember } = await supabaseAdmin
    .from('cohort_members')
    .select('id')
    .eq('cohort_id', payment.cohort_id)
    .eq('user_id', resolvedUserId)
    .maybeSingle()

  let memberId: string

  if (existingMember) {
    await supabaseAdmin
      .from('cohort_members')
      .update({ status: 'ACTIVE', expires_at: newExpiresAt })
      .eq('id', existingMember.id)
    memberId = existingMember.id
  } else {
    const { data: newMember, error } = await supabaseAdmin
      .from('cohort_members')
      .insert({
        cohort_id: payment.cohort_id,
        user_id: resolvedUserId,
        member_role: 'STUDENT',
        status: 'ACTIVE',
        expires_at: newExpiresAt,
      })
      .select('id')
      .single()

    if (!newMember) throw new Error(`Failed to create cohort_member: ${error?.message}`)
    memberId = newMember.id

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin.rpc as any)('increment_filled_seats', { p_cohort_id: payment.cohort_id })
  }

  // 6. Aprova payment
  await supabaseAdmin
    .from('payments')
    .update({
      status: 'APPROVED',
      membership_id: memberId,
      infinitepay_invoice_slug: invoice_slug,
      amount_cents: verifiedAmount,
      paid_at: new Date().toISOString(),
    })
    .eq('id', payment.id)

  // 7. Busca email/nome para envio de welcome
  let email: string | null = params.customer_email ?? null
  let name = params.customer_name ?? 'Aluno'

  if (!email) {
    const [{ data: profile }, { data: authUser }] = await Promise.all([
      supabaseAdmin.from('profiles').select('name').eq('id', resolvedUserId).single(),
      supabaseAdmin.auth.admin.getUserById(resolvedUserId),
    ])
    email = authUser?.user?.email ?? null
    name = profile?.name ?? name
  }

  if (email) {
    const magicLink = await generateMagicLink(email)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com'
    const accessUrl = magicLink ?? `${appUrl}/academy/login`

    const subject = isNewUser
      ? `Acesso liberado — ${cohort.name}`
      : `Acesso renovado — ${cohort.name}`

    await sendWelcomeInviteEmail(email, name, cohort.name, accessUrl, subject).catch(console.error)
  }
}
