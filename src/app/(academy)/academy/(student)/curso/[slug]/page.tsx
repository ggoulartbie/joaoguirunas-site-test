export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Lock,
  CheckCircle2,
  ChevronDown,
  Play,
  FileText,
  HelpCircle,
  Link2,
  Download,
} from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { RobotMascotCourse } from './RobotMascotCourse'

type Props = {
  params: Promise<{ slug: string }>
}

// ─── Types ───────────────────────────────────────────────────────────────────

type LessonRow = {
  id: string
  title: string
  slug: string
  kind: string
  sort_order: number
  deleted_at: string | null
  is_available: boolean
}

type ModuleRow = {
  id: string
  title: string
  slug: string
  sort_order: number
  deleted_at: string | null
  lessons: LessonRow[]
}

type CourseRow = {
  id: string
  title: string
  description: string | null
  cover_image_url: string | null
  slug: string
  modules: ModuleRow[]
}

type ModuleMaterialItem = {
  id: string
  module_id: string
  title: string
  kind: string
  storage_path: string | null
  external_url: string | null
  size_bytes: number | null
  signedUrl: string | null
}

// ─── Metadata ────────────────────────────────────────────────────────────────

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data: course } = await supabaseAdmin
    .from('courses')
    .select('title')
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()
  return { title: course?.title ?? 'Curso' }
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default async function CursoPage({ params }: Props) {
  const { slug } = await params
  const user = await requireUser()

  // 1. Fetch course with modules and lessons
  const { data: rawCourse } = await supabaseAdmin
    .from('courses')
    .select(`
      id, title, description, cover_image_url, slug,
      modules (
        id, title, slug, sort_order, deleted_at,
        lessons (
          id, title, slug, kind, sort_order, deleted_at, is_available
        )
      )
    `)
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()

  if (!rawCourse) notFound()

  // 2. Normalise: filter soft-deleted modules & lessons, sort both
  const course: CourseRow = {
    id: rawCourse.id,
    title: rawCourse.title,
    description: rawCourse.description,
    cover_image_url: rawCourse.cover_image_url,
    slug: rawCourse.slug,
    modules: ((rawCourse.modules as ModuleRow[]) ?? [])
      .filter((m) => !m.deleted_at)
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({
        ...m,
        lessons: (m.lessons ?? [])
          .filter((l) => !l.deleted_at)
          .sort((a, b) => a.sort_order - b.sort_order),
      })),
  }

  // 3. Collect lesson IDs — all for progress query; available-only for counts/navigation
  const allLessonIds = course.modules.flatMap((m) => m.lessons.map((l) => l.id))
  const availableLessonIds = course.modules.flatMap((m) =>
    m.lessons.filter((l) => l.is_available !== false).map((l) => l.id)
  )

  // 4. Fetch user's progress for all lessons in this course
  const { data: progressRows } = allLessonIds.length > 0
    ? await supabaseAdmin
        .from('lesson_progress')
        .select('lesson_id, completed')
        .eq('user_id', user.id)
        .in('lesson_id', allLessonIds)
    : { data: [] }

  const completedSet = new Set(
    (progressRows ?? []).filter((r) => r.completed).map((r) => r.lesson_id)
  )

  // 5. Fetch user's cohort memberships to determine which modules are accessible
  const { data: memberRows } = await supabaseAdmin
    .from('cohort_members')
    .select('cohort_id')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')

  const userCohortIds = (memberRows ?? []).map((r) => r.cohort_id)

  // 6. Fetch cohort_courses for this course + user's cohorts → get included_module_ids
  const { data: cohortCourseRows } = userCohortIds.length > 0
    ? await supabaseAdmin
        .from('cohort_courses')
        .select('cohort_id, included_module_ids')
        .eq('course_id', course.id)
        .in('cohort_id', userCohortIds)
    : { data: [] }

  // Union of all module IDs the user has access to across their cohorts.
  // included_module_ids=[] means full access → expand to all course modules.
  const allCourseModuleIds = course.modules.map((m) => m.id)
  const accessibleModuleIds = new Set(
    (cohortCourseRows ?? []).flatMap((r) => {
      const isFullAccess = r.included_module_ids === null || r.included_module_ids.length === 0
      return isFullAccess ? allCourseModuleIds : (r.included_module_ids ?? [])
    })
  )

  // AC5: hasGlobalAccess when the student has an active cohort but no cohort_courses row
  // exists for this course (legacy / unscoped access). Students with included_module_ids=[]
  // are handled above via full expansion, not via hasGlobalAccess.
  const hasGlobalAccess = userCohortIds.length > 0 && (cohortCourseRows ?? []).length === 0

  // 7. Fetch module_materials for accessible modules — single query, anti-N+1
  const accessibleModuleIdsList = hasGlobalAccess ? allCourseModuleIds : [...accessibleModuleIds]
  const { data: rawModuleMaterials } = accessibleModuleIdsList.length > 0
    ? await supabaseAdmin
        .from('module_materials')
        .select('id, module_id, title, kind, storage_path, external_url, size_bytes')
        .in('module_id', accessibleModuleIdsList)
        .order('sort_order', { ascending: true })
    : { data: [] }

  // Generate signed URLs for file materials (TTL 5 min, bucket is private)
  const moduleMaterialsWithUrls: ModuleMaterialItem[] = await Promise.all(
    (rawModuleMaterials ?? []).map(async (mat) => {
      if (mat.kind === 'LINK' || !mat.storage_path) {
        return { ...mat, signedUrl: null }
      }
      const { data: signed } = await supabaseAdmin.storage
        .from('materials')
        .createSignedUrl(mat.storage_path, 300)
      return { ...mat, signedUrl: signed?.signedUrl ?? null }
    })
  )

  // Group by module_id for O(1) lookup at render time
  const materialsByModule = moduleMaterialsWithUrls.reduce<Record<string, ModuleMaterialItem[]>>(
    (acc, mat) => {
      if (!acc[mat.module_id]) acc[mat.module_id] = []
      acc[mat.module_id]!.push(mat)
      return acc
    },
    {}
  )

  // 8. Compute progress stats — exclude Em breve (is_available=false) from counts
  const totalLessons = availableLessonIds.length
  const completedLessons = availableLessonIds.filter((id) => completedSet.has(id)).length
  const progressPercent = totalLessons > 0
    ? Math.round((completedLessons / totalLessons) * 100)
    : 0

  // 9. Determine "retomar" link — skip unavailable lessons
  const firstIncomplete = course.modules
    .filter((m) => hasGlobalAccess || accessibleModuleIds.has(m.id))
    .flatMap((m) => m.lessons)
    .find((l) => l.is_available !== false && !completedSet.has(l.id))
  const firstLesson = course.modules
    .filter((m) => hasGlobalAccess || accessibleModuleIds.has(m.id))
    .flatMap((m) => m.lessons.filter((l) => l.is_available !== false))[0]
  const resumeLesson = firstIncomplete ?? firstLesson

  return (
    <div className="mx-auto max-w-4xl">
      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <div
        className="relative border-b overflow-hidden"
        style={{
          background: 'var(--ink)',
          borderColor: 'var(--hairline)',
        }}
      >
        {/* Cover image as dimmed background */}
        {course.cover_image_url && (
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden="true"
            style={{
              backgroundImage: `url(${course.cover_image_url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: 0.08,
            }}
          />
        )}

        <div className="relative p-6 pr-36 lg:p-8 lg:pr-40">
          <RobotMascotCourse />
          {/* Breadcrumb */}
          <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--bone-mute)' }}>
            <Link
              href="/academy/meus-cursos"
              className="transition-colors hover:text-[var(--bone)]"
              style={{ color: 'var(--bone-mute)' }}
            >
              Meus Cursos
            </Link>
            {' / '}
            <span style={{ color: 'var(--bone-dim)' }}>{course.title}</span>
          </p>

          {/* Title */}
          <h1
            className="mt-3 font-[var(--type-display)] italic"
            style={{
              fontSize: 'clamp(2rem, 5vw, 2.625rem)',
              lineHeight: 1.1,
              color: 'var(--bone)',
            }}
          >
            {course.title}
          </h1>

          {course.description && (
            <p className="mt-3 text-base" style={{ color: 'var(--bone-dim)' }}>
              {course.description}
            </p>
          )}

          {/* Progress bar */}
          <div className="mt-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
                {completedLessons}/{totalLessons} aulas concluídas · {course.modules.length} módulos
              </span>
              <span className="font-mono text-sm font-bold" style={{ color: 'var(--ember)' }}>
                {progressPercent}%
              </span>
            </div>
            <div
              className="h-px w-full"
              style={{ background: 'var(--hairline-strong)' }}
              role="progressbar"
              aria-valuenow={progressPercent}
              aria-valuemin={0}
              aria-valuemax={100}
            >
              <div
                className="h-px transition-all"
                style={{
                  width: `${progressPercent}%`,
                  background: 'var(--ember)',
                }}
              />
            </div>
          </div>

          {/* Retomar CTA */}
          {resumeLesson && (
            <div className="mt-5">
              <Link
                href={`/academy/curso/${slug}/aula/${resumeLesson.slug}`}
                className="inline-flex items-center gap-2 border px-4 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:border-[var(--ember)] hover:text-[var(--ember)]"
                style={{
                  borderColor: 'var(--hairline-strong)',
                  color: 'var(--bone-dim)',
                }}
              >
                <Play className="h-3 w-3" aria-hidden="true" />
                {progressPercent === 0 ? 'Começar' : 'Retomar'}
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* ── Module list ─────────────────────────────────────────────────── */}
      <div className="mt-6 space-y-2">
        {course.modules.map((module, index) => {
          const isAccessible = hasGlobalAccess || accessibleModuleIds.has(module.id)
          // Exclude Em breve from module counts so isComplete and % are accurate
          const availableModuleLessons = module.lessons.filter((l) => l.is_available !== false)
          const moduleLessonIds = availableModuleLessons.map((l) => l.id)
          const moduleCompleted = moduleLessonIds.filter((id) => completedSet.has(id)).length
          const moduleTotal = moduleLessonIds.length
          const moduleProgress = moduleTotal > 0
            ? Math.round((moduleCompleted / moduleTotal) * 100)
            : 0
          const isComplete = isAccessible && moduleTotal > 0 && moduleCompleted === moduleTotal

          if (!isAccessible) {
            return (
              <LockedModuleCard
                key={module.id}
                module={module}
                index={index}
              />
            )
          }

          return (
            <ModuleAccordion
              key={module.id}
              module={module}
              index={index}
              courseSlug={slug}
              moduleCompleted={moduleCompleted}
              moduleTotal={moduleTotal}
              moduleProgress={moduleProgress}
              isComplete={isComplete}
              completedSet={completedSet}
              materials={materialsByModule[module.id] ?? []}
            />
          )
        })}
      </div>
    </div>
  )
}

// ─── Lesson kind icon ────────────────────────────────────────────────────────

function LessonKindIcon({ kind }: { kind: string }) {
  if (kind === 'VIDEO') return <Play className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
  if (kind === 'QUIZ') return <HelpCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
  return <FileText className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
}

// ─── Module accordion (unlocked) ─────────────────────────────────────────────

function ModuleAccordion({
  module,
  index,
  courseSlug,
  moduleCompleted,
  moduleTotal,
  moduleProgress,
  isComplete,
  completedSet,
  materials,
}: {
  module: ModuleRow
  index: number
  courseSlug: string
  moduleCompleted: number
  moduleTotal: number
  moduleProgress: number
  isComplete: boolean
  completedSet: Set<string>
  materials: ModuleMaterialItem[]
}) {
  return (
    <details
      className="group"
      style={{
        background: 'var(--ink)',
        border: '1px solid var(--hairline)',
      }}
      open
    >
      <summary
        className="flex cursor-pointer list-none items-center justify-between p-4"
        style={{ borderBottom: '1px solid var(--hairline)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="font-mono text-[11px] shrink-0" style={{ color: 'var(--bone-mute)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] font-medium truncate" style={{ color: 'var(--bone)' }}>
            {module.title}
          </span>
          {isComplete && (
            <CheckCircle2
              className="h-3.5 w-3.5 shrink-0"
              style={{ color: 'var(--ember)' }}
              aria-label="Módulo concluído"
            />
          )}
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-3">
          <span
            className="font-mono text-[11px]"
            style={{ color: 'var(--bone-mute)' }}
          >
            {moduleTotal} {moduleTotal === 1 ? 'aula' : 'aulas'}
          </span>
          {moduleProgress > 0 && moduleProgress < 100 && (
            <span className="font-mono text-[11px]" style={{ color: 'var(--ember)' }}>
              {moduleProgress}%
            </span>
          )}
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            style={{ color: 'var(--bone-mute)' }}
            aria-hidden="true"
          />
        </div>
      </summary>

      {/* Module materials — only renders if non-empty, shown before lessons */}
      {materials.length > 0 && (
        <div
          className="px-4 py-3 space-y-1.5"
          style={{
            borderBottom: '1px solid var(--hairline)',
            borderLeft: '2px solid rgba(255,58,14,0.35)',
          }}
        >
          <p className="font-mono text-[10px] uppercase tracking-widest mb-2" style={{ color: 'var(--bone-dim)' }}>
            Materiais do módulo
          </p>
          {materials.map((mat) => {
            const href = mat.kind === 'LINK' ? mat.external_url : mat.signedUrl
            const inner = (
              <>
                {mat.kind === 'LINK' ? (
                  <Link2 className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--bone-dim)' }} />
                ) : (
                  <Download className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--bone-dim)' }} />
                )}
                <span className="text-[13px] leading-snug" style={{ color: 'var(--bone)' }}>
                  {mat.title}
                </span>
              </>
            )
            if (!href) return (
              <span key={mat.id} className="flex items-center gap-2.5 py-1.5 opacity-40 cursor-default">
                {inner}
              </span>
            )
            return (
              <a
                key={mat.id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 py-1.5 transition-opacity hover:opacity-70"
                style={{ textDecoration: 'none' }}
              >
                {inner}
              </a>
            )
          })}
        </div>
      )}

      {/* Lesson list */}
      <ul>
        {module.lessons.map((lesson, lessonIndex) => {
          const isCompleted = completedSet.has(lesson.id)
          const isUnavailable = lesson.is_available === false
          const lessonHref = `/academy/curso/${courseSlug}/aula/${lesson.slug}`

          const lessonInner = (
            <>
              {/* Lesson number */}
              <span
                className="font-mono text-[11px] shrink-0 w-6 text-right"
                style={{ color: 'var(--bone-mute)' }}
              >
                {String(lessonIndex + 1).padStart(2, '0')}
              </span>

              {/* Kind icon */}
              <span style={{ color: 'var(--bone-mute)' }}>
                <LessonKindIcon kind={lesson.kind} />
              </span>

              {/* Title + Em breve badge */}
              <span className="flex flex-1 min-w-0 items-center gap-1.5 text-[13px] leading-snug">
                <span className="truncate">{lesson.title}</span>
                {isUnavailable && (
                  <span className="shrink-0 rounded-full bg-[var(--ink-3)] px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[var(--bone-mute)]">
                    Em breve
                  </span>
                )}
              </span>

              {/* Completion check */}
              {isCompleted && !isUnavailable && (
                <CheckCircle2
                  className="h-3.5 w-3.5 shrink-0"
                  style={{ color: 'var(--ember)' }}
                  aria-label="Aula concluída"
                />
              )}
            </>
          )

          return (
            <li key={lesson.id}>
              {isUnavailable ? (
                <div
                  className="flex cursor-default items-center gap-3 px-4 py-3 opacity-60"
                  style={{
                    borderBottom: '1px solid var(--hairline)',
                    color: 'var(--bone-dim)',
                  }}
                  aria-disabled="true"
                >
                  {lessonInner}
                </div>
              ) : (
                <Link
                  href={lessonHref}
                  className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-[rgba(255,255,255,0.03)]"
                  style={{
                    borderBottom: '1px solid var(--hairline)',
                    color: 'var(--bone-dim)',
                    textDecoration: 'none',
                  }}
                >
                  {lessonInner}
                </Link>
              )}
            </li>
          )
        })}

        {/* Module progress footer */}
        {moduleTotal > 0 && (
          <li
            className="px-4 py-2.5 font-mono text-[11px]"
            style={{ color: 'var(--bone-mute)' }}
          >
            {moduleCompleted}/{moduleTotal} aulas concluídas
          </li>
        )}
      </ul>
    </details>
  )
}

// ─── Locked module card ───────────────────────────────────────────────────────

function LockedModuleCard({
  module,
  index,
}: {
  module: ModuleRow
  index: number
}) {
  return (
    <div
      className="flex items-start gap-4 p-4 opacity-50"
      style={{
        background: 'var(--ink)',
        border: '1px solid var(--hairline)',
      }}
    >
      <span className="mt-0.5 shrink-0 font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--bone-mute)' }} aria-hidden="true" />
          <span className="text-[15px] font-medium" style={{ color: 'var(--bone-mute)' }}>
            {module.title}
          </span>
        </div>
        <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
          {module.lessons.length} {module.lessons.length === 1 ? 'aula' : 'aulas'} · acesso não incluído na sua turma
        </p>
      </div>
    </div>
  )
}
