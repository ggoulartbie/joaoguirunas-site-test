import type { Metadata } from 'next'
import { ModerationClient } from './ModerationClient'

export const metadata: Metadata = { title: 'Moderação' }

export default function AdminModeracaoPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84848c]">Admin / Moderação</p>
        <h1 className="mt-1 font-mono text-[28px] italic text-[#f1f1f3]">Moderação</h1>
        <p className="mt-1 font-mono text-xs text-[#84848c]">
          Fila de comentários e tópicos pendentes de revisão
        </p>
      </div>
      <ModerationClient />
    </div>
  )
}
