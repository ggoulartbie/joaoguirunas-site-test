import 'server-only'
import sanitize from 'sanitize-html'

const ALLOWED_TAGS = [
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'p', 'br', 'hr',
  'strong', 'em', 'u', 's', 'b', 'i',
  'sup', 'sub', 'q', 'mark', 'abbr', 'cite', 'del', 'ins', 'kbd', 'small',
  'ul', 'ol', 'li',
  'blockquote', 'pre', 'code',
  'a', 'img',
  'table', 'thead', 'tbody', 'tr', 'th', 'td',
  'div', 'span', 'section', 'article',
  'figure', 'figcaption',
  'details', 'summary',
]

const ALLOWED_ATTR = [
  'href', 'src', 'alt', 'title', 'class', 'id',
  'target', 'rel', 'width', 'height',
  'colspan', 'rowspan', 'scope',
  'cite', 'datetime',
  'data-language',
]

export function sanitizeHtml(dirty: string): string {
  return sanitize(dirty, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: { '*': ALLOWED_ATTR },
    allowedSchemes: ['http', 'https', 'mailto'],
  })
}
