'use client'

import { useState, useTransition, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, FileText, ArrowLeft, Eye } from 'lucide-react'
import { cn } from '@/lib/utils'
import { updateLesson, uploadMaterial, deleteMaterial } from '../../../actions'
import { ContentEditor } from '@/components/editor/ContentEditor'
import { LessonContent } from '@/components/editor/LessonContent'
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

export function LessonEditorClient({
  lesson,
  initialMaterials,
  courseId,
}: {
  lesson: LessonRow
  initialMaterials: MaterialRow[]
  courseId: string
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState(lesson.title)
  const [description, setDescription] = useState(lesson.description ?? '')
  const [kind, setKind] = useState<LessonKind>((lesson.kind as LessonKind) ?? 'VIDEO')
  const [videoProvider, setVideoProvider] = useState(lesson.video_provider ?? 'VIMEO')
  const [videoId, setVideoId] = useState(lesson.video_id ?? '')
  const [contentFormat, setContentFormat] = useState<ContentFormat>((lesson.content_format as ContentFormat) ?? 'MARKDOWN')
  const [content, setContent] = useState(lesson.content ?? '')
  const [materials, setMaterials] = useState(initialMaterials)
  const [preview, setPreview] = useState(false)
  const [previewContent, setPreviewContent] = useState<RenderedContent | null>(null)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [pending, startTransition] = useTransition()
  const [uploading, setUploading] = useState(false)

  const hasVideo = kind === 'VIDEO' || kind === 'LIVE'

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

  async function handlePreview() {
    if (!content) return
    setPreview((p) => !p)
    if (!preview && content) {
      // Inline preview: for HTML just pass raw; for MDX/Markdown pass as-is
      // Full server-side render happens in the actual lesson page
      const raw: RenderedContent =
        contentFormat === 'HTML'
          ? { format: 'HTML', html: content }
          : { format: 'MARKDOWN', html: content }
      setPreviewContent(raw)
    }
  }

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    const formData = new FormData()
    formData.append('file', file)
    try {
      await uploadMaterial(lesson.id, courseId, formData)
      // Refresh materials via router revalidation
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no upload')
    } finally {
      setUploading(false)
      if (fileRef.current) fileRef.current.value = ''
    }
  }

  async function handleDeleteMaterial(id: string, storagePath: string) {
    if (!confirm('Remover material?')) return
    setMaterials((prev) => prev.filter((m) => m.id !== id))
    startTransition(() => deleteMaterial(id, storagePath, courseId))
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <button
            type="button"
            onClick={() => router.push(`/academy/admin/cursos/${courseId}`)}
            className="mb-2 flex items-center gap-1 font-mono text-[10px] text-white/30 transition-colors hover:text-white/60"
          >
            <ArrowLeft className="h-3 w-3" /> Voltar ao curso
          </button>
          <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
            {lesson.title}
          </h1>
          <p className="mt-1 font-mono text-[10px] text-white/30">{lesson.slug}</p>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Basic info */}
        <section className="space-y-4 border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Informações</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-white/40">Título</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-white/10 bg-transparent px-3 py-2 font-mono text-sm text-white/80 outline-none focus:border-white/20"
              />
            </div>
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-white/40">Tipo de Aula</label>
              <div className="flex flex-wrap gap-1">
                {KIND_OPTIONS.map((k) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setKind(k)}
                    className={cn(
                      'px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider transition-colors',
                      kind === k
                        ? 'bg-[#FF3A0E] text-white'
                        : 'border border-white/10 text-white/40 hover:border-white/20 hover:text-white/70'
                    )}
                  >
                    {KIND_LABELS[k]}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="font-mono text-[10px] text-white/40">Descrição</label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve descrição da aula..."
                className="w-full border border-white/10 bg-transparent px-3 py-2 font-mono text-sm text-white/80 placeholder-white/20 outline-none focus:border-white/20"
              />
            </div>
          </div>
        </section>

        {/* Video */}
        {hasVideo && (
          <section className="space-y-4 border border-white/10 bg-white/[0.02] p-4">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Vídeo</p>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-white/40">Provedor</label>
                <select
                  value={videoProvider}
                  onChange={(e) => setVideoProvider(e.target.value)}
                  className="w-full border border-white/10 bg-[#0C0C12] px-3 py-2 font-mono text-xs text-white/70 outline-none"
                >
                  {PROVIDER_OPTIONS.map((p) => (
                    <option key={p} value={p}>{p}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-1.5 sm:col-span-2">
                <label className="font-mono text-[10px] text-white/40">ID do Vídeo</label>
                <input
                  value={videoId}
                  onChange={(e) => setVideoId(e.target.value)}
                  placeholder="Ex.: 123456789 (Vimeo)"
                  className="w-full border border-white/10 bg-transparent px-3 py-2 font-mono text-sm text-white/80 placeholder-white/20 outline-none focus:border-white/20"
                />
              </div>
            </div>
            {videoId && videoProvider === 'VIMEO' && (
              <div className="mt-2 aspect-video w-full max-w-md overflow-hidden border border-white/10">
                <iframe
                  src={`https://player.vimeo.com/video/${videoId}?dnt=1&title=0&byline=0`}
                  className="h-full w-full"
                  allow="autoplay; fullscreen"
                  allowFullScreen
                />
              </div>
            )}
          </section>
        )}

        {/* Content editor */}
        <section className="space-y-4 border border-white/10 bg-white/[0.02] p-4">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Conteúdo da Aula</p>
            {content && (
              <button
                type="button"
                onClick={handlePreview}
                className="flex items-center gap-1.5 font-mono text-[10px] text-white/30 transition-colors hover:text-white/70"
              >
                <Eye className="h-3 w-3" />
                {preview ? 'Fechar preview' : 'Preview como aluno'}
              </button>
            )}
          </div>

          {preview && previewContent ? (
            <div className="border border-white/10 bg-black/20 p-4">
              <LessonContent content={previewContent} className="prose prose-invert prose-sm max-w-none" />
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
        <section className="space-y-4 border border-white/10 bg-white/[0.02] p-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">Materiais</p>

          {materials.length > 0 && (
            <div className="divide-y divide-white/5">
              {materials.map((mat) => (
                <div key={mat.id} className="flex items-center gap-3 py-2.5">
                  <FileText className="h-4 w-4 shrink-0 text-white/30" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-xs text-white/70">{mat.title}</p>
                    <p className="font-mono text-[10px] text-white/25">
                      {mat.kind} {mat.size_bytes ? `· ${formatBytes(mat.size_bytes)}` : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => mat.storage_path && handleDeleteMaterial(mat.id, mat.storage_path)}
                    className="text-white/20 transition-colors hover:text-red-400"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Drop zone / upload */}
          <label
            className={cn(
              'flex cursor-pointer flex-col items-center gap-2 border-2 border-dashed border-white/10 p-6 transition-colors hover:border-white/20',
              uploading && 'opacity-50'
            )}
          >
            <Upload className="h-5 w-5 text-white/20" />
            <span className="font-mono text-[10px] text-white/30">
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
        {error && <p className="font-mono text-xs text-red-400">{error}</p>}
        <div className="flex items-center justify-end gap-3">
          {saved && <span className="font-mono text-[10px] text-green-400">Salvo!</span>}
          <button
            type="button"
            onClick={() => router.push(`/academy/admin/cursos/${courseId}`)}
            className="px-4 py-2 font-mono text-xs text-white/30 transition-colors hover:text-white/70"
          >
            Voltar
          </button>
          <button
            type="submit"
            disabled={pending}
            className="bg-[#FF3A0E] px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-40"
          >
            {pending ? 'Salvando...' : 'Salvar Aula'}
          </button>
        </div>
      </form>
    </div>
  )
}
