'use client'

import { useState, useTransition, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, FileText, ArrowLeft, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateLesson, uploadMaterial, deleteMaterial } from '../../../actions'
import { previewContentAction } from './preview-actions'
import { ContentEditor } from '@/components/editor/ContentEditor'
import { LessonContent } from '@/components/editor/LessonContent'
import { extractYouTubeId } from '@/components/student/VideoPlayer'
import type { Database } from '@/types/database'
import type { RenderedContent } from '@/lib/content'

type LessonRow = Database['public']['Tables']['lessons']['Row']
type MaterialRow = Database['public']['Tables']['materials']['Row']
type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'
type LessonKind = 'VIDEO' | 'LIVE' | 'IN_PERSON' | 'CODE' | 'READING'

const KIND_OPTIONS: LessonKind[] = ['VIDEO', 'LIVE', 'IN_PERSON', 'CODE', 'READING']
const KIND_LABELS: Record<LessonKind, string> = {
  VIDEO: 'Vídeo',
  LIVE: 'Ao Vivo',
  IN_PERSON: 'Presencial',
  CODE: 'Código',
  READING: 'Leitura',
}

const PROVIDER_OPTIONS = ['VIMEO', 'YOUTUBE', 'CLOUDFLARE_STREAM']

function formatBytes(bytes: number | null) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

const inputClass =
  'w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-3 font-mono text-sm text-[var(--bone)] placeholder-[var(--bone-mute)] outline-none focus:border-[var(--ember)] transition-colors'

const sectionClass =
  'border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-6 space-y-4'

