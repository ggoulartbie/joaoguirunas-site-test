import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ForumModerationClient } from './ForumModerationClient'

export const metadata: Metadata = { title: 'Fórum — Moderação' }

export default async function AdminForumPage() {
  const { data: threads } = await supabaseAdmin
    .from('forum_threads')
    .select('id, title, content, created_at, deleted_at, author_id, profiles(name)')
    .order('created_at', { ascending: false })
    .limit(100)

  const { data: replies } = await supabaseAdmin
    .from('forum_replies')
    .select('id, content, created_at, deleted_at, author_id, thread_id, profiles(name)')
    .order('created_at', { ascending: false })
    .limit(100)

  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84848c]">Admin / Fórum</p>
        <h1 className="mt-1 font-mono text-[28px] italic text-[#f1f1f3]">Fórum — Moderação</h1>
        <p className="mt-1 font-mono text-xs text-[#84848c]">
          Tópicos e respostas — ocultar via soft delete
        </p>
      </div>
      <ForumModerationClient
        initialThreads={threads ?? []}
        initialReplies={replies ?? []}
      />
    </div>
  )
}
