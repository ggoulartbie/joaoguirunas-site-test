import 'server-only'

const INFINITEPAY_API = 'https://api.checkout.infinitepay.io'

interface CreateLinkPayload {
  handle: string
  items: Array<{ quantity: number; price: number; description: string }>
  order_nsu?: string
  redirect_url?: string
  webhook_url?: string
  customer?: { name?: string; email?: string; phone_number?: string }
}

interface CreateLinkResponse {
  url: string
}

interface PaymentCheckPayload {
  handle: string
  order_nsu: string
  transaction_nsu: string
  slug: string
}

interface PaymentCheckResponse {
  success: boolean
  paid: boolean
  amount: number
  paid_amount?: number
  installments?: number
  capture_method?: string
  receipt_url?: string
}

export async function createCheckoutLink(params: {
  handle: string
  orderNsu: string
  amountCents: number
  description: string
  redirectUrl: string
  webhookUrl: string
  customer?: { name?: string; email?: string; phone_number?: string }
}): Promise<string> {
  const payload: CreateLinkPayload = {
    handle: params.handle,
    items: [
      {
        quantity: 1,
        price: params.amountCents,
        description: params.description,
      },
    ],
    order_nsu: params.orderNsu,
    redirect_url: params.redirectUrl,
    webhook_url: params.webhookUrl,
    customer: params.customer,
  }

  const res = await fetch(`${INFINITEPAY_API}/links`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`InfinitePay createLink failed (${res.status}): ${body}`)
  }

  const data: CreateLinkResponse = await res.json()
  if (!data.url) throw new Error('InfinitePay createLink: no url in response')
  return data.url
}

export async function verifyPayment(params: {
  handle: string
  orderNsu: string
  transactionNsu: string
  invoiceSlug: string
}): Promise<PaymentCheckResponse> {
  const payload: PaymentCheckPayload = {
    handle: params.handle,
    order_nsu: params.orderNsu,
    transaction_nsu: params.transactionNsu,
    slug: params.invoiceSlug,
  }

  const res = await fetch(`${INFINITEPAY_API}/payment_check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })

  if (!res.ok) {
    const body = await res.text().catch(() => '')
    throw new Error(`InfinitePay payment_check failed (${res.status}): ${body}`)
  }

  return res.json() as Promise<PaymentCheckResponse>
}
