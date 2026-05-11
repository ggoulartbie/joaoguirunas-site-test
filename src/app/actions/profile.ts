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

  // Fonte autoritativa de has_password vem do app_metadata (só admin escreve lá)
  const { data: adminUser } = await supabaseAdmin.auth.admin.getUserById(user.id)
  const hasPassword = adminUser?.user?.app_metadata?.has_password !== false

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

  // Marcar que o usuário agora tem senha definida
  if (!hasPassword) {
    await supabaseAdmin.auth.admin.updateUserById(user.id, {
      app_metadata: { has_password: true },
    })
  }

  return {}
}
