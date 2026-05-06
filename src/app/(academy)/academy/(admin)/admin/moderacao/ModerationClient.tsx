'use client'

import { useState } from 'react'
import { MOCK_COMMENTS_QUEUE, MOCK_THREADS_QUEUE } from '@/components/admin/mock-data'
import type { MockComment, MockThread } from '@/components/admin/mock-data'
import { MessageSquare, Hash } from 'lucide-react'

type Tab = 'comments' | 'threads'

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function CommentCard({
  comment,
  onRemove,
  onSpam,
}: {
  comment: MockComment
  onRemove: (id: string) => void
  onSpam: (id: string) => void
}) {
  const [removed, setRemoved] = useState(false)

  if (removed) return null

  return (
    <div className="border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-medium text-[var(--bone)]">{comment.authorName}</span>
        <span className="font-mono text-[10px] text-[var(--bone-mute)]">em</span>
        <span className="font-mono text-[10px] text-[var(--bone-dim)]">{comment.lessonTitle}</span>
        <span className="font-mono text-[10px] text-[var(--bone-mute)]">·</span>
        <span className="border border-[rgba(255,255,255,0.07)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--bone-mute)]">
          {comment.cohortName}
        </span>
      </div>

      <div className="mb-3 border-l-2 border-[var(--ember)] bg-[var(--ember)]/5 p-3">
        <p className="font-mono text-sm leading-relaxed text-[var(--bone-dim)]">{comment.content}</p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--bone-mute)]">
          {formatDateTime(comment.created_at)}
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setRemoved(true) }}
            className="border border-[rgba(255,255,255,0.07)] px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--bone-mute)] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[var(--bone-dim)]"
          >
            Ignorar
          </button>
          <button
            type="button"
            onClick={() => { setRemoved(true) }}
            className="border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-emerald-400 transition-colors hover:bg-emerald-400/20"
          >
            Aprovar
          </button>
          <button
            type="button"
            onClick={() => { onRemove(comment.id); setRemoved(true) }}
            className="border border-[var(--ember)]/20 bg-[var(--ember)]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--ember)] transition-colors hover:bg-[var(--ember)]/20"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}

function ThreadCard({
  thread,
  onRemove,
  onSpam,
}: {
  thread: MockThread
  onRemove: (id: string) => void
  onSpam: (id: string) => void
}) {
  const [removed, setRemoved] = useState(false)

  if (removed) return null

  return (
    <div className="border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-4">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="font-mono text-xs font-medium text-[var(--bone)]">{thread.authorName}</span>
        <span className="font-mono text-[10px] text-[var(--bone-mute)]">em</span>
        <span className="border border-[rgba(255,255,255,0.07)] px-1.5 py-0.5 font-mono text-[9px] text-[var(--bone-mute)]">
          #{thread.categoryName}
        </span>
      </div>

      <p className="mb-2 font-mono text-sm font-medium text-[var(--bone)]">{thread.title}</p>

      <div className="mb-3 border-l-2 border-[var(--ember)] bg-[var(--ember)]/5 p-3">
        <p className="line-clamp-2 font-mono text-xs leading-relaxed text-[var(--bone-dim)]">
          {thread.content}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="font-mono text-[11px] uppercase tracking-wide text-[var(--bone-mute)]">
          {formatDateTime(thread.created_at)} · {thread.view_count} views · {thread.replyCount} resp.
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => { setRemoved(true) }}
            className="border border-[rgba(255,255,255,0.07)] px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--bone-mute)] transition-colors hover:border-[rgba(255,255,255,0.16)] hover:text-[var(--bone-dim)]"
          >
            Ignorar
          </button>
          <button
            type="button"
            onClick={() => { setRemoved(true) }}
            className="border border-emerald-400/20 bg-emerald-400/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-emerald-400 transition-colors hover:bg-emerald-400/20"
          >
            Aprovar
          </button>
          <button
            type="button"
            onClick={() => { onRemove(thread.id); setRemoved(true) }}
            className="border border-[var(--ember)]/20 bg-[var(--ember)]/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-[var(--ember)] transition-colors hover:bg-[var(--ember)]/20"
          >
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}

export function ModerationClient() {
  const [activeTab, setActiveTab] = useState<Tab>('comments')
  const [comments, setComments] = useState(MOCK_COMMENTS_QUEUE)
  const [threads, setThreads] = useState(MOCK_THREADS_QUEUE)

  function removeComment(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id))
  }

  function markCommentSpam(id: string) {
    setComments((prev) => prev.filter((c) => c.id !== id))
  }

  function removeThread(id: string) {
    setThreads((prev) => prev.filter((t) => t.id !== id))
  }

  function markThreadSpam(id: string) {
    setThreads((prev) => prev.filter((t) => t.id !== id))
  }

  return (
    <div className="space-y-4">
      {/* Tabs */}
      <div className="flex border-b border-[rgba(255,255,255,0.07)]">
        <button
          type="button"
          onClick={() => setActiveTab('comments')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
            activeTab === 'comments'
              ? 'border-b-2 border-[var(--ember)] text-[var(--ember)]'
              : 'text-[var(--bone-mute)] hover:text-[var(--bone-dim)]'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Comentários
          {comments.length > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center bg-[var(--ember)] px-1 font-mono text-[9px] text-white">
              {comments.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('threads')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
            activeTab === 'threads'
              ? 'border-b-2 border-[var(--ember)] text-[var(--ember)]'
              : 'text-[var(--bone-mute)] hover:text-[var(--bone-dim)]'
          }`}
        >
          <Hash className="h-3.5 w-3.5" />
          Tópicos do Fórum
          {threads.length > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center bg-[var(--ember)] px-1 font-mono text-[9px] text-white">
              {threads.length}
            </span>
          )}
        </button>
      </div>

      {activeTab === 'comments' && (
        <div className="space-y-3">
          {comments.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-mono text-sm text-[var(--bone-mute)]">Nenhum comentário na fila</p>
            </div>
          ) : (
            comments.map((c) => (
              <CommentCard
                key={c.id}
                comment={c}
                onRemove={removeComment}
                onSpam={markCommentSpam}
              />
            ))
          )}
        </div>
      )}

      {activeTab === 'threads' && (
        <div className="space-y-3">
          {threads.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-mono text-sm text-[var(--bone-mute)]">Nenhum tópico na fila</p>
            </div>
          ) : (
            threads.map((t) => (
              <ThreadCard
                key={t.id}
                thread={t}
                onRemove={removeThread}
                onSpam={markThreadSpam}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}
