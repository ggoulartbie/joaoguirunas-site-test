export interface CreateCheckoutParams {
  priceId: string
  customerId: string | null
  customerEmail: string | null
  cohortId: string
  cohortSlug: string
  userId?: string
  purchaseKind: 'ENTRY' | 'EXTENSION'
  couponId?: string
  successUrl: string
  cancelUrl: string
}

export interface CheckoutSession {
  id: string
  url: string
}

export interface CreateCustomerParams {
  email: string
  name?: string
  metadata?: Record<string, string>
}

export interface CreateProductParams {
  name: string
  description?: string
  images?: string[]
  metadata?: Record<string, string>
}

export interface CreatePriceParams {
  productId: string
  unitAmount: number
  currency: string
  nickname?: string
  metadata?: Record<string, string>
}

export interface CreateCouponParams {
  name: string
  currency: string
  percentOff?: number
  amountOff?: number
  redeemBy?: number
  maxRedemptions?: number
  metadata?: Record<string, string>
}

export interface RefundPaymentParams {
  paymentIntentId: string
  amountCents?: number
}

export interface VerifyWebhookSignatureParams {
  payload: Buffer
  signature: string
  secret: string
}

export interface PaymentAdapter {
  createCheckoutSession(params: CreateCheckoutParams): Promise<CheckoutSession>
  createCustomer(params: CreateCustomerParams): Promise<{ id: string }>
  createProduct(params: CreateProductParams): Promise<{ id: string }>
  createPrice(params: CreatePriceParams): Promise<{ id: string }>
  archivePrice(priceId: string): Promise<void>
  createCoupon(params: CreateCouponParams): Promise<{ id: string }>
  refundPayment(params: RefundPaymentParams): Promise<void>
  verifyWebhookSignature(params: VerifyWebhookSignatureParams): unknown
}
