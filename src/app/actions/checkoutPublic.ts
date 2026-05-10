'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { StripeAdapter } from '@/lib/payment/stripe'
import { findOrCreateUser } from '@/lib/payment/webhookHelpers'

const schema = z.object({
  cohortSlug: z.string().min(1),
  name: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
})

async function fireCrmWebhook(payload: {
  name?: string
  email: string
  phone?: string
  cohortSlug: string
  cohortName: string
}) {
  const url = process.env.CRM_WEBHOOK_URL
  if (!url) return
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: payload.name ?? '',
      email: payload.email,
      phone: payload.phone ?? '',
      cohort_slug: payload.cohortSlug,
      cohort_name: payload.cohortName,
      source: 'checkout',
      timestamp: new Date().toISOString(),
    }),
  }).catch(() => {})
}

// Checkout público: não requer autenticação.
// Para InfinitePay, o email é obrigatório para criar/encontrar o user antes do redirect.
// Para Stripe, o webhook cria a conta após o pagamento via metadata da sessão.
export async function createPublicCheckoutSession(cohortSlug: string, email?: string, phone?: string, name?: string) {
  const parsed = schema.safeParse({ cohortSlug, name, email, phone })
  if (!parsed.success) {
    return { error: 'Dados inválidos.' }
  }

  const { data: cohort } = await supabaseAdmin
    .from('cohorts')
    .select('id, slug, name, is_purchasable, stripe_price_entry_id, entry_price_cents, access_duration_days, payment_provider, infinitepay_handle')
    .eq('slug', cohortSlug)
    .single()

  if (!cohort) {
    return { error: 'Turma não encontrada.' }
  }

  if (!cohort.is_purchasable) {
    return { error: 'Esta turma não está disponível para compra.' }
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com'

  if (cohort.payment_provider === 'INFINITEPAY') {
    if (!cohort.entry_price_cents) {
      return { error: 'Preço não configurado para esta turma.' }
    }

    // Resolve user_id — required before creating PENDING payment (payments.user_id NOT NULL)
    const supabase = await createClient()
    const { data: { user: authUser } } = await supabase.auth.getUser()

    let userId: string
    let customerEmail: string

    if (authUser) {
      userId = authUser.id
      customerEmail = authUser.email ?? email ?? ''
    } else {
      if (!email) {
        return { error: 'Informe seu email para continuar.' }
      }
      try {
        const { userId: resolvedId } = await findOrCreateUser(email, name ?? '')
        userId = resolvedId
        customerEmail = email
      } catch (err) {
        console.error('[checkoutPublic] findOrCreateUser error:', err)
        return { error: 'Erro ao processar sua conta. Tente novamente.' }
      }
    }

    fireCrmWebhook({ name: parsed.data.name, email: customerEmail, phone: parsed.data.phone, cohortSlug, cohortName: cohort.name })

    const orderNsu = crypto.randomUUID()

    const { data: payment, error: paymentError } = await supabaseAdmin
      .from('payments')
      .insert({
        cohort_id: cohort.id,
        user_id: userId,
        amount_cents: cohort.entry_price_cents,
        status: 'PENDING',
        payment_provider: 'INFINITEPAY',
        purchase_kind: 'ENTRY',
        infinitepay_order_nsu: orderNsu,
      })
      .select('id')
      .single()

    if (paymentError || !payment) {
      console.error('[checkoutPublic] InfinitePay PENDING insert error:', paymentError)
      return { error: 'Erro ao processar pagamento. Tente novamente.' }
    }

    const handle = (cohort as { infinitepay_handle?: string | null }).infinitepay_handle
    if (!handle) {
      return { error: 'Handle InfinitePay não configurado para esta turma. Configure em Admin → Turmas.' }
    }

    const { createCheckoutLink } = await import('@/lib/payment/infinitepay')
    let checkoutUrl: string
    try {
      checkoutUrl = await createCheckoutLink({
        handle,
        orderNsu,
        amountCents: cohort.entry_price_cents,
        description: `Acesso ao curso — ${cohort.name}`,
        redirectUrl: `${appUrl}/academy/checkout/sucesso`,
        webhookUrl: `${appUrl}/api/webhooks/infinitepay`,
        customer: (name || customerEmail || phone)
          ? { name: name || undefined, email: customerEmail || undefined, phone_number: phone || undefined }
          : undefined,
      })
    } catch (err) {
      console.error('[checkoutPublic] InfinitePay createLink error:', err)
      return { error: 'Erro ao processar pagamento. Tente novamente.' }
    }

    redirect(checkoutUrl)
  }

  // Stripe flow
  if (!cohort.stripe_price_entry_id) {
    return { error: 'Preço não configurado para esta turma.' }
  }

  if (email) {
    fireCrmWebhook({ name: parsed.data.name, email, phone: parsed.data.phone, cohortSlug, cohortName: cohort.name })
  }

  const adapter = new StripeAdapter()
  let session: { id: string; url: string }
  try {
    session = await adapter.createCheckoutSession({
      priceId: cohort.stripe_price_entry_id,
      customerId: null,
      customerEmail: email ?? null,
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
