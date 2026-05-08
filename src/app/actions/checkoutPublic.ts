'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { StripeAdapter } from '@/lib/payment/stripe'

const schema = z.object({
  cohortSlug: z.string().min(1),
})

// Checkout público: não requer autenticação.
// O webhook cria a conta Supabase automaticamente após o pagamento.
export async function createPublicCheckoutSession(cohortSlug: string) {
  const parsed = schema.safeParse({ cohortSlug })
  if (!parsed.success) {
    return { error: 'Dados inválidos.' }
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, slug, name, is_purchasable, stripe_price_entry_id')
    .eq('slug', cohortSlug)
    .single()

  if (!cohort) {
    return { error: 'Turma não encontrada.' }
  }

  if (!cohort.is_purchasable) {
    return { error: 'Esta turma não está disponível para compra.' }
  }

  if (!cohort.stripe_price_entry_id) {
    return { error: 'Preço não configurado para esta turma.' }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'

  const adapter = new StripeAdapter()
  let session: { id: string; url: string }
  try {
    session = await adapter.createCheckoutSession({
      priceId: cohort.stripe_price_entry_id,
      customerId: null,
      customerEmail: null,
      cohortId: cohort.id,
      cohortSlug: cohort.slug,
      purchaseKind: 'ENTRY',
      successUrl: `${appUrl}/academy/checkout/sucesso?session_id={CHECKOUT_SESSION_ID}`,
      cancelUrl: `${appUrl}/curso-online`,
    })
  } catch (err) {
    console.error('[checkoutPublic] Stripe error:', err)
    return { error: 'Erro ao processar pagamento. Tente novamente.' }
  }

  redirect(session.url)
}
