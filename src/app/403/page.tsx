import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acesso negado',
}

export default function ForbiddenPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4">
      <div className="text-center">
        <p className="text-6xl font-bold text-white/10">403</p>
        <h1 className="mt-4 text-xl font-semibold text-white">Acesso negado</h1>
        <p className="mt-2 text-sm text-white/50">
          Você não tem permissão para acessar esta página.
        </p>
        <Link
          href="/dashboard"
          className="mt-6 inline-block text-sm text-white/70 hover:text-white transition-colors"
        >
          Voltar ao dashboard
        </Link>
      </div>
    </div>
  )
}
