'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { LessonContent } from '@/components/editor/LessonContent'
import { previewContentAction } from './preview-actions'
import type { RenderedContent } from '@/lib/content'

type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'

const FORMAT_LABELS: Record<ContentFormat, string> = {
  MARKDOWN: 'Markdown',
  HTML: 'HTML',
  MDX: 'MDX',
}

const FORMAT_HINTS: Record<ContentFormat, string> = {
  MARKDOWN: 'Cole markdown puro — # títulos, **negrito**, ```code```',
  HTML: 'Cole HTML puro — <h1>, <p>, <strong>, <code>',
  MDX: 'Markdown + componentes — <Callout>, <Tabs>, <CodeBlock>',
}

const FORMAT_PLACEHOLDERS: Record<ContentFormat, string> = {
  MARKDOWN: '# Título\n\nTexto com **negrito** e *itálico*.\n\n```python\nprint("hello")\n```',
  HTML: '<h1>Título</h1>\n\n<p>Texto com <strong>negrito</strong>.</p>',
  MDX: '# Título\n\n<Callout kind="tip" title="Dica">\n  Conteúdo\n</Callout>',
}

const sectionClass =
  'border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-6 space-y-4'

export function ContentFieldSection({
  label,
  format,
  content,
  onFormatChange,
  onContentChange,
}: {
  label: string
  format: ContentFormat
  content: string
  onFormatChange: (f: ContentFormat) => void
  onContentChange: (c: string) => void
}) {
  const [preview, setPreview] = useState(false)
  const [rendered, setRendered] = useState<RenderedContent | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!preview || !content) return
    const timer = setTimeout(async () => {
      setLoading(true)
      setError(null)
      try {
        const result = await previewContentAction(format, content)
        setRendered(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao renderizar')
      } finally {
        setLoading(false)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [preview, content, format])

  function toggle() {
    if (!content) return
    setPreview((p) => !p)
  }

  function handleFormatChange(newFormat: ContentFormat) {
    if (newFormat === format) return
    if (content && !confirm('Trocar o formato não converte o conteúdo. Continuar?')) return
    onFormatChange(newFormat)
  }

  return (
    <section className={sectionClass} style={{ borderRadius: 0 }}>
      <div className="flex items-center justify-between">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">{label}</p>
        {content && (
          <button
            type="button"
            aria-pressed={preview}
            onClick={toggle}
            className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
          >
            <Eye className="h-3 w-3" />
            {preview ? 'Fechar preview' : 'Preview como aluno'}
          </button>
        )}
      </div>

      {/* Format selector */}
      <div className="space-y-1">
        <div className="flex gap-1">
          {(Object.keys(FORMAT_LABELS) as ContentFormat[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFormatChange(f)}
              className={cn(
                'px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors',
                format === f
                  ? 'bg-[var(--ember)] text-[var(--void)]'
                  : 'border border-[rgba(255,255,255,0.16)] text-[var(--bone-mute)] hover:border-[rgba(255,255,255,0.3)] hover:text-[var(--bone-dim)]'
              )}
              style={{ borderRadius: 0 }}
            >
              {FORMAT_LABELS[f]}
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] text-[var(--bone-mute)]" style={{ opacity: 0.6 }}>
          {FORMAT_HINTS[format]}
        </p>
      </div>

      {/* Editor / Preview */}
      {preview ? (
        <div className="relative border border-[rgba(255,255,255,0.07)] bg-[var(--void)] p-4" style={{ borderRadius: 0 }}>
          {loading && (
            <p className="absolute right-3 top-2 font-mono text-[10px] text-[var(--bone-mute)]">Renderizando…</p>
          )}
          {error ? (
            <p className="font-mono text-[11px] text-[var(--ember)]">{error}</p>
          ) : rendered ? (
            <LessonContent content={rendered} className="" />
          ) : (
            <p className="font-mono text-[10px] text-[var(--bone-mute)]">Renderizando…</p>
          )}
        </div>
      ) : (
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          rows={16}
          spellCheck={false}
          placeholder={FORMAT_PLACEHOLDERS[format]}
          className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] p-4 font-mono text-xs leading-relaxed text-[var(--bone)] placeholder-[var(--bone-mute)] outline-none focus:border-[var(--ember)] transition-colors resize-y"
          style={{ borderRadius: 0 }}
        />
      )}
    </section>
  )
}
