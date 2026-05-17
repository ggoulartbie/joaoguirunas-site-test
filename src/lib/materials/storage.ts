import 'server-only'

export type MaterialKind = 'PDF' | 'ZIP' | 'IMAGE' | 'LINK' | 'OTHER'

export function getMaterialKind(mimeType: string): MaterialKind {
  if (mimeType === 'application/pdf') return 'PDF'
  if (mimeType === 'application/zip' || mimeType === 'application/x-zip-compressed') return 'ZIP'
  if (mimeType.startsWith('image/')) return 'IMAGE'
  return 'OTHER'
}

export function buildMaterialPath(prefix: 'lessons' | 'modules', id: string, ext: string): string {
  return `${prefix}/${id}/${crypto.randomUUID()}.${ext}`
}

export function extractExt(filename: string): string {
  return filename.split('.').pop() ?? 'bin'
}
