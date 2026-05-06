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
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84848c]">Admin / Pagamentos</p>
        <h1 className="mt-1 font-mono text-[28px] italic text-[#f1f1f3]">Pagamentos</h1>
        <p className="mt-1 font-mono text-xs text-[#84848c]">
          Histórico de transações, reembolsos e exportações
        </p>
      </div>
      <PaymentsClient failedWebhookEvents={failedEvents ?? []} />
    </div>
  )
}
