'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  Shield,
  MessageSquare,
  LogOut,
  BookOpen,
} from 'lucide-react'

const navItems = [
  { href: '/academy/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { href: '/academy/admin/turmas', label: 'Turmas', icon: GraduationCap },
  { href: '/academy/admin/cursos', label: 'Cursos', icon: BookOpen },
  { href: '/academy/admin/usuarios', label: 'Usuários', icon: Users },
  { href: '/academy/admin/pagamentos', label: 'Pagamentos', icon: CreditCard },
  { href: '/academy/admin/moderacao', label: 'Moderação', icon: MessageSquare },
  { href: '/academy/admin/forum', label: 'Fórum', icon: Shield },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0C0C12] lg:flex">
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center bg-[#FF3A0E]">
            <Shield className="h-4 w-4 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/90">
              Admin
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-white/30">
              Painel
            </span>
          </div>
        </div>

        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map(({ href, label, icon: Icon, exact }) => {
            const active = exact
              ? pathname === href
              : pathname === href || pathname.startsWith(href + '/')
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors',
                  active
                    ? 'bg-[#FF3A0E]/10 text-[#FF3A0E]'
                    : 'text-white/50 hover:bg-white/5 hover:text-white/80'
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/academy/dashboard"
            className="mb-1 flex w-full items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider text-white/30 transition-colors hover:text-white/60"
          >
            <GraduationCap className="h-4 w-4 shrink-0" />
            Área do Aluno
          </Link>
          <button className="flex w-full items-center gap-3 px-3 py-2 font-mono text-xs uppercase tracking-wider text-white/30 transition-colors hover:text-white/60">
            <LogOut className="h-4 w-4 shrink-0" />
            Sair
          </button>
        </div>
      </aside>
    </>
  )
}
