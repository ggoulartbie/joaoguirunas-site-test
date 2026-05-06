import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { stripe } from '@/lib/payment/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'
import {
  sendPaymentApprovedEmail,
  sendMembershipExtendedEmail,
  sendAutoRenewalEmail,
  sendPaymentFailedEmail,
  sendWelcomeToCohortEmail,
} from '@/lib/email/send'

export const runtime = 'nodejs'

async function getRawBody(req: NextRequest): Promise<Buffer> {
  const chunks: Uint8Array[] = []
  const reader = req.body?.getReader()
  if (!reader) return Buffer.alloc(0)
  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    if (value) chunks.push(value)
  }
  return Buffer.concat(chunks)
}

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const rawBody = await getRawBody(req)
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret)
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Idempotência: checar se já processamos esse evento
  const { data: existing } = await supabaseAdmin
    .from('webhook_events')
    .select('id')
    .eq('stripe_event_id', event.id)
    .maybeSingle()

  if (existing) {
    return NextResponse.json({ received: true, idempotent: true })
  }

  let success = true
  let errorMessage: string | null = null

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session)
        break
      case 'invoice.paid':
        await handleInvoicePaid(event.data.object as Stripe.Invoice)
        break
      case 'invoice.payment_failed':
        await handleInvoicePaymentFailed(event.data.object as Stripe.Invoice)
        break
      case 'charge.refunded':
        await handleChargeRefunded(event.data.object as Stripe.Charge)
        break
    }
  } catch (err) {
    success = false
    errorMessage = err instanceof Error ? err.message : String(err)
    console.error(`Webhook error for event ${event.id}:`, errorMessage)
  }

  await supabaseAdmin.from('webhook_events').insert({
    stripe_event_id: event.id,
    event_type: event.type,
    payload: event as unknown as import('@/types/database').Json,
    success,
    error_message: errorMessage,
  })

  if (!success) {
    return NextResponse.json({ error: 'Processing failed' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

async function getUserEmailAndName(userId: string): Promise<{ email: string; name: string } | null> {
  const [{ data: profile }, { data: authData }] = await Promise.all([
    supabaseAdmin.from('profiles').select('name').eq('id', userId).single(),
    supabaseAdmin.auth.admin.getUserById(userId),
  ])

  const email = authData?.user?.email
  if (!email || !profile) return null
  return { email, name: profile.name }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const { cohort_id, user_id, purchase_kind } = session.metadata ?? {}

  if (!cohort_id || !user_id || !purchase_kind) {
    throw new Error('Missing metadata on checkout session')
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, name, access_duration_days, extension_duration_days, start_date')
    .eq('id', cohort_id)
    .single()

  if (!cohort) throw new Error(`Cohort ${cohort_id} not found`)

  const amountCents = session.amount_total ?? 0
  const paymentIntentId = typeof session.payment_intent === 'string'
    ? session.payment_intent
    : session.payment_intent?.id ?? null
  const customerId = typeof session.customer === 'string'
    ? session.customer
    : session.customer?.id ?? null

  if (customerId) {
    await supabaseAdmin
      .from('profiles')
      .update({ stripe_customer_id: customerId })
      .eq('id', user_id)
  }

  const { data: existingMember } = await supabaseAdmin
    .from('cohort_members')
    .select('id, expires_at')
    .eq('cohort_id', cohort_id)
    .eq('user_id', user_id)
    .maybeSingle()

  let memberId: string
  let newExpiresAt: string | null = null

  const daysToAdd = purchase_kind === 'ENTRY'
    ? (cohort.access_duration_days ?? null)
    : (cohort.extension_duration_days ?? cohort.access_duration_days ?? null)

  if (daysToAdd !== null) {
    if (purchase_kind === 'EXTENSION' && existingMember?.expires_at) {
      // Soma ao prazo restante: max(expires_at, now()) + days
      const base = new Date(existingMember.expires_at) > new Date()
        ? new Date(existingMember.expires_at)
        : new Date()
      base.setDate(base.getDate() + daysToAdd)
      newExpiresAt = base.toISOString()
    } else {
      const base = new Date()
      base.setDate(base.getDate() + daysToAdd)
      newExpiresAt = base.toISOString()
    }
  }

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
        cohort_id,
        user_id,
        member_role: 'STUDENT',
        status: 'ACTIVE',
        expires_at: newExpiresAt,
      })
      .select('id')
      .single()

    if (!newMember) throw new Error(`Failed to create cohort_member: ${error?.message}`)
    memberId = newMember.id

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin.rpc as any)('increment_filled_seats', { p_cohort_id: cohort_id })
  }

  await supabaseAdmin.from('payments').insert({
    user_id,
    cohort_id,
    purchase_kind: purchase_kind as 'ENTRY' | 'EXTENSION',
    membership_id: memberId,
    stripe_checkout_session_id: session.id,
    stripe_payment_intent_id: paymentIntentId,
    amount_cents: amountCents,
    status: 'APPROVED',
    paid_at: new Date().toISOString(),
  })

  await applyCrossExtensions(cohort_id, user_id)

  // Disparar email adequado ao tipo de compra
  const userInfo = await getUserEmailAndName(user_id)
  if (userInfo) {
    if (purchase_kind === 'ENTRY') {
      await sendPaymentApprovedEmail(userInfo.email, userInfo.name, cohort.name).catch(console.error)
      sendWelcomeToCohortEmail(userInfo.email, userInfo.name, cohort.name, cohort.start_date ?? null).catch(console.error)
    } else {
      await sendMembershipExtendedEmail(
        userInfo.email,
        userInfo.name,
        cohort.name,
        newExpiresAt ?? new Date().toISOString(),
      ).catch(console.error)
    }
  }
}

