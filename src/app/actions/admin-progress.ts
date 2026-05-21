'use server'

import { supabaseAdmin } from '@/lib/supabase/admin'

export type StudentProgress = {
  userId: string
  email: string
  name: string
  courses: {
    courseId: string
    courseTitle: string
    totalLessons: number
    completedLessons: number
    progressPercent: number
    lastActivityAt: string | null
  }[]
}

export type LessonCompletionStat = {
  lessonId: string
  lessonTitle: string
  moduleTitle: string
  moduleOrder: number
  lessonOrder: number
  completedCount: number
  totalEnrolledStudents: number
  completionRate: number
}

export async function getStudentsProgress(opts?: {
  courseId?: string
  cohortId?: string
}): Promise<StudentProgress[]> {
  // 1. Resolve which user_ids are enrolled, optionally filtered by cohort/course
  let memberQuery = supabaseAdmin
    .from('cohort_members')
    .select('user_id, cohort_id')
    .eq('status', 'ACTIVE')

  if (opts?.cohortId) {
    memberQuery = memberQuery.eq('cohort_id', opts.cohortId)
  }

  const { data: members, error: membersError } = await memberQuery
  if (membersError) throw new Error(membersError.message)
  if (!members || members.length === 0) return []

  // If filtering by courseId, keep only cohorts that include that course
  let enrolledUserIds: string[]
  if (opts?.courseId) {
    const cohortIds = [...new Set(members.map((m) => m.cohort_id))]
    const { data: cohortCourses, error: ccError } = await supabaseAdmin
      .from('cohort_courses')
      .select('cohort_id')
      .eq('course_id', opts.courseId)
      .in('cohort_id', cohortIds)
    if (ccError) throw new Error(ccError.message)
    const validCohortIds = new Set((cohortCourses ?? []).map((cc) => cc.cohort_id))
    enrolledUserIds = [
      ...new Set(members.filter((m) => validCohortIds.has(m.cohort_id)).map((m) => m.user_id)),
    ]
  } else {
    enrolledUserIds = [...new Set(members.map((m) => m.user_id))]
  }

  if (enrolledUserIds.length === 0) return []

  // 2. Fetch user identities from auth.users via admin API
  const { data: usersListData, error: usersError } =
    await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  if (usersError) throw new Error(usersError.message)

  const usersMap = new Map(
    usersListData.users
      .filter((u) => enrolledUserIds.includes(u.id))
      .map((u) => [
        u.id,
        {
          email: u.email ?? '',
          name: (u.user_metadata?.full_name as string | undefined) ?? u.email ?? '',
        },
      ])
  )

  // 3. Fetch courses to show (optionally filtered)
  let coursesQuery = supabaseAdmin
    .from('courses')
    .select('id, title')
    .is('deleted_at', null)
    .order('sort_order')

  if (opts?.courseId) {
    coursesQuery = coursesQuery.eq('id', opts.courseId)
  }

  const { data: courses, error: coursesError } = await coursesQuery
  if (coursesError) throw new Error(coursesError.message)
  if (!courses || courses.length === 0) return []

  const courseIds = courses.map((c) => c.id)

  // 4. Fetch lessons grouped by course (via modules)
  const { data: lessonsRaw, error: lessonsError } = await supabaseAdmin
    .from('lessons')
    .select('id, module_id, modules!inner(id, course_id)')
    .in('modules.course_id', courseIds)
    .is('deleted_at', null)
  if (lessonsError) throw new Error(lessonsError.message)

  // Build map: courseId -> lesson ids
  const courseLessonsMap = new Map<string, string[]>()
  for (const lesson of lessonsRaw ?? []) {
    const mod = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
    const courseId = mod?.course_id
    if (!courseId) continue
    if (!courseLessonsMap.has(courseId)) courseLessonsMap.set(courseId, [])
    courseLessonsMap.get(courseId)!.push(lesson.id)
  }

  // 5. Fetch all lesson_progress for enrolled users
  const allLessonIds = [...new Set((lessonsRaw ?? []).map((l) => l.id))]
  const { data: progressRows, error: progressError } = await supabaseAdmin
    .from('lesson_progress')
    .select('user_id, lesson_id, completed, completed_at')
    .in('user_id', enrolledUserIds)
    .in('lesson_id', allLessonIds)
  if (progressError) throw new Error(progressError.message)

  // Index progress: user_id -> lesson_id -> { completed, completed_at }
  const progressIndex = new Map<string, Map<string, { completed: boolean; completed_at: string | null }>>()
  for (const row of progressRows ?? []) {
    if (!progressIndex.has(row.user_id)) progressIndex.set(row.user_id, new Map())
    progressIndex.get(row.user_id)!.set(row.lesson_id, {
      completed: row.completed,
      completed_at: row.completed_at,
    })
  }

  // 6. Assemble result
  const result: StudentProgress[] = []

  for (const userId of enrolledUserIds) {
    const userInfo = usersMap.get(userId)
    if (!userInfo) continue

    const userProgress = progressIndex.get(userId) ?? new Map()

    const courseStats = courses.map((course) => {
      const lessonIds = courseLessonsMap.get(course.id) ?? []
      const totalLessons = lessonIds.length
      let completedLessons = 0
      let lastActivityAt: string | null = null

      for (const lessonId of lessonIds) {
        const p = userProgress.get(lessonId)
        if (p?.completed) {
          completedLessons++
          if (p.completed_at && (!lastActivityAt || p.completed_at > lastActivityAt)) {
            lastActivityAt = p.completed_at
          }
        }
      }

      return {
        courseId: course.id,
        courseTitle: course.title,
        totalLessons,
        completedLessons,
        progressPercent: totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0,
        lastActivityAt,
      }
    })

    result.push({
      userId,
      email: userInfo.email,
      name: userInfo.name,
      courses: courseStats,
    })
  }

  result.sort((a, b) => a.name.localeCompare(b.name, 'pt-BR'))
  return result
}

