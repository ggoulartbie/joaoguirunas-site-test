'use server'

import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'

export async function updateProfile(name: string, bio: string): Promise<{ error?: string }> {
  if (!name.trim()) return { error: 'Nome não pode estar vazio.' }

  const user = await requireUser()
  const supabase = await createClient()

  const { error } = await supabase
    .from('profiles')
    .update({ name: name.trim(), bio: bio.trim() || null })
    .eq('id', user.id)

  if (error) return { error: 'Erro ao salvar perfil. Tente novamente.' }
  return {}
}

export async function changePassword(
  currentPassword: string | null,
  newPassword: string,
): Promise<{ error?: string }> {
  if (newPassword.length < 8) return { error: 'Nova senha deve ter ao menos 8 caracteres.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return { error: 'Sessão inválida.' }

  const { data: profileData } = await supabaseAdmin
    .from('profiles')
    .select('has_set_password')
    .eq('id', user.id)
    .single()
  const hasPassword = profileData?.has_set_password !== false

  if (hasPassword) {
    if (!currentPassword) return { error: 'Informe a senha atual.' }
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: user.email,
      password: currentPassword,
    })
    if (signInError) return { error: 'Senha atual incorreta.' }
  }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: 'Erro ao alterar senha. Tente novamente.' }

  if (!hasPassword) {
    await supabaseAdmin
      .from('profiles')
      .update({ has_set_password: true })
      .eq('id', user.id)
  }

  return {}
}

// Define senha quando o usuário já provou identidade via sessão ativa:
// - primeiro acesso (login com senha temporária, has_set_password=false)
// - recuperação de senha (sessão de recovery do Supabase)
// Não exige senha atual — a sessão autenticada é a prova.
export async function setMyPassword(newPassword: string): Promise<{ error?: string }> {
  if (newPassword.length < 8) return { error: 'Senha deve ter ao menos 8 caracteres.' }

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Sessão inválida.' }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: 'Erro ao definir senha. Tente novamente.' }

  await supabaseAdmin
    .from('profiles')
    .update({ has_set_password: true })
    .eq('id', user.id)

  return {}
}
