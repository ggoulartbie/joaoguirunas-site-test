import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { CohortForm } from '../CohortForm'

export const metadata: Metadata = { title: 'Editar Turma' }

export default async function EditarTurmaPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const [
    { data: cohort },
    { data: cohortCourses },
    { data: crossExtensions },
    { data: rawMembers },
    { data: liveSessions },
    { data: coupons },
    { data: rawCourses },
    { data: allCohortsRaw },
  ] = await Promise.all([
    supabaseAdmin.from('cohorts').select('*').eq('id', id).single(),
    supabaseAdmin.from('cohort_courses').select('*').eq('cohort_id', id),
    supabaseAdmin.from('cohort_cross_extensions').select('*').eq('source_cohort_id', id),
    supabaseAdmin
      .from('cohort_members')
      .select('*, profiles!inner(name)')
      .eq('cohort_id', id)
      .order('joined_at', { ascending: false }),
    supabaseAdmin
      .from('live_sessions')
      .select('*')
      .eq('cohort_id', id)
      .order('scheduled_at', { ascending: true }),
    supabaseAdmin
      .from('coupons')
      .select('*')
      .eq('cohort_id', id)
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('courses')
      .select('id, title, modules!inner(id, title, sort_order, lessons(id))')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true }),
    supabaseAdmin.from('cohorts').select('id, name').order('name', { ascending: true }),
  ])

  if (!cohort) notFound()

  // Fetch all platform users for the member multi-select
  const [{ data: allProfiles }, { data: authList }] = await Promise.all([
    supabaseAdmin.from('profiles').select('id, name').order('name', { ascending: true }),
    supabaseAdmin.auth.admin.listUsers({ perPage: 1000 }),
  ])

  const emailMap: Record<string, string> = {}
  for (const u of authList?.users ?? []) {
    if (u.email) emailMap[u.id] = u.email
  }

  const allUsers = (allProfiles ?? []).map((p) => ({
    id: p.id,
    name: p.name ?? '',
    email: emailMap[p.id] ?? '',
  }))

  const members = (rawMembers ?? []).map((m) => {
    const profile = m.profiles as { name: string } | null
    return {
      id: m.id,
      cohort_id: m.cohort_id,
      user_id: m.user_id,
      member_role: m.member_role,
      joined_at: m.joined_at,
      expires_at: m.expires_at,
      status: m.status,
      auto_renew_enabled: m.auto_renew_enabled,
      next_renewal_at: m.next_renewal_at,
      userName: profile?.name ?? m.user_id.slice(0, 8),
      userEmail: emailMap[m.user_id] ?? '—',
    }
  })

  const courses = (rawCourses ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    modules: ((c.modules as Array<{ id: string; title: string; sort_order: number; lessons: Array<unknown> }>) ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({
        id: m.id,
        title: m.title,
        lessonCount: (m.lessons ?? []).length,
      })),
  }))

  const allCohorts = (allCohortsRaw ?? []).map((c) => ({ id: c.id, name: c.name }))

  const sessionsWithCohortName = (liveSessions ?? []).map((ls) => ({
    ...ls,
    cohortName: cohort.name,
  }))

  const couponsWithCohortName = (coupons ?? []).map((c) => ({
    ...c,
    cohortName: cohort.name,
  }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Turmas</p>
          <h1 className="font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">
            Editar Turma
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            {cohort.name}
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
      <CohortForm
        mode="edit"
        cohort={cohort}
        cohortCourses={cohortCourses ?? []}
        crossExtensions={crossExtensions ?? []}
        members={members}
        liveSessions={sessionsWithCohortName}
        coupons={couponsWithCohortName}
        courses={courses}
        allCohorts={allCohorts}
        allUsers={allUsers}
      />
    </div>
  )
}
