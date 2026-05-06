import type { Metadata } from 'next'
import Link from 'next/link'
import { MessageSquare, Pin, CheckCircle2, ArrowRight, Search } from 'lucide-react'
import {
  MOCK_FORUM_CATEGORIES,
  MOCK_FORUM_THREADS,
} from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Fórum' }

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffMins = Math.floor(diffMs / 60000)

  if (diffDays > 0) return `${diffDays}d atrás`
  if (diffHours > 0) return `${diffHours}h atrás`
  return `${diffMins}min atrás`
}

const ROLE_BADGE: Record<string, { label: string; className: string }> = {
  MENTOR: { label: 'Mentor', className: 'bg-[#FF3A0E]/15 text-[#FF3A0E]' },
  ADMIN: { label: 'Admin', className: 'bg-yellow-500/15 text-yellow-400' },
  STUDENT: { label: '', className: '' },
}

export default function ForumPage() {
  // TODO F5.1: substituir por getForumCategories() + getRecentThreads(userId)
  const categories = MOCK_FORUM_CATEGORIES
  const threads = MOCK_FORUM_THREADS.sort(
    (a, b) => new Date(b.last_activity_at).getTime() - new Date(a.last_activity_at).getTime()
  )

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Fórum</h1>
          <p className="mt-1 text-sm text-white/50">Discussões da comunidade</p>
        </div>
        <Link
          href="/forum/novo"
          className="flex shrink-0 items-center gap-2 bg-[#FF3A0E] px-4 py-2.5 font-mono text-xs uppercase tracking-wide text-white hover:bg-[#FF5A1F] transition-colors"
        >
          <MessageSquare className="h-3.5 w-3.5" />
          Novo tópico
        </Link>
      </div>

      {/* Busca */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
        <input
          type="search"
          placeholder="Buscar tópicos..."
          className="w-full border border-white/10 bg-[#0C0C12] py-2.5 pl-9 pr-4 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
        />
      </div>

      {/* Categorias */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Categorias
        </h2>
        <div className="mt-3 grid gap-2 sm:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/forum/categoria/${cat.slug}`}
              className="group flex items-center justify-between border border-white/10 bg-[#0C0C12] px-4 py-3 transition-colors hover:border-white/20 hover:bg-[#121218]"
            >
              <div className="flex items-center gap-2.5">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ backgroundColor: cat.color ?? undefined }}
                />
                <span className="text-sm font-medium text-white group-hover:text-[#FF3A0E] transition-colors">
                  {cat.name}
                </span>
              </div>
              <span className="font-mono text-xs text-white/30">
                {cat.threadCount}
              </span>
            </Link>
          ))}
        </div>
      </div>

      {/* Threads recentes */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Atividade recente
        </h2>
        <div className="mt-3 space-y-2">
          {threads.map((thread) => {
            const badge = ROLE_BADGE[thread.authorRole]
            return (
              <Link
                key={thread.id}
                href={`/forum/${thread.categorySlug}/${thread.slug}`}
                className="group flex items-start gap-4 border border-white/10 bg-[#0C0C12] p-4 transition-colors hover:border-white/20 hover:bg-[#121218]"
              >
                {/* Status icon */}
                <div className="mt-0.5 shrink-0">
                  {thread.is_resolved ? (
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  ) : (
                    <MessageSquare className="h-4 w-4 text-white/20" />
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    {thread.is_pinned && (
                      <Pin className="h-3 w-3 shrink-0 text-[#FF3A0E]" />
                    )}
                    <h3 className="text-sm font-medium text-white group-hover:text-[#FF3A0E] transition-colors">
                      {thread.title}
                    </h3>
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3">
                    <span className="border border-white/10 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/30">
                      {thread.categoryName}
                    </span>
                    <span className="text-xs text-white/40">
                      {thread.authorName}
                      {badge?.label && (
                        <span className={`ml-1.5 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wide ${badge.className}`}>
                          {badge.label}
                        </span>
                      )}
                    </span>
                    <span className="text-xs text-white/30">
                      {timeAgo(thread.last_activity_at)}
                    </span>
                  </div>
                </div>

                <div className="shrink-0 text-right">
                  <div className="flex items-center gap-3 font-mono text-xs text-white/30">
                    <span>{thread.voteCount} votos</span>
                    <span>{thread.replyCount} resp.</span>
                  </div>
                </div>
              </Link>
            )
          })}
        </div>

        <Link
          href="/forum/todos"
          className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
        >
          Ver todos os tópicos
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>
    </div>
  )
}
