import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, BookOpen } from 'lucide-react'
import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Meus Cursos' }

export default async function MeusCursosPage() {
  const profile = await requireUser()
  const supabase = await createClient()

  // 1. Cohorts ativas do aluno
  const { data: memberRows } = await supabase
    .from('cohort_members')
    .select('cohort_id, cohorts (id, name, slug)')
    .eq('user_id', profile.id)
    .eq('status', 'ACTIVE')

  const members = memberRows ?? []
  const cohortIds = members.map((m) => m.cohort_id)

  // 2. cohort_courses: cursos + módulos liberados por cohort
  const { data: cohortCoursesRows } = cohortIds.length > 0
    ? await supabaseAdmin
        .from('cohort_courses')
        .select('cohort_id, course_id, included_module_ids')
        .in('cohort_id', cohortIds)
    : { data: [] }

  const cohortCourses = cohortCoursesRows ?? []

  if (cohortCourses.length === 0) {
    return <EmptyState />
  }

  // 3. Fetch courses
  const courseIds = [...new Set(cohortCourses.map((cc) => cc.course_id))]
  const { data: courseRows } = await supabaseAdmin
    .from('courses')
    .select('id, slug, title, description, cover_image_url')
    .in('id', courseIds)
    .is('deleted_at', null)

  const coursesById = new Map((courseRows ?? []).map((c) => [c.id, c]))

  // 4. Todos os módulos dos cursos (para contagem total)
  const { data: allModuleRows } = courseIds.length > 0
    ? await supabaseAdmin
        .from('modules')
        .select('id, course_id')
        .in('course_id', courseIds)
        .is('deleted_at', null)
    : { data: [] }

  const allModuleIdsByCourse = new Map<string, string[]>()
  for (const m of allModuleRows ?? []) {
    const arr = allModuleIdsByCourse.get(m.course_id) ?? []
    arr.push(m.id)
    allModuleIdsByCourse.set(m.course_id, arr)
  }

  // 5. Lessons dos módulos liberados
  // included_module_ids=[] significa acesso total → expandir para todos os módulos do curso
  const accessibleModuleIds = [...new Set(cohortCourses.flatMap((cc) => {
    const isFullAccess = cc.included_module_ids === null || cc.included_module_ids.length === 0
    return isFullAccess ? (allModuleIdsByCourse.get(cc.course_id) ?? []) : (cc.included_module_ids ?? [])
  }))]
  const { data: lessonRows } = accessibleModuleIds.length > 0
    ? await supabaseAdmin
        .from('lessons')
        .select('id, module_id')
        .in('module_id', accessibleModuleIds)
        .is('deleted_at', null)
    : { data: [] }

  const lessonsByModule = new Map<string, string[]>()
  for (const l of lessonRows ?? []) {
    const arr = lessonsByModule.get(l.module_id) ?? []
    arr.push(l.id)
    lessonsByModule.set(l.module_id, arr)
  }

  // 6. Progresso do aluno
  const allLessonIds = (lessonRows ?? []).map((l) => l.id)
  const { data: progressRows } = allLessonIds.length > 0
    ? await supabaseAdmin
        .from('lesson_progress')
        .select('lesson_id')
        .eq('user_id', profile.id)
        .in('lesson_id', allLessonIds)
        .eq('completed', true)
    : { data: [] }

  const completedIds = new Set((progressRows ?? []).map((p) => p.lesson_id))

  // 7. Constrói lista de cursos — um card por (cohort × course)
  // Duas turmas com o mesmo curso geram dois cards separados (com o nome da turma no footer)
  type CourseView = {
    key: string
    id: string
    slug: string
    title: string
    description: string | null
    cover_image_url: string | null
    cohortName: string
    cohortSlug: string
    progressPercent: number
    totalLessons: number
    completedLessons: number
    isPartialAccess: boolean
    accessibleModulesCount: number
    totalModulesCount: number
  }

  const available: CourseView[] = []
  const locked: CourseView[] = []

  for (const cc of cohortCourses) {
    const course = coursesById.get(cc.course_id)
    if (!course) continue

    const member = members.find((m) => m.cohort_id === cc.cohort_id)
    const cohortObj = member && (Array.isArray(member.cohorts) ? member.cohorts[0] : member.cohorts)

    const totalModIds = allModuleIdsByCourse.get(cc.course_id) ?? []
    const isFullAccess = cc.included_module_ids === null || cc.included_module_ids.length === 0
    const accessibleModIds = isFullAccess ? totalModIds : (cc.included_module_ids ?? [])
    const accessibleModulesCount = accessibleModIds.length
    const totalModulesCount = totalModIds.length

    const lessonIds = accessibleModIds.flatMap((mid) => lessonsByModule.get(mid) ?? [])
    const totalLessons = lessonIds.length
    const completedLessons = lessonIds.filter((id) => completedIds.has(id)).length
    const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0

    const isPartialAccess = accessibleModulesCount < totalModulesCount

    const view: CourseView = {
      key: `${cc.cohort_id}-${cc.course_id}`,
      id: course.id,
      slug: course.slug,
      title: course.title,
      description: course.description,
      cover_image_url: course.cover_image_url,
      cohortName: cohortObj?.name ?? '',
      cohortSlug: cohortObj?.slug ?? '',
      progressPercent,
      totalLessons,
      completedLessons,
      isPartialAccess,
      accessibleModulesCount,
      totalModulesCount,
    }

    if (totalLessons > 0) {
      available.push(view)
    } else {
      locked.push(view)
    }
  }

  if (available.length === 0 && locked.length === 0) {
    return <EmptyState />
  }

  return (
    <div
      className="mx-auto max-w-5xl space-y-12"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      {/* Page header */}
      <div>
        <p
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--bone-mute)',
            marginBottom: 12,
          }}
        >
          Academy · Área do aluno
        </p>
        <h1
          style={{
            fontFamily: 'var(--type-display)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--bone)',
          }}
        >
          Meus Cursos
        </h1>
        {available.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--type-sans)',
              fontSize: 14,
              color: 'var(--bone-mute)',
              marginTop: 8,
            }}
          >
            {available.length} {available.length === 1 ? 'curso disponível' : 'cursos disponíveis'}
          </p>
        )}
      </div>

      {/* Grid de cursos acessíveis */}
      {available.length > 0 && (
        <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-3" style={{ background: 'var(--hairline)' }}>
          {available.map((course) => {
            const isComplete = course.progressPercent === 100
            const status = isComplete ? 'CONCLUÍDO' : course.isPartialAccess ? 'PARCIAL' : 'ATIVO'

            return (
              <Link
                key={course.key}
                href={`/academy/curso/${course.slug}`}
                className="group flex flex-col border border-[var(--hairline)] hover:border-[var(--hairline-strong)] transition-colors"
                style={{ background: 'var(--ink)', overflow: 'hidden', textDecoration: 'none' }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: course.cover_image_url ? 'transparent' : 'var(--ink-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: course.cover_image_url ? `url(${course.cover_image_url})` : undefined,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  {!course.cover_image_url && (
                    <BookOpen
                      className="opacity-30"
                      style={{ width: 32, height: 32, color: 'var(--bone-mute)' }}
                    />
                  )}
                </div>

                {/* Body */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--type-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      border: isComplete
                        ? '1px solid var(--hairline)'
                        : '1px solid var(--hairline-strong)',
                      color: isComplete ? 'var(--bone-mute)' : 'var(--ember)',
                      padding: '2px 8px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {status}
                  </span>

                  <p
                    style={{
                      fontFamily: 'var(--type-sans)',
                      fontWeight: 500,
                      fontSize: 16,
                      color: 'var(--bone)',
                      marginTop: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {course.title}
                  </p>

                  {course.description && (
                    <p
                      style={{
                        fontFamily: 'var(--type-sans)',
                        fontSize: 13,
                        color: 'var(--bone-dim)',
                        marginTop: 4,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </p>
                  )}

                  {course.isPartialAccess && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 10 }}>
                      <Lock style={{ width: 12, height: 12, color: 'var(--bone-mute)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 10,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--bone-mute)',
                        }}
                      >
                        {course.accessibleModulesCount}/{course.totalModulesCount} módulos
                      </span>
                    </div>
                  )}

                  <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                    <div style={{ height: 2, background: 'var(--ink-3)', position: 'relative', overflow: 'hidden' }}>
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${course.progressPercent}%`,
                          background: 'var(--ember)',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 4 }}>
                      <span
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 10,
                          fontWeight: 700,
                          color: 'var(--ember)',
                        }}
                      >
                        {course.progressPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div
                  style={{
                    borderTop: '1px solid var(--hairline)',
                    padding: '12px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--type-mono)', fontSize: 11, color: 'var(--bone-mute)' }}>
                    {course.completedLessons}/{course.totalLessons} aulas
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ember)',
                      transition: 'color 0.15s',
                    }}
                    className="group-hover:text-[var(--ember-glow)]"
                  >
                    Acessar →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Cursos bloqueados */}
      {locked.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: 'var(--type-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bone-mute)',
              marginBottom: 16,
            }}
          >
            Conteúdo bloqueado
          </p>
          <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-3" style={{ background: 'var(--hairline)' }}>
            {locked.map((course) => (
              <div
                key={course.key}
                style={{
                  background: 'var(--ink)',
                  border: '1px solid var(--hairline)',
                  overflow: 'hidden',
                  opacity: 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: 'var(--ink-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Lock className="opacity-30" style={{ width: 32, height: 32, color: 'var(--bone-mute)' }} />
                </div>
                <div style={{ padding: '20px', flex: 1 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--type-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      border: '1px solid var(--hairline)',
                      color: 'var(--bone-mute)',
                      padding: '2px 8px',
                    }}
                  >
                    Bloqueado
                  </span>
                  <p style={{ fontFamily: 'var(--type-sans)', fontWeight: 500, fontSize: 16, color: 'var(--bone)', marginTop: 8 }}>
                    {course.title}
                  </p>
                  {course.description && (
                    <p
                      style={{
                        fontFamily: 'var(--type-sans)',
                        fontSize: 13,
                        color: 'var(--bone-dim)',
                        marginTop: 4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </p>
                  )}
                </div>
                <div
                  style={{
                    borderTop: '1px solid var(--hairline)',
                    padding: '12px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span style={{ fontFamily: 'var(--type-mono)', fontSize: 11, color: 'var(--bone-mute)' }}>
                    {course.cohortName}
                  </span>
                  <Link
                    href={`/academy/turmas/${course.cohortSlug}`}
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ember)',
                      textDecoration: 'none',
                    }}
                  >
                    Ver turma →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        textAlign: 'center',
        border: '1px solid var(--hairline)',
        background: 'var(--ink)',
      }}
    >
      <BookOpen
        className="opacity-30"
        style={{ width: 48, height: 48, color: 'var(--bone-mute)', marginBottom: 20 }}
      />
      <p style={{ fontFamily: 'var(--type-sans)', fontSize: 16, color: 'var(--bone-mute)', marginBottom: 20 }}>
        Nenhum curso encontrado
      </p>
      <Link
        href="/academy/turmas"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--type-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ember)',
          textDecoration: 'none',
        }}
      >
        Explorar turmas →
      </Link>
    </div>
  )
}
