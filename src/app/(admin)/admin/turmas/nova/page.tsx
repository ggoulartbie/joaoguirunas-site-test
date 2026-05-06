import type { Metadata } from 'next'
import { CohortForm } from '../CohortForm'

export const metadata: Metadata = { title: 'Nova Turma' }

export default function NovaTurmaPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Nova Turma
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Preencha todas as seções e salve para criar a turma
        </p>
      </div>
      <CohortForm mode="create" />
    </div>
  )
}
