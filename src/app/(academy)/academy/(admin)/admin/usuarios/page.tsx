import type { Metadata } from 'next'
import { UsersClient } from './UsersClient'

export const metadata: Metadata = { title: 'Usuários' }

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Usuários
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Gerencie perfis, matrículas e acessos
        </p>
      </div>
      <UsersClient />
    </div>
  )
}
