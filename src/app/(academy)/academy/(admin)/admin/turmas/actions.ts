'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/helpers'
import { syncCohortWithStripe, syncCouponWithStripe } from '@/lib/payment/sync'
import type { Database } from '@/types/database'

type CohortInsert = Database['public']['Tables']['cohorts']['Insert']
type CohortUpdate = Database['public']['Tables']['cohorts']['Update']
type CouponInsert = Database['public']['Tables']['coupons']['Insert']

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
const uuidField = () => z.string().regex(UUID_RE, 'ID inválido')

// Represents a course selection: courseId → array of specific moduleIds (empty = all modules)
const cohortCourseSchema = z.object({
  courseId: uuidField(),
  includedModuleIds: z.array(uuidField()).default([]),
})

const cohortCrossExtensionSchema = z.object({
  targetCohortId: uuidField(),
  daysGranted: z.number().int().positive(),
  description: z.string().optional(),
  isActive: z.boolean().default(true),
})

const cohortSchema = z.object({
  slug: z.string().min(1).max(100).regex(/^[a-z0-9-]+$/, 'Slug: apenas letras minúsculas, números e hífens'),
  name: z.string().min(1).max(200),
  description: z.string().optional(),
  cover_image_url: z.string().url().optional().or(z.literal('')),
  status: z.enum(['DRAFT', 'OPEN', 'IN_PROGRESS', 'CLOSED', 'ARCHIVED']),
  start_date: z.string().optional(),
  end_date: z.string().optional(),
  total_seats: z.number().int().positive().optional(),
  access_duration_days: z.number().int().positive().optional(),
  group_url: z.string().url().optional().or(z.literal('')),
  has_live_sessions: z.boolean().default(false),
  has_support: z.boolean().default(false),
  is_purchasable: z.boolean().default(false),
  has_public_page: z.boolean().default(false),
  entry_price_cents: z.number().int().positive().optional(),
  extension_price_cents: z.number().int().positive().optional(),
  max_installments_entry: z.number().int().min(1).max(12).default(1),
  max_installments_extension: z.number().int().min(1).max(12).default(1),
  extension_duration_days: z.number().int().positive().optional(),
  allows_auto_renewal: z.boolean().default(false),
  stripe_price_entry_id: z.string().optional(),
  payment_provider: z.enum(['STRIPE', 'INFINITEPAY']).default('STRIPE'),
  infinitepay_handle: z.string().optional(),
  infinitepay_checkout_url: z.string().url().optional().or(z.literal('')),
  // B7: course selections
  cohortCourses: z.array(cohortCourseSchema).default([]),
  // B6: cross extension rules
  crossExtensions: z.array(cohortCrossExtensionSchema).default([]),
})

async function saveCohortCourses(cohortId: string, cohortCourses: z.infer<typeof cohortCourseSchema>[]) {
  // Delete existing associations before reinserting (idempotent replace)
  await supabaseAdmin.from('cohort_courses').delete().eq('cohort_id', cohortId)

  if (cohortCourses.length === 0) return

  const { error } = await supabaseAdmin.from('cohort_courses').insert(
    cohortCourses.map((cc, idx) => ({
      cohort_id: cohortId,
      course_id: cc.courseId,
      included_module_ids: cc.includedModuleIds,
      sort_order: idx,
    }))
  )
  if (error) throw new Error('Erro ao salvar cursos da turma: ' + error.message)
}

async function saveCrossExtensions(cohortId: string, extensions: z.infer<typeof cohortCrossExtensionSchema>[]) {
  // Delete existing extensions before reinserting
  await supabaseAdmin.from('cohort_cross_extensions').delete().eq('source_cohort_id', cohortId)

  if (extensions.length === 0) return

  const { error } = await supabaseAdmin.from('cohort_cross_extensions').insert(
    extensions
      .filter((e) => e.targetCohortId)
      .map((e) => ({
        source_cohort_id: cohortId,
        target_cohort_id: e.targetCohortId,
        days_granted: e.daysGranted,
        description: e.description ?? null,
        is_active: e.isActive,
      }))
  )
  if (error) throw new Error('Erro ao salvar extensões cruzadas: ' + error.message)
}

