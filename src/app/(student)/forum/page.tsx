import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { MessageSquare, Pin, CheckCircle2, ArrowRight } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'

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

export default async function ForumPage() {
  // Guard: requer matrícula ativa
  const user = await requireUser()
  const supabase = await createClient()

  const { data: membership } = await supabase
    .from('cohort_members')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .limit(1)

  if (!membership?.length) {
    redirect('/meus-cursos?erro=forum-acesso')
  }

  // Categorias ativas
  const { data: categoriesRaw } = await supabaseAdmin
    .from('forum_categories')
    .select('id, slug, name, color, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const categories = await Promise.all(
    (categoriesRaw ?? []).map(async (cat) => {
      const { count } = await supabaseAdmin
        .from('forum_threads')
        .select('id', { count: 'exact', head: true })
        .eq('category_id', cat.id)
        .is('deleted_at', null)
      return { ...cat, threadCount: count ?? 0 }
    })
  )

  // Threads recentes com autor e categoria
  const { data: threadsRaw } = await supabaseAdmin
    .from('forum_threads')
    .select(`
      id, slug, title, created_at, last_activity_at,
      is_pinned, is_resolved,
      forum_categories(slug, name),
      profiles(name, role)
    `)
    .is('deleted_at', null)
    .order('last_activity_at', { ascending: false })
    .limit(20)

  type ThreadRow = NonNullable<typeof threadsRaw>[number]

  const threads = await Promise.all(
    (threadsRaw ?? []).map(async (t: ThreadRow) => {
      const [{ count: replyCount }, { count: voteCount }] = await Promise.all([
        supabaseAdmin
          .from('forum_replies')
          .select('id', { count: 'exact', head: true })
          .eq('thread_id', t.id)
          .is('deleted_at', null),
        supabaseAdmin
          .from('votes')
          .select('id', { count: 'exact', head: true })
          .eq('thread_id', t.id),
      ])

      const cat = t.forum_categories as { slug: string; name: string } | null
      const author = t.profiles as { name: string; role: string } | null

      return {
        id: t.id,
        slug: t.slug,
        title: t.title,
        created_at: t.created_at,
        last_activity_at: t.last_activity_at,
        is_pinned: t.is_pinned,
        is_resolved: t.is_resolved,
        categorySlug: cat?.slug ?? '',
        categoryName: cat?.name ?? '',
        authorName: author?.name ?? 'Desconhecido',
        authorRole: (author?.role ?? 'STUDENT') as string,
        replyCount: replyCount ?? 0,
        voteCount: voteCount ?? 0,
      }
    })
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

      {/* Categorias */}
      {categories.length > 0 && (
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
            Categorias
          </h2>
          <div className="mt-3 grid gap-2 sm:grid-cols-3">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href="/forum"
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
      )}

      {/* Threads recentes */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Atividade recente
        </h2>
        <div className="mt-3 space-y-2">
          {threads.length === 0 ? (
            <p className="py-8 text-center text-sm text-white/40">
              Nenhum tópico ainda. Seja o primeiro a publicar!
            </p>
          ) : (
            threads.map((thread) => {
              const badge = ROLE_BADGE[thread.authorRole]
              return (
                <Link
                  key={thread.id}
                  href={`/forum/${thread.categorySlug}/${thread.slug}`}
                  className="group flex items-start gap-4 border border-white/10 bg-[#0C0C12] p-4 transition-colors hover:border-white/20 hover:bg-[#121218]"
                >
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
            })
          )}
        </div>

        {threads.length > 0 && (
          <Link
            href="/forum"
            className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
          >
            Ver todos os tópicos
            <ArrowRight className="h-3 w-3" />
          </Link>
        )}
      </div>
    </div>
  )
}
