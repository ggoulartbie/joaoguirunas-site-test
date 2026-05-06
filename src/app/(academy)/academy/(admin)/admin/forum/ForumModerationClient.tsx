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
              ? 'border-b-2 border-[var(--ember)] text-[var(--bone)]'
              : 'text-[var(--bone-mute)] hover:text-[var(--bone-dim)]'
          }`}
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Tópicos
          <span className="font-mono text-[9px] text-[var(--bone-mute)]">({threads.length})</span>
        </button>
        <button
          type="button"
          onClick={() => setTab('replies')}
          className={`flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
            tab === 'replies'
              ? 'border-b-2 border-[var(--ember)] text-[var(--bone)]'
              : 'text-[var(--bone-mute)] hover:text-[var(--bone-dim)]'
          }`}
        >
          <Reply className="h-3.5 w-3.5" />
          Respostas
          <span className="font-mono text-[9px] text-[var(--bone-mute)]">({replies.length})</span>
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
            <p className="p-6 font-mono text-xs text-[var(--bone-mute)]">Nenhum tópico.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[var(--ink-2)]">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Título</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Autor</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Data</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Status</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {threads.map((t) => (
                  <tr
                    key={t.id}
                    className={`border-b border-[rgba(255,255,255,0.07)] hover:bg-[var(--void)]/40 ${t.deleted_at ? 'opacity-40' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <p className="max-w-xs truncate font-mono text-xs text-[var(--bone)]">{t.title}</p>
                      <p className="mt-0.5 max-w-xs truncate font-mono text-[10px] text-[var(--bone-mute)]">{t.content}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--bone-dim)]">
                      {t.profiles?.name ?? t.author_id.slice(0, 8)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px] text-[var(--bone-mute)]">
                      {formatDate(t.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          t.deleted_at ? 'text-[var(--ember)]' : 'text-emerald-400'
                        }`}
                      >
                        {t.deleted_at ? 'Oculto' : 'Visível'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleThreadAction(t.id, t.deleted_at ? 'restore' : 'hide')}
                        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
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
            <p className="p-6 font-mono text-xs text-[var(--bone-mute)]">Nenhuma resposta.</p>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="bg-[var(--ink-2)]">
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Conteúdo</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Autor</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Data</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Status</th>
                  <th className="px-4 py-3 font-mono text-[10px] uppercase tracking-wide text-[var(--bone-mute)]">Ação</th>
                </tr>
              </thead>
              <tbody>
                {replies.map((r) => (
                  <tr
                    key={r.id}
                    className={`border-b border-[rgba(255,255,255,0.07)] hover:bg-[var(--void)]/40 ${r.deleted_at ? 'opacity-40' : ''}`}
                  >
                    <td className="px-4 py-3">
                      <p className="max-w-sm truncate font-mono text-xs text-[var(--bone)]">{r.content}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-[var(--bone-dim)]">
                      {r.profiles?.name ?? r.author_id.slice(0, 8)}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3 font-mono text-[10px] text-[var(--bone-mute)]">
                      {formatDate(r.created_at)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`font-mono text-[9px] uppercase tracking-wider ${
                          r.deleted_at ? 'text-[var(--ember)]' : 'text-emerald-400'
                        }`}
                      >
                        {r.deleted_at ? 'Oculto' : 'Visível'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleReplyAction(r.id, r.deleted_at ? 'restore' : 'hide')}
                        className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)]"
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
