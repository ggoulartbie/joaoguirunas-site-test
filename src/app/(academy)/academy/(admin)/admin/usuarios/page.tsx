import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/helpers'
import { UsersClient } from './UsersClient'

export const metadata: Metadata = { title: 'Usuários' }

export default async function AdminUsuariosPage() {
  const adminProfile = await requireAdmin()

  const [{ data: profiles }, { data: cohorts }] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('id, name, avatar_url, bio, role, stripe_customer_id, created_at, updated_at')
      .order('created_at', { ascending: false }),
    supabaseAdmin
      .from('cohorts')
      .select('id, name')
      .order('name', { ascending: true }),
  ])

  // Fetch memberships for all profiles
  const { data: memberships } = await supabaseAdmin
    .from('cohort_members')
    .select('id, user_id, cohort_id, member_role, status, expires_at, cohorts!inner(name)')
    .order('joined_at', { ascending: false })

  // Batch fetch emails from auth.admin
  const { data: authList } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  const emailMap: Record<string, string> = {}
  const bannedSet = new Set<string>()
  for (const u of authList?.users ?? []) {
    if (u.email) emailMap[u.id] = u.email
    if (u.banned_until) bannedSet.add(u.id)
  }

  // Group memberships by user_id
  const membershipsByUser: Record<string, Array<{
    id: string
    cohort_id: string
    member_role: string
    status: string
    expires_at: string | null
    cohortName: string
  }>> = {}

  for (const m of memberships ?? []) {
    const cohort = m.cohorts as { name: string } | null
    if (!membershipsByUser[m.user_id]) membershipsByUser[m.user_id] = []
    membershipsByUser[m.user_id]!.push({
      id: m.id,
      cohort_id: m.cohort_id,
      member_role: m.member_role,
      status: m.status,
      expires_at: m.expires_at,
      cohortName: cohort?.name ?? '—',
    })
  }

  const users = (profiles ?? []).map((p) => ({
    ...p,
    email: emailMap[p.id] ?? '—',
    isBanned: bannedSet.has(p.id),
    memberships: membershipsByUser[p.id] ?? [],
  }))

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--hairline)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Usuários</p>
        <h1 className="mt-1 font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">Usuários</h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Gerencie perfis, matrículas e acessos
        </p>
      </div>
      <UsersClient initialUsers={users} cohorts={cohorts ?? []} currentAdminId={adminProfile.id} />
    </div>
  )
}
