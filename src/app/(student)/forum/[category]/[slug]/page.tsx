import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ArrowLeft,
  CheckCircle2,
  Pin,
  ThumbsUp,
  MessageSquare,
  CornerDownRight,
} from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { ForumReplyWithMeta } from '@/types/student'
import { ForumReplyForm } from '@/components/student/ForumReplyForm'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { data } = await supabaseAdmin
    .from('forum_threads')
    .select('title')
    .eq('slug', slug)
    .single()
  return { title: data?.title ?? 'Tópico' }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const ROLE_BADGE: Record<string, { label: string; className: string } | undefined> = {
  MENTOR: { label: 'Mentor', className: 'bg-[#FF3A0E]/15 text-[#FF3A0E]' },
  ADMIN: { label: 'Admin', className: 'bg-yellow-500/15 text-yellow-400' },
}

function ReplyCard({
  reply,
  children,
}: {
  reply: ForumReplyWithMeta
  children?: React.ReactNode
}) {
  const badge = ROLE_BADGE[reply.authorRole]

  return (
    <div
      className={`relative border bg-[#0C0C12] p-4 ${
        reply.is_accepted_answer ? 'border-green-500/40' : 'border-white/10'
      }`}
    >
      {reply.is_accepted_answer && (
        <div className="mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-green-400">
            Resposta aceita
          </span>
        </div>
      )}

      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center bg-white/10 font-mono text-xs font-bold text-white/60">
          {reply.authorName.charAt(0)}
        </div>
        <span className="text-sm font-medium text-white/80">{reply.authorName}</span>
        {badge && (
          <span className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}>
            {badge.label}
          </span>
        )}
        <span className="ml-auto font-mono text-xs text-white/30">
          {formatDate(reply.created_at)}
        </span>
      </div>

      <div className="prose prose-sm prose-invert max-w-none text-white/80">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{reply.content}</p>
      </div>

      <div className="mt-3 flex items-center gap-4">
        <button className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-white/60">
          <ThumbsUp className="h-3 w-3" />
          {reply.voteCount}
        </button>
        <button className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-[#FF3A0E]">
          <MessageSquare className="h-3 w-3" />
          Responder
        </button>
      </div>

      {children && (
        <div className="mt-4 ml-4 space-y-3 border-l border-white/10 pl-4">
          {children}
        </div>
      )}
    </div>
  )
}

