export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { ModuleEditorClient } from './ModuleEditorClient'

export const metadata: Metadata = { title: 'Editar Módulo' }

export default async function EditModulePage({
  params,
}: {
  params: Promise<{ courseId: string; moduleId: string }>
}) {
  const { courseId, moduleId } = await params

  const { data: module } = await supabaseAdmin
    .from('modules')
    .select('*')
    .eq('id', moduleId)
    .is('deleted_at', null)
    .single()

  if (!module) notFound()

  const { data: materials } = await supabaseAdmin
    .from('module_materials')
    .select('*')
    .eq('module_id', moduleId)
    .order('sort_order', { ascending: true })

  return (
    <ModuleEditorClient
      module={module}
      initialMaterials={materials ?? []}
      courseId={courseId}
    />
  )
}
