'use client'

import { useState } from 'react'
import { MOCK_COMMENTS_QUEUE, MOCK_THREADS_QUEUE } from '@/components/admin/mock-data'
import type { MockComment, MockThread } from '@/components/admin/mock-data'
import { MessageSquare, Hash, Trash2, AlertOctagon, Check } from 'lucide-react'

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
    <div className="border border-white/10 bg-white/[0.02]">
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-medium text-white/80">
              {comment.authorName}
            </span>
            <span className="font-mono text-[10px] text-white/30">em</span>
            <span className="font-mono text-[10px] text-white/50">{comment.lessonTitle}</span>
            <span className="font-mono text-[10px] text-white/20">·</span>
            <span className="border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/30">
              {comment.cohortName}
            </span>
          </div>
          <p className="font-mono text-sm text-white/70 leading-relaxed">{comment.content}</p>
          <p className="font-mono text-[10px] text-white/20">
            {formatDateTime(comment.created_at)}
          </p>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            onClick={() => { onRemove(comment.id); setRemoved(true) }}
            className="flex items-center gap-1.5 border border-red-400/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-red-400/70 transition-colors hover:border-red-400/40 hover:text-red-400"
            title="Remover"
          >
            <Trash2 className="h-3 w-3" />
            Remover
          </button>
          <button
            type="button"
            onClick={() => { onSpam(comment.id); setRemoved(true) }}
            className="flex items-center gap-1.5 border border-amber-400/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-amber-400/70 transition-colors hover:border-amber-400/40 hover:text-amber-400"
            title="Marcar como spam"
          >
            <AlertOctagon className="h-3 w-3" />
            Spam
          </button>
          <button
            type="button"
            onClick={() => setRemoved(true)}
            className="flex items-center gap-1.5 border border-emerald-400/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400/70 transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
            title="Aprovar (manter)"
          >
            <Check className="h-3 w-3" />
            OK
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
    <div className="border border-white/10 bg-white/[0.02]">
      <div className="flex items-start justify-between gap-4 p-4">
        <div className="flex-1 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-medium text-white/80">{thread.authorName}</span>
            <span className="font-mono text-[10px] text-white/30">em</span>
            <span className="border border-white/10 px-1.5 py-0.5 font-mono text-[9px] text-white/50">
              #{thread.categoryName}
            </span>
          </div>
          <p className="font-mono text-sm font-medium text-white/80">{thread.title}</p>
          <p className="line-clamp-2 font-mono text-xs text-white/50 leading-relaxed">
            {thread.content}
          </p>
          <div className="flex items-center gap-3">
            <span className="font-mono text-[10px] text-white/20">
              {formatDateTime(thread.created_at)}
            </span>
            <span className="font-mono text-[10px] text-white/20">·</span>
            <span className="font-mono text-[10px] text-white/20">
              {thread.view_count} visualizações · {thread.replyCount} respostas
            </span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2">
          <button
            type="button"
            onClick={() => { onRemove(thread.id); setRemoved(true) }}
            className="flex items-center gap-1.5 border border-red-400/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-red-400/70 transition-colors hover:border-red-400/40 hover:text-red-400"
          >
            <Trash2 className="h-3 w-3" />
            Remover
          </button>
          <button
            type="button"
            onClick={() => { onSpam(thread.id); setRemoved(true) }}
            className="flex items-center gap-1.5 border border-amber-400/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-amber-400/70 transition-colors hover:border-amber-400/40 hover:text-amber-400"
          >
            <AlertOctagon className="h-3 w-3" />
            Spam
          </button>
          <button
            type="button"
            onClick={() => setRemoved(true)}
            className="flex items-center gap-1.5 border border-emerald-400/20 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-wider text-emerald-400/70 transition-colors hover:border-emerald-400/40 hover:text-emerald-400"
          >
            <Check className="h-3 w-3" />
            OK
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
      <div className="flex gap-1 border-b border-white/10">
        <button
          type="button"
          onClick={() => setActiveTab('comments')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
            activeTab === 'comments'
              ? 'border-b-2 border-[#FF3A0E] text-[#FF3A0E]'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Comentários
          {comments.length > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center bg-[#FF3A0E] px-1 font-mono text-[9px] text-white">
              {comments.length}
            </span>
          )}
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('threads')}
          className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors ${
            activeTab === 'threads'
              ? 'border-b-2 border-[#FF3A0E] text-[#FF3A0E]'
              : 'text-white/40 hover:text-white/70'
          }`}
        >
          <Hash className="h-3.5 w-3.5" />
          Tópicos do Fórum
          {threads.length > 0 && (
            <span className="flex h-4 min-w-4 items-center justify-center bg-[#FF3A0E] px-1 font-mono text-[9px] text-white">
              {threads.length}
            </span>
          )}
        </button>
      </div>

      {/* Content */}
      {activeTab === 'comments' && (
        <div className="space-y-3">
          {comments.length === 0 ? (
            <div className="py-12 text-center">
              <p className="font-mono text-sm text-white/30">Nenhum comentário na fila</p>
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
              <p className="font-mono text-sm text-white/30">Nenhum tópico na fila</p>
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
