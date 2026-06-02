'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

const uuidRegex = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/
const isUUID = (v: string) => uuidRegex.test(v)
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin, getCurrentUser } from '@/lib/auth/helpers'
import { sendWelcomeInviteEmail } from '@/lib/email/send'

export async function updateUserRole(userId: string, role: string) {
  await requireAdmin()

  if (!isUUID(userId)) throw new Error('User ID inválido')
  const parsed = z.enum(['STUDENT', 'MENTOR', 'SUPPORT', 'ADMIN']).safeParse(role)
  if (!parsed.success) throw new Error('Role inválida')

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ role: parsed.data })
    .eq('id', userId)

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/usuarios')
}

export async function banUser(userId: string) {
  await requireAdmin()

  if (!isUUID(userId)) throw new Error('User ID inválido')
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    ban_duration: '876000h', // 100 years
  })

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/usuarios')
}

export async function unbanUser(userId: string) {
  await requireAdmin()

  if (!isUUID(userId)) throw new Error('User ID inválido')
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    ban_duration: 'none',
  })

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/usuarios')
}

export async function grantCohortAccess(
  userId: string,
  cohortId: string,
  expiresAt?: string,
) {
  await requireAdmin()

  if (!isUUID(userId)) throw new Error('User ID inválido')
  if (!isUUID(cohortId)) throw new Error('Cohort ID inválido')

  const { data: existing } = await supabaseAdmin
    .from('cohort_members')
    .select('id, status')
    .eq('cohort_id', cohortId)
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabaseAdmin
      .from('cohort_members')
      .update({ status: 'ACTIVE', expires_at: expiresAt ?? null, joined_at: new Date().toISOString() })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabaseAdmin.from('cohort_members').insert({
      cohort_id: cohortId,
      user_id: userId,
      member_role: 'STUDENT',
      status: 'ACTIVE',
      expires_at: expiresAt ?? null,
    })
    if (error) throw new Error(error.message)

    const { data: cohort } = await supabaseAdmin
      .from('cohorts')
      .select('filled_seats')
      .eq('id', cohortId)
      .single()
    if (cohort) {
      await supabaseAdmin
        .from('cohorts')
        .update({ filled_seats: cohort.filled_seats + 1 })
        .eq('id', cohortId)
    }
  }

  revalidatePath('/academy/admin/usuarios')
}

export async function extendMembership(memberId: string, newExpiresAt: string) {
  await requireAdmin()

  if (!isUUID(memberId)) throw new Error('Member ID inválido')
  if (!z.string().datetime().safeParse(newExpiresAt).success) throw new Error('Data de expiração inválida (ISO 8601 esperado)')
  if (new Date(newExpiresAt) <= new Date()) throw new Error('Data de expiração deve ser no futuro')

  const { error } = await supabaseAdmin
    .from('cohort_members')
    .update({ expires_at: newExpiresAt, status: 'ACTIVE' })
    .eq('id', memberId)

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/usuarios')
}

export async function deleteUser(userId: string): Promise<{ success: true } | { error: string }> {
  const admin = await getCurrentUser()
  if (!admin || admin.role !== 'ADMIN') return { error: 'Não autorizado' }
  if (!isUUID(userId)) return { error: 'User ID inválido' }
  if (admin.id === userId) return { error: 'Não é possível excluir a própria conta' }

  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)
    if (error) {
      // Supabase returns 404-like error when user doesn't exist — treat as success (idempotent)
      if (error.message?.toLowerCase().includes('not found') || error.status === 404) {
        return { success: true }
      }
      return { error: error.message }
    }
    revalidatePath('/academy/admin/usuarios')
    return { success: true }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[deleteUser] failed:', message)
    Sentry.captureException(err, { extra: { userId } })
    return { error: message }
  }
}

const createStudentSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  cohortId: z.string().regex(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, 'Cohort ID inválido'),
  role: z.enum(['STUDENT', 'MENTOR']).default('STUDENT'),
  expiresAt: z.string().optional(),
})

// Senha temporária: 12 caracteres alfanuméricos, evita 0/O/1/l/I para reduzir
// confusão no email. Força redefinição no primeiro login (has_set_password=false +
// enforcement no middleware).
function generateTempPassword(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
  const bytes = new Uint8Array(12)
  crypto.getRandomValues(bytes)
  let out = ''
  for (let i = 0; i < 12; i++) out += chars[bytes[i]! % chars.length]
  return out
}

export async function createStudentManually(data: z.infer<typeof createStudentSchema>): Promise<{
  userId: string
  email: string
  cohortName: string
}> {
  await requireAdmin()

  const parsed = createStudentSchema.safeParse(data)
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join(', '))

  // Fetch cohort name upfront for the email
  const { data: cohort, error: cohortErr } = await supabaseAdmin
    .from('cohorts')
    .select('id, name, filled_seats')
    .eq('id', parsed.data.cohortId)
    .single()
  if (cohortErr || !cohort) throw new Error('Turma não encontrada')

  const tempPassword = generateTempPassword()

  // Cria auth user já confirmado e com senha temporária.
  const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
    email: parsed.data.email,
    password: tempPassword,
    email_confirm: true,
    user_metadata: { name: parsed.data.name },
  })
  if (authErr || !authData.user) throw new Error(authErr?.message ?? 'Erro ao criar usuário')

  const userId = authData.user.id
  let seatsIncremented = false

  // Rollback completo se QUALQUER coisa abaixo falhar — inclui falha de email.
  // Email é crítico: sem ele, admin nunca vê a senha temporária e aluno fica órfão.
  try {
    const { error: profileErr } = await supabaseAdmin
      .from('profiles')
      .update({ name: parsed.data.name, role: parsed.data.role, has_set_password: false })
      .eq('id', userId)
    if (profileErr) throw new Error('Erro ao atualizar perfil: ' + profileErr.message)

    const { error: memberErr } = await supabaseAdmin.from('cohort_members').insert({
      cohort_id: parsed.data.cohortId,
      user_id: userId,
      member_role: parsed.data.role,
      status: 'ACTIVE',
      expires_at: parsed.data.expiresAt ?? null,
    })
    if (memberErr) throw new Error('Erro ao matricular: ' + memberErr.message)

    const { error: seatsErr } = await supabaseAdmin
      .from('cohorts')
      .update({ filled_seats: cohort.filled_seats + 1 })
      .eq('id', cohort.id)
    if (seatsErr) throw new Error('Erro ao atualizar vagas: ' + seatsErr.message)
    seatsIncremented = true

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com').replace(/\/+$/, '')
    const loginUrl = `${appUrl}/academy/login`

    await sendWelcomeInviteEmail(
      parsed.data.email,
      parsed.data.name,
      cohort.name,
      loginUrl,
      undefined,
      tempPassword,
    )
  } catch (err) {
    // Rollback: delete user (FK cascade limpa profile + cohort_member) e reverte seats
    await supabaseAdmin.auth.admin.deleteUser(userId).catch(() => {})
    if (seatsIncremented) {
      await supabaseAdmin
        .from('cohorts')
        .update({ filled_seats: cohort.filled_seats })
        .eq('id', cohort.id)
        .then(() => undefined, () => undefined)
    }
    Sentry.captureException(err, {
      extra: { email: parsed.data.email, cohort: cohort.name, step: 'createStudentManually' },
    })
    const msg = err instanceof Error ? err.message : 'Erro ao criar aluno'
    throw new Error(`${msg} — operação revertida, tente novamente.`)
  }

  revalidatePath('/academy/admin/usuarios')

  return { userId, email: parsed.data.email, cohortName: cohort.name }
}
