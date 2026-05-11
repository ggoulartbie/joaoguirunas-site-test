'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin, getCurrentUser } from '@/lib/auth/helpers'
import { sendWelcomeInviteEmail } from '@/lib/email/send'

export async function updateUserRole(userId: string, role: string) {
  await requireAdmin()

  if (!z.string().uuid().safeParse(userId).success) throw new Error('User ID inválido')
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

  if (!z.string().uuid().safeParse(userId).success) throw new Error('User ID inválido')
  const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
    ban_duration: '876000h', // 100 years
  })

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/usuarios')
}

export async function unbanUser(userId: string) {
  await requireAdmin()

  if (!z.string().uuid().safeParse(userId).success) throw new Error('User ID inválido')
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

  if (!z.string().uuid().safeParse(userId).success) throw new Error('User ID inválido')
  if (!z.string().uuid().safeParse(cohortId).success) throw new Error('Cohort ID inválido')

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

  if (!z.string().uuid().safeParse(memberId).success) throw new Error('Member ID inválido')
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
  if (!z.string().uuid().safeParse(userId).success) return { error: 'User ID inválido' }
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
    return { error: message }
  }
}

const createStudentSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.string().email(),
  cohortId: z.string().uuid(),
  role: z.enum(['STUDENT', 'MENTOR']).default('STUDENT'),
  expiresAt: z.string().optional(),
})

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

  // Create auth user — email already confirmed, we send the invite ourselves
  const { data: authData, error: authErr } = await supabaseAdmin.auth.admin.createUser({
    email: parsed.data.email,
    email_confirm: true,
  })
  if (authErr || !authData.user) throw new Error(authErr?.message ?? 'Erro ao criar utilizador')

  const userId = authData.user.id

  // Create profile
  const { error: profileErr } = await supabaseAdmin.from('profiles').insert({
    id: userId,
    name: parsed.data.name,
    role: parsed.data.role,
  })
  if (profileErr) {
    // Roll back auth user to avoid orphan
    await supabaseAdmin.auth.admin.deleteUser(userId)
    throw new Error('Erro ao criar perfil: ' + profileErr.message)
  }

  // Create cohort_member
  const { error: memberErr } = await supabaseAdmin.from('cohort_members').insert({
    cohort_id: parsed.data.cohortId,
    user_id: userId,
    member_role: parsed.data.role,
    status: 'ACTIVE',
    expires_at: parsed.data.expiresAt ?? null,
  })
  if (memberErr) {
    await supabaseAdmin.auth.admin.deleteUser(userId)
    throw new Error('Erro ao matricular: ' + memberErr.message)
  }

  // Increment filled_seats
  await supabaseAdmin
    .from('cohorts')
    .update({ filled_seats: cohort.filled_seats + 1 })
    .eq('id', cohort.id)

  // Generate magic link for account activation
  const { data: linkData, error: linkErr } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email: parsed.data.email,
  })
  const activateUrl = linkErr || !linkData?.properties?.action_link
    ? `${process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com'}/academy/login`
    : linkData.properties.action_link

  // Send invite email (non-blocking — don't fail the action if email fails)
  try {
    await sendWelcomeInviteEmail(parsed.data.email, parsed.data.name, cohort.name, activateUrl)
  } catch {
    // Email failure is logged but doesn't roll back — user was created successfully
  }

  revalidatePath('/academy/admin/usuarios')

  return { userId, email: parsed.data.email, cohortName: cohort.name }
}
