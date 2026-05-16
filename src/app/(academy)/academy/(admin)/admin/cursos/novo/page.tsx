export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NewCourseForm } from './NewCourseForm'

export const metadata: Metadata = { title: 'Novo Curso' }

export default function NovoCursoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
        <div>
          <Link
            href="/academy/admin/cursos"
            className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
          >
            <ArrowLeft className="h-3 w-3" />
            Cursos
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Cursos</p>
          <h1 className="font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">Novo Curso</h1>
        </div>
      </div>

      <div className="max-w-3xl border border-[var(--hairline)] bg-[var(--ink)] p-6" style={{ borderRadius: 0 }}>
        <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Módulos e aulas serão adicionados na próxima etapa
        </p>
        <NewCourseForm />
      </div>
    </div>
  )
}