export async function createCohort(data: z.infer<typeof cohortSchema>) {
  await requireAdmin()

  const parsed = cohortSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const insertData: CohortInsert = {
    slug: parsed.data.slug,
    name: parsed.data.name,
    description: parsed.data.description || null,
    cover_image_url: parsed.data.cover_image_url || null,
    status: parsed.data.status,
    start_date: parsed.data.start_date || null,
    end_date: parsed.data.end_date || null,
    total_seats: parsed.data.total_seats ?? null,
    access_duration_days: parsed.data.access_duration_days ?? null,
    group_url: parsed.data.group_url || null,
    has_live_sessions: parsed.data.has_live_sessions,
    has_support: parsed.data.has_support,
    is_purchasable: parsed.data.is_purchasable,
    has_public_page: parsed.data.has_public_page,
    entry_price_cents: parsed.data.entry_price_cents ?? null,
    extension_price_cents: parsed.data.extension_price_cents ?? null,
    max_installments_entry: parsed.data.max_installments_entry,
    max_installments_extension: parsed.data.max_installments_extension,
    extension_duration_days: parsed.data.extension_duration_days ?? null,
    allows_auto_renewal: parsed.data.allows_auto_renewal,
    stripe_price_entry_id: parsed.data.stripe_price_entry_id ?? null,
  }

  const { data: cohort, error } = await supabaseAdmin
    .from('cohorts')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .insert({ ...insertData, payment_provider: parsed.data.payment_provider, infinitepay_handle: parsed.data.infinitepay_handle ?? null, infinitepay_checkout_url: parsed.data.infinitepay_checkout_url || null } as any)
    .select('id')
    .single()

  if (error || !cohort) throw new Error(error?.message ?? 'Erro ao criar turma')

  // B7: persist course associations
  await saveCohortCourses(cohort.id, parsed.data.cohortCourses)

  // B6: persist cross extension rules
  await saveCrossExtensions(cohort.id, parsed.data.crossExtensions)

  if (parsed.data.is_purchasable && parsed.data.payment_provider !== 'INFINITEPAY') {
    await syncCohortWithStripe(cohort.id)
  }

  revalidatePath('/academy/admin/turmas')
  return cohort
}

export async function updateCohort(cohortId: string, data: z.infer<typeof cohortSchema>) {
  await requireAdmin()

  if (!UUID_RE.test(cohortId)) throw new Error('ID inválido')

  const parsed = cohortSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const updateData: CohortUpdate = {
    slug: parsed.data.slug,
    name: parsed.data.name,
    description: parsed.data.description || null,
    cover_image_url: parsed.data.cover_image_url || null,
    status: parsed.data.status,
    start_date: parsed.data.start_date || null,
    end_date: parsed.data.end_date || null,
    total_seats: parsed.data.total_seats ?? null,
    access_duration_days: parsed.data.access_duration_days ?? null,
    group_url: parsed.data.group_url || null,
    has_live_sessions: parsed.data.has_live_sessions,
    has_support: parsed.data.has_support,
    is_purchasable: parsed.data.is_purchasable,
    has_public_page: parsed.data.has_public_page,
    entry_price_cents: parsed.data.entry_price_cents ?? null,
    extension_price_cents: parsed.data.extension_price_cents ?? null,
    max_installments_entry: parsed.data.max_installments_entry,
    max_installments_extension: parsed.data.max_installments_extension,
    extension_duration_days: parsed.data.extension_duration_days ?? null,
    allows_auto_renewal: parsed.data.allows_auto_renewal,
    stripe_price_entry_id: parsed.data.stripe_price_entry_id ?? null,
  }

  const { error } = await supabaseAdmin
    .from('cohorts')
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .update({ ...updateData, payment_provider: parsed.data.payment_provider, infinitepay_handle: parsed.data.infinitepay_handle ?? null, infinitepay_checkout_url: parsed.data.infinitepay_checkout_url || null } as any)
    .eq('id', cohortId)

  if (error) throw new Error(error.message)

  // B7: replace course associations
  await saveCohortCourses(cohortId, parsed.data.cohortCourses)

  // B6: replace cross extension rules
  await saveCrossExtensions(cohortId, parsed.data.crossExtensions)

  if (parsed.data.is_purchasable && parsed.data.payment_provider !== 'INFINITEPAY') {
    await syncCohortWithStripe(cohortId)
  }

  revalidatePath('/academy/admin/turmas')
  revalidatePath(`/academy/admin/turmas/${cohortId}`)
}

