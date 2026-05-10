import 'server-only'

const INFINITEPAY_API = 'https://api.checkout.infinitepay.io'

export interface CreateCheckoutLinkParams {
  cohortSlug: string
  amountCents: number
  customerEmail: string
  customerName?: string
  orderId: string
  redirectUrl: string
  webhookUrl: string
}

export interface VerifyPaymentParams {
  transactionNsu: string
  invoiceSlug: string
}

export interface VerifyPaymentResult {
  paid: boolean
  paidAmount: number
}

function getConfig(): { bearerToken: string; handle: string } {
  const bearerToken = process.env.INFINITEPAY_BEARER_TOKEN
  const handle = process.env.INFINITEPAY_HANDLE
  if (!bearerToken || !handle) {
    throw new Error('INFINITEPAY_BEARER_TOKEN and INFINITEPAY_HANDLE must be configured')
  }
  return { bearerToken, handle }
}

export class InfinitePayAdapter {
  async createCheckoutLink(params: CreateCheckoutLinkParams): Promise<{ url: string }> {
    const { bearerToken, handle } = getConfig()

    const res = await fetch(`${INFINITEPAY_API}/links`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        handle,
        order_nsu: params.orderId,
        items: [{ quantity: 1, price: params.amountCents, description: params.cohortSlug }],
        redirect_url: params.redirectUrl,
        webhook_url: params.webhookUrl,
        customer: { email: params.customerEmail, name: params.customerName },
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`InfinitePay createLink failed (${res.status}): ${text}`)
    }

    const data = (await res.json()) as { url?: string }
    if (!data.url) throw new Error('InfinitePay createLink: no url in response')
    return { url: data.url }
  }

  async verifyPayment(params: VerifyPaymentParams): Promise<VerifyPaymentResult> {
    const { bearerToken, handle } = getConfig()

    const res = await fetch(`${INFINITEPAY_API}/payment_check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify({
        handle,
        transaction_nsu: params.transactionNsu,
        slug: params.invoiceSlug,
      }),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => '')
      throw new Error(`InfinitePay payment_check failed (${res.status}): ${text}`)
    }

    const data = (await res.json()) as { paid?: boolean; paid_amount?: number }
    return {
      paid: data.paid === true,
      paidAmount: data.paid_amount ?? 0,
    }
  }
}

// Lazy singleton — mesma estratégia do stripe.ts: proxy evita inicialização antecipada no build
let _adapter: InfinitePayAdapter | null = null

function getAdapter(): InfinitePayAdapter {
  if (!_adapter) _adapter = new InfinitePayAdapter()
  return _adapter
}

export const infinitePay: InfinitePayAdapter = new Proxy({} as InfinitePayAdapter, {
  get(_target, prop) {
    return (getAdapter() as unknown as Record<string | symbol, unknown>)[prop]
  },
})