export function LessonEditorClient({
  lesson,
  initialMaterials,
  courseId,
  vimeoDomain = '',
}: {
  lesson: LessonRow
  initialMaterials: MaterialRow[]
  courseId: string
  vimeoDomain?: string
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(lesson.title)
  const [description, setDescription] = useState(lesson.description ?? '')
  const [descriptionPreview, setDescriptionPreview] = useState(false)
  const [kind, setKind] = useState<LessonKind>((lesson.kind as LessonKind) ?? 'VIDEO')
  const [videoProvider, setVideoProvider] = useState(lesson.video_provider ?? 'VIMEO')
  const [videoId, setVideoId] = useState(lesson.video_id ?? '')
  const [contentFormat, setContentFormat] = useState<ContentFormat>((lesson.content_format as ContentFormat) ?? 'MARKDOWN')
  const [content, setContent] = useState(lesson.content ?? '')
  const [materials, setMaterials] = useState(initialMaterials)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [preview, setPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState<RenderedContent | null>(null)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [previewError, setPreviewError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)

  const hasVideo = kind === 'VIDEO' || kind === 'LIVE'

  // Carrega preview via server action ao abrir ou quando content/format muda (debounced 400ms)
  useEffect(() => {
    if (!preview || !content) return

    const timer = setTimeout(async () => {
      setPreviewLoading(true)
      setPreviewError(null)
      try {
        const rendered = await previewContentAction(contentFormat, content)
        setPreviewContent(rendered)
      } catch (err) {
        setPreviewError(err instanceof Error ? err.message : 'Erro ao renderizar')
      } finally {
        setPreviewLoading(false)
      }
    }, 400)

    return () => clearTimeout(timer)
  }, [preview, content, contentFormat])

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      try {
        await updateLesson(lesson.id, courseId, {
          title,
          description: description || null,
          kind,
          video_provider: hasVideo ? videoProvider : null,
          video_id: hasVideo && videoId ? videoId : null,
          content_format: content ? contentFormat : null,
          content: content || null,
        })
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao salvar')
      }
    })
  }

  function togglePreview() {
    if (!content) return
    setPreview((p) => !p)
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      await uploadMaterial(lesson.id, courseId, formData)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no upload')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleDeleteMaterial(id: string, storagePath: string | null) {
    if (!confirm('Remover material?')) return
    const snapshot = materials.find((m) => m.id === id)
    setMaterials((prev) => prev.filter((m) => m.id !== id))
    setDeleting(id)
    try {
      await deleteMaterial(id, storagePath ?? '', courseId, lesson.id)
      router.refresh()
    } catch (err) {
      if (snapshot) setMaterials((prev) => [...prev, snapshot])
      setError(err instanceof Error ? err.message : 'Erro ao remover material')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[rgba(255,255,255,0.07)] pb-4">
        <div>
          <button
            type="button"
            onClick={() => router.push(`/academy/admin/cursos/${courseId}`)}
            className="mb-1 flex items-center gap-1 font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
          >
            <ArrowLeft className="h-3 w-3" />
            Voltar ao curso
          </button>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Cursos / Aula</p>
          <h1 className="font-[--type-display] text-[28px] italic text-[var(--bone)]">{lesson.title}</h1>
          <p className="font-mono text-[10px] text-[var(--bone-mute)]">{lesson.slug}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="max-w-3xl space-y-4">
        {/* Basic info */}
        <section className={sectionClass} style={{ borderRadius: 0 }}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Informações</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Título</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className={inputClass}
                style={{ borderRadius: 0 }}
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Tipo de Aula</label>
              <div className="flex flex-wrap gap-1.5">
                {KIND_OPTIONS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={cn(
                      'border px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider transition-colors',
                      kind === k
                        ? 'border-[var(--ember)] bg-[var(--ember)] text-[var(--void)]'
                        : 'border-[rgba(255,255,255,0.16)] text-[var(--bone-mute)] hover:border-[rgba(255,255,255,0.3)] hover:text-[var(--bone-dim)]'
                    )}
                    style={{ borderRadius: 0 }}
                  >
                    {KIND_LABELS[k]}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <div className="flex items-center justify-between">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Descrição</label>
                {description && (
                  <button
                    type="button"
                    aria-pressed={descriptionPreview}
                    onClick={() => setDescriptionPreview((p) => !p)}
                    className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                  >
                    <Eye className="h-3 w-3" />
                    {descriptionPreview ? 'Editar' : 'Visualizar'}
                  </button>
                )}
              </div>
              {descriptionPreview ? (
                <div className="border border-[rgba(255,255,255,0.07)] bg-[var(--void)] px-3 py-2" style={{ borderRadius: 0 }}>
                  <LessonContent
                    content={{ format: 'MARKDOWN', raw: description }}
                    className=""
                  />
                </div>
              ) : (
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Breve descrição da aula..."
                  className={inputClass}
                  style={{ borderRadius: 0 }}
                />
              )}
            </div>
          </div>
        </section>

        {/* Video */}
        {hasVideo && (
          <section className={sectionClass} style={{ borderRadius: 0 }}>
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Vídeo</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Provedor</label>
                <select
                  value={videoProvider}
                  onChange={(e) => setVideoProvider(e.target.value)}
                  className="w-full border border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)] px-3 py-3 font-mono text-xs text-[var(--bone-dim)] outline-none focus:border-[var(--ember)]"
                  style={{ borderRadius: 0 }}
                >
                  {PROVIDER_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                  {videoProvider === 'YOUTUBE' ? 'URL do YouTube' : 'ID do Vídeo'}
                </label>
                <input
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder={videoProvider === 'YOUTUBE' ? 'https://www.youtube.com/watch?v=...' : 'Ex.: 123456789 (Vimeo)'}
                  className={inputClass}
                  style={{ borderRadius: 0 }}
                />
              </div>
            </div>
            {videoId && videoProvider === 'VIMEO' && (
              <div className="mt-2 aspect-video w-full max-w-md overflow-hidden border border-[rgba(255,255,255,0.07)]">
                <iframe
                  src={`https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0${vimeoDomain ? `&domain=${vimeoDomain}` : ''}`}
                  className="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            )}
            {videoProvider === 'YOUTUBE' && (() => {
              const ytId = extractYouTubeId(videoId)
              if (!ytId) return videoId ? (
                <p className="mt-2 font-mono text-[10px] text-red-400">URL do YouTube inválida</p>
              ) : null
              return (
                <div className="mt-2 aspect-video w-full max-w-md overflow-hidden border border-[rgba(255,255,255,0.07)]">
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${ytId}?rel=0&modestbranding=1`}
                    className="h-full w-full"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                  />
                </div>
              )
            })()}
          </section>
        )}

        {/* Content editor */}
        <section className={sectionClass} style={{ borderRadius: 0 }}>
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Conteúdo da Aula</p>
            {content && (
              <button
                type="button"
                aria-pressed={preview}
                onClick={togglePreview}
                className="flex items-center gap-1.5 font-mono text-[10px] text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              >
                <Eye className="h-3 w-3" />
                {preview ? 'Fechar preview' : 'Preview como aluno'}
              </button>
            )}
          </div>

          {preview ? (
            <div className="relative border border-[rgba(255,255,255,0.07)] bg-[var(--void)] p-4" style={{ borderRadius: 0 }}>
              {previewLoading && (
                <p className="absolute right-3 top-2 font-mono text-[10px] text-[var(--bone-mute)]">Renderizando…</p>
              )}
              {previewError ? (
                <p className="font-mono text-[11px] text-[var(--ember)]">{previewError}</p>
              ) : previewContent ? (
                <LessonContent content={previewContent} className="" />
              ) : (
                <p className="font-mono text-[10px] text-[var(--bone-mute)]">Renderizando…</p>
              )}
            </div>
          ) : (
            <ContentEditor
              format={contentFormat}
              content={content}
              onFormatChange={setContentFormat}
              onContentChange={setContent}
            />
          )}
        </section>

        {/* Materials */}
        <section className={sectionClass} style={{ borderRadius: 0 }}>
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Materiais</p>

          {materials.length > 0 && (
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {materials.map((mat) => (
                <div
                  key={mat.id}
                  className={cn('flex items-center gap-3 py-2.5 transition-opacity', deleting === mat.id && 'opacity-50')}
                >
                  <FileText className="h-4 w-4 shrink-0 text-[var(--bone-mute)]" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-[--type-sans] text-xs text-[var(--bone-dim)]">{mat.title}</p>
                    <p className="font-mono text-[10px] text-[var(--bone-mute)]">
                      {mat.kind}
                      {mat.size_bytes ? ` · ${formatBytes(mat.size_bytes)}` : ''}
                      {mat.kind === 'LINK' && mat.external_url ? ` · ${mat.external_url.slice(0, 40)}${mat.external_url.length > 40 ? '…' : ''}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={deleting === mat.id}
                    onClick={() => handleDeleteMaterial(mat.id, mat.storage_path)}
                    className="text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)] disabled:pointer-events-none"
                    aria-label={`Remover ${mat.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <label
            className={cn(
              'flex cursor-pointer flex-col items-center gap-2 border border-dashed border-[rgba(255,255,255,0.16)] p-6 transition-colors hover:border-[rgba(255,255,255,0.3)]',
              uploading && 'opacity-50'
            )}
            style={{ borderRadius: 0 }}
          >
            <Upload className="h-5 w-5 text-[var(--bone-mute)]" />
            <span className="font-mono text-[10px] text-[var(--bone-mute)]">
              {uploading ? 'Enviando...' : 'Clique ou arraste para fazer upload (PDF, ZIP, imagem)'}
            </span>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.zip,.png,.jpg,.jpeg,.gif,.webp"
              className="hidden"
              disabled={uploading}
              onChange={handleFileUpload}
            />
          </label>
        </section>

        {/* Actions */}
        {error && <p className="font-mono text-xs text-[var(--ember)]">{error}</p>}
        <div className="flex items-center justify-end gap-3 border-t border-[rgba(255,255,255,0.07)] pt-4">
          {saved && <span className="font-mono text-[10px] text-[var(--bone-dim)]">Salvo!</span>}
          <button
            type="button"
            onClick={() => router.push(`/academy/admin/cursos/${courseId}`)}
            className="border border-[rgba(255,255,255,0.16)] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--bone-dim)] transition-colors hover:border-[rgba(255,255,255,0.3)] hover:text-[var(--bone)]"
            style={{ borderRadius: 0 }}
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={pending}
            className="bg-[var(--ember)] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--void)] transition-opacity hover:opacity-90 disabled:opacity-40"
            style={{ borderRadius: 0 }}
          >
            {pending ? 'Salvando...' : 'Salvar Aula'}
          </button>
        </div>
      </form>
    </div>
  )
}
