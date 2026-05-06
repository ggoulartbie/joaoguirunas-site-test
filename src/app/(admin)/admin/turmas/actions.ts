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
})

export async function createCohort(data: z.infer<typeof cohortSchema>) {
  await requireAdmin()

  const parsed = cohortSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const insertData: CohortInsert = {
    ...parsed.data,
    cover_image_url: parsed.data.cover_image_url || null,
    group_url: parsed.data.group_url || null,
    description: parsed.data.description || null,
    start_date: parsed.data.start_date || null,
    end_date: parsed.data.end_date || null,
    total_seats: parsed.data.total_seats ?? null,
    access_duration_days: parsed.data.access_duration_days ?? null,
    entry_price_cents: parsed.data.entry_price_cents ?? null,
    extension_price_cents: parsed.data.extension_price_cents ?? null,
    extension_duration_days: parsed.data.extension_duration_days ?? null,
  }

  const { data: cohort, error } = await supabaseAdmin
    .from('cohorts')
    .insert(insertData)
    .select('id')
    .single()

  if (error || !cohort) throw new Error(error?.message ?? 'Erro ao criar turma')

  if (parsed.data.is_purchasable) {
    await syncCohortWithStripe(cohort.id)
  }

  revalidatePath('/admin/turmas')
  return cohort
}

export async function updateCohort(cohortId: string, data: z.infer<typeof cohortSchema>) {
  await requireAdmin()

  if (!z.string().uuid().safeParse(cohortId).success) throw new Error('ID inválido')

  const parsed = cohortSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(', '))
  }

  const updateData: CohortUpdate = {
    ...parsed.data,
    cover_image_url: parsed.data.cover_image_url || null,
    group_url: parsed.data.group_url || null,
    description: parsed.data.description || null,
    start_date: parsed.data.start_date || null,
    end_date: parsed.data.end_date || null,
    total_seats: parsed.data.total_seats ?? null,
    access_duration_days: parsed.data.access_duration_days ?? null,
    entry_price_cents: parsed.data.entry_price_cents ?? null,
    extension_price_cents: parsed.data.extension_price_cents ?? null,
    extension_duration_days: parsed.data.extension_duration_days ?? null,
  }

  const { error } = await supabaseAdmin
    .from('cohorts')
    .update(updateData)
    .eq('id', cohortId)

  if (error) throw new Error(error.message)

  // Sempre re-sincroniza ao salvar (idempotente)
  if (parsed.data.is_purchasable) {
    await syncCohortWithStripe(cohortId)
  }

  revalidatePath('/admin/turmas')
  revalidatePath(`/admin/turmas/${cohortId}`)
}

export async function addMemberToCohort(cohortId: string, userId: string, expiresAt?: string) {
  await requireAdmin()

  const { data: existing } = await supabaseAdmin
    .from('cohort_members')
    .select('id, status')
    .eq('cohort_id', cohortId)
    .eq('user_id', userId)
    .maybeSingle()

  if (existing) {
    // Reativa membro existente
    const { error } = await supabaseAdmin
      .from('cohort_members')
      .update({
        status: 'ACTIVE',
        expires_at: expiresAt ?? null,
        joined_at: new Date().toISOString(),
      })
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

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    await (supabaseAdmin.rpc as any)('increment_filled_seats', { p_cohort_id: cohortId })
  }

  revalidatePath(`/admin/turmas/${cohortId}`)
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
  if (member) revalidatePath(`/admin/turmas/${member.cohort_id}`)
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
  revalidatePath(`/admin/turmas/${data.cohortId}`)
}

export async function addMemberByCohortEmail(
  cohortId: string,
  email: string,
  expiresAt?: string
) {
  await requireAdmin()

  // Look up user by email in auth.users via admin API
  const { data: listResult } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  const user = listResult?.users.find((u) => u.email === email)
  if (!user) throw new Error(`Usuário com e-mail "${email}" não encontrado na plataforma`)

  await addMemberToCohort(cohortId, user.id, expiresAt)
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
  revalidatePath(`/admin/turmas/${coupon.cohort_id}`)
}
