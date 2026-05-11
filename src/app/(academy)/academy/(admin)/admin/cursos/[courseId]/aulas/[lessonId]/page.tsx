import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { LessonEditorClient } from './LessonEditorClient'

export const metadata: Metadata = { title: 'Editar Aula' }

export default async function EditAulaPage({
  params,
}: {
  params: Promise<{ courseId: string; lessonId: string }>
}) {
  const { courseId, lessonId } = await params

  const { data: lesson } = await supabaseAdmin
    .from('lessons')
    .select('*')
    .eq('id', lessonId)
    .is('deleted_at', null)
    .single()

  if (!lesson) notFound()

  const { data: materials } = await supabaseAdmin
    .from('materials')
    .select('*')
    .eq('lesson_id', lessonId)
    .order('sort_order', { ascending: true })

  return (
    <LessonEditorClient
      lesson={lesson}
      initialMaterials={materials ?? []}
      courseId={courseId}
      vimeoDomain={process.env.VIMEO_DOMAIN_WHITELIST ?? ''}
    />
  )
}
