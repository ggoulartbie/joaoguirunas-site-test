'use server'

import { revalidatePath } from 'next/cache'

import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/helpers'
import { getMaterialKind, buildMaterialPath, extractExt } from '@/lib/materials/storage'
import type { Database } from '@/types/database'

type CourseInsert = Database['public']['Tables']['courses']['Insert']
type CourseUpdate = Database['public']['Tables']['courses']['Update']
type ModuleInsert = Database['public']['Tables']['modules']['Insert']
type ModuleUpdate = Database['public']['Tables']['modules']['Update']
type LessonInsert = Database['public']['Tables']['lessons']['Insert']
type LessonUpdate = Database['public']['Tables']['lessons']['Update']
type ModuleMaterialInsert = Database['public']['Tables']['module_materials']['Insert']

// ── Courses ──────────────────────────────────────────────────────────────────

export async function createCourse(data: Pick<CourseInsert, 'title' | 'slug' | 'description' | 'cover_image_url'>) {
  await requireAdmin()
  const { data: course, error } = await supabaseAdmin
    .from('courses')
    .insert({ ...data, published: false, sort_order: 0 })
    .select('id, slug')
    .single()

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/cursos')
  return course
}

export async function updateCourse(id: string, data: CourseUpdate) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('courses')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/cursos')
  revalidatePath(`/academy/admin/cursos/${id}`)
}

export async function toggleCoursePublished(id: string, published: boolean) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('courses')
    .update({ published })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/cursos')
}

export async function deleteCourse(id: string) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('courses')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath('/academy/admin/cursos')
}

// ── Modules ───────────────────────────────────────────────────────────────────

