'use client'

import { useState } from 'react'
import { MOCK_PAYMENTS } from '@/components/admin/mock-data'
import type { MockPayment } from '@/components/admin/mock-data'
import { ExternalLink, X, AlertTriangle } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  PENDING: 'Pendente',
  APPROVED: 'Aprovado',
  DECLINED: 'Recusado',
  REFUNDED: 'Reembolsado',
}

const STATUS_COLORS: Record<string, string> = {
  PENDING: 'text-amber-400 bg-amber-400/10',
  APPROVED: 'text-emerald-400 bg-emerald-400/10',
  DECLINED: 'text-red-400 bg-red-400/10',
  REFUNDED: 'text-white/40 bg-white/5',
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
      <div className="w-full max-w-md border border-red-400/20 bg-[#0C0C12]">
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <h2 className="font-mono text-sm font-semibold uppercase tracking-wider text-white/90">
              Confirmar Reembolso
            </h2>
          </div>
          <button onClick={onCancel} className="text-white/30 hover:text-white/70">
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="mb-4 space-y-2 border border-white/5 bg-white/[0.02] p-4">
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-white/30">Aluno</span>
              <span className="font-mono text-xs text-white/70">{payment.userName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-white/30">Turma</span>
              <span className="font-mono text-xs text-white/70">{payment.cohortName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-mono text-[10px] text-white/30">Valor</span>
              <span className="font-mono text-sm font-semibold text-white">
                {formatBRL(payment.amount_cents)}
              </span>
            </div>
          </div>

          <p className="mb-4 font-mono text-xs text-white/50">
            Esta ação é irreversível. O reembolso será processado via Stripe e a matrícula do aluno
            será encerrada.
          </p>

          <label className="mb-5 flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 accent-red-400"
            />
            <span className="font-mono text-xs text-white/60">
              Confirmo que li as informações acima e quero prosseguir com o reembolso
            </span>
          </label>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 border border-white/10 py-2.5 font-mono text-xs uppercase tracking-wider text-white/40 transition-colors hover:text-white/70"
            >
              Cancelar
            </button>
            <button
              type="button"
              disabled={!confirmed}
              onClick={onConfirm}
              className="flex-1 bg-red-500 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-40"
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

export function PaymentsClient() {
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
          <span className="self-center font-mono text-[10px] uppercase tracking-wider text-white/30">
            Status:
          </span>
          {['all', 'APPROVED', 'DECLINED', 'PENDING', 'REFUNDED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? 'bg-[#FF3A0E] text-white'
                  : 'border border-white/10 text-white/40 hover:text-white/60'
              }`}
            >
              {s === 'all' ? 'Todos' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => downloadCSV(filtered)}
          className="flex items-center gap-2 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:border-white/20 hover:text-white/70"
        >
          Exportar CSV
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-white/10">
        <table className="w-full min-w-[700px]">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              {['Aluno', 'Turma', 'Tipo', 'Valor', 'Status', 'Data', 'Ações'].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.map((payment) => (
              <tr key={payment.id} className="hover:bg-white/[0.02]">
                <td className="px-4 py-4">
                  <div className="flex flex-col">
                    <span className="font-mono text-xs text-white/80">{payment.userName}</span>
                    <span className="font-mono text-[10px] text-white/30">{payment.userEmail}</span>
                  </div>
                </td>
                <td className="px-4 py-4 font-mono text-xs text-white/60">{payment.cohortName}</td>
                <td className="px-4 py-4 font-mono text-[10px] text-white/40">
                  {KIND_LABELS[payment.purchase_kind] ?? payment.purchase_kind}
                </td>
                <td className="px-4 py-4 font-mono text-sm font-semibold text-white/80">
                  {formatBRL(payment.amount_cents)}
                </td>
                <td className="px-4 py-4">
                  <span
                    className={`px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${STATUS_COLORS[payment.status] ?? 'text-white/40 bg-white/5'}`}
                  >
                    {STATUS_LABELS[payment.status] ?? payment.status}
                  </span>
                </td>
                <td className="px-4 py-4 font-mono text-[10px] text-white/40">
                  {formatDateTime(payment.paid_at ?? payment.created_at)}
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    {payment.stripe_checkout_session_id && (
                      <a
                        href={`https://dashboard.stripe.com/test/payments/${payment.stripe_payment_intent_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1 text-white/20 transition-colors hover:text-white/60"
                        title="Ver no Stripe"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {payment.status === 'APPROVED' && (
                      <button
                        type="button"
                        onClick={() => setRefundTarget(payment)}
                        className="border border-red-400/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-red-400/70 transition-colors hover:border-red-400/40 hover:text-red-400"
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

      <p className="font-mono text-[10px] text-white/20">
        {filtered.length} pagamento{filtered.length !== 1 ? 's' : ''} encontrado
        {filtered.length !== 1 ? 's' : ''}
      </p>
    </>
  )
}
