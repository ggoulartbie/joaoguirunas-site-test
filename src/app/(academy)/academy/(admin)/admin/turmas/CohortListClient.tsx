'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MOCK_COHORTS } from '@/components/admin/mock-data'
import type { MockCohort } from '@/components/admin/mock-data'
import { Pencil, Users, ExternalLink } from 'lucide-react'

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Rascunho',
  OPEN: 'Aberta',
  IN_PROGRESS: 'Em Andamento',
  CLOSED: 'Encerrada',
  ARCHIVED: 'Arquivada',
}

const STATUS_COLORS: Record<string, string> = {
  DRAFT: 'text-white/40 bg-white/5',
  OPEN: 'text-emerald-400 bg-emerald-400/10',
  IN_PROGRESS: 'text-blue-400 bg-blue-400/10',
  CLOSED: 'text-white/30 bg-white/5',
  ARCHIVED: 'text-white/20 bg-white/5',
}

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function OccupancyBar({ filled, total }: { filled: number; total: number | null }) {
  if (total === null) {
    return (
      <span className="font-mono text-xs text-white/40">
        {filled} / ∞
      </span>
    )
  }
  const pct = Math.round((filled / total) * 100)
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-20 bg-white/10">
        <div
          className={`h-1 ${pct >= 90 ? 'bg-red-400' : 'bg-[#FF3A0E]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className="font-mono text-xs text-white/40">{filled}/{total}</span>
    </div>
  )
}

export function CohortListClient() {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [purchasableFilter, setPurchasableFilter] = useState<string>('all')

  const filtered = MOCK_COHORTS.filter((c: MockCohort) => {
    if (statusFilter !== 'all' && c.status !== statusFilter) return false
    if (purchasableFilter === 'purchasable' && !c.is_purchasable) return false
    if (purchasableFilter === 'private' && c.is_purchasable) return false
    return true
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Status:</span>
          {['all', 'DRAFT', 'OPEN', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                statusFilter === s
                  ? 'bg-[#FF3A0E] text-white'
                  : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {s === 'all' ? 'Todos' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">Tipo:</span>
          {[
            { value: 'all', label: 'Todos' },
            { value: 'purchasable', label: 'Vendável' },
            { value: 'private', label: 'Privada' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPurchasableFilter(value)}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors ${
                purchasableFilter === value
                  ? 'bg-[#FF3A0E] text-white'
                  : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/10">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/10 bg-white/[0.02]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30">
                Turma
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30 md:table-cell">
                Status
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30 lg:table-cell">
                Ocupação
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-wider text-white/30 xl:table-cell">
                Preço Entrada
              </th>
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-wider text-white/30">
                Ações
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center font-mono text-xs text-white/30">
                  Nenhuma turma encontrada
                </td>
              </tr>
            ) : (
              filtered.map((cohort) => (
                <tr key={cohort.id} className="group hover:bg-white/[0.02]">
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-sm font-medium text-white/90">
                        {cohort.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-white/30">{cohort.slug}</span>
                        {cohort.is_purchasable && (
                          <span className="rounded-none border border-emerald-400/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400">
                            Vendável
                          </span>
                        )}
                        {cohort.has_public_page && (
                          <span className="rounded-none border border-blue-400/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider text-blue-400">
                            LP Pública
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-4 md:table-cell">
                    <span
                      className={`px-2 py-1 font-mono text-[10px] uppercase tracking-wider ${STATUS_COLORS[cohort.status] ?? 'text-white/40 bg-white/5'}`}
                    >
                      {STATUS_LABELS[cohort.status] ?? cohort.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-white/30" />
                      <OccupancyBar filled={cohort.filled_seats} total={cohort.total_seats} />
                    </div>
                  </td>
                  <td className="hidden px-4 py-4 xl:table-cell">
                    <span className="font-mono text-xs text-white/60">
                      {cohort.entry_price_cents
                        ? formatBRL(cohort.entry_price_cents)
                        : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {cohort.has_public_page && (
                        <a
                          href={`/turmas/${cohort.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-white/20 transition-colors hover:text-white/60"
                          title="Ver LP pública"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <Link
                        href={`/admin/turmas/${cohort.id}`}
                        className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/60 transition-colors hover:border-white/20 hover:text-white/90"
                      >
                        <Pencil className="h-3 w-3" />
                        Editar
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="font-mono text-[10px] text-white/20">
        {filtered.length} turma{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
