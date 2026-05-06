import 'server-only'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'

const BUCKET = 'materials'
const SIGNED_URL_EXPIRY_SECONDS = 300 // 5 minutos

// path convention: materials/{lesson_id}/{material_id}.{ext}
export function buildMaterialPath(lessonId: string, materialId: string, ext: string): string {
  return `${lessonId}/${materialId}.${ext}`
}

export function extractExtFromMime(mimeType: string): string {
  const map: Record<string, string> = {
    'application/pdf': 'pdf',
    'application/zip': 'zip',
    'application/x-zip-compressed': 'zip',
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif',
    'image/webp': 'webp',
  }
  return map[mimeType] ?? 'bin'
}

export async function getMaterialSignedUrl(materialId: string): Promise<string> {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    throw new Error('Não autenticado')
  }

  // busca o material e valida acesso em uma query
  const { data: material, error } = await supabase
    .from('materials')
    .select('id, lesson_id, storage_path, kind, external_url')
    .eq('id', materialId)
    .single()

  if (error || !material) {
    throw new Error('Material não encontrado')
  }

  // materiais do tipo LINK não têm storage_path — retorna external_url diretamente
  if (material.kind === 'LINK') {
    if (!material.external_url) throw new Error('URL do material não configurada')
    return material.external_url
  }

  if (!material.storage_path) {
    throw new Error('Arquivo do material não disponível')
  }

  // valida acesso à lesson via has_access (RLS já protege, mas validamos explicitamente)
  const { data: access } = await supabase
    .rpc('has_access', { p_user_id: user.id, p_lesson_id: material.lesson_id })

  // admin bypassa a checagem
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single()

  if (!access && profile?.role !== 'ADMIN') {
    throw new Error('Acesso negado a este material')
  }

  // gera signed URL com service_role para garantir (bucket é privado)
  const { data: signed, error: signError } = await supabaseAdmin.storage
    .from(BUCKET)
    .createSignedUrl(material.storage_path, SIGNED_URL_EXPIRY_SECONDS)

  if (signError || !signed) {
    throw new Error('Erro ao gerar link de download')
  }

  return signed.signedUrl
}

export async function uploadMaterial(
  file: File,
  lessonId: string,
  materialId: string
): Promise<string> {
  const ext = extractExtFromMime(file.type)
  const path = buildMaterialPath(lessonId, materialId, ext)

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(path, file, {
      contentType: file.type,
      upsert: false,
    })

  if (error) {
    throw new Error(`Erro no upload: ${error.message}`)
  }

  return path
}

export async function deleteMaterialFile(storagePath: string): Promise<void> {
  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .remove([storagePath])

  if (error) {
    throw new Error(`Erro ao deletar arquivo: ${error.message}`)
  }
}
