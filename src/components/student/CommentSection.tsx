'use client'

import { useState } from 'react'
import { Pin, Trash2, Edit2, CornerDownRight, Send } from 'lucide-react'
import type { Comment } from './mock-data'

const EDIT_WINDOW_MS = 30 * 60 * 1000 // 30 minutos

const ROLE_CONFIG: Record<string, { label: string; className: string } | undefined> = {
  MENTOR: { label: 'Mentor', className: 'bg-[#FF3A0E]/15 text-[#FF3A0E]' },
  ADMIN: { label: 'Admin', className: 'bg-yellow-500/15 text-yellow-400' },
}

function timeAgo(date: Date): string {
  const diffMs = Date.now() - date.getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffMins = Math.floor(diffMs / 60000)
  if (diffDays > 0) return `${diffDays}d atrás`
  if (diffHours > 0) return `${diffHours}h atrás`
  return `${diffMins}min atrás`
}

function canEdit(comment: Comment, currentUserId: string): boolean {
  if (comment.deletedAt) return false
  if (comment.authorRole === 'ADMIN' || comment.authorRole === 'MENTOR') return true
  const withinWindow = Date.now() - comment.createdAt.getTime() < EDIT_WINDOW_MS
  return comment.authorName === currentUserId && withinWindow
}

function canDelete(comment: Comment, currentUserId: string): boolean {
  if (comment.deletedAt) return false
  if (comment.authorRole === 'ADMIN' || comment.authorRole === 'MENTOR') return true
  return comment.authorName === currentUserId
}

type CommentItemProps = {
  comment: Comment
  replies?: Comment[]
  currentUserId: string
  onReply: (parentId: string) => void
}

function CommentItem({ comment, replies = [], currentUserId, onReply }: CommentItemProps) {
  const [editing, setEditing] = useState(false)
  const [editContent, setEditContent] = useState(comment.content)
  const [replyOpen, setReplyOpen] = useState(false)
  const [replyContent, setReplyContent] = useState('')

  const isDeleted = !!comment.deletedAt
  const badge = ROLE_CONFIG[comment.authorRole]

  async function handleEdit(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Server Action editComment(comment.id, editContent)
    setEditing(false)
  }

  async function handleReply(e: React.FormEvent) {
    e.preventDefault()
    // TODO: Server Action addComment(lessonId, replyContent, comment.id)
    setReplyContent('')
    setReplyOpen(false)
    onReply(comment.id)
  }

  async function handleDelete() {
    if (!confirm('Remover este comentário?')) return
    // TODO: Server Action deleteComment(comment.id)
  }

  return (
    <div className="space-y-3">
      <div
        className={`border bg-[#0C0C12] p-4 ${
          comment.isPinned ? 'border-[#FF3A0E]/30' : 'border-white/10'
        }`}
      >
        {comment.isPinned && !isDeleted && (
          <div className="mb-2 flex items-center gap-1.5">
            <Pin className="h-3 w-3 text-[#FF3A0E]" />
            <span className="font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]">
              Fixado
            </span>
          </div>
        )}

        {/* Author header */}
        {!isDeleted && (
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center bg-white/10 font-mono text-[10px] font-bold text-white/60">
              {comment.authorName.charAt(0)}
            </div>
            <span className="text-sm font-medium text-white/80">
              {comment.authorName}
            </span>
            {badge && (
              <span className={`px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}>
                {badge.label}
              </span>
            )}
            <span className="ml-auto font-mono text-xs text-white/30">
              {timeAgo(comment.createdAt)}
            </span>
          </div>
        )}

        {/* Content */}
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
              <button
                type="submit"
                className="px-3 py-1.5 bg-[#FF3A0E] font-mono text-xs uppercase tracking-wide text-white hover:bg-[#FF5A1F] transition-colors"
              >
                Salvar
              </button>
              <button
                type="button"
                onClick={() => setEditing(false)}
                className="px-3 py-1.5 font-mono text-xs uppercase tracking-wide text-white/30 hover:text-white/60 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </form>
        ) : (
          <p className="text-sm leading-relaxed text-white/80">{comment.content}</p>
        )}

        {/* Actions */}
        {!isDeleted && !editing && (
          <div className="mt-3 flex items-center gap-3 border-t border-white/5 pt-3">
            <button
              onClick={() => setReplyOpen(!replyOpen)}
              className="flex items-center gap-1 font-mono text-xs text-white/30 transition-colors hover:text-white/60"
            >
              <CornerDownRight className="h-3 w-3" />
              Responder
            </button>
            {canEdit(comment, currentUserId) && (
              <button
                onClick={() => setEditing(true)}
                className="flex items-center gap-1 font-mono text-xs text-white/30 transition-colors hover:text-white/60"
              >
                <Edit2 className="h-3 w-3" />
                Editar
              </button>
            )}
            {canDelete(comment, currentUserId) && (
              <button
                onClick={handleDelete}
                className="flex items-center gap-1 font-mono text-xs text-white/30 transition-colors hover:text-[#FF3A0E]"
              >
                <Trash2 className="h-3 w-3" />
                Remover
              </button>
            )}
          </div>
        )}
      </div>

      {/* Inline reply form */}
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

      {/* Nested replies (1 nível) */}
      {replies.length > 0 && (
        <div className="ml-6 space-y-2 border-l border-white/10 pl-4">
          {replies.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              currentUserId={currentUserId}
              onReply={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  )
}

type Props = {
  lessonId: string
  initialComments?: Comment[]
}

export function CommentSection({ lessonId: _lessonId, initialComments = [] }: Props) {
  const [comments] = useState<Comment[]>(initialComments)
  const [newComment, setNewComment] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Mock: current user identifier para canEdit/canDelete
  const currentUserId = 'João Guirunas'

  const topLevel = comments.filter((c) => !c.parentCommentId)
  const nested = comments.filter((c) => !!c.parentCommentId)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newComment.trim()) return
    setSubmitting(true)
    // TODO: Server Action addComment(lessonId, newComment)
    await new Promise((r) => setTimeout(r, 600))
    setNewComment('')
    setSubmitting(false)
  }

  return (
    <div className="space-y-5">
      <h3 className="font-mono text-xs uppercase tracking-widest text-white/40">
        Comentários ({topLevel.length})
      </h3>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Deixe um comentário ou dúvida sobre esta aula..."
          rows={3}
          disabled={submitting}
          className="w-full border border-white/10 bg-[#0C0C12] p-3 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none resize-none"
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

      {/* Comment list */}
      {topLevel.length === 0 ? (
        <p className="text-sm text-white/30">
          Seja o primeiro a comentar nesta aula.
        </p>
      ) : (
        <div className="space-y-4">
          {topLevel.map((comment) => {
            const replies = nested.filter((r) => r.parentCommentId === comment.id)
            return (
              <CommentItem
                key={comment.id}
                comment={comment}
                replies={replies}
                currentUserId={currentUserId}
                onReply={() => {}}
              />
            )
          })}
        </div>
      )}
    </div>
  )
}
