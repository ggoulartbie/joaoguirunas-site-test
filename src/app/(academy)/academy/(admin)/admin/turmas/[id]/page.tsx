import type { Metadata } from 'next'
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
        <p className="font-mono text-sm text-white/30">Turma não encontrada</p>
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
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Editar Turma
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">{cohort.name}</p>
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
