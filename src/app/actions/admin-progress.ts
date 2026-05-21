'use server'

import { requireAdmin } from '@/lib/auth/helpers'
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
  await requireAdmin()

  // 1. Resolve enrolled members, optionally filtered by cohort
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

  const allCohortIds = [...new Set(members.map((m) => m.cohort_id))]

  // 2. Fetch cohort_courses with included_module_ids for all cohorts
  const { data: ccRows, error: ccError } = await supabaseAdmin
    .from('cohort_courses')
    .select('cohort_id, course_id, included_module_ids')
    .in('cohort_id', allCohortIds)
  if (ccError) throw new Error(ccError.message)

  // Build: cohortId → courseId → string[] | null (null = full access)
  const cohortAccessMap = new Map<string, Map<string, string[] | null>>()
  for (const cc of ccRows ?? []) {
    if (!cohortAccessMap.has(cc.cohort_id)) cohortAccessMap.set(cc.cohort_id, new Map())
    const full = !cc.included_module_ids || cc.included_module_ids.length === 0
    cohortAccessMap.get(cc.cohort_id)!.set(cc.course_id, full ? null : cc.included_module_ids)
  }

  // 3. Determine enrolledUserIds (filtered by courseId if provided)
  let enrolledUserIds: string[]
  if (opts?.courseId) {
    const validCohortIds = new Set(
      (ccRows ?? [])
        .filter((cc) => cc.course_id === opts.courseId)
        .map((cc) => cc.cohort_id)
    )
    enrolledUserIds = [
      ...new Set(members.filter((m) => validCohortIds.has(m.cohort_id)).map((m) => m.user_id)),
    ]
  } else {
    enrolledUserIds = [...new Set(members.map((m) => m.user_id))]
  }

  if (enrolledUserIds.length === 0) return []

  // Build: userId → cohortIds[]
  const userCohortIds = new Map<string, string[]>()
  for (const m of members) {
    const arr = userCohortIds.get(m.user_id) ?? []
    arr.push(m.cohort_id)
    userCohortIds.set(m.user_id, arr)
  }

  // 4. Fetch user identities from auth.users via admin API
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

  // 5. Fetch courses to show (optionally filtered)
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

  // 6. Fetch all modules for those courses
  const { data: modulesRaw, error: modulesError } = await supabaseAdmin
    .from('modules')
    .select('id, course_id')
    .in('course_id', courseIds)
    .is('deleted_at', null)
  if (modulesError) throw new Error(modulesError.message)

  // Build: courseId → moduleIds[]
  const courseModulesMap = new Map<string, string[]>()
  for (const m of modulesRaw ?? []) {
    const arr = courseModulesMap.get(m.course_id) ?? []
    arr.push(m.id)
    courseModulesMap.set(m.course_id, arr)
  }

  // 7. Fetch available lessons for those modules (C1: is_available filter)
  const allModuleIds = (modulesRaw ?? []).map((m) => m.id)
  const { data: lessonsRaw, error: lessonsError } = allModuleIds.length > 0
    ? await supabaseAdmin
        .from('lessons')
        .select('id, module_id')
        .in('module_id', allModuleIds)
        .is('deleted_at', null)
        .eq('is_available', true)
    : { data: [], error: null }
  if (lessonsError) throw new Error(lessonsError.message)

  // Build: moduleId → lessonIds[]
  const moduleLessonsMap = new Map<string, string[]>()
  for (const l of lessonsRaw ?? []) {
    const arr = moduleLessonsMap.get(l.module_id) ?? []
    arr.push(l.id)
    moduleLessonsMap.set(l.module_id, arr)
  }

  // 8. Fetch lesson_progress for all enrolled users
  const allLessonIds = [...new Set((lessonsRaw ?? []).map((l) => l.id))]
  const { data: progressRows, error: progressError } = allLessonIds.length > 0
    ? await supabaseAdmin
        .from('lesson_progress')
        .select('user_id, lesson_id, completed, completed_at')
        .in('user_id', enrolledUserIds)
        .in('lesson_id', allLessonIds)
    : { data: [], error: null }
  if (progressError) throw new Error(progressError.message)

  // Index: userId → lessonId → { completed, completed_at }
  const progressIndex = new Map<string, Map<string, { completed: boolean; completed_at: string | null }>>()
  for (const row of progressRows ?? []) {
    if (!progressIndex.has(row.user_id)) progressIndex.set(row.user_id, new Map())
    progressIndex.get(row.user_id)!.set(row.lesson_id, {
      completed: row.completed,
      completed_at: row.completed_at,
    })
  }

  // 9. Assemble result (C2: per-student accessible lesson set via cohort access map)
  const result: StudentProgress[] = []

  for (const userId of enrolledUserIds) {
    const userInfo = usersMap.get(userId)
    if (!userInfo) continue

    const userProgress = progressIndex.get(userId) ?? new Map()
    const userCohortsForUser = userCohortIds.get(userId) ?? []

    const courseStats = courses
      .map((course) => {
        const accessibleModuleIds = new Set<string>()
        for (const cohortId of userCohortsForUser) {
          const cohortCourseMap = cohortAccessMap.get(cohortId)
          if (!cohortCourseMap?.has(course.id)) continue // no access via this cohort
          const access = cohortCourseMap.get(course.id)
          if (access === null) {
            // null = full access
            for (const modId of courseModulesMap.get(course.id) ?? []) {
              accessibleModuleIds.add(modId)
            }
          } else if (access !== undefined) {
            for (const modId of access) accessibleModuleIds.add(modId)
          }
        }

        if (accessibleModuleIds.size === 0) return null // student has no access to this course

        const lessonIds = [
          ...new Set(
            [...accessibleModuleIds].flatMap((modId) => moduleLessonsMap.get(modId) ?? [])
          ),
        ]

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
      .filter((s): s is NonNullable<typeof s> => s !== null)

    if (courseStats.length === 0) continue

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
  await requireAdmin()

  // 1. Fetch all available lessons with module info (C1: is_available filter)
  const { data: lessonsRaw, error: lessonsError } = await supabaseAdmin
    .from('lessons')
    .select('id, title, sort_order, modules!inner(id, title, sort_order, course_id)')
    .eq('modules.course_id', courseId)
    .is('deleted_at', null)
    .eq('is_available', true)
  if (lessonsError) throw new Error(lessonsError.message)
  if (!lessonsRaw || lessonsRaw.length === 0) return []

  // 2. Count distinct enrolled students for this course (C4: deduplicate via Set)
  const { data: cohortCourses, error: ccError } = await supabaseAdmin
    .from('cohort_courses')
    .select('cohort_id')
    .eq('course_id', courseId)
  if (ccError) throw new Error(ccError.message)

  const cohortIds = (cohortCourses ?? []).map((cc) => cc.cohort_id)
  let totalEnrolledStudents = 0

  if (cohortIds.length > 0) {
    const { data: memberRows, error: countError } = await supabaseAdmin
      .from('cohort_members')
      .select('user_id')
      .in('cohort_id', cohortIds)
      .eq('status', 'ACTIVE')
    if (countError) throw new Error(countError.message)
    totalEnrolledStudents = new Set((memberRows ?? []).map((m) => m.user_id)).size
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
  await requireAdmin()
  const { data, error } = await supabaseAdmin
    .from('courses')
    .select('id, title')
    .is('deleted_at', null)
    .order('sort_order')
  if (error) throw new Error(error.message)
  return data ?? []
}

export async function getCohortsForFilter(): Promise<{ id: string; name: string }[]> {
  await requireAdmin()
  const { data, error } = await supabaseAdmin
    .from('cohorts')
    .select('id, name')
    .order('name')
  if (error) throw new Error(error.message)
  return data ?? []
}
