export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { CourseEditorClient } from './CourseEditorClient'

export const metadata: Metadata = { title: 'Editar Curso' }

export default async function EditCursosPage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params

  const { data: course } = await supabaseAdmin
    .from('courses')
    .select('*')
    .eq('id', courseId)
    .is('deleted_at', null)
    .single()

  if (!course) notFound()

  const { data: modules } = await supabaseAdmin
    .from('modules')
    .select('*, lessons(*)')
    .eq('course_id', courseId)
    .is('deleted_at', null)
    .order('sort_order', { ascending: true })

  // Filter soft-deleted lessons inside each module
  const modulesWithLessons = (modules ?? []).map((mod) => ({
    ...mod,
    lessons: (mod.lessons ?? [])
      .filter((l: { deleted_at: string | null }) => !l.deleted_at)
      .sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order),
  }))

  return (
    <CourseEditorClient
      course={course}
      initialModules={modulesWithLessons}
    />
  )
}
