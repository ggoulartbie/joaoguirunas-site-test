import type { Metadata } from 'next'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ModerationClient } from './ModerationClient'
import type { CommentQueueItem, ThreadQueueItem } from './ModerationClient'

export const metadata: Metadata = { title: 'Moderação' }

export default async function AdminModeracaoPage() {
  const [{ data: rawComments }, { data: rawThreads }] = await Promise.all([
    supabaseAdmin
      .from('comments')
      .select(`
        id,
        content,
        created_at,
        profiles:author_id ( name ),
        lessons:lesson_id ( title )
      `)
      .is('deleted_at', null)
      .is('parent_comment_id', null)
      .order('created_at', { ascending: false })
      .limit(100),

    supabaseAdmin
      .from('forum_threads')
      .select(`
        id,
        title,
        content,
        created_at,
        view_count,
        profiles:author_id ( name ),
        forum_categories:category_id ( name )
      `)
      .is('deleted_at', null)
      .order('created_at', { ascending: false })
      .limit(100),
  ])

  const comments: CommentQueueItem[] = (rawComments ?? []).map((c) => {
    const profile = c.profiles as { name: string } | null
    const lesson = c.lessons as { title: string } | null
    return {
      id: c.id,
      content: c.content,
      created_at: c.created_at,
      authorName: profile?.name ?? '—',
      lessonTitle: lesson?.title ?? '—',
    }
  })

  const threads: ThreadQueueItem[] = (rawThreads ?? []).map((t) => {
    const profile = t.profiles as { name: string } | null
    const category = t.forum_categories as { name: string } | null
    return {
      id: t.id,
      title: t.title,
      content: t.content,
      created_at: t.created_at,
      view_count: t.view_count,
      replyCount: 0,
      authorName: profile?.name ?? '—',
      categoryName: category?.name ?? '—',
    }
  })

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--hairline)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Moderação</p>
        <h1 className="mt-1 font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">Moderação</h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Fila de comentários e tópicos pendentes de revisão
        </p>
      </div>
      <ModerationClient initialComments={comments} initialThreads={threads} />
    </div>
  )
}
