import type { Metadata } from 'next'
import Link from 'next/link'
import { Play, Calendar, ArrowRight, AlertTriangle } from 'lucide-react'
import { ProgressBar } from '@/components/student/ProgressBar'
import { ExpirationBadge } from '@/components/student/ExpirationBadge'
import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Dashboard' }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default async function DashboardPage() {
  const profile = await requireUser()
  const supabase = await createClient()

  // 1. Cohorts ativas do aluno
  const { data: memberRows } = await supabase
    .from('cohort_members')
    .select(`
      cohort_id, expires_at, status, auto_renew_enabled,
      cohorts (id, name, slug, has_live_sessions)
    `)
    .eq('user_id', profile.id)
    .eq('status', 'ACTIVE')

  const members = memberRows ?? []
  const cohortIds = members.map((m) => m.cohort_id)

  // 2. Módulos liberados por cohort
  const cohortCoursesResult = cohortIds.length > 0
    ? await supabaseAdmin
        .from('cohort_courses')
        .select('cohort_id, course_id, included_module_ids')
        .in('cohort_id', cohortIds)
    : { data: [] as { cohort_id: string; course_id: string; included_module_ids: string[] | null }[] }

  const cohortCourses = cohortCoursesResult.data ?? []

  const moduleIdsByCohort: Record<string, string[]> = {}
  for (const cc of cohortCourses) {
    const existing = moduleIdsByCohort[cc.cohort_id] ?? []
    moduleIdsByCohort[cc.cohort_id] = cc.included_module_ids
      ? [...existing, ...cc.included_module_ids]
      : existing
  }

  // 3. Lessons de todos os módulos liberados
  const allModuleIds = [...new Set(Object.values(moduleIdsByCohort).flat())]
  const { data: lessonRows } = allModuleIds.length > 0
    ? await supabaseAdmin
        .from('lessons')
        .select('id, module_id, slug, title, modules!inner(course_id, courses!inner(slug))')
        .in('module_id', allModuleIds)
        .is('deleted_at', null)
    : { data: [] }

  const lessons = lessonRows ?? []
  const allLessonIds = lessons.map((l) => l.id)

  // 4. Progresso do aluno em todas as lessons
  const { data: progressRows } = allLessonIds.length > 0
    ? await supabaseAdmin
        .from('lesson_progress')
        .select('lesson_id, completed, seconds_watched, updated_at')
        .eq('user_id', profile.id)
        .in('lesson_id', allLessonIds)
    : { data: [] }

  const progressByLesson = new Map(
    (progressRows ?? []).map((p) => [p.lesson_id, p])
  )

  const lessonsByModule = new Map<string, typeof lessons>()
  for (const l of lessons) {
    const arr = lessonsByModule.get(l.module_id) ?? []
    arr.push(l)
    lessonsByModule.set(l.module_id, arr)
  }

  // 5. Dados consolidados por cohort
  type CohortView = {
    id: string
    name: string
    slug: string
    expires_at: string | null
    progressPercent: number
  }

  const cohorts: CohortView[] = members.map((m) => {
    const cohort = Array.isArray(m.cohorts) ? m.cohorts[0] : m.cohorts
    const moduleIds = moduleIdsByCohort[m.cohort_id] ?? []
    const cohortLessonIds = moduleIds.flatMap((mid) =>
      (lessonsByModule.get(mid) ?? []).map((l) => l.id)
    )
    const total = cohortLessonIds.length
    const completed = cohortLessonIds.filter((id) => progressByLesson.get(id)?.completed).length
    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0

    return {
      id: m.cohort_id,
      name: cohort?.name ?? '',
      slug: cohort?.slug ?? '',
      expires_at: m.expires_at,
      progressPercent,
    }
  })

  // 6. "Continue de onde parou" — última lesson com progresso > 0 e não completada
  type LastLesson = { lessonSlug: string; lessonTitle: string; courseSlug: string; cohortName: string }
  let lastLesson: LastLesson | null = null

  const lessonsWithProgress = lessons
    .map((l) => ({ lesson: l, progress: progressByLesson.get(l.id) }))
    .filter(({ progress }) => progress && !progress.completed && (progress.seconds_watched ?? 0) > 0)
    .sort((a, b) => {
      const tA = a.progress?.updated_at ? new Date(a.progress.updated_at).getTime() : 0
      const tB = b.progress?.updated_at ? new Date(b.progress.updated_at).getTime() : 0
      return tB - tA
    })

  const firstWithProgress = lessonsWithProgress[0]
  if (firstWithProgress !== undefined) {
    const { lesson } = firstWithProgress
    const moduleRow = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
    const courseRow = moduleRow && (Array.isArray(moduleRow.courses) ? moduleRow.courses[0] : moduleRow.courses)
    const ccForLesson = cohortCourses.find(
      (cc) => moduleIdsByCohort[cc.cohort_id]?.includes(lesson.module_id)
    )
    const memberForLesson = members.find((m) => m.cohort_id === ccForLesson?.cohort_id)
    const cohortObj = memberForLesson && (Array.isArray(memberForLesson.cohorts) ? memberForLesson.cohorts[0] : memberForLesson.cohorts)

    lastLesson = {
      lessonSlug: lesson.slug,
      lessonTitle: lesson.title,
      courseSlug: courseRow?.slug ?? '',
      cohortName: cohortObj?.name ?? '',
    }
  }

  // 7. Próxima live session
  type NextLive = { title: string; scheduledAt: string; cohortName: string }
  let nextLive: NextLive | null = null

  if (cohortIds.length > 0) {
    const { data: sessionRows } = await supabaseAdmin
      .from('live_sessions')
      .select('title, scheduled_at, cohort_id')
      .in('cohort_id', cohortIds)
      .gt('scheduled_at', new Date().toISOString())
      .order('scheduled_at', { ascending: true })
      .limit(1)

    const firstSession = sessionRows?.[0]
    if (firstSession !== undefined) {
      const m = members.find((mem) => mem.cohort_id === firstSession.cohort_id)
      const cohortObj = m && (Array.isArray(m.cohorts) ? m.cohorts[0] : m.cohorts)
      nextLive = { title: firstSession.title, scheduledAt: firstSession.scheduled_at, cohortName: cohortObj?.name ?? '' }
    }
  }

  // 8. Cohorts expirando em <= 30 dias
  const expiringCohorts = cohorts.filter((c) => {
    if (!c.expires_at) return false
    const days = Math.ceil((new Date(c.expires_at).getTime() - Date.now()) / 86400000)
    return days <= 30
  })

  const displayName = profile.name || 'Aluno'

  return (
    <div
      className="mx-auto max-w-5xl space-y-10"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Saudação */}
      <div>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
        >
          Bem-vindo de volta
        </p>
        <h1
          className="mt-1 italic"
          style={{
            fontFamily: 'var(--type-display)',
            fontSize: '36px',
            color: 'var(--bone)',
            fontWeight: 'normal',
          }}
        >
          {displayName}
        </h1>
      </div>

      {/* Avisos de expiração */}
      {expiringCohorts.length > 0 && (
        <div className="space-y-2">
          {expiringCohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="flex flex-col gap-3 border-l-2 border-l-[var(--ember)] bg-[var(--ember)]/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: 'var(--ember)' }} />
                <ExpirationBadge expiresAt={cohort.expires_at!} />
                <span className="text-sm" style={{ color: 'var(--bone)' }}>
                  Matrícula em{' '}
                  <span className="font-semibold" style={{ color: 'var(--bone)' }}>{cohort.name}</span>
                </span>
              </div>
              <Link
                href="/academy/perfil"
                className="font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
              >
                Renovar
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Grid principal */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Card — Continue de onde parou */}
        <div className="lg:col-span-2">
          {lastLesson ? (
            <Link
              href={`/academy/curso/${lastLesson.courseSlug}/aula/${lastLesson.lessonSlug}`}
              className="group block border border-[var(--hairline)] hover:border-[var(--hairline-strong)] p-6 transition-colors"
              style={{ background: 'var(--ink)', borderRadius: 0 }}
            >
              <p
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
              >
                Continue de onde parou
              </p>
              <h2
                className="mt-3 italic transition-colors group-hover:text-[var(--ember)]"
                style={{
                  fontFamily: 'var(--type-display)',
                  fontSize: '22px',
                  fontWeight: 'normal',
                  color: 'var(--bone)',
                }}
              >
                {lastLesson.lessonTitle}
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ fontFamily: 'var(--type-sans)', color: 'var(--bone-mute)' }}
              >
                {lastLesson.cohortName}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center"
                  style={{ background: 'var(--ember)', borderRadius: 0 }}
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                >
                  Retomar
                </span>
              </div>
            </Link>
          ) : (
            <div
              className="border p-6"
              style={{ background: 'var(--ink)', borderColor: 'var(--hairline)', borderRadius: 0 }}
            >
              <p
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
              >
                Continue de onde parou
              </p>
              <p className="mt-4 text-sm" style={{ color: 'var(--bone-mute)' }}>
                Nenhuma aula iniciada ainda.{' '}
                <Link href="/academy/meus-cursos" className="hover:underline" style={{ color: 'var(--ember)' }}>
                  Comece agora.
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Card — Próximo encontro */}
        <div
          className="border p-6"
          style={{ background: 'var(--ink)', borderColor: 'var(--hairline)', borderRadius: 0 }}
        >
          <p
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
          >
            Próximo encontro
          </p>
          {nextLive ? (
            <div className="mt-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--ember)' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--bone)' }}>
                    {nextLive.cohortName}
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                  >
                    {formatDate(nextLive.scheduledAt)}
                  </p>
                </div>
              </div>
              <Link
                href="/academy/agenda"
                className="mt-5 flex items-center gap-1.5 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
              >
                Ver agenda
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm" style={{ color: 'var(--bone-mute)' }}>
              Nenhum encontro agendado.
            </p>
          )}
        </div>
      </div>

      {/* Grid de turmas */}
      {cohorts.length > 0 ? (
        <div>
          <h2
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
          >
            Suas turmas
          </h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {cohorts.map((cohort) => (
              <Link
                key={cohort.id}
                href="/academy/meus-cursos"
                className="group block border border-[var(--hairline)] hover:border-[var(--hairline-strong)] p-5 transition-colors"
                style={{ background: 'var(--ink)', borderRadius: 0 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p
                      className="truncate font-medium transition-colors group-hover:text-[var(--ember)]"
                      style={{ color: 'var(--bone)' }}
                    >
                      {cohort.name}
                    </p>
                    {cohort.expires_at && (
                      <ExpirationBadge expiresAt={cohort.expires_at} className="mt-2" />
                    )}
                  </div>
                  <span
                    className="shrink-0 font-bold"
                    style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
                  >
                    {cohort.progressPercent}%
                  </span>
                </div>
                <div className="mt-4">
                  <ProgressBar value={cohort.progressPercent} showLabel={false} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center border py-16 text-center"
          style={{ background: 'var(--ink)', borderColor: 'var(--hairline)' }}
        >
          <p className="text-sm" style={{ color: 'var(--bone-mute)' }}>
            Nenhuma turma ativa encontrada.
          </p>
          <Link
            href="/academy/turmas"
            className="mt-4 font-mono text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
            style={{ color: 'var(--ember)' }}
          >
            Explorar turmas →
          </Link>
        </div>
      )}
    </div>
  )
}
