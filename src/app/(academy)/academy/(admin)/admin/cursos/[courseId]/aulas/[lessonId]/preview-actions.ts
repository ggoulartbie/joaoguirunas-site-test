'use server'

import { requireAdmin } from '@/lib/auth/helpers'
import { renderContent } from '@/lib/content'
import type { ContentFormat, RenderedContent } from '@/lib/content'

export async function previewContentAction(
  format: ContentFormat,
  content: string
): Promise<RenderedContent> {
  await requireAdmin()
  try {
    return await renderContent(format, content)
  } catch (err) {
    const msg = err instanceof Error ? err.message.slice(0, 200) : 'Erro ao renderizar'
    throw new Error(msg)
  }
}
