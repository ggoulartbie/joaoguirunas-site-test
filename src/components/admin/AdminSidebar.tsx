'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  CreditCard,
  MessageSquare,
  LogOut,
  BookOpen,
  Shield,
  ExternalLink,
} from 'lucide-react'

const navGroups = [
  {
    label: 'Conteúdo',
    items: [
      { href: '/academy/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
      { href: '/academy/admin/cursos', label: 'Cursos', icon: BookOpen },
      { href: '/academy/admin/turmas', label: 'Turmas', icon: GraduationCap },
    ],
  },
  {
    label: 'Comunidade',
    items: [
      { href: '/academy/admin/forum', label: 'Fórum', icon: MessageSquare },
      { href: '/academy/admin/moderacao', label: 'Moderação', icon: Shield },
    ],
  },
  {
    label: 'Financeiro',
    items: [
      { href: '/academy/admin/pagamentos', label: 'Pagamentos', icon: CreditCard },
    ],
  },
  {
    label: 'Usuários',
    items: [
      { href: '/academy/admin/usuarios', label: 'Usuários', icon: Users },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col border-r border-white/[0.07] bg-[#050507] lg:flex">
      <div className="flex h-16 flex-col justify-center border-b border-white/[0.07] px-6">
        <Image
          src="/images/brand/logo-header.png"
          width={140}
          height={32}
          alt="Logo"
          className="object-contain object-left"
          priority
        />
        <span className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[#ff3a0e]">
          Admin
        </span>
      </div>

      <nav className="flex flex-1 flex-col overflow-y-auto py-2">
        {navGroups.map((group) => (
          <div key={group.label}>
            <p className="px-6 pb-1 pt-4 font-mono text-[10px] uppercase tracking-widest text-[#84848c]">
              {group.label}
            </p>
            {group.items.map(({ href, label, icon: Icon, exact }) => {
              const active = exact
                ? pathname === href
                : pathname === href || pathname.startsWith(href + '/')
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-6 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors',
                    active
                      ? 'border-l-2 border-[#ff3a0e] bg-[#ff3a0e]/[0.06] text-[#ff3a0e]'
                      : 'border-l-2 border-transparent text-[#84848c] hover:bg-white/[0.04] hover:text-[#f1f1f3]'
                  )}
                >
                  <Icon
                    className={cn(
                      'h-4 w-4 shrink-0',
                      active ? 'text-[#ff3a0e]' : 'text-[#84848c]'
                    )}
                  />
                  {label}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      <div className="border-t border-white/[0.07]">
        <Link
          href="/"
          className="flex w-full items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#ff3a0e]"
        >
          <ExternalLink className="h-4 w-4 shrink-0" />
          Voltar ao site
        </Link>
        <button className="flex w-full items-center gap-3 px-6 py-3 font-mono text-xs uppercase tracking-wider text-[#84848c] transition-colors hover:text-[#ff3a0e]">
          <LogOut className="h-4 w-4 shrink-0" />
          Logout
        </button>
      </div>
    </aside>
  )
}
