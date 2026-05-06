import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CohortForm } from '../CohortForm'

export const metadata: Metadata = { title: 'Nova Turma' }

export default function NovaTurmaPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <div>
          <h1
            className="font-serif text-[28px] italic text-[var(--bone)]"
            style={{ fontFamily: 'var(--type-display, Georgia, serif)' }}
          >
            Nova Turma
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Preencha todas as secoes e salve para criar a turma
          </p>
        </div>
        <Link
          href="/academy/admin/turmas"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Link>
      </div>
      <CohortForm mode="create" />
    </div>
  )
}
