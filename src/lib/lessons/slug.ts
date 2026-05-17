import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

type AppSupabase = SupabaseClient<Database>

/**
 * Returns a slug that is unique across all active lessons in the course.
 * If `candidate` collides with an existing lesson (excluding `ignoreLessonId`),
 * appends -2, -3, ... until unique.
 *
 * Scope: course-wide (not module-wide) to prevent cross-module 404s caused by
 * identical slugs resolving ambiguously in the student route lookup.
 */
export async function ensureUniqueSlugInCourse(
  supabase: AppSupabase,
  candidate: string,
  courseId: string,
  ignoreLessonId?: string
): Promise<string> {
  // Fetch all active module IDs for this course
  const { data: moduleRows } = await supabase
    .from('modules')
    .select('id')
    .eq('course_id', courseId)
    .is('deleted_at', null)

  const moduleIds = (moduleRows ?? []).map((m) => m.id)
  if (moduleIds.length === 0) return candidate

  // Fetch all active lesson slugs in those modules
  const { data: lessonRows } = await supabase
    .from('lessons')
    .select('id, slug')
    .in('module_id', moduleIds)
    .is('deleted_at', null)

  const existingSlugs = new Set(
    (lessonRows ?? [])
      .filter((l) => l.id !== ignoreLessonId)
      .map((l) => l.slug)
  )

  if (!existingSlugs.has(candidate)) return candidate

  let suffix = 2
  while (existingSlugs.has(`${candidate}-${suffix}`)) {
    suffix++
  }
  return `${candidate}-${suffix}`
}
