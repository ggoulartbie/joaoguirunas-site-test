'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Upload, Trash2, FileText, Link2, ArrowLeft, Plus, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  uploadModuleMaterial,
  deleteModuleMaterial,
  addLinkModuleMaterial,
} from '../../../actions'
import type { Database } from '@/types/database'

type ModuleRow = Database['public']['Tables']['modules']['Row']
type ModuleMaterialRow = Database['public']['Tables']['module_materials']['Row']

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

export function ModuleEditorClient({
  module,
  initialMaterials,
  courseId,
}: {
  module: ModuleRow
  initialMaterials: ModuleMaterialRow[]
  courseId: string
}) {
  const router = useRouter()
  const fileRef = useRef<HTMLInputElement>(null)

  const [materials, setMaterials] = useState(initialMaterials)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [addingLink, setAddingLink] = useState(false)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [addingLinkPending, setAddingLinkPending] = useState(false)

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError(null)
    const formData = new FormData()
    formData.append('file', file)
    try {
      const created = await uploadModuleMaterial(module.id, courseId, formData)
      setMaterials((prev) => [...prev, created])
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
    setError(null)
    try {
      await deleteModuleMaterial(id, storagePath, courseId, module.id)
      router.refresh()
    } catch (err) {
      if (snapshot) setMaterials((prev) => [...prev, snapshot])
      setError(err instanceof Error ? err.message : 'Erro ao remover material')
    } finally {
      setDeleting(null)
    }
  }

  async function handleAddLink(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    const trimmedTitle = linkTitle.trim()
    const trimmedUrl = linkUrl.trim()
    if (!trimmedTitle) { setError('Título do link obrigatório'); return }
    try { new URL(trimmedUrl) } catch { setError('URL inválida'); return }

    setAddingLinkPending(true)
    try {
      const created = await addLinkModuleMaterial(module.id, courseId, trimmedTitle, trimmedUrl)
      setMaterials((prev) => [...prev, created])
      setLinkTitle('')
      setLinkUrl('')
      setAddingLink(false)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar link')
    } finally {
      setAddingLinkPending(false)
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
          <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Cursos / Módulo</p>
          <h1 className="font-[--type-display] text-[28px] italic text-[var(--bone)]">{module.title}</h1>
          <p className="font-mono text-[10px] text-[var(--bone-mute)]">{module.slug}</p>
        </div>
      </div>

      <div className="max-w-3xl space-y-4">
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
                  {mat.kind === 'LINK' ? (
                    <Link2 className="h-4 w-4 shrink-0 text-[var(--bone-mute)]" />
                  ) : (
                    <FileText className="h-4 w-4 shrink-0 text-[var(--bone-mute)]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-[--type-sans] text-xs text-[var(--bone-dim)]">{mat.title}</p>
                    <p className="font-mono text-[10px] text-[var(--bone-mute)]">
                      {mat.kind}
                      {mat.size_bytes ? ` · ${formatBytes(mat.size_bytes)}` : ''}
                      {mat.kind === 'LINK' && mat.external_url
                        ? ` · ${mat.external_url.slice(0, 40)}${mat.external_url.length > 40 ? '…' : ''}`
                        : ''}
                    </p>
                  </div>
                  <button
                    type="button"
                    disabled={deleting === mat.id}
                    onClick={() => handleDeleteMaterial(mat.id, mat.storage_path)}
                    className="text-[var(--bone-mute)] transition-colors hover:text-[var(--ember)] disabled:pointer-events-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                    aria-label={`Remover ${mat.title}`}
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}

          {materials.length === 0 && !uploading && (
            <p className="font-mono text-[10px] text-[var(--bone-mute)]">Nenhum material ainda.</p>
          )}

          {/* Upload area */}
          <label
            className={cn(
              'flex cursor-pointer flex-col items-center gap-2 border border-dashed border-[rgba(255,255,255,0.16)] p-6 transition-colors hover:border-[rgba(255,255,255,0.3)]',
              uploading && 'opacity-50 pointer-events-none'
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

          {/* Add link */}
          {addingLink ? (
            <form onSubmit={handleAddLink} className="space-y-2 border border-[rgba(255,255,255,0.07)] bg-[var(--ink-2)] p-4" style={{ borderRadius: 0 }}>
              <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Adicionar Link</p>
              <div className="flex flex-wrap gap-2">
                <input
                  autoFocus
                  value={linkTitle}
                  onChange={(e) => setLinkTitle(e.target.value)}
                  placeholder="Título do link"
                  required
                  className={cn(inputClass, 'flex-1 min-w-[160px] py-2 text-xs')}
                  style={{ borderRadius: 0 }}
                />
                <input
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  placeholder="https://..."
                  required
                  className={cn(inputClass, 'flex-1 min-w-[200px] py-2 text-xs')}
                  style={{ borderRadius: 0 }}
                />
                <button
                  type="submit"
                  disabled={addingLinkPending}
                  className="bg-[var(--ember)] px-3 py-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--void)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                  style={{ borderRadius: 0 }}
                >
                  {addingLinkPending ? '...' : 'Adicionar'}
                </button>
                <button
                  type="button"
                  onClick={() => { setAddingLink(false); setLinkTitle(''); setLinkUrl('') }}
                  className="p-2 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
                  aria-label="Cancelar adição de link"
                  style={{ borderRadius: 0 }}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </form>
          ) : (
            <button
              type="button"
              onClick={() => setAddingLink(true)}
              className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
            >
              <Plus className="h-3 w-3" /> Adicionar Link
            </button>
          )}
        </section>

        {error && <p className="font-mono text-xs text-[var(--ember)]">{error}</p>}

        <div className="flex items-center justify-start border-t border-[rgba(255,255,255,0.07)] pt-4">
          <button
            type="button"
            onClick={() => router.push(`/academy/admin/cursos/${courseId}`)}
            className="border border-[rgba(255,255,255,0.16)] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[var(--bone-dim)] transition-colors hover:border-[rgba(255,255,255,0.3)] hover:text-[var(--bone)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
            style={{ borderRadius: 0 }}
          >
            Voltar
          </button>
        </div>
      </div>
    </div>
  )
}
