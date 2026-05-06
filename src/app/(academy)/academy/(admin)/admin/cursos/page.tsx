import type { Metadata } from 'next'
import Link from 'next/link'
import { Plus } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { CourseListClient } from './CourseListClient'

export const metadata: Metadata = { title: 'Cursos' }

export default async function AdminCursosPage() {
  const { data: courses } = await supabaseAdmin
    .from('courses')
    .select('id, slug, title, description, published, sort_order, cover_image_url, created_at')
    .is('deleted_at', null)
    .order('sort_order', { ascending: true })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] pb-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin</p>
          <h1 className="font-[--type-display] text-[28px] italic text-[var(--bone)]">Cursos</h1>
        </div>
        <Link
          href="/academy/admin/cursos/novo"
          className="flex items-center gap-2 bg-[var(--ember)] px-4 py-2.5 font-mono text-[10px] font-semibold uppercase tracking-widest text-[var(--void)] transition-opacity hover:opacity-90"
          style={{ borderRadius: 0 }}
        >
          <Plus className="h-3.5 w-3.5" />
          Novo Curso
        </Link>
      </div>

      <CourseListClient initialCourses={courses ?? []} />
    </div>
  )
}
