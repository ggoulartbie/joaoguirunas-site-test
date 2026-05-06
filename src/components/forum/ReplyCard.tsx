'use client'

import { useState, useTransition } from 'react'
import { MessageSquare, ThumbsUp } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import { createReply } from '@/app/(student)/forum/actions'
import { AcceptAnswerButton } from './AcceptAnswerButton'
import type { ForumReplyWithMeta } from '@/types/student'

const ROLE_BADGE: Record<string, { label: string; className: string } | undefined> = {
  MENTOR: { label: 'Mentor', className: 'bg-[#FF3A0E]/15 text-[#FF3A0E]' },
  ADMIN: { label: 'Admin', className: 'bg-yellow-500/15 text-yellow-400' },
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

type Props = {
  reply: ForumReplyWithMeta
  threadId: string
  threadAuthorId: string
  currentUserId: string
  children?: React.ReactNode
  isNested?: boolean
}

export function ReplyCard({
  reply,
  threadId,
  threadAuthorId,
  currentUserId,
  children,
  isNested = false,
}: Props) {
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [, startTransition] = useTransition()

  const badge = ROLE_BADGE[reply.authorRole]

  function handleReplySubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!replyContent.trim()) return
    const content = replyContent.trim()
    setReplyContent('')
    setReplyOpen(false)
    startTransition(async () => { await createReply(threadId, content, reply.id) })
  }

  return (
    <div>
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

        <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/80">{reply.content}</p>

        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-white/5 pt-3">
          <button
            type="button"
            className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-white/60"
          >
            <ThumbsUp className="h-3 w-3" />
            {reply.voteCount}
          </button>
          {!isNested && (
            <button
              type="button"
              onClick={() => setReplyOpen(!replyOpen)}
              className="flex items-center gap-1.5 font-mono text-xs text-white/30 transition-colors hover:text-[#FF3A0E]"
            >
              <MessageSquare className="h-3 w-3" />
              Responder
            </button>
          )}
          <AcceptAnswerButton
            replyId={reply.id}
            isAuthor={currentUserId === threadAuthorId && !reply.is_accepted_answer}
          />
        </div>
      </div>

      {replyOpen && (
        <form
          onSubmit={handleReplySubmit}
          className="mt-2 ml-6 space-y-2 border-l border-white/10 pl-4"
        >
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={3}
            placeholder="Sua resposta..."
            required
            className="w-full border border-white/10 bg-[#0A0A0F] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[#FF3A0E] px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white hover:bg-[#FF5A1F] transition-colors"
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => { setReplyOpen(false); setReplyContent('') }}
              className="border border-white/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {children && (
        <div className="mt-2 ml-4 space-y-2 border-l border-white/10 pl-4">
          {children}
        </div>
      )}
    </div>
  )
}
