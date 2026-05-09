import 'server-only'
import { stripe } from './stripe'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Sincroniza uma cohort com Stripe Product + Prices (entry + extension).
// Idempotente: re-execução com os mesmos dados não cria duplicatas.
export async function syncCohortWithStripe(cohortId: string): Promise<void> {
  const { data: cohort, error } = await supabaseAdmin
    .from('cohorts')
    .select(`
      id, slug, name, description, cover_image_url,
      is_purchasable, entry_price_cents, extension_price_cents,
      stripe_price_entry_id, stripe_price_extension_id
    `)
    .eq('id', cohortId)
    .single()

  if (error || !cohort) throw new Error('Cohort não encontrada')

  if (!cohort.is_purchasable) return

  if (!cohort.entry_price_cents) {
    throw new Error('entry_price_cents obrigatório para cohort purchasable')
  }

  // --- Product ---
  // Usa o slug como idempotency key do produto via metadata
  const productMetaKey = `cohort_id`
  let productId: string

  const existingProducts = await stripe.products.search({
    query: `metadata['${productMetaKey}']:'${cohortId}'`,
    limit: 1,
  })

  if (existingProducts.data.length > 0) {
    const product = existingProducts.data[0]!
    // Atualiza nome/descrição se mudou
    await stripe.products.update(product.id, {
      name: cohort.name,
      description: cohort.description ?? undefined,
      images: cohort.cover_image_url ? [cohort.cover_image_url] : [],
    })
    productId = product.id
  } else {
    const product = await stripe.products.create({
      name: cohort.name,
      description: cohort.description ?? undefined,
      images: cohort.cover_image_url ? [cohort.cover_image_url] : [],
      metadata: { [productMetaKey]: cohortId, cohort_slug: cohort.slug },
    })
    productId = product.id
  }

  // --- Price de entrada ---
  const entryPriceId = await upsertPrice({
    existingPriceId: cohort.stripe_price_entry_id,
    productId,
    unitAmount: cohort.entry_price_cents,
    nickname: `${cohort.name} — entrada`,
    metadata: { cohort_id: cohortId, price_type: 'entry' },
  })

  // --- Price de extensão (opcional) ---
  let extensionPriceId = cohort.stripe_price_extension_id
  if (cohort.extension_price_cents) {
    extensionPriceId = await upsertPrice({
      existingPriceId: cohort.stripe_price_extension_id,
      productId,
      unitAmount: cohort.extension_price_cents,
      nickname: `${cohort.name} — extensão`,
      metadata: { cohort_id: cohortId, price_type: 'extension' },
    })
  }

  // Persiste os IDs no banco
  await supabaseAdmin
    .from('cohorts')
    .update({
      stripe_price_entry_id: entryPriceId,
      stripe_price_extension_id: extensionPriceId ?? null,
    })
    .eq('id', cohortId)
}

// Prices no Stripe são imutáveis (unit_amount não pode mudar).
// Se o preço mudou, arquiva o price antigo e cria um novo.
async function upsertPrice(params: {
  existingPriceId: string | null
  productId: string
  unitAmount: number
  nickname: string
  metadata: Record<string, string>
}): Promise<string> {
  const { existingPriceId, productId, unitAmount, nickname, metadata } = params

  if (existingPriceId) {
    const existing = await stripe.prices.retrieve(existingPriceId).catch(() => null)

    if (existing && existing.unit_amount === unitAmount && existing.active) {
      return existingPriceId
    }

    // Preço mudou — arquiva o antigo
    if (existing && existing.active) {
      await stripe.prices.update(existingPriceId, { active: false })
    }
  }

  const price = await stripe.prices.create({
    product: productId,
    unit_amount: unitAmount,
    currency: 'brl',
    nickname,
    metadata,
  })

  return price.id
}

// Sincroniza um coupon com Stripe Coupon.
// Se o coupon já existe no Stripe, verifica se precisa recriar (desconto mudou).
export async function syncCouponWithStripe(couponId: string): Promise<void> {
  const { data: coupon, error } = await supabaseAdmin
    .from('coupons')
    .select('id, code, discount_kind, discount_value, valid_until, max_uses, is_active, stripe_coupon_id')
    .eq('id', couponId)
    .single()

  if (error || !coupon) throw new Error('Cupom não encontrado')

  // Se inativo, arquiva no Stripe
  if (!coupon.is_active) {
    if (coupon.stripe_coupon_id) {
      await stripe.coupons.del(coupon.stripe_coupon_id).catch(() => null)
      await supabaseAdmin.from('coupons').update({ stripe_coupon_id: null }).eq('id', couponId)
    }
    return
  }

  // Se já tem ID no Stripe, verifica se ainda existe
  if (coupon.stripe_coupon_id) {
    const existing = await stripe.coupons.retrieve(coupon.stripe_coupon_id).catch(() => null)
    if (existing && !existing.deleted) return // já sincronizado
    // Cupom foi deletado no Stripe — recria abaixo
  }

  const isPercent = coupon.discount_kind === 'PERCENT'
  const createParams: Parameters<typeof stripe.coupons.create>[0] = {
    name: coupon.code,
    // currency only applies to fixed (amount_off) coupons — Stripe rejects it for percent_off
    ...(!isPercent ? { currency: 'brl' } : {}),
    ...(isPercent
      ? { percent_off: coupon.discount_value }
      : { amount_off: coupon.discount_value }),
    ...(coupon.valid_until ? { redeem_by: Math.floor(new Date(coupon.valid_until).getTime() / 1000) } : {}),
    ...(coupon.max_uses ? { max_redemptions: coupon.max_uses } : {}),
    metadata: { coupon_id: couponId },
  }

  const stripeCoupon = await stripe.coupons.create(createParams)

  await supabaseAdmin
    .from('coupons')
    .update({ stripe_coupon_id: stripeCoupon.id })
    .eq('id', couponId)
}
