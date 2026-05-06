// Tipos de view para a área do aluno.
// Os tipos do banco (types/db.ts) usam UUIDs e ISO strings — estes tipos
// resolvem os joins necessários para renderização, mapeados server-side.

import type {
  Course,
  Cohort,
  CohortMember,
  LiveSession,
  Certificate,
  ForumCategory,
  ForumThread,
  ForumReply,
  Comment,
  UserRole,
  MemberRole,
  MemberStatus,
} from '../../types/db'

// Re-exporta os tipos base que componentes usam diretamente
export type { ForumCategory, UserRole, MemberRole, MemberStatus }

// ─── Cohort com dados de progresso calculados ───────────────────────────────

export type CohortWithProgress = Pick<Cohort, 'id' | 'name' | 'slug' | 'has_live_sessions'> &
  Pick<CohortMember, 'expires_at' | 'status' | 'auto_renew_enabled'> & {
    progressPercent: number
    lastAccessedLessonTitle: string | null
    lastAccessedLessonSlug: string | null
    lastAccessedCourseSlug: string | null
    nextLiveSessionAt: string | null // ISO
  }

// ─── Curso com dados de progresso e origem da cohort ─────────────────────────

export type CourseWithProgress = Pick<Course, 'id' | 'slug' | 'title' | 'description' | 'cover_image_url'> & {
  progressPercent: number
  totalLessons: number
  completedLessons: number
  cohortName: string
  cohortSlug: string
  isPartialAccess: boolean
  accessibleModulesCount: number
  totalModulesCount: number
}

// ─── Módulo com progresso e bloqueio ─────────────────────────────────────────

export type ModuleWithProgress = {
  id: string
  slug: string
  title: string
  sortOrder: number
  isLocked: boolean
  lockedByCohortName: string | null
  lockedByCohortSlug: string | null
  totalLessons: number
  completedLessons: number
}

// ─── Sessão ao vivo com nome da cohort (join resolvido) ──────────────────────

export type LiveSessionWithCohort = Pick<
  LiveSession,
  'id' | 'title' | 'description' | 'scheduled_at' | 'duration_minutes' | 'meeting_url' | 'recording_url'
> & {
  cohortName: string
  cohortSlug: string
}

// ─── Certificado com nomes resolvidos (join courses + cohorts + profiles) ────

export type CertificateView = Pick<Certificate, 'id' | 'verification_code' | 'issued_at' | 'pdf_storage_path'> & {
  courseName: string
  courseSlug: string
  cohortName: string
}

// ─── Fórum ────────────────────────────────────────────────────────────────────

export type ForumCategoryWithCount = ForumCategory & {
  threadCount: number
}

export type ForumThreadWithMeta = Pick<
  ForumThread,
  'id' | 'slug' | 'title' | 'content' | 'created_at' | 'last_activity_at' | 'is_pinned' | 'is_resolved' | 'view_count'
> & {
  authorName: string
  authorRole: UserRole
  categorySlug: string
  categoryName: string
  replyCount: number
  voteCount: number
}

export type ForumReplyWithMeta = Pick<
  ForumReply,
  'id' | 'thread_id' | 'content' | 'created_at' | 'is_accepted_answer' | 'parent_reply_id' | 'deleted_at'
> & {
  authorName: string
  authorRole: UserRole
  voteCount: number
}

// ─── Comentário com autor resolvido ──────────────────────────────────────────

export type CommentWithAuthor = Pick<
  Comment,
  'id' | 'lesson_id' | 'content' | 'created_at' | 'updated_at' | 'deleted_at' | 'is_pinned' | 'parent_comment_id'
> & {
  authorId: string
  authorName: string
  authorRole: UserRole
}
