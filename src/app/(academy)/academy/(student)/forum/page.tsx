export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ChevronUp, CheckCircle2, Plus } from 'lucide-react'
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

export default async function ForumPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>
}) {
  const user = await requireUser()
  const supabase = await createClient()
  const { categoria: activeCategory } = await searchParams

  const { data: membership } = await supabase
    .from('cohort_members')
    .select('id')
    .eq('user_id', user.id)
    .eq('status', 'ACTIVE')
    .limit(1)

  if (!membership?.length) {
    redirect('/academy/meus-cursos?erro=forum-acesso')
  }

  // Query 1: categorias + count de threads (agregado, sem N+1)
  const { data: categoriesRaw } = await supabaseAdmin
    .from('forum_categories')
    .select('id, slug, name, color, sort_order, is_active, forum_threads(count)')
    .eq('is_active', true)
    .is('forum_threads.deleted_at', null)
    .order('sort_order', { ascending: true })

  type CategoryWithCount = NonNullable<typeof categoriesRaw>[number]
  const categories = (categoriesRaw ?? []).map((cat: CategoryWithCount) => {
    const countArr = cat.forum_threads as unknown as { count: number }[] | null
    return {
      id: cat.id,
      slug: cat.slug,
      name: cat.name,
      color: cat.color,
      sort_order: cat.sort_order,
      is_active: cat.is_active,
      threadCount: countArr?.[0]?.count ?? 0,
    }
  })

  // Query 2: threads com replies e votes embutidos (sem N+1 por thread)
  let threadsQuery = supabaseAdmin
    .from('forum_threads')
    .select(`
      id, slug, title, created_at, last_activity_at,
      is_pinned, is_resolved,
      forum_categories(slug, name),
      profiles(name, role),
      forum_replies(count),
      votes(count)
    `)
    .is('deleted_at', null)
    .is('forum_replies.deleted_at', null)
    .order('is_pinned', { ascending: false })
    .order('last_activity_at', { ascending: false })
    .limit(20)

  if (activeCategory) {
    const cat = categories.find((c) => c.slug === activeCategory)
    if (cat) {
      threadsQuery = threadsQuery.eq('category_id', cat.id)
    }
  }

  const { data: threadsRaw } = await threadsQuery

  type ThreadRow = NonNullable<typeof threadsRaw>[number]

  const threads = (threadsRaw ?? []).map((t: ThreadRow) => {
    const cat = t.forum_categories as { slug: string; name: string } | null
    const author = t.profiles as { name: string; role: string } | null
    const repliesArr = t.forum_replies as unknown as { count: number }[] | null
    const votesArr = t.votes as unknown as { count: number }[] | null

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
      replyCount: repliesArr?.[0]?.count ?? 0,
      voteCount: votesArr?.[0]?.count ?? 0,
    }
  })

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--bone-mute)]">
            Comunidade
          </p>
          <h1
            className="mt-1 font-[family-name:var(--type-display)] italic text-[color:var(--bone)]"
            style={{ fontSize: '36px', lineHeight: 1.1 }}
          >
            Fórum
          </h1>
        </div>
        <Link
          href="/academy/forum/novo"
          className="flex shrink-0 items-center gap-2 bg-[color:var(--ember)] px-4 py-2.5 font-mono text-[11px] uppercase tracking-widest text-[color:var(--void)] transition-colors hover:bg-[color:var(--ember-glow)]"
          style={{ borderRadius: 0 }}
        >
          <Plus className="h-3.5 w-3.5" />
          Nova thread
        </Link>
      </div>

      {/* Filtros por categoria */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          <Link
            href="/academy/forum"
            className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
              !activeCategory
                ? 'bg-[color:var(--ember)] text-[color:var(--void)]'
                : 'border border-[color:var(--hairline)] text-[color:var(--bone-mute)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--bone)]'
            }`}
            style={{ borderRadius: 0 }}
          >
            Todos
          </Link>
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/academy/forum?categoria=${cat.slug}`}
              className={`px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-[color:var(--ember)] text-[color:var(--void)]'
                  : 'border border-[color:var(--hairline)] text-[color:var(--bone-mute)] hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--bone)]'
              }`}
              style={{ borderRadius: 0 }}
            >
              {cat.name}
            </Link>
          ))}
        </div>
      )}

      {/* Lista de threads */}
      <div className="space-y-2">
        {threads.length === 0 ? (
          <p className="py-12 text-center font-mono text-xs text-[color:var(--bone-mute)]">
            Nenhum tópico ainda. Seja o primeiro a publicar!
          </p>
        ) : (
          threads.map((thread) => (
            <Link
              key={thread.id}
              href={`/academy/forum/${thread.categorySlug}/${thread.slug}`}
              className="group flex items-start gap-4 border border-[color:var(--hairline)] bg-[color:var(--ink)] p-4 transition-colors hover:border-[color:var(--hairline-strong)]"
              style={{ borderRadius: 0 }}
            >
              {/* Votes */}
              <div className="flex shrink-0 flex-col items-center gap-0.5">
                <ChevronUp
                  className="h-4 w-4 text-[color:var(--bone-mute)]"
                />
                <span className="font-mono text-xs text-[color:var(--bone-mute)]">
                  {thread.voteCount}
                </span>
              </div>

              {/* Centro */}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="border border-[color:var(--hairline)] px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[color:var(--bone-mute)]"
                    style={{ borderRadius: 0 }}
                  >
                    {thread.categoryName}
                  </span>
                </div>
                <h3 className="mt-1.5 font-[family-name:var(--type-sans)] text-[15px] font-medium text-[color:var(--bone)] transition-colors group-hover:text-[color:var(--ember)]">
                  {thread.title}
                </h3>
                <p className="mt-1 font-mono text-[11px] text-[color:var(--bone-mute)]">
                  por {thread.authorName} &bull; {timeAgo(thread.last_activity_at)} &bull; {thread.replyCount}{' '}
                  {thread.replyCount === 1 ? 'resposta' : 'respostas'}
                </p>
              </div>

              {/* Direita: resolved */}
              {thread.is_resolved && (
                <div className="shrink-0">
                  <CheckCircle2 className="h-4 w-4 text-[color:var(--ember)]" />
                </div>
              )}
            </Link>
          ))
        )}
      </div>
    </div>
  )
}
