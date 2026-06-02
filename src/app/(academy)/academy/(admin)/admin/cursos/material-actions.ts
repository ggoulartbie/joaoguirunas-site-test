'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { uploadMaterial, deleteMaterialFile, buildMaterialPath, extractExtFromMime } from '@/lib/storage/materials'
import { requireAdmin } from '@/lib/auth/helpers'
import { sendNewMaterialEmail } from '@/lib/email/send'
import type { Database } from '@/types/database'

type MaterialInsert = Database['public']['Tables']['materials']['Insert']
type MaterialKind = 'PDF' | 'ZIP' | 'IMAGE' | 'LINK' | 'OTHER'

const ALLOWED_MIME: Record<string, MaterialKind> = {
  'application/pdf': 'PDF',
  'application/zip': 'ZIP',
  'application/x-zip-compressed': 'ZIP',
  'image/jpeg': 'IMAGE',
  'image/png': 'IMAGE',
  'image/gif': 'IMAGE',
  'image/webp': 'IMAGE',
}

const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB (limite do bucket)

const linkSchema = z.object({
  lessonId: z.string().uuid(),
  title: z.string().min(1).max(200),
  url: z.string().url(),
  sortOrder: z.number().int().min(0).default(0),
})

export async function uploadMaterialAction(formData: FormData): Promise<void> {
  await requireAdmin()

  const lessonId = formData.get('lessonId')
  const title = formData.get('title')
  const file = formData.get('file')
  const sortOrderRaw = formData.get('sortOrder')

  if (typeof lessonId !== 'string' || !z.string().uuid().safeParse(lessonId).success) {
    throw new Error('lessonId inválido')
  }
  if (typeof title !== 'string' || title.trim().length === 0) {
    throw new Error('título obrigatório')
  }
  if (!(file instanceof File) || file.size === 0) {
    throw new Error('arquivo obrigatório')
  }
  if (file.size > MAX_FILE_SIZE) {
    throw new Error('Arquivo excede o limite de 100MB')
  }

  const kind = ALLOWED_MIME[file.type] ?? 'OTHER'
  const sortOrder = sortOrderRaw ? parseInt(String(sortOrderRaw), 10) : 0

  // cria registro no banco para obter o ID antes do upload
  const { data: material, error: dbError } = await supabaseAdmin
    .from('materials')
    .insert({
      lesson_id: lessonId,
      title: title.trim(),
      kind,
      size_bytes: file.size,
      sort_order: isNaN(sortOrder) ? 0 : sortOrder,
    } satisfies MaterialInsert)
    .select('id')
    .single()

  if (dbError || !material) {
    throw new Error('Erro ao criar registro do material')
  }

  // faz upload usando o ID recém-criado como nome de arquivo
  const ext = extractExtFromMime(file.type)
  const storagePath = buildMaterialPath(lessonId, material.id, ext)

  try {
    await uploadMaterial(file, lessonId, material.id)
  } catch (uploadError) {
    // rollback do registro se o upload falhar
    await supabaseAdmin.from('materials').delete().eq('id', material.id)
    throw uploadError
  }

  // atualiza o storage_path no registro
  const { error: updateError } = await supabaseAdmin
    .from('materials')
    .update({ storage_path: storagePath })
    .eq('id', material.id)

  if (updateError) {
    // arquivo foi enviado mas path não foi salvo — não deletar arquivo, logar para retry manual
    throw new Error('Upload concluído mas houve erro ao salvar o caminho. Contate o suporte.')
  }

  revalidatePath(`/academy/admin/cursos`)

  // Notify active members of all cohorts that include this lesson's course — fire-and-forget
  notifyMembersNewMaterial(lessonId, title.trim()).catch(() => null)
}

async function notifyMembersNewMaterial(lessonId: string, materialTitle: string): Promise<void> {
  // Get lesson + course info
  const { data: lesson } = await supabaseAdmin
    .from('lessons')
    .select('title, module_id, modules(course_id, courses(title))')
    .eq('id', lessonId)
    .single()

  if (!lesson) return

  const moduleData = lesson.modules as { course_id: string; courses: { title: string } | null } | null
  const courseId = moduleData?.course_id
  const courseTitle = moduleData?.courses?.title
  if (!courseId) return

  // Find cohorts that include this course
  const { data: cohortCourses } = await supabaseAdmin
    .from('cohort_courses')
    .select('cohort_id, cohorts(name)')
    .eq('course_id', courseId)

  if (!cohortCourses?.length) return

  for (const row of cohortCourses) {
    const cohortId = row.cohort_id
    const cohortName = (row.cohorts as { name: string } | null)?.name ?? 'sua turma'

    // Get active members of this cohort
    const { data: members } = await supabaseAdmin
      .from('cohort_members')
      .select('user_id')
      .eq('cohort_id', cohortId)
      .eq('status', 'ACTIVE')

    for (const member of members ?? []) {
      const { data: authUser } = await supabaseAdmin.auth.admin.getUserById(member.user_id)
      if (!authUser.user?.email) continue

      const { data: profile } = await supabaseAdmin
        .from('profiles')
        .select('name')
        .eq('id', member.user_id)
        .single()

      sendNewMaterialEmail(
        authUser.user.email,
        profile?.name ?? 'Aluno',
        cohortName,
        materialTitle,
        lesson.title,
      ).catch(() => null)
    }
  }
}

export async function addLinkMaterialAction(input: z.infer<typeof linkSchema>): Promise<void> {
  await requireAdmin()

  const parsed = linkSchema.safeParse(input)
  if (!parsed.success) {
    throw new Error('Dados inválidos: ' + parsed.error.issues.map((i) => i.message).join(', '))
  }

  const { lessonId, title, url, sortOrder } = parsed.data

  const { error } = await supabaseAdmin.from('materials').insert({
    lesson_id: lessonId,
    title,
    kind: 'LINK',
    external_url: url,
    sort_order: sortOrder,
  } satisfies MaterialInsert)

  if (error) throw new Error('Erro ao adicionar link: ' + error.message)

  revalidatePath(`/academy/admin/cursos`)
}

export async function deleteMaterialAction(materialId: string): Promise<void> {
  await requireAdmin()

  if (!z.string().uuid().safeParse(materialId).success) {
    throw new Error('materialId inválido')
  }

  const { data: material, error } = await supabaseAdmin
    .from('materials')
    .select('id, storage_path, kind')
    .eq('id', materialId)
    .single()

  if (error || !material) throw new Error('Material não encontrado')

  // deleta arquivo do storage se existir
  if (material.storage_path) {
    await deleteMaterialFile(material.storage_path)
  }

  const { error: dbError } = await supabaseAdmin
    .from('materials')
    .delete()
    .eq('id', materialId)

  if (dbError) throw new Error('Erro ao deletar material: ' + dbError.message)

  revalidatePath(`/academy/admin/cursos`)
}

export async function reorderMaterialsAction(
  materials: Array<{ id: string; sortOrder: number }>
): Promise<void> {
  await requireAdmin()

  const updates = materials.map(({ id, sortOrder }) =>
    supabaseAdmin
      .from('materials')
      .update({ sort_order: sortOrder })
      .eq('id', id)
  )

  await Promise.all(updates)
  revalidatePath(`/academy/admin/cursos`)
}
