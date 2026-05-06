export interface CreateCheckoutParams {
  priceId: string
  customerId: string | null
  customerEmail: string
  cohortId: string
  cohortSlug: string
  userId: string
  purchaseKind: 'ENTRY' | 'EXTENSION'
  successUrl: string
  cancelUrl: string
}

export interface CheckoutSession {
  id: string
  url: string
}

export interface PaymentAdapter {
  createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession>
}