async function getSubscriptionIdFromInvoice(invoice: Stripe.Invoice): Promise<string | null> {
  const parent = invoice.parent as { subscription_details?: { subscription?: string | Stripe.Subscription } } | null
  const sub = parent?.subscription_details?.subscription
  if (!sub) return null
  return typeof sub === 'string' ? sub : sub.id
}

async function handleInvoicePaid(invoice: Stripe.Invoice) {
  const subscriptionId = await getSubscriptionIdFromInvoice(invoice)
  if (!subscriptionId) return

  const { data: existingPayment } = await supabaseAdmin
    .from('payments')
    .select('user_id, cohort_id, membership_id')
    .eq('stripe_subscription_id', subscriptionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!existingPayment) return

  const { user_id, cohort_id, membership_id } = existingPayment

  const [{ data: cohort }] = await Promise.all([
    supabaseAdmin
      .from('cohorts')
      .select('name, extension_duration_days, access_duration_days')
      .eq('id', cohort_id)
      .single(),
  ])

  const daysToAdd = cohort?.extension_duration_days ?? cohort?.access_duration_days ?? null
  let newExpiresAt: string | null = null

  if (daysToAdd && membership_id) {
    const { data: member } = await supabaseAdmin
      .from('cohort_members')
      .select('expires_at')
      .eq('id', membership_id)
      .single()

    if (member) {
      const base = member.expires_at && new Date(member.expires_at) > new Date()
        ? new Date(member.expires_at)
        : new Date()
      base.setDate(base.getDate() + daysToAdd)
      newExpiresAt = base.toISOString()

      await supabaseAdmin
        .from('cohort_members')
        .update({ status: 'ACTIVE', expires_at: newExpiresAt })
        .eq('id', membership_id)
    }
  }

  await supabaseAdmin.from('payments').insert({
    user_id,
    cohort_id,
    purchase_kind: 'AUTO_RENEWAL',
    membership_id,
    stripe_subscription_id: subscriptionId,
    amount_cents: invoice.amount_paid ?? 0,
    status: 'APPROVED',
    paid_at: new Date().toISOString(),
  })

  await applyCrossExtensions(cohort_id, user_id)

  const userInfo = await getUserEmailAndName(user_id)
  if (userInfo && cohort?.name && newExpiresAt) {
    await sendAutoRenewalEmail(
      userInfo.email,
      userInfo.name,
      cohort.name,
      newExpiresAt,
    ).catch(console.error)
  }
}

async function handleInvoicePaymentFailed(invoice: Stripe.Invoice) {
  const subscriptionId = await getSubscriptionIdFromInvoice(invoice)
  if (!subscriptionId) return

  const { data: existingPayment } = await supabaseAdmin
    .from('payments')
    .select('user_id, cohort_id, membership_id')
    .eq('stripe_subscription_id', subscriptionId)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (!existingPayment?.membership_id) return

  await supabaseAdmin
    .from('cohort_members')
    .update({ status: 'PAST_DUE' })
    .eq('id', existingPayment.membership_id)

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('name')
    .eq('id', existingPayment.cohort_id)
    .single()

  const userInfo = await getUserEmailAndName(existingPayment.user_id)
  if (userInfo && cohort?.name) {
    await sendPaymentFailedEmail(userInfo.email, userInfo.name, cohort.name).catch(console.error)
  }
}

async function handleChargeRefunded(charge: Stripe.Charge) {
  const paymentIntentId = typeof charge.payment_intent === 'string'
    ? charge.payment_intent
    : charge.payment_intent?.id ?? null

  if (!paymentIntentId) return

  const { data: originalPayment } = await supabaseAdmin
    .from('payments')
    .select('user_id, cohort_id, membership_id')
    .eq('stripe_payment_intent_id', paymentIntentId)
    .maybeSingle()

  if (!originalPayment) return

  // Criar registro de refund — NÃO remove membership (admin decide)
  await supabaseAdmin.from('payments').insert({
    user_id: originalPayment.user_id,
    cohort_id: originalPayment.cohort_id,
    purchase_kind: 'ENTRY',
    membership_id: originalPayment.membership_id,
    stripe_payment_intent_id: paymentIntentId,
    amount_cents: -(charge.amount_refunded ?? 0),
    status: 'REFUNDED',
    paid_at: new Date().toISOString(),
  })
}

async function applyCrossExtensions(sourceCohortId: string, userId: string) {
  const { data: crossExtensions } = await supabaseAdmin
    .from('cohort_cross_extensions')
    .select('target_cohort_id, days_granted')
    .eq('source_cohort_id', sourceCohortId)
    .eq('is_active', true)

  if (!crossExtensions || crossExtensions.length === 0) return

  for (const ext of crossExtensions) {
    const { data: targetMember } = await supabaseAdmin
      .from('cohort_members')
      .select('id, expires_at')
      .eq('cohort_id', ext.target_cohort_id)
      .eq('user_id', userId)
      .maybeSingle()

    if (targetMember) {
      const base = targetMember.expires_at && new Date(targetMember.expires_at) > new Date()
        ? new Date(targetMember.expires_at)
        : new Date()
      base.setDate(base.getDate() + ext.days_granted)

      await supabaseAdmin
        .from('cohort_members')
        .update({ expires_at: base.toISOString(), status: 'ACTIVE' })
        .eq('id', targetMember.id)
    }
    // Extensão cruzada só estende prazo existente, não cria membership nova
  }
}
