import type { Metadata } from 'next'
import { UsersClient } from './UsersClient'

export const metadata: Metadata = { title: 'Usuários' }

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--bone-mute)]">Admin / Usuários</p>
        <h1 className="mt-1 font-serif text-[28px] italic font-light text-[var(--bone)]">Usuários</h1>
        <p className="mt-1 font-mono text-xs text-[var(--bone-mute)]">
          Gerencie perfis, matrículas e acessos
        </p>
      </div>
      <UsersClient />
    </div>
  )
}
