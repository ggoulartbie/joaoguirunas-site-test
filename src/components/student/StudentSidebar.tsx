'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard,
  BookOpen,
  MessageSquare,
  Calendar,
  Award,
  User,
  LogOut,
  GraduationCap,
} from 'lucide-react'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/meus-cursos', label: 'Meus Cursos', icon: BookOpen },
  { href: '/forum', label: 'Fórum', icon: MessageSquare },
  { href: '/agenda', label: 'Agenda', icon: Calendar },
  { href: '/certificados', label: 'Certificados', icon: Award },
  { href: '/perfil', label: 'Perfil', icon: User },
]

export function StudentSidebar() {
  const pathname = usePathname()

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0C0C12] lg:flex">
        {/* Logo */}
        <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex h-8 w-8 items-center justify-center bg-[#FF3A0E]">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="font-mono text-xs font-600 uppercase tracking-widest text-white/90">
            Plataforma
          </span>
        </div>

        {/* Nav */}
        <nav className="flex flex-1 flex-col gap-1 p-4">
          {navItems.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + '/')
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

        {/* Logout */}
        <div className="border-t border-white/10 p-4">
          <button className="flex w-full items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-white/30 transition-colors hover:text-white/60">
            <LogOut className="h-4 w-4 shrink-0" />
            Sair
          </button>
        </div>
      </aside>

      {/* Mobile: bottom tab bar placeholder — será implementado na Fase 8 */}
    </>
  )
}
