'use server'

import { getMaterialSignedUrl } from '@/lib/storage/materials'

export async function downloadMaterialAction(materialId: string): Promise<string> {
  return getMaterialSignedUrl(materialId)
}
