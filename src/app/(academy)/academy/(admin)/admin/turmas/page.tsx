import type { Metadata } from 'next'
import Link from 'next/link'
import { CohortListClient } from './CohortListClient'

export const metadata: Metadata = { title: 'Turmas' }

export default function AdminTurmasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <div>
          <h1
            className="font-serif text-[28px] italic text-[var(--bone)]"
            style={{ fontFamily: 'var(--type-display, Georgia, serif)' }}
          >
            Turmas
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Gerencie cohorts — criação, edição e configuração
          </p>
        </div>
        <Link
          href="/academy/admin/turmas/nova"
          className="bg-[var(--ember)] px-4 py-2 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--void)] transition-opacity hover:opacity-90"
          style={{ borderRadius: 0 }}
        >
          + Nova Turma
        </Link>
      </div>
      <CohortListClient />
    </div>
  )
}
