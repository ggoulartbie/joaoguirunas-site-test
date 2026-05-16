export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { CohortForm } from '../CohortForm'

export const metadata: Metadata = { title: 'Nova Turma' }

export default async function NovaTurmaPage() {
  const [{ data: rawCourses }, { data: allCohortsRaw }] = await Promise.all([
    supabaseAdmin
      .from('courses')
      .select('id, title, modules!inner(id, title, sort_order, lessons(id))')
      .is('deleted_at', null)
      .order('sort_order', { ascending: true }),
    supabaseAdmin.from('cohorts').select('id, name').order('name', { ascending: true }),
  ])

  const courses = (rawCourses ?? []).map((c) => ({
    id: c.id,
    title: c.title,
    modules: ((c.modules as Array<{ id: string; title: string; sort_order: number; lessons: Array<unknown> }>) ?? [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map((m) => ({
        id: m.id,
        title: m.title,
        lessonCount: (m.lessons ?? []).length,
      })),
  }))

  const allCohorts = (allCohortsRaw ?? []).map((c) => ({ id: c.id, name: c.name }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[var(--hairline)] pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Turmas</p>
          <h1 className="font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">
            Nova Turma
          </h1>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Preencha todas as secoes e salve para criar a turma
          </p>
        </div>
        <Link
          href="/academy/admin/turmas"
          className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Voltar
        </Link>
      </div>
      <CohortForm mode="create" courses={courses} allCohorts={allCohorts} />
    </div>
  )
}
