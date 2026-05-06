import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { renderContent } from '@/lib/content'
import { VideoPlayer } from '@/components/student/VideoPlayer'
import { LockedContent } from '@/components/student/LockedContent'
import { MarkCompleteButton } from '@/components/student/MarkCompleteButton'
import { LessonTabs } from './LessonTabs'
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

  return { title: lesson?.title ?? lessonSlug }
}

export default async function AulaPage({ params }: Props) {
  const { slug, 'lesson-slug': lessonSlug } = await params

  const user = await requireUser()
  const supabase = await createClient()

  // Fetch lesson with module + course context for nav and locked cohort info
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

  // Fetch sibling lessons for prev/next navigation
  const { data: siblings } = await supabase
    .from('lessons')
    .select('id, slug, title, sort_order')
    .eq('module_id', lesson.module_id)
    .is('deleted_at', null)
    .order('sort_order')

  const currentIndex = siblings?.findIndex((l) => l.id === lesson.id) ?? -1
  const prevLesson = currentIndex > 0 ? siblings?.[currentIndex - 1] : null
  const nextLesson = siblings && currentIndex < siblings.length - 1 ? siblings[currentIndex + 1] : null

  // Fetch lesson progress (seconds + completed state) — only when user has access
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
  const module = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
  const course = module && (Array.isArray(module.courses) ? module.courses[0] : module.courses)
  const cohortCourses = course?.cohort_courses ?? []
  const firstCohort = Array.isArray(cohortCourses) && cohortCourses.length > 0
    ? (Array.isArray(cohortCourses[0].cohorts) ? cohortCourses[0].cohorts[0] : cohortCourses[0].cohorts)
    : null

  if (!hasAccess) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">
        <Link
          href={`/curso/${slug}`}
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Voltar ao curso
        </Link>

        <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>

        <LockedContent
          cohortName={firstCohort?.name ?? 'uma turma'}
          cohortSlug={firstCohort?.slug ?? 'turmas'}
          cohortDescription={firstCohort?.description ?? null}
        />
      </div>
    )
  }

  // Render lesson content only when access is confirmed
  // video_id is never included in the response when hasAccess = false
  const renderedContent =
    lesson.content && lesson.content_format
      ? await renderContent(
          lesson.content_format as 'MDX' | 'HTML' | 'MARKDOWN',
          lesson.content
        )
      : null

  // Fetch real comments (access already confirmed — supabaseAdmin bypasses RLS)
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
      authorName: profile?.name ?? 'Anônimo',
      authorRole: (profile?.role ?? 'STUDENT') as UserRole,
    }
  })

  // Fetch real materials for this lesson
  const { data: rawMaterials } = await supabaseAdmin
    .from('materials')
    .select('id, title, kind, external_url, storage_path, size_bytes, sort_order, lesson_id, created_at')
    .eq('lesson_id', lesson.id)
    .order('sort_order', { ascending: true })

  const materials = rawMaterials ?? []

  // Fetch current user's profile name for comment ownership display
  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('name')
    .eq('id', user.id)
    .single()

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      {/* Breadcrumb */}
      <Link
        href={`/curso/${slug}`}
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Voltar ao curso
      </Link>

      {/* Título */}
      <h1 className="text-2xl font-bold text-white">{lesson.title}</h1>

      {/* Video player — video_id only reaches client when hasAccess = true */}
      {lesson.kind === 'VIDEO' && lesson.video_id ? (
        <VideoPlayer
          lessonId={lesson.id}
          videoId={lesson.video_id}
          provider={lesson.video_provider}
          initialSeconds={progress?.seconds_watched ?? 0}
        />
      ) : (
        <div className="flex aspect-video items-center justify-center border border-white/10 bg-[#0C0C12]">
          <p className="font-mono text-xs uppercase tracking-widest text-white/20">
            Sem vídeo nesta aula
          </p>
        </div>
      )}

      {/* Mark complete */}
      <MarkCompleteButton
        lessonId={lesson.id}
        initialCompleted={progress?.completed ?? false}
      />

      {/* Prev / Next navigation */}
      <div className="flex items-center justify-between">
        {prevLesson ? (
          <Link
            href={`/curso/${slug}/aula/${prevLesson.slug}`}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-white/40 transition-colors hover:text-white/70"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Aula anterior
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-white/20">
            <ArrowLeft className="h-3.5 w-3.5" />
            Aula anterior
          </span>
        )}

        {nextLesson ? (
          <Link
            href={`/curso/${slug}/aula/${nextLesson.slug}`}
            className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-white/40 transition-colors hover:text-white/70"
          >
            Próxima aula
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        ) : (
          <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wide text-white/20">
            Próxima aula
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        )}
      </div>

      {/* Tabs: Sobre / Materiais / Comentários */}
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
        currentUserName={profile?.name ?? ''}
      />
    </div>
  )
}
