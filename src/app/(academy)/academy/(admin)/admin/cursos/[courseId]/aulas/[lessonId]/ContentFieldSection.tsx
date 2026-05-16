'use client'

import { useEffect, useState } from 'react'
import { Eye } from 'lucide-react'
import { ContentEditor } from '@/components/editor/ContentEditor'
import { LessonContent } from '@/components/editor/LessonContent'
import { previewContentAction } from './preview-actions'
import type { RenderedContent } from '@/lib/content'

type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'

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
        <ContentEditor
          format={format}
          content={content}
          onFormatChange={onFormatChange}
          onContentChange={onContentChange}
        />
      )}
    </section>
  )
}
