import 'server-only'
import type { PaymentAdapter } from './interface'
import { StripeAdapter } from './stripe'

let _adapter: PaymentAdapter | null = null

export function getPaymentAdapter(): PaymentAdapter {
  if (!_adapter) {
    const provider = process.env.PAYMENT_PROVIDER ?? 'stripe'
    if (provider === 'stripe') {
      _adapter = new StripeAdapter()
    } else {
      throw new Error(`Unknown PAYMENT_PROVIDER: ${provider}`)
    }
  }
  return _adapter
}
