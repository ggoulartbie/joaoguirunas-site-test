'use client'

import { useState, useTransition } from 'react'
import { MessageSquare, ThumbsUp } from 'lucide-react'
import { CheckCircle2 } from 'lucide-react'
import { createReply } from '@/app/(academy)/academy/(student)/forum/actions'
import { AcceptAnswerButton } from './AcceptAnswerButton'
import type { ForumReplyWithMeta } from '@/types/student'

const ROLE_BADGE: Record<string, { label: string; className: string } | undefined> = {
  MENTOR: { label: 'Mentor', className: 'bg-[color:var(--ember)]/15 text-[color:var(--ember)]' },
  ADMIN: { label: 'Admin', className: 'bg-[color:var(--bone-mute)]/20 text-[color:var(--bone-dim)]' },
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
        className={`relative border bg-[color:var(--ink)] p-4 ${
          reply.is_accepted_answer
            ? 'border-l-2 border-l-[color:var(--ember)] border-[color:var(--hairline)]'
            : 'border-[color:var(--hairline)]'
        }`}
        style={{ borderRadius: 0 }}
      >
        {reply.is_accepted_answer && (
          <div className="mb-3 flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-[color:var(--ember)]" />
            <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--ember)]">
              Resposta aceita
            </span>
          </div>
        )}

        <div className="mb-3 flex items-center gap-2">
          <div
            className="flex h-7 w-7 items-center justify-center bg-[color:var(--ember)]/20 font-mono text-xs font-bold uppercase text-[color:var(--ember)]"
            style={{ borderRadius: '9999px' }}
          >
            {reply.authorName.charAt(0)}
          </div>
          <span className="font-[family-name:var(--type-sans)] text-sm font-medium text-[color:var(--bone)]">
            {reply.authorName}
          </span>
          {badge && (
            <span
              className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}
              style={{ borderRadius: 0 }}
            >
              {badge.label}
            </span>
          )}
          <span className="ml-auto font-mono text-xs text-[color:var(--bone-mute)]">
            {formatDate(reply.created_at)}
          </span>
        </div>

        <p className="whitespace-pre-wrap font-[family-name:var(--type-sans)] text-[15px] leading-relaxed text-[color:var(--bone-dim)]">
          {reply.content}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4 border-t border-[color:var(--hairline)] pt-3">
          <button
            type="button"
            className="flex items-center gap-1.5 font-mono text-xs text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--bone)]"
          >
            <ThumbsUp className="h-3 w-3" />
            {reply.voteCount}
          </button>
          {!isNested && (
            <button
              type="button"
              onClick={() => setReplyOpen(!replyOpen)}
              className="flex items-center gap-1.5 font-mono text-xs text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--ember)]"
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
          className="mt-2 ml-6 space-y-2 border-l border-[color:var(--hairline)] pl-4"
        >
          <textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            rows={3}
            placeholder="Sua resposta..."
            required
            className="w-full border border-[color:var(--hairline)] bg-[color:var(--ink-2)] px-3 py-2 font-[family-name:var(--type-sans)] text-sm text-[color:var(--bone)] placeholder:text-[color:var(--bone-mute)] focus:border-[color:var(--ember)] focus:outline-none"
            style={{ borderRadius: 0 }}
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-[color:var(--ember)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--void)] transition-colors hover:bg-[color:var(--ember-glow)]"
              style={{ borderRadius: 0 }}
            >
              Enviar
            </button>
            <button
              type="button"
              onClick={() => { setReplyOpen(false); setReplyContent('') }}
              className="border border-[color:var(--hairline)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--bone-mute)] transition-colors hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--bone)]"
              style={{ borderRadius: 0 }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}

      {children && (
        <div className="mt-2 ml-4 space-y-2 border-l border-[color:var(--hairline)] pl-4">
          {children}
        </div>
      )}
    </div>
  )
}
