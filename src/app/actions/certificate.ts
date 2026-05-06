'use server'

import { z } from 'zod'
import { randomBytes } from 'crypto'
import { requireAdmin } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendCertificateReadyEmail } from '@/lib/email/send'
import { revalidatePath } from 'next/cache'

const issueSchema = z.object({
  userId: z.string().uuid(),
  courseId: z.string().uuid(),
  cohortId: z.string().uuid(),
  membershipId: z.string().uuid().optional(),
})

export async function issueCertificate(input: z.infer<typeof issueSchema>): Promise<{ verificationCode: string }> {
  await requireAdmin()

  const parsed = issueSchema.safeParse(input)
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join(', '))

  const { userId, courseId, cohortId, membershipId } = parsed.data

  // Idempotent: return existing certificate if already issued
  const { data: existing } = await supabaseAdmin
    .from('certificates')
    .select('verification_code')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('cohort_id', cohortId)
    .maybeSingle()

  if (existing) return { verificationCode: existing.verification_code }

  const verificationCode = randomBytes(6).toString('hex').toUpperCase()

  const { error } = await supabaseAdmin.from('certificates').insert({
    user_id: userId,
    course_id: courseId,
    cohort_id: cohortId,
    membership_id: membershipId ?? null,
    verification_code: verificationCode,
  })

  if (error) throw new Error('Erro ao emitir certificado: ' + error.message)

  // Fetch names for email — fire-and-forget
  sendCertificateEmail(userId, courseId, cohortId, verificationCode).catch(() => null)

  return { verificationCode }
}

/**
 * Auto-issues a certificate when a user completes 100% of a course in a cohort.
 * Idempotent — returns existing certificate if already issued.
 * Called fire-and-forget from markLessonComplete.
 */
export async function checkAndIssueCertificate(
  userId: string,
  courseId: string,
  cohortId: string,
): Promise<{ id: string; verification_code: string } | null> {
  // Idempotent: return existing if already issued
  const { data: existing } = await supabaseAdmin
    .from('certificates')
    .select('id, verification_code')
    .eq('user_id', userId)
    .eq('course_id', courseId)
    .eq('cohort_id', cohortId)
    .maybeSingle()

  if (existing) return existing

  // Count total non-deleted lessons in this course (via modules join)
  const { data: lessonIds } = await supabaseAdmin
    .from('lessons')
    .select('id, modules!inner(course_id)')
    .eq('modules.course_id', courseId)
    .is('deleted_at', null)

  const totalLessons = lessonIds?.length ?? 0
  if (totalLessons === 0) return null

  // Count completed lesson_progress rows for this user on those lesson IDs
  const ids = lessonIds!.map((l) => l.id)
  const { data: completedRows } = await supabaseAdmin
    .from('lesson_progress')
    .select('lesson_id')
    .eq('user_id', userId)
    .eq('completed', true)
    .in('lesson_id', ids)

  const completedCount = completedRows?.length ?? 0
  if (completedCount < totalLessons) return null

  // 100% complete — issue certificate
  const verificationCode = randomBytes(6).toString('hex').toUpperCase()

  const { data: cert, error } = await supabaseAdmin
    .from('certificates')
    .insert({
      user_id: userId,
      course_id: courseId,
      cohort_id: cohortId,
      verification_code: verificationCode,
    })
    .select('id, verification_code')
    .single()

  if (error) throw new Error('Erro ao emitir certificado: ' + error.message)

  revalidatePath('/academy/certificados')
  sendCertificateEmail(userId, courseId, cohortId, verificationCode).catch(() => null)

  return cert
}

async function sendCertificateEmail(
  userId: string,
  courseId: string,
  cohortId: string,
  verificationCode: string
): Promise<void> {
  const [authUserResult, profileResult, courseResult, cohortResult] = await Promise.all([
    supabaseAdmin.auth.admin.getUserById(userId),
    supabaseAdmin.from('profiles').select('name').eq('id', userId).single(),
    supabaseAdmin.from('courses').select('title').eq('id', courseId).single(),
    supabaseAdmin.from('cohorts').select('name').eq('id', cohortId).single(),
  ])

  const email = authUserResult.data?.user?.email
  if (!email) return

  await sendCertificateReadyEmail(
    email,
    profileResult.data?.name ?? 'Aluno',
    courseResult.data?.title ?? 'Curso',
    cohortResult.data?.name ?? 'Turma',
    verificationCode,
  )
}
