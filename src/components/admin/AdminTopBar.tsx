'use client'

import { usePathname } from 'next/navigation'

const BREADCRUMB_MAP: Record<string, string> = {
  '/academy/admin': 'Dashboard',
  '/academy/admin/turmas': 'Turmas',
  '/academy/admin/cursos': 'Cursos',
  '/academy/admin/usuarios': 'Usuários',
  '/academy/admin/pagamentos': 'Pagamentos',
  '/academy/admin/moderacao': 'Moderação',
  '/academy/admin/forum': 'Fórum',
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
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-white/[0.07] bg-[#050507] px-6">
      <span className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">
        {label}
      </span>

      <div className="flex items-center gap-3">
        <span className="border border-[#ff3a0e]/30 bg-[#ff3a0e]/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#ff3a0e]">
          Admin
        </span>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#ff3a0e]/20 font-mono text-xs font-bold text-[#ff3a0e]">
          A
        </div>
      </div>
    </header>
  )
}
