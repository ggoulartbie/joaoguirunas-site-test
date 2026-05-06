import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { NewThreadForm } from '@/components/student/NewThreadForm'

export const metadata: Metadata = { title: 'Novo Tópico — Fórum' }

export default async function NovoTopicoPage() {
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

  const { data: categoriesRaw } = await supabaseAdmin
    .from('forum_categories')
    .select('id, slug, name, description, color, sort_order, is_active')
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  const categories = (categoriesRaw ?? []).map((c) => ({
    id: c.id,
    slug: c.slug,
    name: c.name,
    description: c.description ?? null,
    color: c.color ?? null,
    sort_order: c.sort_order,
    is_active: c.is_active,
  }))

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/forum"
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Fórum
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Novo tópico</h1>
        <p className="mt-1 text-sm text-white/50">
          Compartilhe dúvidas, ideias ou experiências com a comunidade.
        </p>
      </div>

      <NewThreadForm categories={categories} />
    </div>
  )
}
