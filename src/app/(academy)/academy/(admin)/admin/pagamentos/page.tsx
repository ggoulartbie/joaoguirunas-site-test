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
      <div className="border-b border-[var(--hairline)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Pagamentos</p>
        <h1 className="mt-1 font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">Pagamentos</h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Histórico de transações, reembolsos e exportações
        </p>
      </div>
      <PaymentsClient failedWebhookEvents={failedEvents ?? []} />
    </div>
  )
}
