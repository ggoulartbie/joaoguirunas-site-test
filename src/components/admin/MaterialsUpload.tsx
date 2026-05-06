'use client'

import { useRef, useState } from 'react'
import {
  uploadMaterialAction,
  addLinkMaterialAction,
  deleteMaterialAction,
} from '@/app/(admin)/admin/cursos/material-actions'
import type { Database } from '@/types/database'

type Material = Database['public']['Tables']['materials']['Row']

const ACCEPTED = '.pdf,.zip,.jpg,.jpeg,.png,.gif,.webp'
const MAX_MB = 100

const KIND_LABELS: Record<string, string> = {
  PDF: 'PDF',
  ZIP: 'ZIP',
  IMAGE: 'Imagem',
  LINK: 'Link',
  OTHER: 'Outro',
}

interface MaterialsUploadProps {
  lessonId: string
  materials: Material[]
}

export function MaterialsUpload({ lessonId, materials }: MaterialsUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [linkMode, setLinkMode] = useState(false)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [dragging, setDragging] = useState(false)

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return
    setError(null)
    setUploading(true)

    try {
      for (const file of Array.from(files)) {
        if (file.size > MAX_MB * 1024 * 1024) {
          throw new Error(`${file.name} excede o limite de ${MAX_MB}MB`)
        }
        const fd = new FormData()
        fd.append('lessonId', lessonId)
        fd.append('title', file.name.replace(/\.[^/.]+$/, ''))
        fd.append('file', file)
        fd.append('sortOrder', String(materials.length))
        await uploadMaterialAction(fd)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro no upload')
    } finally {
      setUploading(false)
      if (fileInputRef.current) fileInputRef.current.value = ''
    }
  }

  async function handleAddLink() {
    setError(null)
    try {
      await addLinkMaterialAction({
        lessonId,
        title: linkTitle,
        url: linkUrl,
        sortOrder: materials.length,
      })
      setLinkTitle('')
      setLinkUrl('')
      setLinkMode(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao adicionar link')
    }
  }

  async function handleDelete(materialId: string) {
    setDeleting(materialId)
    setError(null)
    try {
      await deleteMaterialAction(materialId)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao deletar')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* lista de materials existentes */}
      {materials.length > 0 && (
        <ul className="space-y-1.5">
          {materials.map((m) => (
            <li
              key={m.id}
              className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5"
            >
              <span className="text-xs text-white/40">{KIND_LABELS[m.kind]}</span>
              <span className="min-w-0 flex-1 truncate text-sm text-white">{m.title}</span>
              {m.size_bytes && (
                <span className="shrink-0 text-xs text-white/30">
                  {(m.size_bytes / (1024 * 1024)).toFixed(1)} MB
                </span>
              )}
              <button
                onClick={() => handleDelete(m.id)}
                disabled={deleting === m.id}
                className="shrink-0 text-xs text-red-400/70 hover:text-red-400 disabled:opacity-50"
              >
                {deleting === m.id ? '...' : 'Remover'}
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* área de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 py-8 transition-colors ${
          dragging
            ? 'border-white/40 bg-white/10'
            : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/[0.07]'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={ACCEPTED}
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-sm text-white/50">
          {uploading ? 'Enviando...' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className="mt-1 text-xs text-white/30">
          PDF, ZIP, Imagens — máx. {MAX_MB}MB por arquivo
        </p>
      </div>

      {/* adicionar link */}
      {!linkMode ? (
        <button
          onClick={() => setLinkMode(true)}
          className="text-sm text-white/50 hover:text-white/80 transition-colors"
        >
          + Adicionar link externo
        </button>
      ) : (
        <div className="space-y-2 rounded-xl border border-white/10 bg-white/5 p-4">
          <input
            type="text"
            placeholder="Título do link"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
          <input
            type="url"
            placeholder="https://..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full rounded-lg border border-white/10 bg-transparent px-3 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddLink}
              disabled={!linkTitle || !linkUrl}
              className="rounded-lg bg-white px-4 py-1.5 text-sm font-medium text-black disabled:opacity-40"
            >
              Adicionar
            </button>
            <button
              onClick={() => { setLinkMode(false); setLinkTitle(''); setLinkUrl('') }}
              className="text-sm text-white/40 hover:text-white/70"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
      )}
    </div>
  )
}
