'use server'

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { createClient } from '@/lib/supabase/server'
import { sanitizeHtml } from '@/lib/content'
import type { CommentWithAuthor } from '@/types/student'

const EDIT_WINDOW_MS = 15 * 60 * 1000

export async function addComment(
  lessonId: string,
  content: string,
  parentCommentId?: string
): Promise<{ success: boolean; error?: string; comment?: CommentWithAuthor }> {
  const parsed = z.object({
    lessonId: z.string().uuid(),
    content: z.string().min(1).max(4000),
    parentCommentId: z.string().uuid().optional(),
  }).safeParse({ lessonId, content, parentCommentId })

  if (!parsed.success) return { success: false, error: 'Conteúdo inválido' }

  const user = await requireUser()

  const supabase = await createClient()
  const { data: access } = await supabase.rpc('has_access', {
    p_user_id: user.id,
    p_lesson_id: parsed.data.lessonId,
  })
  if (!access) return { success: false, error: 'Acesso negado a esta aula' }

  const { data: inserted, error: insertError } = await supabaseAdmin
    .from('comments')
    .insert({
      lesson_id: parsed.data.lessonId,
      author_id: user.id,
      content: sanitizeHtml(parsed.data.content),
      parent_comment_id: parsed.data.parentCommentId ?? null,
    })
    .select('id')
    .single()

  if (insertError || !inserted) return { success: false, error: 'Erro ao publicar comentário' }

  const { data: row, error: selectError } = await supabaseAdmin
    .from('comments')
    .select('id, lesson_id, content, created_at, updated_at, deleted_at, is_pinned, parent_comment_id, author_id, profiles(name, role)')
    .eq('id', inserted.id)
    .single()

  if (selectError || !row || !row.profiles) return { success: false, error: 'Erro ao publicar comentário' }

  const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles

  const comment: CommentWithAuthor = {
    id: row.id,
    lesson_id: row.lesson_id,
    content: row.content,
    created_at: row.created_at,
    updated_at: row.updated_at,
    deleted_at: row.deleted_at,
    is_pinned: row.is_pinned,
    parent_comment_id: row.parent_comment_id,
    authorId: row.author_id,
    authorName: profile.name,
    authorRole: profile.role,
  }

  revalidatePath('/academy', 'layout')
  return { success: true, comment }
}

export async function editComment(
  commentId: string,
  content: string
): Promise<{ success: boolean; error?: string }> {
  const parsed = z.object({
    commentId: z.string().uuid(),
    content: z.string().min(1).max(4000),
  }).safeParse({ commentId, content })

  if (!parsed.success) return { success: false, error: 'Conteúdo inválido' }

  const user = await requireUser()

  const { data: comment, error: fetchErr } = await supabaseAdmin
    .from('comments')
    .select('author_id, created_at, deleted_at')
    .eq('id', parsed.data.commentId)
    .single()

  if (fetchErr || !comment) return { success: false, error: 'Comentário não encontrado' }
  if (comment.deleted_at) return { success: false, error: 'Comentário removido' }
  if (comment.author_id !== user.id) return { success: false, error: 'Sem permissão' }

  const age = Date.now() - new Date(comment.created_at).getTime()
  if (age > EDIT_WINDOW_MS) return { success: false, error: 'Janela de edição de 15 min expirada' }

  const { error } = await supabaseAdmin
    .from('comments')
    .update({ content: sanitizeHtml(parsed.data.content), updated_at: new Date().toISOString() })
    .eq('id', parsed.data.commentId)

  if (error) return { success: false, error: 'Erro ao editar comentário' }

  revalidatePath('/academy', 'layout')
  return { success: true }
}

export async function deleteComment(
  commentId: string
): Promise<{ success: boolean; error?: string }> {
  if (!z.string().uuid().safeParse(commentId).success) {
    return { success: false, error: 'ID inválido' }
  }

  const user = await requireUser()

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  const isPrivileged = profile?.role === 'ADMIN' || profile?.role === 'MENTOR'

  const { data: comment, error: fetchErr } = await supabaseAdmin
    .from('comments')
    .select('author_id, deleted_at')
    .eq('id', commentId)
    .single()

  if (fetchErr || !comment) return { success: false, error: 'Comentário não encontrado' }
  if (comment.deleted_at) return { success: false, error: 'Já removido' }
  if (!isPrivileged && comment.author_id !== user.id) return { success: false, error: 'Sem permissão' }

  const { error } = await supabaseAdmin
    .from('comments')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', commentId)

  if (error) return { success: false, error: 'Erro ao remover comentário' }

  revalidatePath('/academy', 'layout')
  return { success: true }
}
