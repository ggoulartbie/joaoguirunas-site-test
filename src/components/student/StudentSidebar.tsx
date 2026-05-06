'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { X, GraduationCap, LogOut, LayoutDashboard, BookOpen, MessageSquare, Calendar, Award, User } from 'lucide-react'
import { cn } from '@/lib/utils'

const navItems = [
  { href: '/academy/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/academy/meus-cursos', label: 'Meus Cursos', icon: BookOpen },
  { href: '/academy/forum', label: 'Fórum', icon: MessageSquare },
  { href: '/academy/agenda', label: 'Agenda', icon: Calendar },
  { href: '/academy/certificados', label: 'Certificados', icon: Award },
  { href: '/academy/perfil', label: 'Perfil', icon: User },
]

type Props = {
  mobileOpen?: boolean
  onClose?: () => void
}

export function StudentSidebar({ mobileOpen = false, onClose }: Props) {
  const pathname = usePathname()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  // Focus close button when drawer opens
  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus()
  }, [mobileOpen])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen, onClose])

  // Prevent body scroll when drawer open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const navContent = (
    <>
      {/* Logo */}
      <div className="flex h-16 items-center gap-3 border-b border-white/10 px-6">
        <div className="flex h-8 w-8 items-center justify-center bg-[#FF3A0E]" aria-hidden="true">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <span className="font-mono text-xs font-semibold uppercase tracking-widest text-white/90">
          Plataforma
        </span>
        {/* Mobile close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Fechar menu"
          className="ml-auto flex h-8 w-8 items-center justify-center text-white/40 transition-colors hover:text-white/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF3A0E] lg:hidden"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Nav */}
      <nav aria-label="Navegação principal" className="flex flex-1 flex-col gap-1 p-4">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3A0E]',
                active
                  ? 'bg-[#FF3A0E]/10 text-[#FF3A0E]'
                  : 'text-white/50 hover:bg-white/5 hover:text-white/80'
              )}
            >
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-white/10 p-4">
        <button
          className="flex w-full items-center gap-3 px-3 py-2.5 font-mono text-xs uppercase tracking-wider text-white/30 transition-colors hover:text-white/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#FF3A0E]"
          aria-label="Sair da conta"
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          Sair
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-40 hidden w-64 flex-col border-r border-white/10 bg-[#0C0C12] lg:flex"
        aria-label="Barra lateral de navegação"
      >
        {navContent}
      </aside>

      {/* Mobile drawer backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Mobile drawer */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-white/10 bg-[#0C0C12] transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {navContent}
      </aside>
    </>
  )
}
