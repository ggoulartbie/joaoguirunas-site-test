'use server'

import 'server-only'
import bcrypt from 'bcryptjs'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendPasswordResetEmail } from '@/lib/email/send'

// Janela de validade da senha temporária. Curta o suficiente para reduzir exposição
// se o email for comprometido; longa o suficiente para o usuário ler o email.
const TEMP_PASSWORD_TTL_MINUTES = 60
// Intervalo mínimo entre solicitações de reset para o mesmo email. Mitiga abuso
// e enchimento de inbox sem bloquear retentativas legítimas.
const RATE_LIMIT_SECONDS = 60

const ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'

function generateTempPassword(): string {
  const bytes = new Uint8Array(12)
  crypto.getRandomValues(bytes)
  let out = ''
  for (let i = 0; i < 12; i++) out += ALLOWED_CHARS[bytes[i]! % ALLOWED_CHARS.length]
  return out
}

// Resposta sempre "ok" para não vazar quais emails existem (enumeration).
// Erros internos são logados no Sentry; usuário vê mensagem genérica.
export async function requestPasswordReset(email: string): Promise<{ ok: true }> {
  const normalized = email.trim().toLowerCase()
  if (!normalized || !normalized.includes('@')) return { ok: true }

  try {
    // Encontrar usuário pelo email — usar listUsers paginado é ruim, mas Supabase
    // admin não expõe getByEmail. Como alternativa: query direto em auth.users via SQL,
    // mas isso requer policy. Usamos listUsers limitado: para volume pequeno é aceitável.
    let foundUserId: string | null = null
    let foundName: string | null = null
    let page = 1
    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 })
      if (error) throw new Error(error.message)
      const u = data?.users.find((x) => x.email?.toLowerCase() === normalized)
      if (u) {
        foundUserId = u.id
        foundName = (u.user_metadata?.name as string | undefined) ?? null
        break
      }
      if (!data?.users || data.users.length < 200) break
      page++
      if (page > 25) break // teto defensivo (5k usuários)
    }

    if (!foundUserId) return { ok: true }

    // Rate limit: ler último request
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('name, temp_password_requested_at')
      .eq('id', foundUserId)
      .single()

    if (profile?.temp_password_requested_at) {
      const last = new Date(profile.temp_password_requested_at).getTime()
      const since = (Date.now() - last) / 1000
      if (since < RATE_LIMIT_SECONDS) {
        // Silenciosamente ignora — não revela ao usuário que houve rate limit
        return { ok: true }
      }
    }

    const tempPassword = generateTempPassword()
    const hash = await bcrypt.hash(tempPassword, 10)
    const expiresAt = new Date(Date.now() + TEMP_PASSWORD_TTL_MINUTES * 60 * 1000).toISOString()
    const now = new Date().toISOString()

    const { error: updateErr } = await supabaseAdmin
      .from('profiles')
      .update({
        temp_password_hash: hash,
        temp_password_expires_at: expiresAt,
        temp_password_requested_at: now,
      })
      .eq('id', foundUserId)
    if (updateErr) throw new Error('Erro ao salvar senha temporária: ' + updateErr.message)

    const displayName = (profile?.name as string | undefined) ?? foundName ?? 'aluno'

    try {
      await sendPasswordResetEmail(
        normalized,
        displayName,
        tempPassword,
        TEMP_PASSWORD_TTL_MINUTES,
      )
    } catch (err) {
      // Email falhou — limpa o que salvamos para evitar inconsistência (senha temp
      // gerada mas usuário não recebeu). Próxima tentativa não bate em rate limit.
      await supabaseAdmin
        .from('profiles')
        .update({
          temp_password_hash: null,
          temp_password_expires_at: null,
          temp_password_requested_at: null,
        })
        .eq('id', foundUserId)
      Sentry.captureException(err, {
        extra: { email: normalized, step: 'requestPasswordReset.email' },
      })
      // Mantém resposta ok pra não vazar info; usuário pode tentar de novo
    }

    return { ok: true }
  } catch (err) {
    Sentry.captureException(err, {
      extra: { email: normalized, step: 'requestPasswordReset' },
    })
    return { ok: true }
  }
}

// Verifica se a senha informada bate com a senha temporária válida.
// Se bater: promove a senha temp a senha real, marca has_set_password=false
// (middleware vai forçar redefinir), limpa os campos temp e retorna true.
// Senão (não bate, expirou, ou usuário não existe): retorna false.
// LoginForm chama isso como fallback quando signInWithPassword falha.
export async function redeemTempPassword(
  email: string,
  password: string,
): Promise<{ success: boolean }> {
  const normalized = email.trim().toLowerCase()
  if (!normalized || !password) return { success: false }

  try {
    let foundUserId: string | null = null
    let page = 1
    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({ page, perPage: 200 })
      if (error) return { success: false }
      const u = data?.users.find((x) => x.email?.toLowerCase() === normalized)
      if (u) {
        foundUserId = u.id
        break
      }
      if (!data?.users || data.users.length < 200) break
      page++
      if (page > 25) break
    }

    if (!foundUserId) return { success: false }

    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('temp_password_hash, temp_password_expires_at')
      .eq('id', foundUserId)
      .single()

    if (!profile?.temp_password_hash || !profile.temp_password_expires_at) {
      return { success: false }
    }

    const expired = new Date(profile.temp_password_expires_at).getTime() < Date.now()
    if (expired) {
      // Limpa oportunisticamente
      await supabaseAdmin
        .from('profiles')
        .update({
          temp_password_hash: null,
          temp_password_expires_at: null,
        })
        .eq('id', foundUserId)
      return { success: false }
    }

    const matches = await bcrypt.compare(password, profile.temp_password_hash)
    if (!matches) return { success: false }

    // Match — promove senha temp a senha real
    const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(foundUserId, {
      password,
    })
    if (updErr) {
      Sentry.captureException(new Error('redeemTempPassword: updateUserById failed: ' + updErr.message))
      return { success: false }
    }

    // Limpa senha temp e marca has_set_password=false para forçar redefinição
    const { error: profileErr } = await supabaseAdmin
      .from('profiles')
      .update({
        temp_password_hash: null,
        temp_password_expires_at: null,
        has_set_password: false,
      })
      .eq('id', foundUserId)
    if (profileErr) {
      Sentry.captureException(new Error('redeemTempPassword: profile update failed: ' + profileErr.message))
      // Senha já foi promovida — segue mesmo assim, mas registra
    }

    return { success: true }
  } catch (err) {
    Sentry.captureException(err, {
      extra: { email: normalized, step: 'redeemTempPassword' },
    })
    return { success: false }
  }
}
