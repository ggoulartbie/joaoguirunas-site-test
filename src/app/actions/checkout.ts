'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { StripeAdapter } from '@/lib/payment/stripe'

const schema = z.object({
  cohortSlug: z.string().min(1),
  userId: z.string().uuid(),
})

export async function createCheckoutSession(cohortSlug: string, userId: string) {
  const parsed = schema.safeParse({ cohortSlug, userId })
  if (!parsed.success) {
    return { error: 'Dados inválidos.' }
  }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user || user.id !== userId) {
    return { error: 'Não autorizado.' }
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, slug, name, is_purchasable, stripe_price_entry_id, stripe_price_extension_id, access_duration_days')
    .eq('slug', cohortSlug)
    .single()

  if (!cohort) {
    return { error: 'Turma não encontrada.' }
  }

  if (!cohort.is_purchasable) {
    return { error: 'Esta turma não está disponível para compra.' }
  }

  const { data: existingMember } = await supabaseAdmin
    .from('cohort_members')
    .select('id, status')
    .eq('cohort_id', cohort.id)
    .eq('user_id', userId)
    .maybeSingle()

  const purchaseKind = existingMember ? 'EXTENSION' : 'ENTRY'

  const priceId = purchaseKind === 'ENTRY'
    ? cohort.stripe_price_entry_id
    : cohort.stripe_price_extension_id

  if (!priceId) {
    return { error: 'Preço não configurado para esta turma.' }
  }

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('stripe_customer_id')
    .eq('id', userId)
    .single()

  const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(userId)
  const customerEmail = authUser?.user?.email ?? ''

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const adapter = new StripeAdapter()
  const session = await adapter.createCheckoutSession({
    priceId,
    customerId: profile?.stripe_customer_id ?? null,
    customerEmail,
    cohortId: cohort.id,
    cohortSlug: cohort.slug,
    userId,
    purchaseKind,
    successUrl: `${appUrl}/academy/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${appUrl}/academy/checkout/cancelado?turma=${cohortSlug}`,
  })

  redirect(session.url)
}
