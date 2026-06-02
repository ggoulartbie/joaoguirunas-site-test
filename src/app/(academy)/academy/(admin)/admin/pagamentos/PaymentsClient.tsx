'use client'

import { useState, useTransition } from 'react'
import { ExternalLink, X, AlertTriangle, RefreshCw, Trash2 } from 'lucide-react'
import { retryWebhookEvent, refundPayment, deletePayment } from './actions'

export type PaymentRow = {
  id: string
  amount_cents: number
  status: string
  purchase_kind: string
  payment_method: string | null
  paid_at: string | null
  created_at: string
  stripe_checkout_session_id: string | null
  stripe_payment_intent_id: string | null
  userName: string
  cohortName: string
}

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  DECLINED: 'Recusado',
  REFUNDED: 'Reembolsado',
}

const STATUS_BADGE: Record<string, string> = {
  PENDING: 'bg-amber-400/10 text-amber-400',
  APPROVED: 'bg-emerald-400/10 text-emerald-400',
  DECLINED: 'bg-[var(--ember)]/10 text-[var(--ember)]',
  REFUNDED: 'bg-transparent text-[var(--bone-mute)] border border-[rgba(255,255,255,0.07)]',
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
  isPending,
  error,
}: {
  payment: PaymentRow
  onConfirm: () => void
  onCancel: () => void
  isPending?: boolean
  error?: string | null
}) {
  const [confirmed, setConfirmed] = useState(false)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md border border-[var(--ember)]/20 bg-[var(--ink)]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-[var(--ember)]" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--bone)]">
              Confirmar Reembolso
            </h2>
          </div>
          <button onClick={onCancel} className="text-[var(--bone-mute)] hover:text-[var(--bone)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 space-y-2 border border-[rgba(255,255,255,0.07)] bg-[var(--ink-2)] p-4">
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">Aluno</span>
              <span className="font-mono text-xs text-[var(--bone-dim)]">{payment.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">Turma</span>
              <span className="font-mono text-xs text-[var(--bone-dim)]">{payment.cohortName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">Valor</span>
              <span className="font-mono text-sm font-bold text-[var(--bone)]">
                {formatBRL(payment.amount_cents)}
              </span>
            </div>
          </div>

          <p className="mb-4 font-mono text-xs text-[var(--bone-mute)]">
            Esta ação é irreversível. O reembolso será processado via Stripe e a matrícula do aluno
            será encerrada.
          </p>

          {error && (
            <div className="mb-4 border border-[var(--ember)]/40 bg-[var(--ember)]/10 px-4 py-2 font-mono text-xs text-[var(--ember)]">
              {error}
            </div>
          )}

          <label className="mb-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 accent-[var(--ember)]"
            />
            <span className="font-mono text-xs text-[var(--bone-dim)]">
              Confirmo que li as informações acima e quero prosseguir com o reembolso
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="flex-1 border border-[rgba(255,255,255,0.07)] py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!confirmed || isPending}
              onClick={onConfirm}
              className="flex-1 bg-[var(--ember)] py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? 'Processando...' : 'Reembolsar'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function DeleteConfirmModal({
  payment,
  onConfirm,
  onCancel,
  isPending,
  error,
}: {
  payment: PaymentRow
  onConfirm: () => void
  onCancel: () => void
  isPending?: boolean
  error?: string | null
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-md border border-[rgba(255,255,255,0.07)] bg-[var(--ink)]">
        <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] px-6 py-4">
          <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-[var(--bone)]">
            Excluir Pagamento
          </h2>
          <button onClick={onCancel} className="text-[var(--bone-mute)] hover:text-[var(--bone)]">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 space-y-2 border border-[rgba(255,255,255,0.07)] bg-[var(--ink-2)] p-4">
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">Aluno</span>
              <span className="font-mono text-xs text-[var(--bone-dim)]">{payment.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">Turma</span>
              <span className="font-mono text-xs text-[var(--bone-dim)]">{payment.cohortName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">Valor</span>
              <span className="font-mono text-sm font-bold text-[var(--bone)]">
                {formatBRL(payment.amount_cents)}
              </span>
            </div>
          </div>

          <p className="mb-5 font-mono text-xs text-[var(--bone-mute)]">
            O registro será removido permanentemente. Esta ação não pode ser desfeita.
          </p>

          {error && (
            <div className="mb-4 border border-[var(--ember)]/40 bg-[var(--ember)]/10 px-4 py-2 font-mono text-xs text-[var(--ember)]">
              {error}
            </div>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              disabled={isPending}
              className="flex-1 border border-[rgba(255,255,255,0.07)] py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={isPending}
              onClick={onConfirm}
              className="flex-1 bg-[var(--ember)] py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {isPending ? 'Excluindo...' : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function downloadCSV(payments: PaymentRow[]) {
  const headers = ['ID', 'Aluno', 'Turma', 'Tipo', 'Valor', 'Status', 'Método', 'Data']
  const rows = payments.map((p) => [
    p.id,
    p.userName,
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
    <div className="border border-[var(--ember)]/20 bg-[var(--ember)]/[0.03]">
      <div className="flex items-center gap-2 border-b border-[var(--ember)]/20 px-4 py-3">
        <AlertTriangle className="h-3.5 w-3.5 text-[var(--ember)]" />
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--ember)]">
          Webhooks com falha ({items.length})
        </span>
      </div>
      <div className="divide-y divide-[rgba(255,255,255,0.07)]">
        {items.map((ev) => (
          <div key={ev.id} className="flex flex-wrap items-start justify-between gap-3 px-4 py-3">
            <div className="min-w-0 flex-1 space-y-0.5">
              <p className="font-mono text-xs text-[var(--bone-dim)]">{ev.event_type}</p>
              <p className="font-mono text-[10px] text-[var(--bone-mute)]">{ev.stripe_event_id}</p>
              {ev.error_message && (
                <p className="font-mono text-[10px] text-[var(--ember)]/70">{ev.error_message}</p>
              )}
              {errors[ev.id] && (
                <p className="font-mono text-[10px] text-[var(--ember)]">{errors[ev.id]}</p>
              )}
            </div>
            <button
              type="button"
              disabled={retrying === ev.id}
              onClick={() => handleRetry(ev.id)}
              className="flex shrink-0 items-center gap-1.5 border border-[rgba(255,255,255,0.07)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[var(--bone-dim)] disabled:cursor-not-allowed disabled:opacity-40"
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

export function PaymentsClient({
  initialPayments,
  failedWebhookEvents,
}: {
  initialPayments: PaymentRow[]
  failedWebhookEvents: FailedEvent[]
}) {
  const [statusFilter, setStatusFilter] = useState('all')
  const [payments, setPayments] = useState(initialPayments)
  const [refundTarget, setRefundTarget] = useState<PaymentRow | null>(null)
  const [refundError, setRefundError] = useState<string | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<PaymentRow | null>(null)
  const [deleteError, setDeleteError] = useState<string | null>(null)
  const [successToast, setSuccessToast] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const filtered = payments.filter((p) => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false
    return true
  })

  function handleRefundConfirm() {
    if (!refundTarget) return
    setRefundError(null)
    const targetId = refundTarget.id
    startTransition(async () => {
      try {
        await refundPayment(targetId)
        setPayments((prev) =>
          prev.map((p) => (p.id === targetId ? { ...p, status: 'REFUNDED' } : p))
        )
        setRefundTarget(null)
      } catch (err) {
        setRefundError(err instanceof Error ? err.message : 'Erro desconhecido ao processar reembolso')
      }
    })
  }

  function handleDeleteConfirm() {
    if (!deleteTarget) return
    setDeleteError(null)
    const targetId = deleteTarget.id
    startTransition(async () => {
      const result = await deletePayment(targetId)
      if (result.error) {
        setDeleteError(result.error)
        return
      }
      setPayments((prev) => prev.filter((p) => p.id !== targetId))
      setDeleteTarget(null)
      setSuccessToast('Pagamento excluído com sucesso')
      setTimeout(() => setSuccessToast(null), 4000)
    })
  }

  return (
    <>
      <FailedWebhooksPanel events={failedWebhookEvents} />

      {refundTarget && (
        <>
          <RefundConfirmModal
            payment={refundTarget}
            onConfirm={handleRefundConfirm}
            onCancel={() => { setRefundTarget(null); setRefundError(null) }}
            isPending={isPending}
            error={refundError}
          />
        </>
      )}

      {deleteTarget && (
        <DeleteConfirmModal
          payment={deleteTarget}
          onConfirm={handleDeleteConfirm}
          onCancel={() => { setDeleteTarget(null); setDeleteError(null) }}
          isPending={isPending}
          error={deleteError}
        />
      )}

      {successToast && (
        <div className="fixed bottom-6 right-6 z-50 border border-emerald-500/30 bg-[var(--ink)] px-5 py-3 font-mono text-xs text-emerald-400 shadow-lg">
          {successToast}
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          <span className="self-center font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)]">
            Status:
          </span>
          {['all', 'APPROVED', 'DECLINED', 'PENDING', 'REFUNDED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? 'bg-[var(--ember)] text-white'
                  : 'border border-[rgba(255,255,255,0.07)] text-[var(--bone-mute)] hover:text-[var(--bone-dim)]'
              }`}
            >
              {s === 'all' ? 'Todos' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => downloadCSV(filtered)}
          className="flex items-center gap-2 border border-[rgba(255,255,255,0.07)] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[var(--bone-dim)]"
        >
          Exportar CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-[rgba(255,255,255,0.07)]">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="bg-[var(--ink-2)]">
              {['Usuário', 'Turma', 'Valor', 'Status', 'Data', 'Ação'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]"
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
                className="border-b border-[rgba(255,255,255,0.07)] hover:bg-[var(--void)]/40"
              >
                <td className="px-4 py-3 font-mono text-xs text-[var(--bone)]">{payment.userName}</td>
                <td className="px-4 py-3 font-mono text-xs text-[var(--bone-dim)]">{payment.cohortName}</td>
                <td className="px-4 py-3 font-mono text-sm font-bold text-[var(--bone)]">
                  {formatBRL(payment.amount_cents)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide ${STATUS_BADGE[payment.status] ?? 'text-[var(--bone-mute)]'}`}
                  >
                    {STATUS_LABELS[payment.status] ?? payment.status}
                  </span>
                </td>
                <td className="px-4 py-3 font-mono text-[10px] text-[var(--bone-mute)]">
                  {formatDateTime(payment.paid_at ?? payment.created_at)}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {payment.stripe_checkout_session_id && (
                      <a
                        href={`https://dashboard.stripe.com/payments/${payment.stripe_payment_intent_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                        title="Ver no Stripe"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {payment.status === 'APPROVED' && (
                      <button
                        type="button"
                        onClick={() => setRefundTarget(payment)}
                        className="border border-[var(--ember)]/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-[var(--ember)]/70 transition-colors hover:border-[var(--ember)]/40 hover:text-[var(--ember)]"
                      >
                        Reembolsar
                      </button>
                    )}
                    {payment.status === 'PENDING' && (
                      <button
                        type="button"
                        onClick={() => setDeleteTarget(payment)}
                        className="flex items-center gap-1.5 border border-red-500/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-red-400/70 transition-colors hover:border-red-500/40 hover:text-red-400"
                      >
                        <Trash2 className="h-3 w-3" />
                        Excluir
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center font-mono text-sm text-[var(--bone-mute)]">
                  Nenhum pagamento encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-[var(--bone-mute)]">
        {filtered.length} pagamento{filtered.length !== 1 ? 's' : ''} encontrado
        {filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  )
}
