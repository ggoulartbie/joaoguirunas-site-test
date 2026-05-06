'use client'

import { useState, useTransition } from 'react'
import { Pin, Trash2, Edit2, CornerDownRight, Send } from 'lucide-react'
import type { CommentWithAuthor } from '@/types/student'
import { addComment, editComment, deleteComment } from '@/lib/actions/comments'

const EDIT_WINDOW_MS = 15 * 60 * 1000

const ROLE_CONFIG: Record<string, { label: string; className: string } | undefined> = {
  MENTOR: { label: 'Mentor', className: 'bg-[#FF3A0E]/15 text-[#FF3A0E]' },
  ADMIN: { label: 'Admin', className: 'bg-yellow-500/15 text-yellow-400' },
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffMins = Math.floor(diffMs / 60000)
  if (diffDays > 0) return `${diffDays}d atrás`
  if (diffHours > 0) return `${diffHours}h atrás`
  return `${diffMins}min atrás`
}

function canEdit(comment: CommentWithAuthor, currentUserId: string): boolean {
  if (comment.deleted_at) return false
  if (comment.authorRole === 'ADMIN' || comment.authorRole === 'MENTOR') return true
  const withinWindow = Date.now() - new Date(comment.created_at).getTime() < EDIT_WINDOW_MS
  return comment.authorId === currentUserId && withinWindow
}

function canDelete(comment: CommentWithAuthor, currentUserId: string): boolean {
  if (comment.deleted_at) return false
  if (comment.authorRole === 'ADMIN' || comment.authorRole === 'MENTOR') return true
  return comment.authorId === currentUserId
}

type CommentItemProps = {
  comment: CommentWithAuthor
  replies?: CommentWithAuthor[]
  currentUserId: string
  lessonId: string
  onReply: (parentId: string) => void
  onOptimisticEdit: (id: string, content: string) => void
  onOptimisticDelete: (id: string) => void
  onOptimisticReply: (reply: CommentWithAuthor) => void
}

