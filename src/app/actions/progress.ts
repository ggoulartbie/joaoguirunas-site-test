'use server'

import * as Sentry from '@sentry/nextjs'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { checkAndIssueCertificate } from './certificate'

export async function saveProgress(lessonId: string, seconds: number): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        seconds_watched: seconds,
      },
      {
        onConflict: 'user_id,lesson_id',
        ignoreDuplicates: false,
      }
    )
    .select()

  // Only advance — never regress seconds (e.g. if two tabs are open)
  await supabase
    .from('lesson_progress')
    .update({ seconds_watched: seconds })
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .lt('seconds_watched', seconds)
}

export async function markLessonComplete(lessonId: string): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    )

  // Auto-issue certificate if this completes 100% of the course.
  // Resolve course + active cohort via supabaseAdmin (service role, no RLS).
  triggerCertificateCheck(user.id, lessonId).catch((err) => Sentry.captureException(err, {
    tags: { action: 'markLessonComplete', lesson_id: lessonId },
  }))
}

async function triggerCertificateCheck(userId: string, lessonId: string): Promise<void> {
  // Resolve course_id from lesson → module
  const { data: lesson } = await supabaseAdmin
    .from('lessons')
    .select('modules!inner(course_id)')
    .eq('id', lessonId)
    .single()

  const moduleData = Array.isArray(lesson?.modules) ? lesson.modules[0] : lesson?.modules
  const courseId = moduleData?.course_id
  if (!courseId) return

  // Get all active cohort memberships for this user
  const { data: memberships } = await supabaseAdmin
    .from('cohort_members')
    .select('cohort_id')
    .eq('user_id', userId)
    .eq('status', 'ACTIVE')

  if (!memberships || memberships.length === 0) return

  const cohortIds = memberships.map((m) => m.cohort_id)

  // Find a cohort among the user's memberships that includes this course
  const { data: cohortCourse } = await supabaseAdmin
    .from('cohort_courses')
    .select('cohort_id')
    .eq('course_id', courseId)
    .in('cohort_id', cohortIds)
    .limit(1)
    .maybeSingle()

  const cohortId = cohortCourse?.cohort_id
  if (!cohortId) return

  await checkAndIssueCertificate(userId, courseId, cohortId)
}

export async function getLessonProgress(
  lessonId: string
): Promise<{ secondsWatched: number; completed: boolean } | null> {
  const user = await requireUser()
  const supabase = await createClient()

  const { data } = await supabase
    .from('lesson_progress')
    .select('seconds_watched, completed')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  if (!data) return null
  return { secondsWatched: data.seconds_watched, completed: data.completed }
}