export async function getLessonsCompletionStats(courseId: string): Promise<LessonCompletionStat[]> {
  // 1. Fetch all lessons with their module info for this course
  const { data: lessonsRaw, error: lessonsError } = await supabaseAdmin
    .from('lessons')
    .select('id, title, sort_order, modules!inner(id, title, sort_order, course_id)')
    .eq('modules.course_id', courseId)
    .is('deleted_at', null)
  if (lessonsError) throw new Error(lessonsError.message)
  if (!lessonsRaw || lessonsRaw.length === 0) return []

  // 2. Count total enrolled students for this course
  const { data: cohortCourses, error: ccError } = await supabaseAdmin
    .from('cohort_courses')
    .select('cohort_id')
    .eq('course_id', courseId)
  if (ccError) throw new Error(ccError.message)

  const cohortIds = (cohortCourses ?? []).map((cc) => cc.cohort_id)
  let totalEnrolledStudents = 0

  if (cohortIds.length > 0) {
    const { count, error: countError } = await supabaseAdmin
      .from('cohort_members')
      .select('user_id', { count: 'exact', head: true })
      .in('cohort_id', cohortIds)
      .eq('status', 'ACTIVE')
    if (countError) throw new Error(countError.message)
    totalEnrolledStudents = count ?? 0
  }

  // 3. Fetch completion counts per lesson
  const lessonIds = lessonsRaw.map((l) => l.id)
  const { data: progressRows, error: progressError } = await supabaseAdmin
    .from('lesson_progress')
    .select('lesson_id')
    .in('lesson_id', lessonIds)
    .eq('completed', true)
  if (progressError) throw new Error(progressError.message)

  const completedCountMap = new Map<string, number>()
  for (const row of progressRows ?? []) {
    completedCountMap.set(row.lesson_id, (completedCountMap.get(row.lesson_id) ?? 0) + 1)
  }

  // 4. Assemble and sort
  const stats: LessonCompletionStat[] = lessonsRaw.map((lesson) => {
    const mod = Array.isArray(lesson.modules) ? lesson.modules[0] : lesson.modules
    const completedCount = completedCountMap.get(lesson.id) ?? 0
    return {
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      moduleTitle: mod?.title ?? '',
      moduleOrder: mod?.sort_order ?? 0,
      lessonOrder: lesson.sort_order,
      completedCount,
      totalEnrolledStudents,
      completionRate:
        totalEnrolledStudents > 0
          ? Math.round((completedCount / totalEnrolledStudents) * 100)
          : 0,
    }
  })

  stats.sort((a, b) => a.moduleOrder - b.moduleOrder || a.lessonOrder - b.lessonOrder)
  return stats
}

export async function getCoursesForFilter(): Promise<{ id: string; title: string }[]> {
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('id, title')
    .is('deleted_at', null)
    .order('sort_order')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getCohortsForFilter(): Promise<{ id: string; name: string }[]> {
  const { data, error } = await supabaseAdmin
    .from('cohorts')
    .select('id, name')
    .order('name')
  if (error) throw new Error(error.message)
  return data ?? []
}
