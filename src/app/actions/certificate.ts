'use server'

import { z } from 'zod'
import { randomBytes } from 'crypto'
import { requireAdmin } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendCertificateReadyEmail } from '@/lib/email/send'

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
