import 'server-only'
import Stripe from 'stripe'
import type {
  CreateCheckoutParams,
  CheckoutSession,
  CreateCustomerParams,
  CreateProductParams,
  CreatePriceParams,
  CreateCouponParams,
  RefundPaymentParams,
  VerifyWebhookSignatureParams,
  PaymentAdapter,
} from './interface'

let _stripe: Stripe | null = null

function getStripe(): Stripe {
  if (!_stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) throw new Error('STRIPE_SECRET_KEY is not configured')
    _stripe = new Stripe(key, { apiVersion: '2026-04-22.dahlia' })
  }
  return _stripe
}

export const stripe: Stripe = new Proxy({} as Stripe, {
  get(_target, prop) {
    return (getStripe() as unknown as Record<string | symbol, unknown>)[prop]
  },
})

export { getStripe }

export class StripeAdapter implements PaymentAdapter {
  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession> {
    const metadata: Record<string, string> = {
      cohort_id: params.cohortId,
      cohort_slug: params.cohortSlug,
      purchase_kind: params.purchaseKind,
    }
    if (params.userId) metadata.user_id = params.userId
    if (params.couponId) metadata.coupon_id = params.couponId

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer: params.customerId ?? undefined,
      customer_email: params.customerId ? undefined : (params.customerEmail ?? undefined),
      metadata,
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return { id: session.id, url: session.url! }
  }

  async createCustomer(params: CreateCustomerParams): Promise<{ id: string }> {
    const customer = await stripe.customers.create({
      email: params.email,
      name: params.name,
      metadata: params.metadata,
    })
    return { id: customer.id }
  }

  async createProduct(params: CreateProductParams): Promise<{ id: string }> {
    const product = await stripe.products.create({
      name: params.name,
      description: params.description,
      images: params.images,
      metadata: params.metadata,
    })
    return { id: product.id }
  }

  async createPrice(params: CreatePriceParams): Promise<{ id: string }> {
    const price = await stripe.prices.create({
      product: params.productId,
      unit_amount: params.unitAmount,
      currency: params.currency,
      nickname: params.nickname,
      metadata: params.metadata,
    })
    return { id: price.id }
  }

  async archivePrice(priceId: string): Promise<void> {
    await stripe.prices.update(priceId, { active: false })
  }

  async createCoupon(params: CreateCouponParams): Promise<{ id: string }> {
    const coupon = await stripe.coupons.create({
      name: params.name,
      currency: params.currency,
      ...(params.percentOff !== undefined ? { percent_off: params.percentOff } : {}),
      ...(params.amountOff !== undefined ? { amount_off: params.amountOff } : {}),
      ...(params.redeemBy !== undefined ? { redeem_by: params.redeemBy } : {}),
      ...(params.maxRedemptions !== undefined ? { max_redemptions: params.maxRedemptions } : {}),
      metadata: params.metadata,
    })
    return { id: coupon.id }
  }

  async refundPayment(params: RefundPaymentParams): Promise<void> {
    const refundParams: Stripe.RefundCreateParams = {
      payment_intent: params.paymentIntentId,
    }
    if (params.amountCents !== undefined) {
      refundParams.amount = params.amountCents
    }
    await stripe.refunds.create(refundParams)
  }

  verifyWebhookSignature(params: VerifyWebhookSignatureParams): unknown {
    return stripe.webhooks.constructEvent(
      params.payload,
      params.signature,
      params.secret,
    )
  }
}
