'use client'

import { useState, useTransition } from 'react'
import { MOCK_PAYMENTS } from '@/components/admin/mock-data'
import type { MockPayment } from '@/components/admin/mock-data'
import { ExternalLink, X, AlertTriangle, RefreshCw } from 'lucide-react'
import { retryWebhookEvent } from './actions'

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  DECLINED: 'Recusado',
  REFUNDED: 'Reembolsado',
}

const STATUS_BADGE: Record<string, string> = {
  PENDING: 'bg-amber-400/10 text-amber-400',
  APPROVED: 'bg-emerald-400/10 text-emerald-400',
  DECLINED: 'bg-[#ff3a0e]/10 text-[#ff3a0e]',
  REFUNDED: 'bg-transparent text-[#84848c] border border-[rgba(255,255,255,0.07)]',
}

const KIND_LABELS: Record<string, string> = {
  ENTRY: 'Entrada',
  EXTENSION: 'Extensão',
  AUTO_RENEWAL: 'Renovação Auto.',
}

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDateTime(iso: string | null) {
  if (!iso) return '—'
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function RefundConfirmModal({
  payment,
  onConfirm,
  onCancel,
}: {
  payment: MockPayment
  onConfirm: () => void
  onCancel: () => void
}) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md border border-[#ff3a0e]/20 bg-[#0e0e11]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[#ff3a0e]" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[#f1f1f3]">
              Confirmar Reembolso
            </h2>
          </div>
          <button onClick={onCancel} className="text-[#84848c] hover:text-[#f1f1f3]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 space-y-2 border border-[rgba(255,255,255,0.07)] bg-[#16161a] p-4">
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[#84848c]">Aluno</span>
              <span className="font-mono text-xs text-[#c5c5ca]">{payment.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[#84848c]">Turma</span>
              <span className="font-mono text-xs text-[#c5c5ca]">{payment.cohortName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[#84848c]">Valor</span>
              <span className="font-mono text-sm font-bold text-[#f1f1f3]">
                {formatBRL(payment.amount_cents)}
              </span>
            </div>
          </div>

          <p className="mb-4 font-mono text-xs text-[#84848c]">
            Esta ação é irreversível. O reembolso será processado via Stripe e a matrícula do aluno
            será encerrada.
          </p>

          <label className="mb-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 accent-[#ff3a0e]"
            />
            <span className="font-mono text-xs text-[#c5c5ca]">
              Confirmo que li as informações acima e quero prosseguir com o reembolso
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-[rgba(255,255,255,0.07)] py-2.5 font-mono text-xs uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#c5c5ca]"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!confirmed}
              onClick={onConfirm}
              className="flex-1 bg-[#ff3a0e] py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              Reembolsar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function downloadCSV(payments: MockPayment[]) {
  const headers = ['ID', 'Aluno', 'E-mail', 'Turma', 'Tipo', 'Valor', 'Status', 'Método', 'Data']
  const rows = payments.map((p) => [
    p.id,
    p.userName,
    p.userEmail,
    p.cohortName,
    KIND_LABELS[p.purchase_kind] ?? p.purchase_kind,
    formatBRL(p.amount_cents),
    STATUS_LABELS[p.status] ?? p.status,
    p.payment_method ?? '—',
    formatDateTime(p.paid_at),
  ])
  const csv = [headers, ...rows].map((r) => r.join(',')).join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `pagamentos-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
}

type FailedEvent = {
  id: string
  stripe_event_id: string
  event_type: string
  error_message: string | null
  processed_at: string
}

function FailedWebhooksPanel({ events }: { events: FailedEvent[] }) {
  const [items, setItems] = useState(events)
  const [retrying, setRetrying] = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [, startTransition] = useTransition()

  if (items.length === 0) return null

  function handleRetry(id: string) {
    setRetrying(id)
    setErrors((prev) => ({ ...prev, [id]: '' }))
    startTransition(async () => {
      try {
        await retryWebhookEvent(id)
        setItems((prev) => prev.filter((e) => e.id !== id))
      } catch (err) {
        setErrors((prev) => ({
          ...prev,
          [id]: err instanceof Error ? err.message : 'Erro desconhecido',
        }))
      } finally {
        setRetrying(null)
      }
    })
  }

  return (
    <div className="border border-[#ff3a0e]/20 bg-[#ff3a0e]/[0.03]">
      <div className="flex items-center gap-2 border-b border-[#ff3a0e]/20 px-4 py-3">
        <AlertTriangle className="h-3.5 w-3.5 text-[#ff3a0e]" />
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[#ff3a0e]">
          Webhooks com falha ({items.length})
        </span>
      </div>
      <div className="divide-y divide-[rgba(255,255,255,0.07)]">
        {items.map((ev) => (
          <div key={ev.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="font-mono text-xs text-[#c5c5ca]">{ev.event_type}</p>
              <p className="font-mono text-[10px] text-[#84848c]">{ev.stripe_event_id}</p>
              {ev.error_message && (
                <p className="font-mono text-[10px] text-[#ff3a0e]/70">{ev.error_message}</p>
              )}
              {errors[ev.id] && (
                <p className="font-mono text-[10px] text-[#ff3a0e]">{errors[ev.id]}</p>
              )}
            </div>
            <button
              type="button"
              disabled={retrying === ev.id}
              onClick={() => handleRetry(ev.id)}
              className="flex shrink-0 items-center gap-1.5 border border-[rgba(255,255,255,0.07)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[#c5c5ca] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <RefreshCw className={`h-3 w-3 ${retrying === ev.id ? 'animate-spin' : ''}`} />
              Reprocessar
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export function PaymentsClient({ failedWebhookEvents }: { failedWebhookEvents: FailedEvent[] }) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [refundTarget, setRefundTarget] = useState<MockPayment | null>(null)

  const filtered = MOCK_PAYMENTS.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    return true
  })

  function handleRefundConfirm() {
    setRefundTarget(null)
  }

  return (
    <>
      <FailedWebhooksPanel events={failedWebhookEvents} />

      {refundTarget && (
        <RefundConfirmModal
          payment={refundTarget}
          onConfirm={handleRefundConfirm}
          onCancel={() => setRefundTarget(null)}
        />
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="self-center font-mono text-[10px] uppercase tracking-wider text-[#84848c]">
            Status:
          </span>
          {['all', 'APPROVED', 'DECLINED', 'PENDING', 'REFUNDED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? 'bg-[#ff3a0e] text-white'
                  : 'border border-[rgba(255,255,255,0.07)] text-[#84848c] hover:text-[#c5c5ca]'
              }`}
            >
              {s === 'all' ? 'Todos' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => downloadCSV(filtered)}
          className="flex items-center gap-2 border border-[rgba(255,255,255,0.07)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[#c5c5ca]"
        >
          Exportar CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[rgba(255,255,255,0.07)]">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-[#16161a]">
              {['Usuário', 'Turma', 'Valor', 'Status', 'Data', 'Ação'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wide text-[#84848c]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((payment) => (
              <tr
                key={payment.id}
                className="border-b border-[rgba(255,255,255,0.07)] hover:bg-[#050507]/40"
              >
                <td className="px-4 py-3">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-[#f1f1f3]">{payment.userName}</span>
                    <span className="font-mono text-[10px] text-[#84848c]">{payment.userEmail}</span>
                  </div>
                </td>
                <td className="px-4 py-3 font-mono text-xs text-[#c5c5ca]">{payment.cohortName}</td>
                <td className="px-4 py-3 font-mono text-sm font-bold text-[#f1f1f3]">
                  {formatBRL(payment.amount_cents)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STATUS_BADGE[payment.status] ?? 'text-[#84848c]'}`}
                  >
                    {STATUS_LABELS[payment.status] ?? payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[#84848c]">
                  {formatDateTime(payment.paid_at ?? payment.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {payment.stripe_checkout_session_id && (
                      <a
                        href={`https://dashboard.stripe.com/test/payments/${payment.stripe_payment_intent_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-[#84848c] transition-colors hover:text-[#c5c5ca]"
                        title="Ver no Stripe"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {payment.status === 'APPROVED' && (
                      <button
                        type="button"
                        onClick={() => setRefundTarget(payment)}
                        className="border border-[#ff3a0e]/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[#ff3a0e]/70 transition-colors hover:border-[#ff3a0e]/40 hover:text-[#ff3a0e]"
                      >
                        Reembolsar
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-[#84848c]">
        {filtered.length} pagamento{filtered.length !== 1 ? 's' : ''} encontrado
        {filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  )
}
