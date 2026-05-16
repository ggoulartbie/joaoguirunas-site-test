import 'server-only'
import { serializeMDX } from './mdx'
import { sanitizeHtml } from './html'
import { highlightCode } from './markdown'

export type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'

export type RenderedContent =
  | { format: 'MDX'; serialized: Awaited<ReturnType<typeof serializeMDX>> }
  | { format: 'HTML'; html: string }
  | { format: 'MARKDOWN'; raw: string }

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

    case 'MARKDOWN':
      // Pass raw markdown to client; react-markdown renders it with CodeBlock for code fences
      return { format: 'MARKDOWN', raw: content }
  }
}

export { serializeMDX } from './mdx'
export { sanitizeHtml } from './html'
export { highlightCode } from './markdown'
