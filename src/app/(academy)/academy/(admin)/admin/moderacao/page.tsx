import type { Metadata } from 'next'
import { ModerationClient } from './ModerationClient'

export const metadata: Metadata = { title: 'Moderação' }

export default function AdminModeracaoPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Moderação
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Fila de comentários e tópicos pendentes de revisão
        </p>
      </div>
      <ModerationClient />
    </div>
  )
}
