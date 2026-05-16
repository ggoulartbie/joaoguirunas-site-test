'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth/helpers'

type Reaction = 'LIKE' | 'DISLIKE'

const lessonIdSchema = z.string().uuid()

export async function setReaction(lessonId: string, reaction: Reaction | null): Promise<void> {
  const user = await requireUser()

  if (!lessonIdSchema.safeParse(lessonId).success) {
    throw new Error('lessonId inválido')
  }

  const supabase = await createClient()

  if (reaction === null) {
    const { error } = await supabase
      .from('lesson_reactions')
      .delete()
      .eq('lesson_id', lessonId)
      .eq('user_id', user.id)

    if (error) throw new Error('Erro ao remover reação')
  } else {
    const { error } = await supabase
      .from('lesson_reactions')
      .upsert(
        { lesson_id: lessonId, user_id: user.id, reaction },
        { onConflict: 'lesson_id,user_id' }
      )

    if (error) throw new Error('Erro ao registrar reação')
  }

  revalidatePath('/', 'layout')
}

export async function getLessonReactionStats(
  lessonId: string
): Promise<{ likes: number; dislikes: number; userReaction: Reaction | null }> {
  if (!lessonIdSchema.safeParse(lessonId).success) {
    throw new Error('lessonId inválido')
  }

  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()

  const { data, error } = await supabase
    .from('lesson_reactions')
    .select('reaction, user_id')
    .eq('lesson_id', lessonId)

  if (error) throw new Error('Erro ao buscar reações')

  const rows = data ?? []
  const likes = rows.filter((r) => r.reaction === 'LIKE').length
  const dislikes = rows.filter((r) => r.reaction === 'DISLIKE').length
  const userReaction = user
    ? (rows.find((r) => r.user_id === user.id)?.reaction as Reaction | undefined) ?? null
    : null

  return { likes, dislikes, userReaction }
}
