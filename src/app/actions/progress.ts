'use server'

import { createClient } from '@/lib/supabase/server'
import { requireUser } from '@/lib/auth/helpers'

export async function saveProgress(lessonId: string, seconds: number): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        seconds_watched: seconds,
      },
      {
        onConflict: 'user_id,lesson_id',
        // Only advance — never regress seconds (e.g. if two tabs are open)
        ignoreDuplicates: false,
      }
    )
    .select()

  // Postgres upsert above may not advance if existing row has more seconds.
  // Use a conditional update to only move forward.
  await supabase
    .from('lesson_progress')
    .update({ seconds_watched: seconds })
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .lt('seconds_watched', seconds)
}

export async function markLessonComplete(lessonId: string): Promise<void> {
  const user = await requireUser()
  const supabase = await createClient()

  await supabase
    .from('lesson_progress')
    .upsert(
      {
        user_id: user.id,
        lesson_id: lessonId,
        completed: true,
        completed_at: new Date().toISOString(),
      },
      { onConflict: 'user_id,lesson_id' }
    )
}

export async function getLessonProgress(
  lessonId: string
): Promise<{ secondsWatched: number; completed: boolean } | null> {
  const user = await requireUser()
  const supabase = await createClient()

  const { data } = await supabase
    .from('lesson_progress')
    .select('seconds_watched, completed')
    .eq('user_id', user.id)
    .eq('lesson_id', lessonId)
    .single()

  if (!data) return null
  return { secondsWatched: data.seconds_watched, completed: data.completed }
}
