'use server'

import { requireUser } from '@/lib/auth/helpers'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/payment/stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'

export async function enableAutoRenewal(membershipId: string): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  // Fetch membership — user can only enable their own
  const { data: member } = await supabase
    .from('cohort_members')
    .select('id, cohort_id, expires_at, user_id')
    .eq('id', membershipId)
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .single()

  if (!member) throw new Error('Matrícula não encontrada ou inativa')
  if (!member.expires_at) throw new Error('Matrícula vitalícia não precisa de renovação automática')

  // Find the extension Stripe price for this cohort
  const { data: cohort } = await supabase
    .from('cohorts')
    .select('stripe_price_extension_id, allows_auto_renewal, name')
    .eq('id', member.cohort_id)
    .single()

  if (!cohort?.allows_auto_renewal) throw new Error('Esta turma não permite renovação automática')
  if (!cohort.stripe_price_extension_id) throw new Error('Preço de extensão não configurado no Stripe')

  // Find the Stripe customer id for this user
  const { data: profile } = await supabase
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single()

  if (!profile?.stripe_customer_id) throw new Error('Cliente Stripe não encontrado — faça uma compra primeiro')

  // Schedule renewal 7 days before expiry
  const expiresAt = new Date(member.expires_at)
  const renewalDate = new Date(expiresAt)
  renewalDate.setDate(renewalDate.getDate() - 7)

  // If renewal date is already past, schedule for tomorrow
  const scheduleDate = renewalDate > new Date() ? renewalDate : new Date(Date.now() + 86_400_000)
  const scheduledUnix = Math.floor(scheduleDate.getTime() / 1000)

  // Single-phase schedule: starts on scheduledUnix, ends 1 month later (Stripe requires end_date)
  const phaseEndUnix = scheduledUnix + 30 * 24 * 60 * 60

  const schedule = await stripe.subscriptionSchedules.create({
    customer: profile.stripe_customer_id,
    start_date: scheduledUnix,
    end_behavior: 'cancel',
    phases: [
      {
        items: [{ price: cohort.stripe_price_extension_id, quantity: 1 }],
        end_date: phaseEndUnix,
      },
    ],
    metadata: {
      membership_id: membershipId,
      cohort_id: member.cohort_id,
      user_id: user.id,
      purpose: 'AUTO_RENEWAL',
    },
  })

  await supabaseAdmin
    .from('cohort_members')
    .update({
      auto_renew_enabled: true,
      next_renewal_at: scheduleDate.toISOString(),
    })
    .eq('id', membershipId)

  // Store schedule id on the existing payment record if it exists, or just log it
  // The webhook invoice.paid will pick this up via subscription id
  await supabaseAdmin
    .from('payments')
    .update({ stripe_subscription_id: schedule.id })
    .eq('membership_id', membershipId)
    .eq('purchase_kind', 'ENTRY')
    .order('created_at', { ascending: false })
    .limit(1)
}

export async function disableAutoRenewal(membershipId: string): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  const { data: member } = await supabase
    .from('cohort_members')
    .select('id, user_id')
    .eq('id', membershipId)
    .eq('user_id', user.id)
    .single()

  if (!member) throw new Error('Matrícula não encontrada')

  // Find and cancel the Stripe subscription schedule
  const { data: payment } = await supabaseAdmin
    .from('payments')
    .select('stripe_subscription_id')
    .eq('membership_id', membershipId)
    .not('stripe_subscription_id', 'is', null)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle()

  if (payment?.stripe_subscription_id) {
    try {
      await stripe.subscriptionSchedules.cancel(payment.stripe_subscription_id)
    } catch {
      // Schedule may already be cancelled or completed — proceed anyway
    }
  }

  await supabaseAdmin
    .from('cohort_members')
    .update({ auto_renew_enabled: false, next_renewal_at: null })
    .eq('id', membershipId)
}