export async function addMemberToCohort(
  cohortId: string,
  userId: string,
  memberRole: 'STUDENT' | 'MENTOR' = 'STUDENT',
  expiresAt?: string,
) {
  await requireAdmin()

  const { data: existing } = await supabaseAdmin
    .from('cohort_members')
    .select('id, status')
    .eq('cohort_id', cohortId)
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) {
    const { error } = await supabaseAdmin
      .from('cohort_members')
      .update({
        status: 'ACTIVE',
        member_role: memberRole,
        expires_at: expiresAt ?? null,
        joined_at: new Date().toISOString(),
      })
      .eq('id', existing.id)
    if (error) throw new Error(error.message)
  } else {
    const { error } = await supabaseAdmin.from('cohort_members').insert({
      cohort_id: cohortId,
      user_id: userId,
      member_role: memberRole,
      status: 'ACTIVE',
      expires_at: expiresAt ?? null,
    })
    if (error) throw new Error(error.message)

    // Increment filled_seats manually (no RPC in generated types)
    const { data: cohortRow } = await supabaseAdmin
      .from('cohorts')
      .select('filled_seats')
      .eq('id', cohortId)
      .single()
    if (cohortRow) {
      await supabaseAdmin
        .from('cohorts')
        .update({ filled_seats: cohortRow.filled_seats + 1 })
        .eq('id', cohortId)
    }
  }

  revalidatePath(`/academy/admin/turmas/${cohortId}`)
}

export async function removeMemberFromCohort(memberId: string) {
  await requireAdmin()

  const { data: member } = await supabaseAdmin
    .from('cohort_members')
    .select('cohort_id')
    .eq('id', memberId)
    .single()

  const { error } = await supabaseAdmin
    .from('cohort_members')
    .update({ status: 'REMOVED' })
    .eq('id', memberId)

  if (error) throw new Error(error.message)
  if (member) revalidatePath(`/academy/admin/turmas/${member.cohort_id}`)
}

export async function createCoupon(data: {
  cohortId: string
  code: string
  discountKind: 'PERCENT' | 'FIXED'
  discountValue: number
  appliesTo: 'ENTRY' | 'EXTENSION' | 'BOTH'
  validFrom?: string
  validUntil?: string
  maxUses?: number
}) {
  await requireAdmin()

  const schema = z.object({
    cohortId: z.string().uuid(),
    code: z.string().min(1).max(50).toUpperCase(),
    discountKind: z.enum(['PERCENT', 'FIXED']),
    discountValue: z.number().int().positive(),
    appliesTo: z.enum(['ENTRY', 'EXTENSION', 'BOTH']),
    validFrom: z.string().optional(),
    validUntil: z.string().optional(),
    maxUses: z.number().int().positive().optional(),
  })

  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join(', '))

  const insert: CouponInsert = {
    cohort_id: parsed.data.cohortId,
    code: parsed.data.code,
    discount_kind: parsed.data.discountKind,
    discount_value: parsed.data.discountValue,
    applies_to: parsed.data.appliesTo,
    valid_from: parsed.data.validFrom ?? null,
    valid_until: parsed.data.validUntil ?? null,
    max_uses: parsed.data.maxUses ?? null,
    is_active: true,
  }

  const { data: coupon, error } = await supabaseAdmin
    .from('coupons')
    .insert(insert)
    .select('id')
    .single()

  if (error || !coupon) throw new Error(error?.message ?? 'Erro ao criar cupom')

  await syncCouponWithStripe(coupon.id)
  revalidatePath(`/academy/admin/turmas/${data.cohortId}`)
}

