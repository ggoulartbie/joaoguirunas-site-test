'use client'

import { useState, useOptimistic, useTransition } from 'react'
import {
  addComment,
  editComment,
  deleteComment,
} from '@/lib/actions/comments'
import type { CommentWithAuthor } from '@/types/student'
import { Pin, Pencil, Trash2, Reply, X, Check } from 'lucide-react'

type Comment = CommentWithAuthor

const ROLE_BADGE: Record<string, { label: string; color: string }> = {
  MENTOR: { label: 'Mentor', color: 'text-[#FF3A0E] border-[#FF3A0E]/30 bg-[#FF3A0E]/5' },
  ADMIN: { label: 'Admin', color: 'text-amber-400 border-amber-400/30 bg-amber-400/5' },
  STUDENT: { label: '', color: '' },
}

function formatRelative(date: string) {
  const d = new Date(date)
  const diff = (Date.now() - d.getTime()) / 1000
  if (diff < 60) return 'agora'
  if (diff < 3600) return `${Math.floor(diff / 60)} min atrás`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h atrás`
  return d.toLocaleDateString('pt-BR')
}

type CommentItemProps = {
  comment: Comment
  currentUserId: string
  onReply: (id: string, name: string) => void
  onDelete: (id: string) => void
  onEdit: (id: string, content: string) => void
  isReply?: boolean
}

function CommentItem({
  comment,
  currentUserId,
  onReply,
  onDelete,
  onEdit,
  isReply = false,
}: CommentItemProps) {
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)

  if (comment.deleted_at) {
    return (
      <div className={`${isReply ? 'ml-8 border-l border-white/5 pl-4' : ''}`}>
        <p className="py-2 font-mono text-xs italic text-white/20">
          [comentário removido]
        </p>
      </div>
    )
  }

  const badge = ROLE_BADGE[comment.authorRole]
  const isOwn = comment.authorId === currentUserId

  function handleSaveEdit() {
    if (editContent.trim()) {
      onEdit(comment.id, editContent.trim())
      setEditing(false)
    }
  }

  return (
    <div className={`group ${isReply ? 'ml-8 border-l border-white/5 pl-4' : ''}`}>
      <div className="flex gap-3 py-3">
        {/* Avatar */}
        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center bg-white/10 font-mono text-[10px] font-bold text-white/50">
          {comment.authorName.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-semibold text-white/80">
              {comment.authorName}
            </span>
            {badge?.label && (
              <span
                className={`border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-wider ${badge.color}`}
              >
                {badge.label}
              </span>
            )}
            {comment.is_pinned && (
              <span className="flex items-center gap-1 font-mono text-[9px] uppercase tracking-wider text-amber-400/60">
                <Pin className="h-2.5 w-2.5" />
                Fixado
              </span>
            )}
            <span className="font-mono text-[10px] text-white/20">
              {formatRelative(comment.created_at)}
            </span>
          </div>

          {/* Content or edit form */}
          {editing ? (
            <div className="mt-2 space-y-2">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                rows={3}
                className="w-full border border-white/10 bg-white/[0.03] px-3 py-2 font-mono text-sm text-white/80 focus:border-white/20 focus:outline-none"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleSaveEdit}
                  className="flex items-center gap-1.5 bg-[#FF3A0E] px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white"
                >
                  <Check className="h-3 w-3" />
                  Salvar
                </button>
                <button
                  type="button"
                  onClick={() => { setEditing(false); setEditContent(comment.content) }}
                  className="flex items-center gap-1.5 border border-white/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-white/40"
                >
                  <X className="h-3 w-3" />
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-sm text-white/70 leading-relaxed">
              {comment.content}
            </p>
          )}

          {/* Actions */}
          {!editing && (
            <div className="mt-2 flex items-center gap-3 opacity-0 transition-opacity group-hover:opacity-100">
              {!isReply && (
                <button
                  type="button"
                  onClick={() => onReply(comment.id, comment.authorName)}
                  className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/30 transition-colors hover:text-white/60"
                >
                  <Reply className="h-3 w-3" />
                  Responder
                </button>
              )}
              {isOwn && (
                <>
                  <button
                    type="button"
                    onClick={() => setEditing(true)}
                    className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/30 transition-colors hover:text-white/60"
                  >
                    <Pencil className="h-3 w-3" />
                    Editar
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(comment.id)}
                    className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/30 transition-colors hover:text-red-400/70"
                  >
                    <Trash2 className="h-3 w-3" />
                    Excluir
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

type CommentFormProps = {
  lessonId: string
  parentCommentId?: string
  replyingToName?: string
  onCancel?: () => void
  onSubmitted?: () => void
  placeholder?: string
  autoFocus?: boolean
}

function CommentForm({
  lessonId,
  parentCommentId,
  replyingToName,
  onCancel,
  onSubmitted,
  placeholder = 'Escreva um comentário...',
  autoFocus = false,
}: CommentFormProps) {
  const [content, setContent] = useState('')
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return
    setError(null)

    startTransition(async () => {
      const result = await addComment(lessonId, content.trim(), parentCommentId)
      if (result.success) {
        setContent('')
        onSubmitted?.()
      } else {
        setError(result.error ?? 'Erro ao enviar comentário')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      {replyingToName && (
        <p className="font-mono text-[10px] text-white/30">
          Respondendo a <span className="text-white/60">{replyingToName}</span>
        </p>
      )}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder={placeholder}
        rows={3}
        autoFocus={autoFocus}
        disabled={isPending}
        className="w-full border border-white/10 bg-white/[0.03] px-3 py-2.5 font-mono text-sm text-white/80 placeholder-white/20 focus:border-white/20 focus:outline-none disabled:opacity-50"
      />
      {error && (
        <p className="font-mono text-xs text-red-400">{error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isPending || !content.trim()}
          className="bg-[#FF3A0E] px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white disabled:cursor-not-allowed disabled:opacity-40"
        >
          {isPending ? 'Enviando...' : 'Comentar'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="border border-white/10 px-4 py-2 font-mono text-[10px] uppercase tracking-wider text-white/40 transition-colors hover:text-white/70"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}

type CommentsSectionProps = {
  lessonId: string
  initialComments: Comment[]
  currentUserName: string
}

export function CommentsSection({
  lessonId,
  initialComments,
  currentUserName,
}: CommentsSectionProps) {
  const [comments, setComments] = useState(initialComments)
  const [replyingTo, setReplyingTo] = useState<{ id: string; name: string } | null>(null)
  const [, startTransition] = useTransition()

  // Thread tree: top-level + replies grouped
  const topLevel = comments.filter((c) => !c.parent_comment_id)
  const repliesMap = comments.reduce<Record<string, Comment[]>>((acc, c) => {
    if (c.parent_comment_id) {
      acc[c.parent_comment_id] = [...(acc[c.parent_comment_id] ?? []), c]
    }
    return acc
  }, {})

  function handleDelete(commentId: string) {
    startTransition(async () => {
      await deleteComment(commentId)
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, deleted_at: new Date().toISOString() } : c
        )
      )
    })
  }

  function handleEdit(commentId: string, content: string) {
    startTransition(async () => {
      await editComment(commentId, content)
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentId ? { ...c, content, updated_at: new Date().toISOString() } : c
        )
      )
    })
  }

  const visibleCount = comments.filter((c) => !c.deleted_at).length

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Comentários
        </h3>
        {visibleCount > 0 && (
          <span className="font-mono text-[10px] text-white/20">({visibleCount})</span>
        )}
      </div>

      {/* New comment form */}
      <CommentForm
        lessonId={lessonId}
        placeholder="Deixe sua dúvida ou comentário sobre esta aula..."
        onSubmitted={() => {}}
      />

      {/* Thread list */}
      {topLevel.length === 0 ? (
        <p className="py-4 font-mono text-xs text-white/20">
          Seja o primeiro a comentar nesta aula.
        </p>
      ) : (
        <div className="divide-y divide-white/5">
          {topLevel.map((comment) => (
            <div key={comment.id}>
              <CommentItem
                comment={comment}
                currentUserId={currentUserName}
                onReply={(id, name) => setReplyingTo({ id, name })}
                onDelete={handleDelete}
                onEdit={handleEdit}
              />

              {/* Replies */}
              {(repliesMap[comment.id] ?? []).map((reply) => (
                <CommentItem
                  key={reply.id}
                  comment={reply}
                  currentUserId={currentUserName}
                  onReply={() => {}}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                  isReply
                />
              ))}

              {/* Reply form */}
              {replyingTo !== null && replyingTo.id === comment.id && (
                <div className="ml-8 border-l border-white/5 py-3 pl-4">
                  <CommentForm
                    lessonId={lessonId}
                    parentCommentId={comment.id}
                    replyingToName={replyingTo.name}
                    onCancel={() => setReplyingTo(null)}
                    onSubmitted={() => setReplyingTo(null)}
                    autoFocus
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
