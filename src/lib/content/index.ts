import 'server-only'
import type { ReactNode } from 'react'
import { serializeMDX } from './mdx'
import { sanitizeHtml } from './html'
import { highlightCode } from './markdown'

export type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'

export type RenderedContent =
  | { format: 'MDX'; serialized: Awaited<ReturnType<typeof serializeMDX>> }
  | { format: 'HTML'; html: string }
  | { format: 'MARKDOWN'; html: string }

// Returns a format-tagged payload; the client component switches on format
export async function renderContent(
  format: ContentFormat,
  content: string
): Promise<RenderedContent> {
  switch (format) {
    case 'MDX':
      return { format: 'MDX', serialized: await serializeMDX(content) }

    case 'HTML':
      return { format: 'HTML', html: sanitizeHtml(content) }

    case 'MARKDOWN': {
      // Pre-process code blocks with Shiki; react-markdown renders the rest
      const processed = await processMarkdownCodeBlocks(content)
      return { format: 'MARKDOWN', html: processed }
    }
  }
}

// Extracts fenced code blocks, highlights them with Shiki, re-inserts as HTML
async function processMarkdownCodeBlocks(source: string): Promise<string> {
  const fenceRe = /```(\w*)\n([\s\S]*?)```/g
  const replacements: Array<{ original: string; highlighted: string }> = []

  for (const match of source.matchAll(fenceRe)) {
    const lang = match[1] || 'text'
    const code = match[2] ?? ''
    const highlighted = await highlightCode(code, lang)
    replacements.push({ original: match[0], highlighted })
  }

  let result = source
  for (const { original, highlighted } of replacements) {
    result = result.replace(original, highlighted)
  }
  return result
}

export { serializeMDX } from './mdx'
export { sanitizeHtml } from './html'
export { highlightCode } from './markdown'
