import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { CohortForm } from '../CohortForm'
import {
  MOCK_COHORTS,
  MOCK_COHORT_COURSES,
  MOCK_CROSS_EXTENSIONS,
  MOCK_COHORT_MEMBERS,
  MOCK_LIVE_SESSIONS,
  MOCK_COUPONS,
} from '@/components/admin/mock-data'

export const metadata: Metadata = { title: 'Editar Turma' }

export default async function EditarTurmaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const cohort = MOCK_COHORTS.find((c) => c.id === id)

  if (!cohort) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="font-mono text-sm text-[#84848c]">Turma nao encontrada</p>
      </div>
    )
  }

  const cohortCourses = MOCK_COHORT_COURSES.filter((cc) => cc.cohort_id === id)
  const crossExtensions = MOCK_CROSS_EXTENSIONS.filter((e) => e.source_cohort_id === id)
  const members = MOCK_COHORT_MEMBERS.filter((m) => m.cohort_id === id)
  const liveSessions = MOCK_LIVE_SESSIONS.filter((ls) => ls.cohort_id === id)
  const coupons = MOCK_COUPONS.filter((c) => c.cohort_id === id)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/[0.07] pb-4">
        <div>
          <h1
            className="font-serif text-[28px] italic text-[#f1f1f3]"
            style={{ fontFamily: 'var(--type-display, Georgia, serif)' }}
          >
            Editar Turma
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#84848c]">
            {cohort.name}
          </p>
        </div>
        <Link
          href="/academy/admin/turmas"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#84848c] transition-colors hover:text-[#c5c5ca]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Link>
      </div>
      <CohortForm
        mode="edit"
        cohort={cohort}
        cohortCourses={cohortCourses}
        crossExtensions={crossExtensions}
        members={members}
        liveSessions={liveSessions}
        coupons={coupons}
      />
    </div>
  )
}
