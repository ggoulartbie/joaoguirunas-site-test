import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NewCourseForm } from './NewCourseForm'

export const metadata: Metadata = { title: 'Novo Curso' }

export default function NovoCursoPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] pb-4">
        <div>
          <Link
            href="/academy/admin/cursos"
            className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[#84848c] transition-colors hover:text-[#c5c5ca]"
          >
            <ArrowLeft className="h-3 w-3" />
            Cursos
          </Link>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Admin / Cursos</p>
          <h1 className="font-[--type-display] text-[28px] italic text-[#f1f1f3]">Novo Curso</h1>
        </div>
      </div>

      <div className="max-w-3xl border border-[rgba(255,255,255,0.07)] bg-[#0e0e11] p-6" style={{ borderRadius: 0 }}>
        <p className="mb-6 font-mono text-[10px] uppercase tracking-widest text-[#84848c]">
          Módulos e aulas serão adicionados na próxima etapa
        </p>
        <NewCourseForm />
      </div>
    </div>
  )
}
