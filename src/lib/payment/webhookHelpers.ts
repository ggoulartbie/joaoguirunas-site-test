import 'server-only'
import { supabaseAdmin } from '@/lib/supabase/admin'

// Finds existing Supabase user by email or creates a new one.
// Strategy: attempt createUser first (fast path); paginate listUsers on conflict.
export async function findOrCreateUser(
  email: string,
  name: string,
): Promise<{ userId: string; isNew: boolean }> {
  const { data: created, error: createErr } = await supabaseAdmin.auth.admin.createUser({
    email,
    user_metadata: { name },
    email_confirm: true,
  })

  if (!createErr) {
    if (!created.user) throw new Error(`Failed to create user for ${email}: no user returned`)
    return { userId: created.user.id, isNew: true }
  }

  const isAlreadyRegistered =
    createErr.message?.toLowerCase().includes('already been registered') ||
    (createErr as { code?: string }).code === 'email_exists'

  if (!isAlreadyRegistered) {
    throw new Error(`Failed to create user for ${email}: ${createErr.message}`)
  }

  let page = 1
  while (true) {
    const { data: listResult } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 100 })
    const users = listResult?.users ?? []
    const found = users.find((u) => u.email === email)
    if (found) return { userId: found.id, isNew: false }
    if (users.length < 100) break
    page++
  }

  throw new Error(`User ${email} reported as existing but could not be located`)
}

export async function generateMagicLink(email: string): Promise<string | null> {
  const appUrl = (process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com').replace(/\/+$/, '')

  const { data, error } = await supabaseAdmin.auth.admin.generateLink({
    type: 'magiclink',
    email,
    options: {
      redirectTo: `${appUrl}/academy/meus-cursos`,
    },
  })

  if (error || !data.properties?.action_link) {
    console.error('Failed to generate magic link:', error?.message)
    return null
  }

  return data.properties.action_link
}
