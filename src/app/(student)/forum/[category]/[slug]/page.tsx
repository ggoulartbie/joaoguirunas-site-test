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
import {
  MOCK_FORUM_THREADS,
  MOCK_FORUM_REPLIES,
  type ForumReply,
} from '@/components/student/mock-data'
import { ForumReplyForm } from '@/components/student/ForumReplyForm'

type Props = {
  params: Promise<{ category: string; slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const thread = MOCK_FORUM_THREADS.find((t) => t.slug === slug)
  return { title: thread?.title ?? 'Tópico' }
}

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
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
  reply: ForumReply
  children?: React.ReactNode
}) {
  const badge = ROLE_BADGE[reply.authorRole]

  return (
    <div
      className={`relative border bg-[#0C0C12] p-4 ${
        reply.isAcceptedAnswer
          ? 'border-green-500/40'
          : 'border-white/10'
      }`}
    >
      {reply.isAcceptedAnswer && (
        <div className="mb-3 flex items-center gap-1.5">
          <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
          <span className="font-mono text-[10px] uppercase tracking-wider text-green-400">
            Resposta aceita
          </span>
        </div>
      )}

      {/* Author + date */}
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center bg-white/10 font-mono text-xs font-bold text-white/60">
          {reply.authorName.charAt(0)}
        </div>
        <span className="text-sm font-medium text-white/80">
          {reply.authorName}
        </span>
        {badge && (
          <span className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}>
            {badge.label}
          </span>
        )}
        <span className="ml-auto font-mono text-xs text-white/30">
          {formatDate(reply.createdAt)}
        </span>
      </div>

      {/* Content */}
      <div className="prose prose-sm prose-invert max-w-none text-white/80">
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{reply.content}</p>
      </div>

      {/* Actions */}
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

      {/* Nested replies */}
      {children && (
        <div className="mt-4 ml-4 space-y-3 border-l border-white/10 pl-4">
          {children}
        </div>
      )}
    </div>
  )
}

export default async function ForumThreadPage({ params }: Props) {
  const { category, slug } = await params

  // TODO F5.1: buscar thread + replies via Supabase
  const thread = MOCK_FORUM_THREADS.find(
    (t) => t.slug === slug && t.categorySlug === category
  )

  if (!thread) notFound()

  const topLevelReplies = MOCK_FORUM_REPLIES.filter(
    (r) => r.threadId === thread.id && r.parentReplyId === null
  )
  const nestedReplies = MOCK_FORUM_REPLIES.filter(
    (r) => r.threadId === thread.id && r.parentReplyId !== null
  )

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
        {/* Category + status bar */}
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-3">
          <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
            {thread.categoryName}
          </span>
          <div className="flex items-center gap-3">
            {thread.isPinned && (
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]">
                <Pin className="h-3 w-3" />
                Fixado
              </div>
            )}
            {thread.isResolved && (
              <div className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-green-400">
                <CheckCircle2 className="h-3 w-3" />
                Resolvido
              </div>
            )}
          </div>
        </div>

        <div className="p-5">
          <h1 className="text-xl font-bold text-white">{thread.title}</h1>

          {/* Author */}
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
              {formatDate(thread.createdAt)}
            </span>
          </div>

          {/* Content */}
          <div className="mt-4 text-sm leading-relaxed text-white/80">
            <p className="whitespace-pre-wrap">{thread.content}</p>
          </div>

          {/* Thread actions */}
          <div className="mt-4 flex items-center gap-4 border-t border-white/10 pt-4">
            <button className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-white/60">
              <ThumbsUp className="h-3.5 w-3.5" />
              {thread.voteCount} votos
            </button>
            <span className="font-mono text-xs text-white/20">
              {thread.replyCount} respostas
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
              (r) => r.parentReplyId === reply.id
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
