import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { PaymentsClient } from './PaymentsClient'
import type { PaymentRow } from './PaymentsClient'

export const metadata: Metadata = { title: 'Pagamentos' }

export default async function AdminPagamentosPage() {
  const [{ data: rawPayments }, { data: failedEvents }] = await Promise.all([
    supabaseAdmin
      .from('payments')
      .select(`
        id,
        amount_cents,
        status,
        purchase_kind,
        payment_method,
        paid_at,
        created_at,
        stripe_checkout_session_id,
        stripe_payment_intent_id,
        profiles:user_id ( name, id ),
        cohorts:cohort_id ( name )
      `)
      .order('created_at', { ascending: false })
      .limit(200),

    supabaseAdmin
      .from('webhook_events')
      .select('id, stripe_event_id, event_type, error_message, processed_at')
      .eq('success', false)
      .order('processed_at', { ascending: false })
      .limit(50),
  ])

  const payments: PaymentRow[] = (rawPayments ?? []).map((p) => {
    const profile = p.profiles as { name: string; id: string } | null
    const cohort = p.cohorts as { name: string } | null
    return {
      id: p.id,
      amount_cents: p.amount_cents,
      status: p.status,
      purchase_kind: p.purchase_kind,
      payment_method: p.payment_method,
      paid_at: p.paid_at,
      created_at: p.created_at,
      stripe_checkout_session_id: p.stripe_checkout_session_id,
      stripe_payment_intent_id: p.stripe_payment_intent_id,
      userName: profile?.name ?? '—',
      cohortName: cohort?.name ?? '—',
    }
  })

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--hairline)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Pagamentos</p>
        <h1 className="mt-1 font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">Pagamentos</h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Histórico de transações, reembolsos e exportações
        </p>
      </div>
      <PaymentsClient initialPayments={payments} failedWebhookEvents={failedEvents ?? []} />
    </div>
  )
}
