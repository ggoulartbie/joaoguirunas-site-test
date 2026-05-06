'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/helpers'

export async function moderateThread(threadId: string, action: 'hide' | 'restore') {
  await requireAdmin()
  const deletedAt = action === 'hide' ? new Date().toISOString() : null
  const { error } = await supabaseAdmin
    .from('forum_threads')
    .update({ deleted_at: deletedAt })
    .eq('id', threadId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/forum')
}

export async function moderateReply(replyId: string, action: 'hide' | 'restore') {
  await requireAdmin()
  const deletedAt = action === 'hide' ? new Date().toISOString() : null
  const { error } = await supabaseAdmin
    .from('forum_replies')
    .update({ deleted_at: deletedAt })
    .eq('id', replyId)
  if (error) throw new Error(error.message)
  revalidatePath('/admin/forum')
}
