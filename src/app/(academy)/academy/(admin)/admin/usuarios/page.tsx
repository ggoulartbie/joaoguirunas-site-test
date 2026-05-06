import type { Metadata } from 'next'
import { UsersClient } from './UsersClient'

export const metadata: Metadata = { title: 'Usuários' }

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#84848c]">Admin / Usuários</p>
        <h1 className="mt-1 font-mono text-[28px] italic text-[#f1f1f3]">Usuários</h1>
        <p className="mt-1 font-mono text-xs text-[#84848c]">
          Gerencie perfis, matrículas e acessos
        </p>
      </div>
      <UsersClient />
    </div>
  )
}
