import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { verifyPayment } from '@/lib/payment/infinitepay'
import { sendWelcomeInviteEmail } from '@/lib/email/send'
import { generateMagicLink, findOrCreateUser } from '@/lib/payment/webhookHelpers'

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
}

export async function POST(req: NextRequest) {
  let payload: InfinitePayWebhookPayload

  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 })
  }

  const { order_nsu, transaction_nsu, invoice_slug, paid_amount } = payload

  if (!order_nsu || !transaction_nsu || !invoice_slug) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  // Respond 200 immediately — InfinitePay requires < 1s response
  // Processing continues in background via edge-safe async
  processWebhook({ order_nsu, transaction_nsu, invoice_slug, paid_amount }).catch((err) => {
    Sentry.captureException(err, {
      tags: { webhook: 'infinitepay', order_nsu },
    })
    console.error('[infinitepay webhook] processing error:', err)
  })

  return NextResponse.json({ success: true, message: null })
}

async function processWebhook(params: {
  order_nsu: string
  transaction_nsu: string
  invoice_slug: string
  paid_amount: number
}) {
  const { order_nsu, transaction_nsu, invoice_slug, paid_amount } = params

  // 1. Find PENDING payment by order_nsu
  const { data: payment } = await supabaseAdmin
    .from('payments')
    .select('id, user_id, cohort_id, membership_id, status')
    .eq('infinitepay_order_nsu', order_nsu)
    .eq('status', 'PENDING')
    .maybeSingle()

  if (!payment) {
    // No matching PENDING payment — likely already processed or unknown order
    console.warn(`[infinitepay webhook] no PENDING payment for order_nsu=${order_nsu}`)
    return
  }

  // 2. Verify payment with InfinitePay API (confirmation before granting access)
  const check = await verifyPayment({ orderNsu: order_nsu, transactionNsu: transaction_nsu, invoiceSlug: invoice_slug })

  if (!check.paid) {
    console.warn(`[infinitepay webhook] payment_check returned paid=false for order_nsu=${order_nsu}`)
    return
  }

  // 3. Fetch cohort for access duration
  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, name, access_duration_days, start_date')
    .eq('id', payment.cohort_id)
    .single()

  if (!cohort) {
    throw new Error(`Cohort ${payment.cohort_id} not found for InfinitePay order ${order_nsu}`)
  }

  // 4. Calculate expires_at
  let newExpiresAt: string | null = null
  if (cohort.access_duration_days !== null) {
    const base = new Date()
    base.setDate(base.getDate() + cohort.access_duration_days)
    newExpiresAt = base.toISOString()
  }

  // 5. Resolve user — may be null for anonymous InfinitePay purchases
  // The customer field from payment_check is not available here; we rely on the
  // customer info passed at link creation time being stored externally, or we
  // require the customer to be authenticated. For anonymous purchases (user_id=null),
  // we cannot resolve the user without an email — skip member creation and flag for manual review.
  if (!payment.user_id) {
    console.error(`[infinitepay webhook] payment ${payment.id} has null user_id — cannot create cohort_member. Manual review required.`)
    // Still approve the payment so it doesn't retry, but skip member creation
    await supabaseAdmin
      .from('payments')
      .update({
        status: 'APPROVED',
        infinitepay_invoice_slug: invoice_slug,
        amount_cents: paid_amount,
        paid_at: new Date().toISOString(),
      })
      .eq('id', payment.id)
    return
  }

  const resolvedUserId: string = payment.user_id

  // 6. Upsert cohort_member — idempotent
  const { data: existingMember } = await supabaseAdmin
    .from('cohort_members')
    .select('id')
    .eq('cohort_id', payment.cohort_id)
    .eq('user_id', resolvedUserId)
    .maybeSingle()

  let memberId: string

  if (existingMember) {
    // Already a member — update status/expiry, do not duplicate
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

  // 7. Approve payment record + store invoice_slug
  await supabaseAdmin
    .from('payments')
    .update({
      status: 'APPROVED',
      membership_id: memberId,
      infinitepay_invoice_slug: invoice_slug,
      amount_cents: paid_amount,
      paid_at: new Date().toISOString(),
    })
    .eq('id', payment.id)

  // 8. Send welcome email
  const [{ data: profile }, { data: authUser }] = await Promise.all([
    supabaseAdmin.from('profiles').select('name').eq('id', resolvedUserId).single(),
    supabaseAdmin.auth.admin.getUserById(resolvedUserId),
  ])

  const email = authUser?.user?.email
  const name = profile?.name ?? 'Aluno'

  if (email) {
    const magicLink = await generateMagicLink(email)
    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com'
    const accessUrl = magicLink ?? `${appUrl}/academy/login`

    await sendWelcomeInviteEmail(
      email,
      name,
      cohort.name,
      accessUrl,
      `Acesso liberado — ${cohort.name}`,
    ).catch(console.error)
  }
}