// B4: memberRole parameter added
export async function addMemberByCohortEmail(
  cohortId: string,
  email: string,
  memberRole: 'STUDENT' | 'MENTOR' = 'STUDENT',
  expiresAt?: string,
) {
  await requireAdmin()

  const { data: listResult } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  const user = listResult?.users.find((u) => u.email === email)
  if (!user) throw new Error(`Usuário com e-mail "${email}" não encontrado na plataforma`)

  await addMemberToCohort(cohortId, user.id, memberRole, expiresAt)
}

export async function createLiveSession(data: {
  cohortId: string
  title: string
  description?: string
  scheduledAt: string
  durationMinutes: number
  meetingUrl?: string
  recordingUrl?: string
}) {
  await requireAdmin()

  const schema = z.object({
    cohortId: z.string().uuid(),
    title: z.string().min(1).max(300),
    description: z.string().optional(),
    scheduledAt: z.string().min(1),
    durationMinutes: z.number().int().positive().default(90),
    meetingUrl: z.string().url().optional().or(z.literal('')),
    recordingUrl: z.string().url().optional().or(z.literal('')),
  })

  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join(', '))

  const { error } = await supabaseAdmin.from('live_sessions').insert({
    cohort_id: parsed.data.cohortId,
    title: parsed.data.title,
    description: parsed.data.description ?? null,
    scheduled_at: parsed.data.scheduledAt,
    duration_minutes: parsed.data.durationMinutes,
    meeting_url: parsed.data.meetingUrl || null,
    recording_url: parsed.data.recordingUrl || null,
  })

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/turmas/${data.cohortId}`)
}

export async function updateLiveSession(
  sessionId: string,
  cohortId: string,
  data: {
    title: string
    description?: string
    scheduledAt: string
    durationMinutes: number
    meetingUrl?: string
    recordingUrl?: string
  }
) {
  await requireAdmin()

  const schema = z.object({
    title: z.string().min(1).max(300),
    description: z.string().optional(),
    scheduledAt: z.string().min(1),
    durationMinutes: z.number().int().positive().default(90),
    meetingUrl: z.string().url().optional().or(z.literal('')),
    recordingUrl: z.string().url().optional().or(z.literal('')),
  })

  if (!UUID_RE.test(sessionId)) throw new Error('ID inválido')

  const parsed = schema.safeParse(data)
  if (!parsed.success) throw new Error(parsed.error.issues.map((i) => i.message).join(', '))

  const { error } = await supabaseAdmin
    .from('live_sessions')
    .update({
      title: parsed.data.title,
      description: parsed.data.description ?? null,
      scheduled_at: parsed.data.scheduledAt,
      duration_minutes: parsed.data.durationMinutes,
      meeting_url: parsed.data.meetingUrl || null,
      recording_url: parsed.data.recordingUrl || null,
    })
    .eq('id', sessionId)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/turmas/${cohortId}`)
}

export async function deleteLiveSession(sessionId: string, cohortId: string) {
  await requireAdmin()

  const { error } = await supabaseAdmin
    .from('live_sessions')
    .delete()
    .eq('id', sessionId)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/turmas/${cohortId}`)
}

export async function deactivateCoupon(couponId: string) {
  await requireAdmin()

  const { data: coupon, error: fetchErr } = await supabaseAdmin
    .from('coupons')
    .select('cohort_id')
    .eq('id', couponId)
    .single()

  if (fetchErr) throw new Error('Cupom não encontrado')

  const { error } = await supabaseAdmin
    .from('coupons')
    .update({ is_active: false })
    .eq('id', couponId)

  if (error) throw new Error(error.message)

  await syncCouponWithStripe(couponId)
  revalidatePath(`/academy/admin/turmas/${coupon.cohort_id}`)
}
