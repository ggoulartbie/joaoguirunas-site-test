import type { Metadata } from 'next'
import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { PerfilClient, type PerfilClientProps } from './PerfilClient'

export const metadata: Metadata = { title: 'Perfil' }

export default async function PerfilPage() {
  // requireUser redireciona para /login se não autenticado
  const user = await requireUser()

  // Queries paralelas
  const [profileResult, membershipsResult, paymentsResult, authUserResult] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('id, name, avatar_url, bio, role, stripe_customer_id, created_at')
      .eq('id', user.id)
      .single(),
    supabaseAdmin
      .from('cohort_members')
      .select(`
        id, cohort_id, status, expires_at, auto_renew_enabled,
        next_renewal_at, joined_at, member_role,
        cohorts(id, name, slug, extension_price_cents, extension_duration_days,
                allows_auto_renewal, is_purchasable)
      `)
      .eq('user_id', user.id)
      .order('joined_at', { ascending: false }),
    supabaseAdmin
      .from('payments')
      .select('id, purchase_kind, amount_cents, status, paid_at, cohort_id, stripe_checkout_session_id, cohorts(name)')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50),
    supabaseAdmin.auth.admin.getUserById(user.id),
  ])

  const hasPassword = authUserResult.data?.user?.app_metadata?.has_password !== false

  return (
    <PerfilClient
      serverProfile={profileResult.data}
      serverEmail={authUserResult.data?.user?.email ?? ''}
      serverMemberships={(membershipsResult.data ?? []) as PerfilClientProps['serverMemberships']}
      serverPayments={(paymentsResult.data ?? []) as PerfilClientProps['serverPayments']}
      hasPassword={hasPassword}
    />
  )
}
