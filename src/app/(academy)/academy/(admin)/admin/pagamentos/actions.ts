'use server'

import { revalidatePath } from 'next/cache'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/helpers'
import Stripe from 'stripe'
import {
  sendPaymentApprovedEmail,
  sendMembershipExtendedEmail,
  sendAutoRenewalEmail,
  sendPaymentFailedEmail,
} from '@/lib/email/send'
import { getPaymentAdapter } from '@/lib/payment'

async function getUserEmailAndName(userId: string): Promise<{ email: string; name: string } | null> {
  const [{ data: profile }, { data: authData }] = await Promise.all([
    supabaseAdmin.from('profiles').select('name').eq('id', userId).single(),
    supabaseAdmin.auth.admin.getUserById(userId),
  ])
  const email = authData?.user?.email
  if (!email || !profile) return null
  return { email, name: profile.name }
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
      const base =
        targetMember.expires_at && new Date(targetMember.expires_at) > new Date()
          ? new Date(targetMember.expires_at)
          : new Date()
      base.setDate(base.getDate() + ext.days_granted)
      await supabaseAdmin
        .from('cohort_members')
        .update({ expires_at: base.toISOString(), status: 'ACTIVE' })
        .eq('id', targetMember.id)
    }
  }
}

async function replayEvent(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      const { cohort_id, user_id, purchase_kind } = session.metadata ?? {}
      if (!cohort_id || !user_id || !purchase_kind) throw new Error('Missing metadata on checkout session')

      const { data: cohort } = await supabaseAdmin
        .from('cohorts')
        .select('id, name, access_duration_days, extension_duration_days, filled_seats')
        .eq('id', cohort_id)
        .single()
      if (!cohort) throw new Error(`Cohort ${cohort_id} not found`)

      const amountCents = session.amount_total ?? 0
      const paymentIntentId =
        typeof session.payment_intent === 'string'
          ? session.payment_intent
          : session.payment_intent?.id ?? null
      const customerId =
        typeof session.customer === 'string' ? session.customer : session.customer?.id ?? null

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
      const daysToAdd =
        purchase_kind === 'ENTRY'
          ? (cohort.access_duration_days ?? null)
          : (cohort.extension_duration_days ?? cohort.access_duration_days ?? null)

      if (daysToAdd !== null) {
        if (purchase_kind === 'EXTENSION' && existingMember?.expires_at) {
          const base =
            new Date(existingMember.expires_at) > new Date()
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
          .insert({ cohort_id, user_id, member_role: 'STUDENT', status: 'ACTIVE', expires_at: newExpiresAt })
          .select('id')
          .single()
        if (!newMember) throw new Error(`Failed to create cohort_member: ${error?.message}`)
        memberId = newMember.id
        await supabaseAdmin
          .from('cohorts')
          .update({ filled_seats: cohort.filled_seats + 1 })
          .eq('id', cohort_id)
      }

      // Insert payment only if not already recorded for this intent
      const { data: existingPayment } = await supabaseAdmin
        .from('payments')
        .select('id')
        .eq('stripe_payment_intent_id', paymentIntentId ?? '')
        .maybeSingle()

      if (!existingPayment && paymentIntentId) {
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
      }

      await applyCrossExtensions(cohort_id, user_id)

      const userInfo = await getUserEmailAndName(user_id)
      if (userInfo) {
        if (purchase_kind === 'ENTRY') {
          await sendPaymentApprovedEmail(userInfo.email, userInfo.name, cohort.name).catch(console.error)
        } else {
          await sendMembershipExtendedEmail(
            userInfo.email,
            userInfo.name,
            cohort.name,
            newExpiresAt ?? new Date().toISOString(),
          ).catch(console.error)
        }
      }
      break
    }

    case 'invoice.paid': {
      const invoice = event.data.object as Stripe.Invoice
      const parent = invoice.parent as {
        subscription_details?: { subscription?: string | Stripe.Subscription }
      } | null
      const sub = parent?.subscription_details?.subscription
      const subscriptionId = sub ? (typeof sub === 'string' ? sub : sub.id) : null
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
      const { data: cohort } = await supabaseAdmin
        .from('cohorts')
        .select('name, extension_duration_days, access_duration_days')
        .eq('id', cohort_id)
        .single()

      const daysToAdd = cohort?.extension_duration_days ?? cohort?.access_duration_days ?? null
      let newExpiresAt: string | null = null

      if (daysToAdd && membership_id) {
        const { data: member } = await supabaseAdmin
          .from('cohort_members')
          .select('expires_at')
          .eq('id', membership_id)
          .single()
        if (member) {
          const base =
            member.expires_at && new Date(member.expires_at) > new Date()
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
        await sendAutoRenewalEmail(userInfo.email, userInfo.name, cohort.name, newExpiresAt).catch(
          console.error,
        )
      }
      break
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice
      const parent = invoice.parent as {
        subscription_details?: { subscription?: string | Stripe.Subscription }
      } | null
      const sub = parent?.subscription_details?.subscription
      const subscriptionId = sub ? (typeof sub === 'string' ? sub : sub.id) : null
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
      break
    }

    case 'charge.refunded': {
      const charge = event.data.object as Stripe.Charge
      const paymentIntentId =
        typeof charge.payment_intent === 'string'
          ? charge.payment_intent
          : charge.payment_intent?.id ?? null
      if (!paymentIntentId) return

      const { data: originalPayment } = await supabaseAdmin
        .from('payments')
        .select('user_id, cohort_id, membership_id')
        .eq('stripe_payment_intent_id', paymentIntentId)
        .maybeSingle()
      if (!originalPayment) return

      const { data: existingRefund } = await supabaseAdmin
        .from('payments')
        .select('id')
        .eq('stripe_payment_intent_id', paymentIntentId)
        .eq('status', 'REFUNDED')
        .maybeSingle()

      if (!existingRefund) {
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
      break
    }
  }
}

export async function retryWebhookEvent(eventId: string) {
  await requireAdmin()

  const { data: row, error: fetchErr } = await supabaseAdmin
    .from('webhook_events')
    .select('id, stripe_event_id, payload, success')
    .eq('id', eventId)
    .single()

  if (fetchErr || !row) throw new Error('Evento não encontrado')
  if (row.success) throw new Error('Evento já processado com sucesso')

  const event = row.payload as unknown as Stripe.Event

  let success = true
  let errorMessage: string | null = null

  try {
    await replayEvent(event)
  } catch (err) {
    success = false
    errorMessage = err instanceof Error ? err.message : String(err)
    Sentry.captureException(err, {
      tags: { action: 'retryWebhookEvent', stripe_event_id: row.stripe_event_id },
    })
  }

  await supabaseAdmin
    .from('webhook_events')
    .update({
      success,
      error_message: errorMessage,
      processed_at: new Date().toISOString(),
    })
    .eq('id', eventId)

  if (!success) throw new Error(errorMessage ?? 'Falha ao reprocessar evento')

  revalidatePath('/academy/admin/pagamentos')
}

export async function refundPayment(paymentId: string) {
  await requireAdmin()

  const { data: payment, error: fetchErr } = await supabaseAdmin
    .from('payments')
    .select('id, stripe_payment_intent_id, status, amount_cents, user_id, cohort_id')
    .eq('id', paymentId)
    .single()

  if (fetchErr || !payment) throw new Error('Pagamento não encontrado')
  if (payment.status !== 'APPROVED') throw new Error('Apenas pagamentos aprovados podem ser reembolsados')
  if (!payment.stripe_payment_intent_id) throw new Error('Pagamento sem payment_intent_id — não pode ser reembolsado via Stripe')

  const adapter = getPaymentAdapter()

  try {
    await adapter.refundPayment({ paymentIntentId: payment.stripe_payment_intent_id })
  } catch (err) {
    Sentry.captureException(err, { tags: { action: 'refundPayment', paymentId } })
    throw new Error(err instanceof Error ? err.message : 'Falha ao processar reembolso no Stripe')
  }

  await supabaseAdmin
    .from('payments')
    .update({ status: 'REFUNDED' })
    .eq('id', paymentId)

  if (payment.cohort_id) {
    await supabaseAdmin
      .from('cohort_members')
      .update({ status: 'REMOVED' })
      .eq('user_id', payment.user_id)
      .eq('cohort_id', payment.cohort_id)
  }

  revalidatePath('/academy/admin/pagamentos')
}
