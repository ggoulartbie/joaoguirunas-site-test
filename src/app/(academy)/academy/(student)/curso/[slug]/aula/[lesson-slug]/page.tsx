import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight, Play } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { renderContent } from '@/lib/content'
import { VideoPlayer } from '@/components/student/VideoPlayer'
import { LockedContent } from '@/components/student/LockedContent'
import { MarkCompleteButton } from '@/components/student/MarkCompleteButton'
import { LessonTabs } from './LessonTabs'
import { CourseSidebar, MobileLessonDrawer } from './CourseSidebar'
import type { CommentWithAuthor } from '@/types/student'
import type { UserRole } from '@/types/student'

type Props = {
  params: Promise<{ slug: string; 'lesson-slug': string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, 'lesson-slug': lessonSlug } = await params
  const supabase = await createClient()

  const { data: lesson } = await supabase
    .from('lessons')
    .select('title, modules!inner(courses!inner(slug))')
    .eq('slug', lessonSlug)
    .eq('modules.courses.slug', slug)
    .single()

  return { title: lesson?.title ?? lessonSlug, robots: { index: false, follow: false } }
}

export default async function AulaPage({ params }: Props) {
  const { slug, 'lesson-slug': lessonSlug } = await params

  const user = await requireUser()
  const supabase = await createClient()

  // Fetch lesson with module + course context
  const { data: lesson } = await supabase
    .from('lessons')
    .select(`
      id,
      title,
      description,
      content,
      content_format,
      video_id,
      video_provider,
      kind,
      sort_order,
      module_id,
      modules!inner (
        id,
        title,
        sort_order,
        course_id,
        courses!inner (
          id,
          slug,
          title,
          cohort_courses (
            cohorts (
              id,
              name,
              slug,
              description
            )
          )
        )
      )
    `)
    .eq('slug', lessonSlug)
    .eq('modules.courses.slug', slug)
    .is('deleted_at', null)
    .single()

  if (!lesson) notFound()

  // Security-critical: check access server-side before touching video_id
  const { data: access } = await supabase.rpc('has_access', {
    p_user_id: user.id,
    p_lesson_id: lesson.id,
  })

  const hasAccess = access === true

  // --- Resolve accessible module IDs for this user ---
  const module = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
  const course = module && (Array.isArray(module.courses) ? module.courses[0] : module.courses)
  const courseId = module?.course_id ?? ''

  const { data: memberRows } = await supabase
    .from('cohort_members')
    .select('cohort_id')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')

  const cohortIds = (memberRows ?? []).map((m) => m.cohort_id)

  const { data: cohortCoursesRows } = cohortIds.length > 0
    ? await supabaseAdmin
        .from('cohort_courses')
        .select('included_module_ids')
        .in('cohort_id', cohortIds)
        .eq('course_id', courseId)
    : { data: [] }

  const accessibleModuleIds = new Set(
    (cohortCoursesRows ?? []).flatMap((cc) => cc.included_module_ids ?? [])
  )

  // --- Cross-module navigation: fetch ALL lessons in course, filter to accessible modules ---
  const { data: allModulesRaw } = await supabaseAdmin
    .from('modules')
    .select(`
      id, title, sort_order,
      lessons!inner (id, slug, title, sort_order, deleted_at)
    `)
    .eq('course_id', courseId)
    .is('lessons.deleted_at', null)
    .order('sort_order', { ascending: true })
    .order('sort_order', { foreignTable: 'lessons', ascending: true })

  // Flatten lessons — only from accessible modules (gate for navigation)
  const allLessons = (allModulesRaw ?? []).flatMap((m) => {
    if (accessibleModuleIds.size > 0 && !accessibleModuleIds.has(m.id)) return []
    const lessons = Array.isArray(m.lessons) ? m.lessons : [m.lessons]
    return lessons.map((l) => ({
      ...l,
      moduleTitle: m.title,
      moduleId: m.id,
    }))
  })

  const globalIndex = allLessons.findIndex((l) => l.id === lesson.id)
  const globalPrevRaw = globalIndex > 0 ? allLessons[globalIndex - 1] : null
  const globalNextRaw =
    globalIndex < allLessons.length - 1 ? allLessons[globalIndex + 1] : null

  // Normalize to NavLesson (strip deleted_at and other extra fields)
  const globalPrev: NavLesson | null = globalPrevRaw
    ? {
        id: globalPrevRaw.id,
        slug: globalPrevRaw.slug,
        title: globalPrevRaw.title,
        moduleTitle: globalPrevRaw.moduleTitle,
        moduleId: globalPrevRaw.moduleId,
      }
    : null
  const globalNext: NavLesson | null = globalNextRaw
    ? {
        id: globalNextRaw.id,
        slug: globalNextRaw.slug,
        title: globalNextRaw.title,
        moduleTitle: globalNextRaw.moduleTitle,
        moduleId: globalNextRaw.moduleId,
      }
    : null

  // --- Build sidebar module data ---
  // Fetch progress for all lessons to mark completed
  const { data: progressRows } = hasAccess
    ? await supabaseAdmin
        .from('lesson_progress')
        .select('lesson_id, completed')
        .eq('user_id', user.id)
        .eq('completed', true)
    : { data: [] }

  const completedIds = new Set((progressRows ?? []).map((p) => p.lesson_id))

  const sidebarModules = (allModulesRaw ?? []).map((m) => {
    const lessons = (Array.isArray(m.lessons) ? m.lessons : [m.lessons]).map(
      (l) => ({
        id: l.id,
        slug: l.slug,
        title: l.title,
        sort_order: l.sort_order,
        completed: completedIds.has(l.id),
      })
    )
    return {
      id: m.id,
      title: m.title,
      sort_order: m.sort_order,
      completedCount: lessons.filter((l) => l.completed).length,
      totalCount: lessons.length,
      lessons,
    }
  })

  const totalLessons = allLessons.length
  const totalCompleted = completedIds.size

  // --- Fetch current lesson progress ---
  const progress = hasAccess
    ? await supabase
        .from('lesson_progress')
        .select('seconds_watched, completed')
        .eq('user_id', user.id)
        .eq('lesson_id', lesson.id)
        .single()
        .then(({ data }) => data)
    : null

  // Determine blocking cohort for LockedContent CTA
  const cohortCourses = course?.cohort_courses ?? []
  const firstCohort =
    Array.isArray(cohortCourses) && cohortCourses.length > 0
      ? Array.isArray(cohortCourses[0].cohorts)
        ? cohortCourses[0].cohorts[0]
        : cohortCourses[0].cohorts
      : null

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-4xl">
        <div
          className="border-b p-6"
          style={{ borderColor: 'var(--hairline)' }}
        >
          <p
            className="font-mono text-[11px] uppercase tracking-wider"
            style={{ color: 'var(--bone-mute)' }}
          >
            <Link
              href={`/academy/curso/${slug}`}
              className="transition-colors hover:text-[var(--bone)]"
              style={{ color: 'var(--bone-mute)' }}
            >
              Voltar ao curso
            </Link>
          </p>
          <h1
            className="mt-3 font-[var(--type-display)] italic"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 2rem)',
              lineHeight: 1.1,
              color: 'var(--bone)',
            }}
          >
            {lesson.title}
          </h1>
        </div>

        <div className="p-6">
          <LockedContent
            cohortName={firstCohort?.name ?? 'uma turma'}
            cohortSlug={firstCohort?.slug ?? 'turmas'}
            cohortDescription={firstCohort?.description ?? null}
          />
        </div>
      </div>
    )
  }

  // Render lesson content only when access is confirmed
  const renderedContent =
    lesson.content && lesson.content_format
      ? await renderContent(
          lesson.content_format as 'MDX' | 'HTML' | 'MARKDOWN',
          lesson.content
        )
      : null

  // Fetch comments
  const { data: rawComments } = await supabaseAdmin
    .from('comments')
    .select(`
      id, lesson_id, content, created_at, updated_at, deleted_at,
      is_pinned, parent_comment_id,
      profiles(id, name, role)
    `)
    .eq('lesson_id', lesson.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: true })

  const comments: CommentWithAuthor[] = (rawComments ?? []).map((c) => {
    const profile = Array.isArray(c.profiles) ? c.profiles[0] : c.profiles
    return {
      id: c.id,
      lesson_id: c.lesson_id,
      content: c.content,
      created_at: c.created_at,
      updated_at: c.updated_at,
      deleted_at: c.deleted_at,
      is_pinned: c.is_pinned,
      parent_comment_id: c.parent_comment_id,
      authorId: profile?.id ?? '',
      authorName: profile?.name ?? 'Anonimo',
      authorRole: (profile?.role ?? 'STUDENT') as UserRole,
    }
  })

  // Fetch materials
  const { data: rawMaterials } = await supabaseAdmin
    .from('materials')
    .select(
      'id, title, kind, external_url, storage_path, size_bytes, sort_order, lesson_id, created_at'
    )
    .eq('lesson_id', lesson.id)
    .order('sort_order', { ascending: true })

  const materials = rawMaterials ?? []

  const currentModuleId = module?.id ?? ''

  return (
    // Negative margin to break out of the shell's padding and use full viewport width for the layout
    <div
      className="-mx-4 -mt-4 sm:-mx-6 sm:-mt-6 lg:-mx-8 lg:-mt-8 flex flex-col"
      style={{ minHeight: 'calc(100vh - 57px)' }}
    >
      {/* Main two-column layout */}
      <div className="flex flex-1 flex-col lg:flex-row lg:items-stretch">
        {/* ── Left: main content column ── */}
        <div className="flex flex-1 min-w-0 flex-col">
          {/* Video player */}
          <div
            className="aspect-video w-full shrink-0"
            style={{
              background: 'var(--ink-3)',
            }}
          >
            {lesson.kind === 'VIDEO' && lesson.video_id ? (
              <VideoPlayer
                lessonId={lesson.id}
                videoId={lesson.video_id}
                provider={lesson.video_provider}
                initialSeconds={progress?.seconds_watched ?? 0}
                vimeoDomain={process.env.VIMEO_DOMAIN_WHITELIST ?? ''}
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Play
                  className="h-10 w-10"
                  style={{ color: 'var(--ember)', opacity: 0.4 }}
                  aria-hidden="true"
                />
              </div>
            )}
          </div>

          {/* Below player: breadcrumb + title + MarkComplete */}
          <div
            className="border-b p-4 lg:p-6"
            style={{
              background: 'var(--ink)',
              borderColor: 'var(--hairline)',
            }}
          >
            {/* Breadcrumb */}
            <p
              className="font-mono text-[11px] uppercase tracking-wider"
              style={{ color: 'var(--bone-mute)' }}
            >
              <Link
                href={`/academy/curso/${slug}`}
                className="transition-colors hover:text-[var(--bone)]"
                style={{ color: 'var(--bone-mute)' }}
              >
                {course?.title ?? 'Curso'}
              </Link>
              {' / '}
              <span style={{ color: 'var(--bone-dim)' }}>
                {module?.title ?? ''}
              </span>
            </p>

            {/* Lesson title */}
            <h1
              className="mt-2 font-[var(--type-display)] italic"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2rem)',
                lineHeight: 1.15,
                color: 'var(--bone)',
              }}
            >
              {lesson.title}
            </h1>

            {/* MarkCompleteButton */}
            <div className="mt-4 flex items-center justify-between">
              <MarkCompleteButton
                lessonId={lesson.id}
                initialCompleted={progress?.completed ?? false}
              />

              {/* Mobile: lesson list toggle */}
              <div className="flex lg:hidden">
                <MobileLessonDrawer
                  modules={sidebarModules}
                  currentLessonId={lesson.id}
                  currentModuleId={currentModuleId}
                  courseSlug={slug}
                  totalCompleted={totalCompleted}
                  totalLessons={totalLessons}
                />
              </div>
            </div>
          </div>

          {/* Tabs: Sobre, Materiais, Comentarios */}
          <LessonTabs
            courseSlug={slug}
            lessonSlug={lessonSlug}
            activeTab="sobre"
            description={lesson.description ?? ''}
            descriptionContent={renderedContent}
            materials={materials}
            comments={comments}
            lessonId={lesson.id}
            currentUserId={user.id}
          />

          {/* ── Bottom prev/next nav cards ── */}
          <NavCards
            slug={slug}
            globalPrev={globalPrev}
            globalNext={globalNext}
          />
        </div>

        {/* ── Right: Course outline sidebar (desktop only) ── */}
        <aside
          className="hidden lg:flex lg:w-80 lg:flex-col shrink-0 border-l sticky top-0 h-screen overflow-hidden"
          style={{
            background: 'var(--void)',
            borderColor: 'var(--hairline)',
          }}
        >
          <CourseSidebar
            modules={sidebarModules}
            currentLessonId={lesson.id}
            currentModuleId={currentModuleId}
            courseSlug={slug}
            totalCompleted={totalCompleted}
            totalLessons={totalLessons}
          />
        </aside>
      </div>
    </div>
  )
}

