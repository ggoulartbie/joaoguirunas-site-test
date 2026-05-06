'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bell, Menu } from 'lucide-react'

const BREADCRUMB_MAP: Record<string, string> = {
  '/dashboard': 'Dashboard',
  '/meus-cursos': 'Meus Cursos',
  '/forum': 'Fórum',
  '/agenda': 'Agenda',
  '/certificados': 'Certificados',
  '/perfil': 'Perfil',
}

export function StudentTopBar() {
  const pathname = usePathname()
  const label = BREADCRUMB_MAP[pathname] ?? 'Área do Aluno'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-white/10 bg-[#050507]/95 px-6 backdrop-blur-sm">
      {/* Mobile menu button */}
      <button className="mr-4 lg:hidden" aria-label="Abrir menu">
        <Menu className="h-5 w-5 text-white/60" />
      </button>

      <span className="font-mono text-xs uppercase tracking-widest text-white/40">
        {label}
      </span>

      <div className="flex items-center gap-4">
        <button className="relative" aria-label="Notificações">
          <Bell className="h-5 w-5 text-white/50 hover:text-white/80 transition-colors" />
          {/* Badge — será alimentado por dados reais na F3+ */}
          <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center bg-[#FF3A0E] font-mono text-[9px] text-white">
            2
          </span>
        </button>

        <Link href="/perfil" aria-label="Perfil">
          <div className="flex h-8 w-8 items-center justify-center bg-white/10 font-mono text-xs font-bold text-white/70 hover:bg-white/15 transition-colors">
            JG
          </div>
        </Link>
      </div>
    </header>
  )
}
