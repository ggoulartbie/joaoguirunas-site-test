'use server'

import { requireAdmin } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'

export type CourseProgress = {
  courseId: string
  courseTitle: string
  totalLessons: number
  completedLessons: number
  lastActivityAt: string | null
}

export type RecentComment = {
  id: string
  content: string
  createdAt: string
  lessonTitle: string
  lessonId: string
}

export type ForumActivity = {
  threads: number
  replies: number
  recentThreads: Array<{ id: string; title: string; createdAt: string }>
}

export type ForumVote = {
  id: string
  createdAt: string
  threadTitle: string | null
  threadId: string | null
  replyId: string | null
}

export type StudentDetail = {
  profile: {
    id: string
    name: string
    avatarUrl: string | null
    email: string
    role: string
    createdAt: string
  }
  courseProgress: CourseProgress[]
  recentComments: RecentComment[]
  forumActivity: ForumActivity
  votes: ForumVote[]
}

export async function getStudentDetail(userId: string): Promise<StudentDetail | null> {
  await requireAdmin()

  const [
    { data: profile },
    { data: authUser },
    { data: lessonProgressRows },
    { data: comments },
    { data: threads },
    { data: replies },
    { data: votes },
  ] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('id, name, avatar_url, role, created_at')
      .eq('id', userId)
      .single(),

    supabaseAdmin.auth.admin.getUserById(userId),

    supabaseAdmin
      .from('lesson_progress')
      .select('lesson_id, completed, completed_at, updated_at, lessons!inner(title, module_id, modules!inner(course_id, courses!inner(id, title)))')
      .eq('user_id', userId),

    supabaseAdmin
      .from('comments')
      .select('id, content, created_at, lesson_id, lessons!inner(title)')
      .eq('author_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(10),

    supabaseAdmin
      .from('forum_threads')
      .select('id, title, created_at')
      .eq('author_id', userId)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(10),

    supabaseAdmin
      .from('forum_replies')
      .select('id, thread_id')
      .eq('author_id', userId)
      .is('deleted_at', null),

    supabaseAdmin
      .from('votes')
      .select('id, created_at, thread_id, reply_id, forum_threads(title)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(20),
  ])

  if (!profile) return null

  // Build course progress grouped by course
  const courseMap = new Map<string, { title: string; total: number; completed: number; lastActivity: string | null }>()

  for (const row of lessonProgressRows ?? []) {
    const lesson = row.lessons as unknown as {
      title: string
      modules: { course_id: string; courses: { id: string; title: string } }
    }
    if (!lesson?.modules?.courses) continue
    const { id: courseId, title: courseTitle } = lesson.modules.courses

    if (!courseMap.has(courseId)) {
      courseMap.set(courseId, { title: courseTitle, total: 0, completed: 0, lastActivity: null })
    }
    const entry = courseMap.get(courseId)!
    entry.total++
    if (row.completed) entry.completed++
    if (!entry.lastActivity || (row.updated_at && row.updated_at > entry.lastActivity)) {
      entry.lastActivity = row.updated_at
    }
  }

  const courseProgress: CourseProgress[] = Array.from(courseMap.entries()).map(([courseId, data]) => ({
    courseId,
    courseTitle: data.title,
    totalLessons: data.total,
    completedLessons: data.completed,
    lastActivityAt: data.lastActivity,
  }))

  // Recent comments
  const recentComments: RecentComment[] = (comments ?? []).map((c) => {
    const lesson = c.lessons as unknown as { title: string } | null
    return {
      id: c.id,
      content: c.content,
      createdAt: c.created_at,
      lessonTitle: lesson?.title ?? '—',
      lessonId: c.lesson_id,
    }
  })

  // Forum activity
  const recentThreads = (threads ?? []).map((t) => ({
    id: t.id,
    title: t.title,
    createdAt: t.created_at,
  }))

  const forumActivity: ForumActivity = {
    threads: threads?.length ?? 0,
    replies: replies?.length ?? 0,
    recentThreads,
  }

  // Votes
  const voteList: ForumVote[] = (votes ?? []).map((v) => {
    const thread = v.forum_threads as unknown as { title: string } | null
    return {
      id: v.id,
      createdAt: v.created_at,
      threadTitle: thread?.title ?? null,
      threadId: v.thread_id,
      replyId: v.reply_id,
    }
  })

  return {
    profile: {
      id: profile.id,
      name: profile.name,
      avatarUrl: profile.avatar_url,
      email: authUser?.user?.email ?? '—',
      role: profile.role,
      createdAt: profile.created_at,
    },
    courseProgress,
    recentComments,
    forumActivity,
    votes: voteList,
  }
}