// ── Nav cards component (server, no event handlers) ──
type NavLesson = {
  id: string
  slug: string
  title: string
  moduleTitle: string
  moduleId: string
}

function NavCards({
  slug,
  globalPrev,
  globalNext,
}: {
  slug: string
  globalPrev: NavLesson | null
  globalNext: NavLesson | null
}) {
  return (
    <div
      className="border-t grid grid-cols-1 sm:grid-cols-2"
      style={{
        borderColor: 'var(--hairline)',
        background: 'var(--ink)',
      }}
    >
      {/* Previous lesson card */}
      {globalPrev ? (
        <Link
          href={`/academy/curso/${slug}/aula/${globalPrev.slug}`}
          className="group flex flex-col gap-1.5 border-r p-4 lg:p-5 transition-colors"
          style={{
            borderColor: 'var(--hairline)',
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <span
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--bone-mute)' }}
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Aula anterior
          </span>
          <span
            className="text-[13px] leading-snug font-medium line-clamp-2 transition-colors group-hover:text-[var(--bone)]"
            style={{ color: 'var(--bone-dim)' }}
          >
            {globalPrev.title}
          </span>
          <span
            className="font-mono text-[10px] truncate"
            style={{ color: 'var(--bone-mute)', opacity: 0.6 }}
          >
            {globalPrev.moduleTitle}
          </span>
        </Link>
      ) : (
        <div
          className="flex flex-col gap-1.5 p-4 lg:p-5 border-r"
          style={{
            borderColor: 'var(--hairline)',
            borderBottom: '1px solid var(--hairline)',
            opacity: 0.3,
          }}
        >
          <span
            className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--bone-mute)' }}
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Aula anterior
          </span>
          <span className="text-[13px]" style={{ color: 'var(--bone-mute)' }}>
            Primeira aula
          </span>
        </div>
      )}

      {/* Next lesson card */}
      {globalNext ? (
        <Link
          href={`/academy/curso/${slug}/aula/${globalNext.slug}`}
          className="group flex flex-col gap-1.5 p-4 lg:p-5 transition-colors text-right"
          style={{
            borderBottom: '1px solid var(--hairline)',
          }}
        >
          <span
            className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--bone-mute)' }}
          >
            Proxima aula
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
          <span
            className="text-[13px] leading-snug font-medium line-clamp-2 transition-colors group-hover:text-[var(--bone)]"
            style={{ color: 'var(--bone-dim)' }}
          >
            {globalNext.title}
          </span>
          <span
            className="font-mono text-[10px] truncate"
            style={{ color: 'var(--bone-mute)', opacity: 0.6 }}
          >
            {globalNext.moduleTitle}
          </span>
        </Link>
      ) : (
        <div
          className="flex flex-col gap-1.5 p-4 lg:p-5 text-right"
          style={{
            borderBottom: '1px solid var(--hairline)',
            opacity: 0.3,
          }}
        >
          <span
            className="flex items-center justify-end gap-1.5 font-mono text-[10px] uppercase tracking-widest"
            style={{ color: 'var(--bone-mute)' }}
          >
            Proxima aula
            <ArrowRight className="h-3 w-3" aria-hidden="true" />
          </span>
          <span className="text-[13px]" style={{ color: 'var(--bone-mute)' }}>
            Ultima aula
          </span>
        </div>
      )}
    </div>
  )
}
