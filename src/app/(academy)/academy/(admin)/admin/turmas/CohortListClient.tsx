'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Pencil, Users, ExternalLink } from 'lucide-react'
import type { Database } from '@/types/database'

type CohortRow = Pick<
  Database['public']['Tables']['cohorts']['Row'],
  'id' | 'slug' | 'name' | 'description' | 'cover_image_url' | 'status' | 'start_date' | 'end_date' | 'total_seats' | 'filled_seats' | 'is_purchasable' | 'has_public_page' | 'entry_price_cents' | 'created_at' | 'updated_at'
>

const STATUS_LABELS: Record<string, string> = {
  DRAFT: 'Rascunho',
  OPEN: 'Aberta',
  IN_PROGRESS: 'Em Andamento',
  CLOSED: 'Encerrada',
  ARCHIVED: 'Arquivada',
}

const STATUS_BADGE: Record<string, string> = {
  OPEN: 'text-green-400 border border-green-500/30',
  IN_PROGRESS: 'text-[var(--ember)] border border-[var(--ember)]/30',
  CLOSED: 'text-[var(--bone-mute)] border border-white/[0.07]',
  ARCHIVED: 'text-[var(--bone-mute)] border border-white/[0.07]',
  DRAFT: 'text-[var(--bone-dim)] border border-white/[0.07]',
}

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function OccupancyBar({ filled, total }: { filled: number; total: number | null }) {
  if (total === null) {
    return (
      <span className="font-mono text-xs text-[var(--bone-mute)]">
        {filled} / ∞
      </span>
    )
  }
  const pct = Math.round((filled / total) * 100)
  return (
    <div className="flex flex-col gap-1.5">
      <span className="font-mono text-xs text-[var(--bone-mute)]">{filled}/{total}</span>
      <div className="h-px w-20 bg-white/10">
        <div
          className={`h-px ${pct >= 90 ? 'bg-red-400' : 'bg-[var(--ember)]'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export function CohortListClient({ initialCohorts }: { initialCohorts: CohortRow[] }) {
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [purchasableFilter, setPurchasableFilter] = useState<string>('all')

  const filtered = initialCohorts.filter((c) => {
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
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Status:</span>
          {['all', 'DRAFT', 'OPEN', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED'].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              style={{ borderRadius: 0 }}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                statusFilter === s
                  ? 'bg-[var(--ember)] text-[var(--void)]'
                  : 'border border-white/[0.07] text-[var(--bone-mute)] hover:border-white/[0.16] hover:text-[var(--bone-dim)]'
              }`}
            >
              {s === 'all' ? 'Todos' : STATUS_LABELS[s]}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Tipo:</span>
          {[
            { value: 'all', label: 'Todos' },
            { value: 'purchasable', label: 'Vendavel' },
            { value: 'private', label: 'Privada' },
          ].map(({ value, label }) => (
            <button
              key={value}
              onClick={() => setPurchasableFilter(value)}
              style={{ borderRadius: 0 }}
              className={`px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                purchasableFilter === value
                  ? 'bg-[var(--ember)] text-[var(--void)]'
                  : 'border border-white/[0.07] text-[var(--bone-mute)] hover:border-white/[0.16] hover:text-[var(--bone-dim)]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="border border-white/[0.07]" style={{ borderRadius: 0 }}>
        <table className="w-full" style={{ borderRadius: 0 }}>
          <thead>
            <tr className="border-b border-white/[0.07] bg-[var(--ink-2)]">
              <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                Turma
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] md:table-cell">
                Status
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] lg:table-cell">
                Vagas
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] xl:table-cell">
                Periodo
              </th>
              <th className="hidden px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] xl:table-cell">
                Preco
              </th>
              <th className="px-4 py-3 text-right font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                Acoes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/[0.04]">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center font-mono text-xs text-[var(--bone-mute)]">
                  Nenhuma turma encontrada
                </td>
              </tr>
            ) : (
              filtered.map((cohort) => (
                <tr key={cohort.id} className="group hover:bg-white/[0.02]">
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className="font-mono text-sm font-medium text-[var(--bone)]">
                        {cohort.name}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-[10px] text-[var(--bone-mute)]">{cohort.slug}</span>
                        {cohort.is_purchasable && (
                          <span
                            style={{ borderRadius: 0 }}
                            className="border border-green-500/30 px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-green-400"
                          >
                            Vendavel
                          </span>
                        )}
                        {cohort.has_public_page && (
                          <span
                            style={{ borderRadius: 0 }}
                            className="border border-white/[0.16] px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-[var(--bone-dim)]"
                          >
                            LP Publica
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="hidden px-4 py-4 md:table-cell">
                    <span
                      style={{ borderRadius: 0 }}
                      className={`px-2 py-1 font-mono text-[10px] uppercase tracking-widest ${STATUS_BADGE[cohort.status] ?? 'text-[var(--bone-mute)] border border-white/[0.07]'}`}
                    >
                      {STATUS_LABELS[cohort.status] ?? cohort.status}
                    </span>
                  </td>
                  <td className="hidden px-4 py-4 lg:table-cell">
                    <div className="flex items-center gap-2">
                      <Users className="h-3.5 w-3.5 text-[var(--bone-mute)]" />
                      <OccupancyBar filled={cohort.filled_seats} total={cohort.total_seats} />
                    </div>
                  </td>
                  <td className="hidden px-6 py-4 xl:table-cell">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-mono text-xs text-[var(--bone-mute)]">
                        {cohort.start_date
                          ? new Date(cohort.start_date).toLocaleDateString('pt-BR')
                          : '—'}
                      </span>
                      {cohort.end_date && (
                        <span className="font-mono text-xs text-[var(--bone-mute)]/60">
                          {new Date(cohort.end_date).toLocaleDateString('pt-BR')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="hidden px-4 py-4 xl:table-cell">
                    <span className="font-mono text-xs text-[var(--bone-dim)]">
                      {cohort.entry_price_cents ? formatBRL(cohort.entry_price_cents) : '—'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {cohort.has_public_page && (
                        <a
                          href={`/turmas/${cohort.slug}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
                          title="Ver LP publica"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      <Link
                        href={`/academy/admin/turmas/${cohort.id}`}
                        style={{ borderRadius: 0 }}
                        className="flex items-center gap-1.5 border border-white/[0.07] px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:border-white/[0.16] hover:text-[var(--bone)]"
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

      <p className="font-mono text-[10px] text-[var(--bone-mute)]">
        {filtered.length} turma{filtered.length !== 1 ? 's' : ''} encontrada{filtered.length !== 1 ? 's' : ''}
      </p>
    </div>
  )
}
