import type { Metadata } from 'next'
import Link from 'next/link'
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
            Cursos
          </h1>
          <p className="mt-1 font-mono text-xs text-white/30">
            Catálogo de conteúdo reutilizável entre turmas
          </p>
        </div>
        <Link
          href="/admin/cursos/novo"
          className="flex items-center gap-2 bg-[#FF3A0E] px-4 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90"
        >
          + Novo Curso
        </Link>
      </div>

      <CourseListClient initialCourses={courses ?? []} />
    </div>
  )
}
