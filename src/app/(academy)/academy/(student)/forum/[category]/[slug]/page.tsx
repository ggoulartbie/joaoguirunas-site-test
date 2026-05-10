import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Pin } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import type { ForumReplyWithMeta } from '@/types/student'
import { ForumReplyForm } from '@/components/student/ForumReplyForm'
import { VoteButton } from '@/components/forum/VoteButton'
import { ReplyCard } from '@/components/forum/ReplyCard'

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
  MENTOR: { label: 'Mentor', className: 'bg-[color:var(--ember)]/15 text-[color:var(--ember)]' },
  ADMIN: { label: 'Admin', className: 'bg-[color:var(--bone-mute)]/20 text-[color:var(--bone-dim)]' },
}

function Avatar({ name }: { name: string }) {
  return (
    <div
      className="flex h-8 w-8 shrink-0 items-center justify-center bg-[var(--ember)]/20 font-mono text-xs font-bold uppercase text-[color:var(--ember)]"
      style={{ borderRadius: '9999px' }}
    >
      {name.charAt(0)}
    </div>
  )
}

export default async function ForumThreadPage({ params }: Props) {
  const { slug } = await params
  const user = await requireUser()

  const { data: threadRaw } = await supabaseAdmin
    .from('forum_threads')
    .select(`
      id, slug, title, content, created_at, last_activity_at,
      is_pinned, is_resolved, view_count, author_id,
      forum_categories(slug, name),
      profiles(name, role)
    `)
    .eq('slug', slug)
    .is('deleted_at', null)
    .single()

  if (!threadRaw) notFound()

  const cat = threadRaw.forum_categories as { slug: string; name: string } | null
  const threadAuthor = threadRaw.profiles as { name: string; role: string } | null

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
    author_id: threadRaw.author_id,
    slug: threadRaw.slug,
    title: threadRaw.title,
    content: threadRaw.content,
    created_at: threadRaw.created_at,
    is_pinned: threadRaw.is_pinned,
    is_resolved: threadRaw.is_resolved,
    categoryName: cat?.name ?? '',
    categorySlug: cat?.slug ?? '',
    authorName: threadAuthor?.name ?? 'Desconhecido',
    authorRole: (threadAuthor?.role ?? 'STUDENT') as string,
    replyCount: replyCount ?? 0,
    voteCount: voteCount ?? 0,
  }

  // Single query: replies + votes count embutido (sem N+1 por reply)
  const { data: repliesRaw } = await supabaseAdmin
    .from('forum_replies')
    .select(`
      id, thread_id, content, created_at, is_accepted_answer, parent_reply_id, deleted_at,
      profiles(name, role),
      votes(count)
    `)
    .eq('thread_id', threadRaw.id)
    .is('deleted_at', null)
    .order('created_at', { ascending: true })

  type ReplyRow = NonNullable<typeof repliesRaw>[number]

  const replies: ForumReplyWithMeta[] = (repliesRaw ?? []).map((r: ReplyRow) => {
    const author = r.profiles as { name: string; role: string } | null
    const votesArr = r.votes as unknown as { count: number }[] | null

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
      voteCount: votesArr?.[0]?.count ?? 0,
    }
  })

  const topLevelReplies = replies.filter((r) => r.parent_reply_id === null)
  const nestedReplies = replies.filter((r) => r.parent_reply_id !== null)

  const badge = ROLE_BADGE[thread.authorRole]

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {/* Header da thread */}
      <div className="border-b border-[color:var(--hairline)] pb-6">
        {/* Breadcrumb */}
        <Link
          href="/academy/forum"
          className="mb-4 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--bone)]"
        >
          <ArrowLeft className="h-3 w-3" />
          Fórum
          {thread.categoryName && (
            <>
              <span className="text-[color:var(--hairline-strong)]">/</span>
              <span>{thread.categoryName}</span>
            </>
          )}
        </Link>

        {/* Badges de estado */}
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className="border border-[color:var(--hairline)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[color:var(--bone-mute)]"
            style={{ borderRadius: 0 }}
          >
            {thread.categoryName}
          </span>
          {thread.is_pinned && (
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ember)]">
              <Pin className="h-3 w-3" />
              Fixado
            </span>
          )}
          {thread.is_resolved && (
            <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-[color:var(--ember)]">
              <CheckCircle2 className="h-3 w-3" />
              Resolvido
            </span>
          )}
        </div>

        <h1
          className="font-[family-name:var(--type-display)] italic text-[color:var(--bone)]"
          style={{ fontSize: 'clamp(28px, 4vw, 32px)', lineHeight: 1.15 }}
        >
          {thread.title}
        </h1>
        <p className="mt-2 font-mono text-[11px] text-[color:var(--bone-mute)]">
          por {thread.authorName} &bull; {formatDate(thread.created_at)} &bull; {thread.replyCount}{' '}
          {thread.replyCount === 1 ? 'resposta' : 'respostas'}
        </p>
      </div>

      {/* Post original */}
      <div
        className="border border-[color:var(--hairline)] bg-[color:var(--ink)] p-5"
        style={{ borderRadius: 0 }}
      >
        <div className="mb-3 flex items-center gap-2.5">
          <Avatar name={thread.authorName} />
          <div>
            <span className="font-[family-name:var(--type-sans)] text-sm font-medium text-[color:var(--bone)]">
              {thread.authorName}
            </span>
            {badge && (
              <span
                className={`ml-2 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest ${badge.className}`}
                style={{ borderRadius: 0 }}
              >
                {badge.label}
              </span>
            )}
          </div>
          <span className="ml-auto font-mono text-[11px] text-[color:var(--bone-mute)]">
            {formatDate(thread.created_at)}
          </span>
        </div>

        <div className="font-[family-name:var(--type-sans)] text-[15px] leading-relaxed text-[color:var(--bone-dim)]">
          <p className="whitespace-pre-wrap">{thread.content}</p>
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-[color:var(--hairline)] pt-3">
          <VoteButton threadId={thread.id} voteCount={thread.voteCount} />
          <span className="font-mono text-[11px] text-[color:var(--bone-mute)]">
            {thread.replyCount} {thread.replyCount === 1 ? 'resposta' : 'respostas'}
          </span>
        </div>
      </div>

      {/* Respostas */}
      {topLevelReplies.length > 0 && (
        <div className="space-y-2">
          <h2 className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--bone-mute)]">
            {thread.replyCount} {thread.replyCount === 1 ? 'resposta' : 'respostas'}
          </h2>

          {topLevelReplies.map((reply) => {
            const children = nestedReplies.filter((r) => r.parent_reply_id === reply.id)
            return (
              <ReplyCard
                key={reply.id}
                reply={reply}
                threadId={thread.id}
                threadAuthorId={thread.author_id}
                currentUserId={user.id}
              >
                {children.map((child) => (
                  <ReplyCard
                    key={child.id}
                    reply={child}
                    threadId={thread.id}
                    threadAuthorId={thread.author_id}
                    currentUserId={user.id}
                    isNested
                  />
                ))}
              </ReplyCard>
            )
          })}
        </div>
      )}

      {/* Sem respostas */}
      {topLevelReplies.length === 0 && (
        <p className="py-6 font-mono text-[11px] text-[color:var(--bone-mute)]">
          Ainda sem respostas. Seja o primeiro!
        </p>
      )}

      {/* Formulário de resposta */}
      <div
        className="border border-[color:var(--hairline)] bg-[color:var(--ink)] p-5"
        style={{ borderRadius: 0 }}
      >
        <h2 className="mb-4 font-mono text-[11px] uppercase tracking-widest text-[color:var(--bone-mute)]">
          Sua resposta
        </h2>
        <ForumReplyForm threadId={thread.id} />
      </div>
    </div>
  )
}
