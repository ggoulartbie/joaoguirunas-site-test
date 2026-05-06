import type { Metadata } from 'next'
import { NewCourseForm } from './NewCourseForm'

export const metadata: Metadata = { title: 'Novo Curso' }

export default function NovoCursoPage() {
  return (
    <div className="mx-auto max-w-xl space-y-6">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Novo Curso
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Crie o catálogo — módulos e aulas serão adicionados na próxima etapa
        </p>
      </div>
      <NewCourseForm />
    </div>
  )
}
