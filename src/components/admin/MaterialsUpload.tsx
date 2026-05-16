'use client'

import { useRef, useState, useEffect } from 'react'
import {
  uploadMaterialAction,
  addLinkMaterialAction,
  deleteMaterialAction,
} from '@/app/(academy)/academy/(admin)/admin/cursos/material-actions'
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

export function MaterialsUpload({ lessonId, materials: initialMaterials }: MaterialsUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const cancelBtnRef = useRef<HTMLButtonElement>(null)
  const [materials, setMaterials] = useState(initialMaterials)
  const [uploading, setUploading] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)
  const [confirming, setConfirming] = useState<string | null>(null)
  const [confirmError, setConfirmError] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [linkMode, setLinkMode] = useState(false)
  const [linkTitle, setLinkTitle] = useState('')
  const [linkUrl, setLinkUrl] = useState('')
  const [dragging, setDragging] = useState(false)

  // move foco para o botão Cancelar ao abrir painel de confirmação
  useEffect(() => {
    if (confirming && cancelBtnRef.current) {
      cancelBtnRef.current.focus()
    }
  }, [confirming])

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

  function openConfirm(materialId: string) {
    setConfirming(materialId)
    setConfirmError(null)
  }

  function closeConfirm() {
    setConfirming(null)
    setConfirmError(null)
  }

  async function handleDelete(materialId: string) {
    const snapshot = materials.find((m) => m.id === materialId)
    setMaterials((prev) => prev.filter((m) => m.id !== materialId))
    setDeleting(materialId)
    setConfirmError(null)

    try {
      await deleteMaterialAction(materialId)
      setConfirming(null)
    } catch (err) {
      // rollback otimista
      if (snapshot) setMaterials((prev) => [...prev, snapshot])
      setConfirmError(err instanceof Error ? err.message : 'Erro ao excluir. Tente novamente.')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="space-y-4">
      {/* lista de materials existentes */}
      {materials.length > 0 && (
        <ul className="space-y-1.5">
          {materials.map((m) => {
            const isConfirming = confirming === m.id
            const isDeleting = deleting === m.id

            return (
              <li key={m.id}>
                <div
                  className={`flex items-center gap-3 border border-[var(--hairline)] bg-[var(--ink-2)] px-4 py-2.5 transition-opacity ${isDeleting ? 'opacity-50' : ''}`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                    {KIND_LABELS[m.kind]}
                  </span>
                  <span className="min-w-0 flex-1 truncate font-sans text-sm text-[var(--bone-dim)]">{m.title}</span>
                  {m.size_bytes && (
                    <span className="shrink-0 font-mono text-[10px] text-[var(--bone-mute)]">
                      {(m.size_bytes / (1024 * 1024)).toFixed(1)} MB
                    </span>
                  )}
                  {!isConfirming && (
                    <button
                      onClick={() => openConfirm(m.id)}
                      disabled={isDeleting || deleting !== null}
                      aria-label={`Remover ${m.title}`}
                      className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-[var(--ember)] opacity-60 transition-opacity hover:opacity-100 disabled:opacity-30"
                    >
                      Remover
                    </button>
                  )}
                </div>

                {isConfirming && (
                  <div
                    role="alert"
                    className="border border-t-0 border-[var(--hairline)] bg-[var(--ink-2)] px-4 py-3"
                  >
                    <p className="font-sans text-sm text-[var(--bone)]">
                      Excluir &ldquo;{m.title}&rdquo;?
                    </p>
                    <p className="mt-0.5 font-mono text-[10px] text-[var(--bone-mute)]">
                      Esta ação não pode ser desfeita.
                    </p>

                    {confirmError && (
                      <p className="mt-2 bg-[var(--ember)]/10 px-3 py-1.5 font-mono text-[11px] text-[var(--ember)]">
                        {confirmError}
                      </p>
                    )}

                    <div className="mt-3 flex items-center gap-3">
                      <button
                        ref={cancelBtnRef}
                        onClick={closeConfirm}
                        disabled={isDeleting}
                        className="font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] disabled:opacity-40"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => handleDelete(m.id)}
                        disabled={isDeleting}
                        className="bg-[var(--ember)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--void)] transition-opacity hover:opacity-90 disabled:opacity-40"
                        style={{ borderRadius: 0 }}
                      >
                        {isDeleting ? '...' : 'Excluir'}
                      </button>
                    </div>
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      )}

      {/* area de drop */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        onClick={() => fileInputRef.current?.click()}
        className={`flex cursor-pointer flex-col items-center justify-center border-2 border-dashed px-6 py-8 transition-colors ${
          dragging
            ? 'border-[var(--hairline-strong)] bg-[var(--ink-3)]'
            : 'border-[var(--hairline)] bg-[var(--ink-2)] hover:border-[var(--hairline-strong)] hover:bg-[var(--ink-3)]'
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
        <p className="font-sans text-sm text-[var(--bone-dim)]">
          {uploading ? 'Enviando...' : 'Arraste arquivos ou clique para selecionar'}
        </p>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          PDF, ZIP, Imagens — max. {MAX_MB}MB por arquivo
        </p>
      </div>

      {/* adicionar link */}
      {!linkMode ? (
        <button
          onClick={() => setLinkMode(true)}
          className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
        >
          + Adicionar link externo
        </button>
      ) : (
        <div className="space-y-2 border border-[var(--hairline)] bg-[var(--ink-2)] p-4">
          <input
            type="text"
            placeholder="Título do link"
            value={linkTitle}
            onChange={(e) => setLinkTitle(e.target.value)}
            className="w-full border border-[var(--hairline)] bg-transparent px-3 py-2 font-mono text-sm text-[var(--bone)] placeholder:text-[var(--bone-mute)] focus:border-[var(--ember)] focus:outline-none"
            style={{ borderRadius: 0 }}
          />
          <input
            type="url"
            placeholder="https://..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            className="w-full border border-[var(--hairline)] bg-transparent px-3 py-2 font-mono text-sm text-[var(--bone)] placeholder:text-[var(--bone-mute)] focus:border-[var(--ember)] focus:outline-none"
            style={{ borderRadius: 0 }}
          />
          <div className="flex gap-2">
            <button
              onClick={handleAddLink}
              disabled={!linkTitle || !linkUrl}
              className="bg-[var(--ember)] px-4 py-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--void)] transition-opacity hover:opacity-90 disabled:opacity-40"
              style={{ borderRadius: 0 }}
            >
              Adicionar
            </button>
            <button
              onClick={() => { setLinkMode(false); setLinkTitle(''); setLinkUrl('') }}
              className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {error && (
        <p className="bg-[var(--ember)]/10 px-4 py-2 font-mono text-[11px] text-[var(--ember)]">{error}</p>
      )}
    </div>
  )
}