export async function createModule(data: Pick<ModuleInsert, 'course_id' | 'title' | 'slug' | 'description'>) {
  await requireAdmin()
  const { data: existing } = await supabaseAdmin
    .from('modules')
    .select('sort_order')
    .eq('course_id', data.course_id)
    .is('deleted_at', null)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const nextOrder = (existing?.sort_order ?? -1) + 1

  const { data: mod, error } = await supabaseAdmin
    .from('modules')
    .insert({ ...data, sort_order: nextOrder })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${data.course_id}`)
  return mod
}

export async function updateModule(id: string, courseId: string, data: ModuleUpdate) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('modules')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

export async function deleteModule(id: string, courseId: string) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('modules')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

export async function reorderModules(courseId: string, orderedIds: string[]) {
  await requireAdmin()
  const updates = orderedIds.map((id, index) =>
    supabaseAdmin.from('modules').update({ sort_order: index }).eq('id', id)
  )
  await Promise.all(updates)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

// ── Lessons ───────────────────────────────────────────────────────────────────

export async function createLesson(data: Pick<LessonInsert, 'module_id' | 'title' | 'slug' | 'kind'> & { courseId: string }) {
  await requireAdmin()
  const { courseId, ...lessonData } = data

  const { data: existing } = await supabaseAdmin
    .from('lessons')
    .select('sort_order')
    .eq('module_id', lessonData.module_id)
    .is('deleted_at', null)
    .order('sort_order', { ascending: false })
    .limit(1)
    .single()

  const nextOrder = (existing?.sort_order ?? -1) + 1

  const { data: lesson, error } = await supabaseAdmin
    .from('lessons')
    .insert({ ...lessonData, sort_order: nextOrder })
    .select('id')
    .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  return lesson
}

export async function updateLesson(id: string, courseId: string, data: LessonUpdate) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('lessons')
    .update(data)
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  revalidatePath(`/academy/admin/cursos/${courseId}/aulas/${id}`)
}

export async function deleteLesson(id: string, courseId: string) {
  await requireAdmin()
  const { error } = await supabaseAdmin
    .from('lessons')
    .update({ deleted_at: new Date().toISOString() })
    .eq('id', id)

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

export async function reorderLessons(moduleId: string, courseId: string, orderedIds: string[]) {
  await requireAdmin()
  const updates = orderedIds.map((id, index) =>
    supabaseAdmin.from('lessons').update({ sort_order: index }).eq('id', id)
  )
  await Promise.all(updates)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

// ── Materials ─────────────────────────────────────────────────────────────────

export async function uploadMaterial(lessonId: string, courseId: string, formData: FormData) {
  await requireAdmin()
  const file = formData.get('file') as File
  if (!file) throw new Error('Nenhum arquivo enviado')

  const ext = extractExt(file.name)
  const path = buildMaterialPath('lessons', lessonId, ext)

  const { error: uploadError } = await supabaseAdmin.storage
    .from('materials')
    .upload(path, file, { upsert: false })

  if (uploadError) throw new Error(uploadError.message)

  const kind = getMaterialKind(file.type)
  const { data: material, error } = await supabaseAdmin.from('materials').insert({
    lesson_id: lessonId,
    title: file.name,
    kind,
    storage_path: path,
    size_bytes: file.size,
    sort_order: 0,
  }).select('*').single()

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  return material
}

export async function deleteMaterial(materialId: string, storagePath: string, courseId: string, lessonId?: string) {
  await requireAdmin()
  if (storagePath) {
    await supabaseAdmin.storage.from('materials').remove([storagePath])
  }
  const { error } = await supabaseAdmin.from('materials').delete().eq('id', materialId)
  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  if (lessonId) {
    revalidatePath(`/academy/admin/cursos/${courseId}/aulas/${lessonId}`)
  }
}

// ── Module Materials ──────────────────────────────────────────────────────────

export async function uploadModuleMaterial(
  moduleId: string,
  courseId: string,
  formData: FormData
): Promise<Database['public']['Tables']['module_materials']['Row']> {
  await requireAdmin()
  const file = formData.get('file') as File
  if (!file) throw new Error('Nenhum arquivo enviado')

  const ext = extractExt(file.name)
  const path = buildMaterialPath('modules', moduleId, ext)

  const { error: uploadError } = await supabaseAdmin.storage
    .from('materials')
    .upload(path, file, { upsert: false })

  if (uploadError) throw new Error(uploadError.message)

  const kind = getMaterialKind(file.type)
  const { data: material, error } = await supabaseAdmin
    .from('module_materials')
    .insert({
      module_id: moduleId,
      title: file.name,
      kind,
      storage_path: path,
      size_bytes: file.size,
      sort_order: 0,
    } satisfies ModuleMaterialInsert)
    .select('*')
    .single()

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  revalidatePath(`/academy/admin/cursos/${courseId}/modulos/${moduleId}`)
  return material
}

export async function deleteModuleMaterial(
  materialId: string,
  storagePath: string | null,
  courseId: string,
  moduleId?: string
): Promise<void> {
  await requireAdmin()
  if (storagePath) {
    try {
      await supabaseAdmin.storage.from('materials').remove([storagePath])
    } catch (e) {
      console.error('[deleteModuleMaterial] storage remove falhou (continuando):', e)
    }
  }
  const { error } = await supabaseAdmin.from('module_materials').delete().eq('id', materialId)
  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  if (moduleId) {
    revalidatePath(`/academy/admin/cursos/${courseId}/modulos/${moduleId}`)
  }
}

export async function addLinkModuleMaterial(
  moduleId: string,
  courseId: string,
  title: string,
  externalUrl: string
): Promise<Database['public']['Tables']['module_materials']['Row']> {
  await requireAdmin()

  if (!title.trim()) throw new Error('Título obrigatório')
  try { new URL(externalUrl) } catch { throw new Error('URL inválida') }

  const { data: material, error } = await supabaseAdmin
    .from('module_materials')
    .insert({
      module_id: moduleId,
      title: title.trim(),
      kind: 'LINK',
      external_url: externalUrl,
      storage_path: null,
      size_bytes: null,
      sort_order: 0,
    } satisfies ModuleMaterialInsert)
    .select('*')
    .single()

  if (error) throw new Error('Erro ao adicionar link: ' + error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
  revalidatePath(`/academy/admin/cursos/${courseId}/modulos/${moduleId}`)
  return material
}