function CommentItem({
  comment,
  replies = [],
  currentUserId,
  lessonId,
  onReply,
  onOptimisticEdit,
  onOptimisticDelete,
  onOptimisticReply,
}: CommentItemProps) {
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyContent, setReplyContent] = useState('')
  const [, startTransition] = useTransition()

  const isDeleted = !!comment.deleted_at
  const badge = ROLE_CONFIG[comment.authorRole]

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = editContent.trim()
    if (!trimmed) return
    onOptimisticEdit(comment.id, trimmed)
    setEditing(false)
    startTransition(async () => {
      await editComment(comment.id, trimmed)
    })
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = replyContent.trim()
    if (!trimmed) return
    const now = new Date().toISOString()
    const optimistic: CommentWithAuthor = {
      id: `opt-${Date.now()}`,
      lesson_id: lessonId,
      content: trimmed,
      created_at: now,
      updated_at: now,
      deleted_at: null,
      is_pinned: false,
      parent_comment_id: comment.id,
      authorId: currentUserId,
      authorName: 'Você',
      authorRole: 'STUDENT',
    }
    setReplyContent('')
    setReplyOpen(false)
    onOptimisticReply(optimistic)
    onReply(comment.id)
    startTransition(async () => {
      await addComment(lessonId, trimmed, comment.id)
    })
  }

  async function handleDelete() {
    if (!confirm('Remover este comentário?')) return
    onOptimisticDelete(comment.id)
    startTransition(async () => {
      await deleteComment(comment.id)
    })
  }

  return (
    <div className="space-y-3">
      <div
        className={`border bg-[#0C0C12] p-4 ${
          comment.is_pinned ? 'border-[#FF3A0E]/30' : 'border-white/10'
        }`}
      >
        {comment.is_pinned && !isDeleted && (
          <div className="mb-2 flex items-center gap-1.5">
            <Pin className="h-3 w-3 text-[#FF3A0E]" />
            <span className="font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]">
              Fixado
            </span>
          </div>
        )}

        {!isDeleted && (
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center bg-white/10 font-mono text-[10px] font-bold text-white/60">
              {comment.authorName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-white/80">{comment.authorName}</span>
            {badge && (
              <span className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}>
                {badge.label}
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-white/30">
              {timeAgo(comment.created_at)}
            </span>
          </div>
        )}

        {isDeleted ? (
          <p className="text-sm italic text-white/20">[comentário removido]</p>
        ) : editing ? (
          <form onSubmit={handleEdit} className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="w-full border border-white/10 bg-[#0A0A0F] p-2 text-sm text-white focus:border-white/20 focus:outline-none"
            />
            <div className="flex gap-2">
              <button type="submit" className="px-3 py-1.5 bg-[#FF3A0E] font-mono text-xs uppercase tracking-wide text-white hover:bg-[#FF5A1F] transition-colors">
                Salvar
              </button>
              <button type="button" onClick={() => setEditing(false)} className="px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-white/30 hover:text-white/60 transition-colors">
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm leading-relaxed text-white/80">{comment.content}</p>
        )}

        {!isDeleted && !editing && (
          <div className="mt-3 flex items-center gap-3 border-t border-white/5 pt-3">
            <button onClick={() => setReplyOpen(!replyOpen)} className="flex items-center gap-1 font-mono text-xs text-white/30 transition-colors hover:text-white/60">
              <CornerDownRight className="h-3 w-3" />
              Responder
            </button>
            {canEdit(comment, currentUserId) && (
              <button onClick={() => setEditing(true)} className="flex items-center gap-1 font-mono text-xs text-white/30 transition-colors hover:text-white/60">
                <Edit2 className="h-3 w-3" />
                Editar
              </button>
            )}
            {canDelete(comment, currentUserId) && (
              <button onClick={handleDelete} className="flex items-center gap-1 font-mono text-xs text-white/30 transition-colors hover:text-[#FF3A0E]">
                <Trash2 className="h-3 w-3" />
                Remover
              </button>
            )}
          </div>
        )}
      </div>

      {replyOpen && (
        <form onSubmit={handleReply} className="ml-6 flex gap-2">
          <input
            type="text"
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            placeholder="Sua resposta..."
            className="flex-1 border border-white/10 bg-[#0C0C12] px-3 py-2 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
          />
          <button
            type="submit"
            disabled={!replyContent.trim()}
            className="flex items-center gap-1.5 bg-[#FF3A0E] px-3 py-2 font-mono text-xs uppercase tracking-wide text-white disabled:opacity-40 hover:bg-[#FF5A1F] transition-colors"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </form>
      )}

      {replies.length > 0 && (
        <div className="ml-6 space-y-2 border-l border-white/10 pl-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              lessonId={lessonId}
              onReply={() => {}}
              onOptimisticEdit={onOptimisticEdit}
              onOptimisticDelete={onOptimisticDelete}
              onOptimisticReply={onOptimisticReply}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type Props = {
  lessonId: string
  initialComments?: CommentWithAuthor[]
  currentUserId?: string
}

export function CommentSection({ lessonId, initialComments = [], currentUserId = '' }: Props) {
  const [comments, setComments] = useState<CommentWithAuthor[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [, startTransition] = useTransition()
  const [submitting, setSubmitting] = useState(false)

  const topLevel = comments.filter((c) => !c.parent_comment_id)
  const nested = comments.filter((c) => !!c.parent_comment_id)

  function handleOptimisticEdit(id: string, content: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, content, updated_at: new Date().toISOString() } : c))
    )
  }

  function handleOptimisticDelete(id: string) {
    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, deleted_at: new Date().toISOString() } : c))
    )
  }

  function handleOptimisticReply(reply: CommentWithAuthor) {
    setComments((prev) => [...prev, reply])
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const trimmed = newComment.trim()
    if (!trimmed) return
    setSubmitting(true)
    const now = new Date().toISOString()
    const optimistic: CommentWithAuthor = {
      id: `opt-${Date.now()}`,
      lesson_id: lessonId,
      content: trimmed,
      created_at: now,
      updated_at: now,
      deleted_at: null,
      is_pinned: false,
      parent_comment_id: null,
      authorId: currentUserId,
      authorName: 'Você',
      authorRole: 'STUDENT',
    }
    setComments((prev) => [...prev, optimistic])
    setNewComment('')
    startTransition(async () => {
      await addComment(lessonId, trimmed)
      setSubmitting(false)
    })
  }

  return (
    <div className="space-y-5">
      <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
        Comentários ({topLevel.filter((c) => !c.deleted_at).length})
      </h3>

      {currentUserId && (
        <form onSubmit={handleSubmit} className="space-y-2">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Deixe um comentário ou dúvida sobre esta aula..."
            rows={3}
            disabled={submitting}
            className="w-full resize-none border border-white/10 bg-[#0C0C12] p-3 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
          />
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={submitting || !newComment.trim()}
              className="flex items-center gap-2 bg-[#FF3A0E] px-4 py-2 font-mono text-xs uppercase tracking-wide text-white hover:bg-[#FF5A1F] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-3.5 w-3.5" />
              {submitting ? 'Enviando...' : 'Comentar'}
            </button>
          </div>
        </form>
      )}

      {topLevel.length === 0 ? (
        <p className="text-sm text-white/30">Seja o primeiro a comentar nesta aula.</p>
      ) : (
        <div className="space-y-4">
          {topLevel.map((comment) => {
            const replies = nested.filter((r) => r.parent_comment_id === comment.id)
            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={replies}
                currentUserId={currentUserId}
                lessonId={lessonId}
                onReply={() => {}}
                onOptimisticEdit={handleOptimisticEdit}
                onOptimisticDelete={handleOptimisticDelete}
                onOptimisticReply={handleOptimisticReply}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
