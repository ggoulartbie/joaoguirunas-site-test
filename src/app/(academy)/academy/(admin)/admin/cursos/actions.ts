'use server'

import { revalidatePath } from 'next/cache'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/helpers'
import type { Database } from '@/types/database'

type CourseInsert = Database['public']['Tables']['courses']['Insert']
type CourseUpdate = Database['public']['Tables']['courses']['Update']
type ModuleInsert = Database['public']['Tables']['modules']['Insert']
type ModuleUpdate = Database['public']['Tables']['modules']['Update']
type LessonInsert = Database['public']['Tables']['lessons']['Insert']
type LessonUpdate = Database['public']['Tables']['lessons']['Update']

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

  const ext = file.name.split('.').pop()
  const path = `lessons/${lessonId}/${crypto.randomUUID()}.${ext}`

  const { error: uploadError } = await supabaseAdmin.storage
    .from('materials')
    .upload(path, file, { upsert: false })

  if (uploadError) throw new Error(uploadError.message)

  const kind = getMaterialKind(file.type)
  const { error } = await supabaseAdmin.from('materials').insert({
    lesson_id: lessonId,
    title: file.name,
    kind,
    storage_path: path,
    size_bytes: file.size,
    sort_order: 0,
  })

  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

export async function deleteMaterial(materialId: string, storagePath: string, courseId: string) {
  await requireAdmin()
  await supabaseAdmin.storage.from('materials').remove([storagePath])
  const { error } = await supabaseAdmin.from('materials').delete().eq('id', materialId)
  if (error) throw new Error(error.message)
  revalidatePath(`/academy/admin/cursos/${courseId}`)
}

function getMaterialKind(mimeType: string): 'PDF' | 'ZIP' | 'IMAGE' | 'LINK' | 'OTHER' {
  if (mimeType === 'application/pdf') return 'PDF'
  if (mimeType === 'application/zip' || mimeType === 'application/x-zip-compressed') return 'ZIP'
  if (mimeType.startsWith('image/')) return 'IMAGE'
  return 'OTHER'
}
