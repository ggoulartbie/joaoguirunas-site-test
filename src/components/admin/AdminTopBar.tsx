'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Menu } from 'lucide-react'

const BREADCRUMB_MAP: Record<string, string> = {
  '/admin': 'Dashboard',
  '/admin/turmas': 'Turmas',
  '/admin/cursos': 'Cursos',
  '/admin/usuarios': 'Usuários',
  '/admin/pagamentos': 'Pagamentos',
  '/admin/moderacao': 'Moderação',
  '/admin/forum': 'Fórum',
}

function getBreadcrumb(pathname: string): string {
  if (BREADCRUMB_MAP[pathname]) return BREADCRUMB_MAP[pathname]
  for (const [key, label] of Object.entries(BREADCRUMB_MAP)) {
    if (pathname.startsWith(key + '/')) return label
  }
  return 'Admin'
}

export function AdminTopBar() {
  const pathname = usePathname()
  const label = getBreadcrumb(pathname)

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#050507]/95 px-6 backdrop-blur-sm">
      <button className="mr-4 lg:hidden" aria-label="Abrir menu">
        <Menu className="h-5 w-5 text-white/60" />
      </button>

      <span className="font-mono text-xs uppercase tracking-widest text-white/40">
        {label}
      </span>

      <div className="flex items-center gap-4">
        <button className="relative" aria-label="Notificações">
          <Bell className="h-5 w-5 text-white/50 transition-colors hover:text-white/80" />
        </button>

        <Link href="/perfil" aria-label="Perfil">
          <div className="flex h-8 w-8 items-center justify-center bg-[#FF3A0E]/20 font-mono text-xs font-bold text-[#FF3A0E] transition-colors hover:bg-[#FF3A0E]/30">
            A
          </div>
        </Link>
      </div>
    </header>
  )
}