export default async function ForumThreadPage({ params }: Props) {
  const { slug } = await params

  // Buscar thread com categoria e autor
  const { data: threadRaw } = await supabaseAdmin
    .from('forum_threads')
    .select(`
      id, slug, title, content, created_at, last_activity_at,
      is_pinned, is_resolved, view_count,
      forum_categories(slug, name),
      profiles(name, role)
    `)
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()

  if (!threadRaw) notFound()

  const cat = threadRaw.forum_categories as { slug: string; name: string } | null
  const threadAuthor = threadRaw.profiles as { name: string; role: string } | null

  // Contagens
  const [{ count: replyCount }, { count: voteCount }] = await Promise.all([
    supabaseAdmin
      .from('forum_replies')
      .select('id', { count: 'exact', head: true })
      .eq('thread_id', threadRaw.id)
      .is('deleted_at', null),
    supabaseAdmin
      .from('votes')
      .select('id', { count: 'exact', head: true })
      .eq('thread_id', threadRaw.id),
  ])

  const thread = {
    id: threadRaw.id,
    slug: threadRaw.slug,
    title: threadRaw.title,
    content: threadRaw.content,
    created_at: threadRaw.created_at,
    is_pinned: threadRaw.is_pinned,
    is_resolved: threadRaw.is_resolved,
    categoryName: cat?.name ?? '',
    authorName: threadAuthor?.name ?? 'Desconhecido',
    authorRole: (threadAuthor?.role ?? 'STUDENT') as string,
    replyCount: replyCount ?? 0,
    voteCount: voteCount ?? 0,
  }

  // Buscar replies com autor e votos
  const { data: repliesRaw } = await supabaseAdmin
    .from('forum_replies')
    .select(`
      id, thread_id, content, created_at, is_accepted_answer, parent_reply_id, deleted_at,
      profiles(name, role)
    `)
    .eq('thread_id', threadRaw.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: true })

  type ReplyRow = NonNullable<typeof repliesRaw>[number]

  const replies: ForumReplyWithMeta[] = await Promise.all(
    (repliesRaw ?? []).map(async (r: ReplyRow) => {
      const { count: rc } = await supabaseAdmin
        .from('votes')
        .select('id', { count: 'exact', head: true })
        .eq('reply_id', r.id)

      const author = r.profiles as { name: string; role: string } | null

      return {
        id: r.id,
        thread_id: r.thread_id,
        content: r.content,
        created_at: r.created_at,
        is_accepted_answer: r.is_accepted_answer,
        parent_reply_id: r.parent_reply_id,
        deleted_at: r.deleted_at,
        authorName: author?.name ?? 'Desconhecido',
        authorRole: (author?.role ?? 'STUDENT') as 'STUDENT' | 'MENTOR' | 'SUPPORT' | 'ADMIN',
        voteCount: rc ?? 0,
      }
    })
  )

  const topLevelReplies = replies.filter((r) => r.parent_reply_id === null)
  const nestedReplies = replies.filter((r) => r.parent_reply_id !== null)

  const badge = ROLE_BADGE[thread.authorRole]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Breadcrumb */}
      <Link
        href="/forum"
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Fórum
      </Link>

      {/* Thread principal */}
      <div className="border border-white/10 bg-[#0C0C12]">
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
            {thread.categoryName}
          </span>
          <div className="flex items-center gap-3">
            {thread.is_pinned && (
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]">
                <Pin className="h-3 w-3" />
                Fixado
              </div>
            )}
            {thread.is_resolved && (
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Resolvido
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          <h1 className="text-xl font-bold text-white">{thread.title}</h1>

          <div className="mt-3 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center bg-white/10 font-mono text-xs font-bold text-white/60">
              {thread.authorName.charAt(0)}
            </div>
            <span className="text-sm text-white/70">{thread.authorName}</span>
            {badge && (
              <span className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}>
                {badge.label}
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-white/30">
              {formatDate(thread.created_at)}
            </span>
          </div>

          <div className="mt-4 text-sm leading-relaxed text-white/80">
            <p className="whitespace-pre-wrap">{thread.content}</p>
          </div>

          <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
            <button className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-white/60">
              <ThumbsUp className="h-3.5 w-3.5" />
              {thread.voteCount} votos
            </button>
            <span className="font-mono text-xs text-white/20">
              {thread.replyCount} {thread.replyCount === 1 ? 'resposta' : 'respostas'}
            </span>
          </div>
        </div>
      </div>

      {/* Replies */}
      {topLevelReplies.length > 0 && (
        <div className="space-y-3">
          <h2 className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-white/40">
            <CornerDownRight className="h-3.5 w-3.5" />
            {thread.replyCount} {thread.replyCount === 1 ? 'resposta' : 'respostas'}
          </h2>

          {topLevelReplies.map((reply) => {
            const children = nestedReplies.filter(
              (r) => r.parent_reply_id === reply.id
            )
            return (
              <ReplyCard key={reply.id} reply={reply}>
                {children.map((child) => (
                  <ReplyCard key={child.id} reply={child} />
                ))}
              </ReplyCard>
            )
          })}
        </div>
      )}

      {/* Form de nova resposta */}
      <div>
        <h2 className="mb-3 font-mono text-xs uppercase tracking-widest text-white/40">
          Sua resposta
        </h2>
        <ForumReplyForm threadId={thread.id} />
      </div>
    </div>
  )
}
