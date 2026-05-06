import type { Metadata } from 'next'
import Link from 'next/link'
import { CohortListClient } from './CohortListClient'

export const metadata: Metadata = { title: 'Turmas' }

export default function AdminTurmasPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
            Turmas
          </h1>
          <p className="mt-1 font-mono text-xs text-white/30">
            Gerencie cohorts — criação, edição e configuração
          </p>
        </div>
        <Link
          href="/admin/turmas/nova"
          className="flex items-center gap-2 bg-[#FF3A0E] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
        >
          + Nova Turma
        </Link>
      </div>
      <CohortListClient />
    </div>
  )
}
