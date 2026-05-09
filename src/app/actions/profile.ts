'use server'

import { createClient } from '@/lib/supabase/server'
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
  currentPassword: string,
  newPassword: string,
): Promise<{ error?: string }> {
  if (!currentPassword) return { error: 'Senha atual é obrigatória.' }
  if (newPassword.length < 8) return { error: 'Nova senha deve ter ao menos 8 caracteres.' }

  const supabase = await createClient()

  // Verify current password before allowing change — prevents session hijack
  const { data: { user } } = await supabase.auth.getUser()
  if (!user?.email) return { error: 'Sessão inválida.' }

  const { error: signInError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  })
  if (signInError) return { error: 'Senha atual incorreta.' }

  const { error } = await supabase.auth.updateUser({ password: newPassword })
  if (error) return { error: 'Erro ao alterar senha. Tente novamente.' }
  return {}
}
