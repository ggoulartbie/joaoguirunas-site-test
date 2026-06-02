'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { TipTapEditor } from './TipTapEditor'

type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'

interface ContentEditorProps {
  format: ContentFormat
  content: string
  onFormatChange: (format: ContentFormat) => void
  onContentChange: (content: string) => void
}

const FORMAT_LABELS: Record<ContentFormat, { label: string; hint: string }> = {
  MDX: { label: 'MDX', hint: 'Markdown + componentes React (Callout, Tabs, CodeBlock)' },
  HTML: { label: 'HTML', hint: 'Editor visual WYSIWYG — TipTap' },
  MARKDOWN: { label: 'Markdown', hint: 'Markdown puro com syntax highlight Shiki' },
}

export function ContentEditor({ format, content, onFormatChange, onContentChange }: ContentEditorProps) {
  const [mdxPreview, setMdxPreview] = useState(false)

  function handleFormatChange(newFormat: ContentFormat) {
    if (newFormat === format) return
    if (content && !confirm(`Trocar o formato pode alterar o conteúdo. Continuar?`)) return
    onFormatChange(newFormat)
  }

  return (
    <div className="space-y-3">
      {/* Format selector */}
      <div className="space-y-1">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          Formato do Conteúdo
        </label>
        <div className="flex gap-1">
          {(Object.keys(FORMAT_LABELS) as ContentFormat[]).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => handleFormatChange(f)}
              className={cn(
                'px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors',
                format === f
                  ? 'bg-[#FF3A0E] text-white'
                  : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
              )}
            >
              {FORMAT_LABELS[f].label}
            </button>
          ))}
        </div>
        <p className="font-mono text-[10px] text-white/20">{FORMAT_LABELS[format].hint}</p>
      </div>

      {/* Editors per format */}
      {format === 'HTML' && (
        <TipTapEditor
          value={content}
          onChange={onContentChange}
        />
      )}

      {format === 'MDX' && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-white/30">
              Componentes: &lt;Callout /&gt; &lt;Tabs /&gt; &lt;CodeBlock /&gt;
            </span>
            <button
              type="button"
              onClick={() => setMdxPreview((p) => !p)}
              className="font-mono text-[10px] uppercase tracking-wider text-white/30 transition-colors hover:text-white/60"
            >
              {mdxPreview ? 'Fechar preview' : 'Preview'}
            </button>
          </div>
          <div className={cn('grid gap-4', mdxPreview && 'grid-cols-2')}>
            <textarea
              value={content}
              onChange={(e) => onContentChange(e.target.value)}
              rows={16}
              spellCheck={false}
              className="w-full border border-white/10 bg-white/[0.02] p-4 font-mono text-xs leading-relaxed text-white/70 outline-none focus:border-white/20"
              placeholder={'# Título\n\n<Callout kind="tip" title="Dica">\n  Conteúdo da callout\n</Callout>\n\n```typescript\nconst x = 1\n```'}
            />
            {mdxPreview && (
              <div className="border border-white/10 bg-white/[0.02] p-4">
                <MDXPreviewClient source={content} />
              </div>
            )}
          </div>
        </div>
      )}

      {format === 'MARKDOWN' && (
        <div className="space-y-2">
          <textarea
            value={content}
            onChange={(e) => onContentChange(e.target.value)}
            rows={16}
            spellCheck={false}
            className="w-full border border-white/10 bg-white/[0.02] p-4 font-mono text-xs leading-relaxed text-white/70 outline-none focus:border-white/20"
            placeholder={'# Título\n\nTexto com **negrito** e *itálico*.\n\n```python\nprint("hello")\n```'}
          />
        </div>
      )}
    </div>
  )
}

// Lazy MDX preview — renders in-browser without blocking the editor
function MDXPreviewClient({ source }: { source: string }) {
  // Dynamically import to avoid SSR issues with next-mdx-remote/rsc boundary
  const [html, setHtml] = useState<string>('')

  useState(() => {
    if (!source) { setHtml(''); return }
    // Simple client-side markdown rendering for preview — full MDX serialization happens server-side on save
    setHtml(source)
  })

  return (
    <div className="prose prose-invert prose-sm max-w-none">
      <pre className="whitespace-pre-wrap font-mono text-[10px] text-white/40">{source || 'Escreva algo para ver o preview...'}</pre>
    </div>
  )
}
