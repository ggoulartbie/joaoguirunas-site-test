'use client'

import { useState, useTransition } from 'react'
import { Eye, EyeOff, MessageSquare, Reply } from 'lucide-react'
import { moderateThread, moderateReply } from './actions'

type Thread = {
  id: string
  title: string
  content: string
  created_at: string
  deleted_at: string | null
  author_id: string
  profiles: { name: string | null } | null
}

type ForumReply = {
  id: string
  content: string
  created_at: string
  deleted_at: string | null
  author_id: string
  thread_id: string
  profiles: { name: string | null } | null
}

type Tab = 'threads' | 'replies'

type Props = {
  initialThreads: Thread[]
  initialReplies: ForumReply[]
}

function formatDate(s: string) {
  return new Date(s).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function ForumModerationClient({ initialThreads, initialReplies }: Props) {
  const [tab, setTab] = useState<Tab>('threads')
  const [threads, setThreads] = useState(initialThreads)
  const [replies, setReplies] = useState(initialReplies)
  const [, startTransition] = useTransition()

  function handleThreadAction(id: string, action: 'hide' | 'restore') {
    startTransition(async () => {
      await moderateThread(id, action)
      setThreads((prev) =>
        prev.map((t) =>
          t.id === id
            ? { ...t, deleted_at: action === 'hide' ? new Date().toISOString() : null }
            : t
        )
      )
    })
  }

  function handleReplyAction(id: string, action: 'hide' | 'restore') {
    startTransition(async () => {
      await moderateReply(id, action)
      setReplies((prev) =>
        prev.map((r) =>
          r.id === id
            ? { ...r, deleted_at: action === 'hide' ? new Date().toISOString() : null }
            : r
        )
      )
    })
  }

  const hiddenThreads = threads.filter((t) => t.deleted_at).length
  const hiddenReplies = replies.filter((r) => r.deleted_at).length

  return (
    <div className="space-y-4">
      {/* Tab nav */}
      <div className="flex border-b border-[rgba(255,255,255,0.07)]">
        <button
          type="button"
          onClick={() => setTab('threads')}
          className={`flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
            tab === 'threads'
              ? 'border-b-2 border-[#ff3a0e] text-[#f1f1f3]'
              : 'text-[#84848c] hover:text-[#c5c5ca]'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Tópicos
          <span className="font-mono text-[9px] text-[#84848c]">({threads.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('replies')}
          className={`flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
            tab === 'replies'
              ? 'border-b-2 border-[#ff3a0e] text-[#f1f1f3]'
              : 'text-[#84848c] hover:text-[#c5c5ca]'
          }`}
        >
          <Reply className="h-3.5 w-3.5" />
          Respostas
          <span className="font-mono text-[9px] text-[#84848c]">({replies.length})</span>
        </button>
      </div>

      {tab === 'threads' && hiddenThreads > 0 && (
        <p className="font-mono text-[10px] text-amber-400/60">
          {hiddenThreads} tópico{hiddenThreads > 1 ? 's' : ''} oculto{hiddenThreads > 1 ? 's' : ''}
        </p>
      )}
      {tab === 'replies' && hiddenReplies > 0 && (
        <p className="font-mono text-[10px] text-amber-400/60">
          {hiddenReplies} resposta{hiddenReplies > 1 ? 's' : ''} oculta{hiddenReplies > 1 ? 's' : ''}
        </p>
      )}

      {/* Threads table */}
      {tab === 'threads' && (
        <div className="overflow-x-auto border border-[rgba(255,255,255,0.07)]">
          {threads.length === 0 ? (
            <p className="p-6 font-mono text-xs text-[#84848c]">Nenhum tópico.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#16161a]">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Título</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Autor</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Data</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Status</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {threads.map((t) => (
                  <tr
                    key={t.id}
                    className={`border-b border-[rgba(255,255,255,0.07)] hover:bg-[#050507]/40 ${t.deleted_at ? 'opacity-40' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <p className="max-w-xs truncate font-mono text-xs text-[#f1f1f3]">{t.title}</p>
                      <p className="mt-0.5 max-w-xs truncate font-mono text-[10px] text-[#84848c]">{t.content}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#c5c5ca]">
                      {t.profiles?.name ?? t.author_id.slice(0, 8)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px] text-[#84848c]">
                      {formatDate(t.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          t.deleted_at ? 'text-[#ff3a0e]' : 'text-emerald-400'
                        }`}
                      >
                        {t.deleted_at ? 'Oculto' : 'Visível'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleThreadAction(t.id, t.deleted_at ? 'restore' : 'hide')}
                        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#f1f1f3]"
                      >
                        {t.deleted_at ? (
                          <>
                            <Eye className="h-3 w-3" />
                            Restaurar
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Ocultar
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Replies table */}
      {tab === 'replies' && (
        <div className="overflow-x-auto border border-[rgba(255,255,255,0.07)]">
          {replies.length === 0 ? (
            <p className="p-6 font-mono text-xs text-[#84848c]">Nenhuma resposta.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[#16161a]">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Conteúdo</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Autor</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Data</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Status</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[#84848c]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {replies.map((r) => (
                  <tr
                    key={r.id}
                    className={`border-b border-[rgba(255,255,255,0.07)] hover:bg-[#050507]/40 ${r.deleted_at ? 'opacity-40' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <p className="max-w-sm truncate font-mono text-xs text-[#f1f1f3]">{r.content}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[#c5c5ca]">
                      {r.profiles?.name ?? r.author_id.slice(0, 8)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px] text-[#84848c]">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          r.deleted_at ? 'text-[#ff3a0e]' : 'text-emerald-400'
                        }`}
                      >
                        {r.deleted_at ? 'Oculto' : 'Visível'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleReplyAction(r.id, r.deleted_at ? 'restore' : 'hide')}
                        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#f1f1f3]"
                      >
                        {r.deleted_at ? (
                          <>
                            <Eye className="h-3 w-3" />
                            Restaurar
                          </>
                        ) : (
                          <>
                            <EyeOff className="h-3 w-3" />
                            Ocultar
                          </>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  )
}
