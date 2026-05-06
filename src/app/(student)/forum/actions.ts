'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'

async function requireActiveMember(): Promise<string> {
  const user = await requireUser()
  const supabase = await createClient()

  const { data } = await supabase
    .from('cohort_members')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .limit(1)

  if (!data?.length) {
    throw new Error('Acesso ao fórum requer matrícula ativa')
  }

  return user.id
}

export async function createThread(
  categoryId: string,
  title: string,
  content: string
): Promise<{ error?: string }> {
  const parsed = z.object({
    categoryId: z.string().uuid(),
    title: z.string().min(3).max(200),
    content: z.string().min(10),
  }).safeParse({ categoryId, title, content })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
  }

  let userId: string
  try {
    userId = await requireActiveMember()
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Não autorizado' }
  }

  const slug = title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)

  const uniqueSlug = `${slug}-${Date.now()}`

  const { error } = await supabaseAdmin
    .from('forum_threads')
    .insert({
      category_id: categoryId,
      author_id: userId,
      title,
      slug: uniqueSlug,
      content,
    })

  if (error) return { error: error.message }

  revalidatePath('/forum')
  return {}
}

export async function createReply(
  threadId: string,
  content: string,
  parentReplyId?: string
): Promise<{ error?: string }> {
  const parsed = z.object({
    threadId: z.string().uuid(),
    content: z.string().min(1),
    parentReplyId: z.string().uuid().optional(),
  }).safeParse({ threadId, content, parentReplyId })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Dados inválidos' }
  }

  let userId: string
  try {
    userId = await requireActiveMember()
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Não autorizado' }
  }

  const { error } = await supabaseAdmin
    .from('forum_replies')
    .insert({
      thread_id: threadId,
      author_id: userId,
      content,
      parent_reply_id: parentReplyId ?? null,
    })

  if (error) return { error: error.message }

  // Atualiza last_activity_at da thread
  await supabaseAdmin
    .from('forum_threads')
    .update({ last_activity_at: new Date().toISOString() })
    .eq('id', threadId)

  revalidatePath('/forum')
  revalidatePath(`/forum`)
  return {}
}

export async function voteThread(
  threadId: string,
): Promise<{ error?: string }> {
  let userId: string
  try {
    userId = await requireActiveMember()
  } catch (e) {
    return { error: e instanceof Error ? e.message : 'Não autorizado' }
  }

  // Verifica se já votou — toggle: se sim, remove; se não, insere
  const { data: existing } = await supabaseAdmin
    .from('votes')
    .select('id')
    .eq('user_id', userId)
    .eq('thread_id', threadId)
    .maybeSingle()

  if (existing) {
    await supabaseAdmin.from('votes').delete().eq('id', existing.id)
  } else {
    await supabaseAdmin.from('votes').insert({
      user_id: userId,
      thread_id: threadId,
    })
  }

  revalidatePath('/forum')
  return {}
}

export async function markAsAccepted(
  replyId: string
): Promise<{ error?: string }> {
  const user = await requireUser()

  const { data: reply } = await supabaseAdmin
    .from('forum_replies')
    .select('thread_id, forum_threads(author_id)')
    .eq('id', replyId)
    .single()

  if (!reply) return { error: 'Resposta não encontrada' }

  const thread = reply.forum_threads as { author_id: string } | null
  if (thread?.author_id !== user.id) {
    return { error: 'Apenas o autor da thread pode marcar resposta como aceita' }
  }

  await supabaseAdmin
    .from('forum_replies')
    .update({ is_accepted_answer: true })
    .eq('id', replyId)

  await supabaseAdmin
    .from('forum_threads')
    .update({ is_resolved: true })
    .eq('id', reply.thread_id)

  revalidatePath('/forum')
  return {}
}
