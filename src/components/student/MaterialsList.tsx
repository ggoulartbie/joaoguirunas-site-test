'use client'

import { useState } from 'react'
import { downloadMaterialAction } from '@/app/(student)/curso/[slug]/aula/[lesson-slug]/material-actions'
import type { Database } from '@/types/database'

type Material = Database['public']['Tables']['materials']['Row']

const KIND_ICONS: Record<string, string> = {
  PDF: '📄',
  ZIP: '🗜',
  IMAGE: '🖼',
  LINK: '🔗',
  OTHER: '📎',
}

interface MaterialsListProps {
  materials: Material[]
}

export function MaterialsList({ materials }: MaterialsListProps) {
  const [loading, setLoading] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  if (materials.length === 0) {
    return (
      <p className="text-sm text-white/40">Nenhum material disponível para esta aula.</p>
    )
  }

  async function handleDownload(material: Material) {
    setError(null)
    setLoading(material.id)

    try {
      const url = await downloadMaterialAction(material.id)

      // para links externos: abre em nova aba
      // para arquivos: dispara download
      const a = document.createElement('a')
      a.href = url
      if (material.kind !== 'LINK') {
        a.download = material.title
      } else {
        a.target = '_blank'
        a.rel = 'noopener noreferrer'
      }
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao baixar material')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-2">
      {error && (
        <p className="rounded-lg bg-red-500/10 px-4 py-2 text-sm text-red-400">{error}</p>
      )}
      {materials.map((material) => (
        <button
          key={material.id}
          onClick={() => handleDownload(material)}
          disabled={loading === material.id}
          className="flex w-full items-center gap-3 rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition-colors hover:bg-white/10 disabled:opacity-50"
        >
          <span className="text-lg" aria-hidden>
            {KIND_ICONS[material.kind] ?? KIND_ICONS['OTHER']}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-white">{material.title}</p>
            {material.size_bytes && (
              <p className="text-xs text-white/40">{formatBytes(material.size_bytes)}</p>
            )}
          </div>
          <span className="shrink-0 text-xs text-white/40">
            {loading === material.id ? 'Preparando...' : material.kind === 'LINK' ? 'Abrir' : 'Baixar'}
          </span>
        </button>
      ))}
    </div>
  )
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
