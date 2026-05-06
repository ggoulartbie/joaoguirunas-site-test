import 'server-only'
import Stripe from 'stripe'
import type { CreateCheckoutParams, CheckoutSession, PaymentAdapter } from './interface'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-04-22.dahlia',
})

export { stripe }

export class StripeAdapter implements PaymentAdapter {
  async createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession> {
    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: 'payment',
      line_items: [{ price: params.priceId, quantity: 1 }],
      success_url: params.successUrl,
      cancel_url: params.cancelUrl,
      customer_email: params.customerId ? undefined : params.customerEmail,
      customer: params.customerId ?? undefined,
      metadata: {
        cohort_id: params.cohortId,
        cohort_slug: params.cohortSlug,
        user_id: params.userId,
        purchase_kind: params.purchaseKind,
      },
    }

    const session = await stripe.checkout.sessions.create(sessionParams)

    return { id: session.id, url: session.url! }
  }
}
