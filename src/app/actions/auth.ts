'use server'

import 'server-only'
import bcrypt from 'bcryptjs'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendPasswordResetEmail } from '@/lib/email/send'

// Server actions herdam o runtime do route handler que as invoca. No projeto, nenhum
// page/handler usa Edge runtime, então essas actions rodam em Node (necessário pra bcryptjs).

// Janela de validade da senha temporária. Curta o suficiente para reduzir exposição
// se o email for comprometido; longa o suficiente para o usuário ler o email.
const TEMP_PASSWORD_TTL_MINUTES = 60
// Intervalo mínimo entre solicitações de reset para o mesmo email. Mitiga abuso
// e enchimento de inbox sem bloquear retentativas legítimas.
const RATE_LIMIT_SECONDS = 60

const ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789'
const BCRYPT_COST = 10
// Validação mais estrita que ".includes('@')" para evitar batidas inúteis no DB.
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

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
  if (!EMAIL_REGEX.test(normalized)) return { ok: true }

  try {
    // RPC indexed: O(1) ao invés de listUsers paginado
    const { data: userId } = await supabaseAdmin.rpc('auth_get_user_id_by_email', {
      p_email: normalized,
    })

    if (!userId) return { ok: true }

    // Rate limit + buscar nome para email
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('name, temp_password_requested_at')
      .eq('id', userId)
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
    const hash = await bcrypt.hash(tempPassword, BCRYPT_COST)
    const expiresAt = new Date(Date.now() + TEMP_PASSWORD_TTL_MINUTES * 60 * 1000).toISOString()
    const now = new Date().toISOString()

    const { error: updateErr } = await supabaseAdmin
      .from('profiles')
      .update({
        temp_password_hash: hash,
        temp_password_expires_at: expiresAt,
        temp_password_requested_at: now,
      })
      .eq('id', userId)
    if (updateErr) throw new Error('Erro ao salvar senha temporária: ' + updateErr.message)

    const displayName = (profile?.name as string | undefined) ?? 'aluno'

    try {
      await sendPasswordResetEmail(
        normalized,
        displayName,
        tempPassword,
        TEMP_PASSWORD_TTL_MINUTES,
      )
    } catch (err) {
      // Email falhou — limpa hash/expires mas MANTÉM temp_password_requested_at
      // para que o rate limit continue valendo (impede atacante de usar falha de
      // email como bypass para flood).
      await supabaseAdmin
        .from('profiles')
        .update({
          temp_password_hash: null,
          temp_password_expires_at: null,
        })
        .eq('id', userId)
      Sentry.captureException(err, {
        extra: { email: normalized, step: 'requestPasswordReset.email' },
      })
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
// Se bater: marca has_set_password=false PRIMEIRO (força middleware a redirecionar),
// promove a senha temp a senha real, depois limpa os campos temp.
// Ordem importa: se updateUserById falhar, has_set_password ainda força redefinir.
// LoginForm chama isso como fallback quando signInWithPassword falha.
export async function redeemTempPassword(
  email: string,
  password: string,
): Promise<{ success: boolean }> {
  const normalized = email.trim().toLowerCase()
  if (!EMAIL_REGEX.test(normalized) || !password) return { success: false }

  try {
    // RPC retorna user_id + hash em uma query indexed.
    // Se não há reset pendente para esse email, retorna array vazio (rápido).
    const { data, error } = await supabaseAdmin.rpc(
      'auth_get_user_with_temp_password_by_email',
      { p_email: normalized },
    )
    if (error) return { success: false }

    const row = Array.isArray(data) && data.length > 0 ? data[0] : null
    if (!row?.user_id || !row.temp_hash || !row.temp_expires_at) {
      return { success: false }
    }

    const expired = new Date(row.temp_expires_at).getTime() < Date.now()
    if (expired) {
      // Limpa oportunisticamente
      await supabaseAdmin
        .from('profiles')
        .update({
          temp_password_hash: null,
          temp_password_expires_at: null,
        })
        .eq('id', row.user_id)
      return { success: false }
    }

    const matches = await bcrypt.compare(password, row.temp_hash)
    if (!matches) return { success: false }

    // Match! Marca has_set_password=false PRIMEIRO. Se isso falhar, abortar
    // (não promover a senha) — evita estado em que senha foi trocada mas
    // middleware não obriga redefinir.
    const { error: profileFlagErr } = await supabaseAdmin
      .from('profiles')
      .update({ has_set_password: false })
      .eq('id', row.user_id)
    if (profileFlagErr) {
      Sentry.captureException(new Error('redeemTempPassword: profile flag failed: ' + profileFlagErr.message))
      return { success: false }
    }

    // Promove a senha temp a senha real
    const { error: updErr } = await supabaseAdmin.auth.admin.updateUserById(row.user_id, {
      password,
    })
    if (updErr) {
      // Rollback do flag — senha real não foi trocada, então não tem sentido forçar redefinir
      await supabaseAdmin
        .from('profiles')
        .update({ has_set_password: true })
        .eq('id', row.user_id)
        .then(() => undefined, () => undefined)
      Sentry.captureException(new Error('redeemTempPassword: updateUserById failed: ' + updErr.message))
      return { success: false }
    }

    // Sucesso total — limpa os campos temp. Se essa última operação falhar, OK:
    // senha foi trocada, has_set_password=false vai forçar redefinir e a próxima
    // tentativa de reset vai sobrescrever os campos temp órfãos.
    await supabaseAdmin
      .from('profiles')
      .update({
        temp_password_hash: null,
        temp_password_expires_at: null,
      })
      .eq('id', row.user_id)
      .then(() => undefined, () => undefined)

    return { success: true }
  } catch (err) {
    Sentry.captureException(err, {
      extra: { email: normalized, step: 'redeemTempPassword' },
    })
    return { success: false }
  }
}
