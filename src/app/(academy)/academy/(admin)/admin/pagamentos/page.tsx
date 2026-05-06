import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { PaymentsClient } from './PaymentsClient'

export const metadata: Metadata = { title: 'Pagamentos' }

export default async function AdminPagamentosPage() {
  const { data: failedEvents } = await supabaseAdmin
    .from('webhook_events')
    .select('id, stripe_event_id, event_type, error_message, processed_at')
    .eq('success', false)
    .order('processed_at', { ascending: false })
    .limit(50)

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
      <PaymentsClient failedWebhookEvents={failedEvents ?? []} />
    </div>
  )
}
