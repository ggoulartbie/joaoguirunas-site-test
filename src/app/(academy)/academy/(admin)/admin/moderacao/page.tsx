import type { Metadata } from 'next'
import { ModerationClient } from './ModerationClient'

export const metadata: Metadata = { title: 'Moderação' }

export default function AdminModeracaoPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bone-mute)]">Admin / Moderação</p>
        <h1 className="mt-1 font-serif text-[28px] italic font-light text-[var(--bone)]">Moderação</h1>
        <p className="mt-1 font-mono text-xs text-[var(--bone-mute)]">
          Fila de comentários e tópicos pendentes de revisão
        </p>
      </div>
      <ModerationClient />
    </div>
  )
}
