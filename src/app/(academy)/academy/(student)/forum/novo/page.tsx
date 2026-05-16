export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireUser } from '@/lib/auth/helpers'
import { NewThreadForm } from '@/components/student/NewThreadForm'

export const metadata: Metadata = { title: 'Nova Thread — Fórum' }

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
    redirect('/academy/meus-cursos?erro=forum-acesso')
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
      {/* Breadcrumb */}
      <Link
        href="/academy/forum"
        className="flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-widest text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--bone)]"
      >
        <ArrowLeft className="h-3 w-3" />
        Fórum
      </Link>

      {/* Header */}
      <div>
        <p className="font-mono text-[11px] uppercase tracking-widest text-[color:var(--bone-mute)]">
          Fórum
        </p>
        <h1
          className="mt-1 font-[family-name:var(--type-display)] italic text-[color:var(--bone)]"
          style={{ fontSize: '36px', lineHeight: 1.1 }}
        >
          Nova thread
        </h1>
      </div>

      {/* Form */}
      <div
        className="border border-t-2 border-[color:var(--hairline)] bg-[color:var(--ink)] p-6"
        style={{ borderTopColor: 'var(--ember)', borderRadius: 0 }}
      >
        <NewThreadForm categories={categories} />
      </div>
    </div>
  )
}
