'use client'

import { useState } from 'react'
import { Send } from 'lucide-react'

type Props = {
  threadId: string
  parentReplyId?: string
  onSuccess?: () => void
  compact?: boolean
}

export function ForumReplyForm({ threadId: _threadId, parentReplyId: _parentReplyId, onSuccess, compact = false }: Props) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!content.trim()) return

    setSubmitting(true)
    // TODO F5.1: Server Action addForumReply(threadId, parentReplyId, content)
    await new Promise((r) => setTimeout(r, 600))
    setContent('')
    setSubmitting(false)
    onSuccess?.()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder={compact ? 'Escreva uma resposta...' : 'Escreva sua resposta em Markdown...'}
          rows={compact ? 3 : 6}
          className="w-full resize-y border border-white/10 bg-[#0C0C12] p-3 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
          disabled={submitting}
        />
      </div>

      {!compact && (
        <p className="font-mono text-[10px] text-white/20">
          Suporte a Markdown: **negrito**, *itálico*, `código`, ```bloco```
        </p>
      )}

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={submitting || !content.trim()}
          className="flex items-center gap-2 bg-[#FF3A0E] px-4 py-2 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#FF5A1F] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="h-3.5 w-3.5" />
          {submitting ? 'Enviando...' : 'Responder'}
        </button>
      </div>
    </form>
  )
}
