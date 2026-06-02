import 'server-only'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type Profile = Database['public']['Tables']['profiles']['Row']
type Role = Profile['role']

export const getCurrentUser = cache(async (): Promise<Profile | null> => {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return profile ?? null
})

export async function requireUser(): Promise<Profile> {
  const profile = await getCurrentUser()

  if (!profile) {
    redirect('/academy/login')
  }

  return profile
}

export async function requireRole(roles: Role[]): Promise<Profile> {
  const profile = await requireUser()

  if (!roles.includes(profile.role)) {
    redirect('/academy/403')
  }

  return profile
}

export async function requireAdmin(): Promise<Profile> {
  return requireRole(['ADMIN'])
}

export async function getSession() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  return user
}
