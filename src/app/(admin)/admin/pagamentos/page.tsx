import type { Metadata } from 'next'
import { PaymentsClient } from './PaymentsClient'

export const metadata: Metadata = { title: 'Pagamentos' }

export default function AdminPagamentosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Pagamentos
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Histórico de transações, reembolsos e exportações
        </p>
      </div>
      <PaymentsClient />
    </div>
  )
}
