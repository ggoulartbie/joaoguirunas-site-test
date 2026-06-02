'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { X, LogOut, LayoutDashboard, BookOpen, MessageSquare, Calendar, Award, User } from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

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
  const router = useRouter()
  const closeButtonRef = useRef<HTMLButtonElement>(null)

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/academy/login')
    router.refresh()
  }

  useEffect(() => {
    if (mobileOpen) closeButtonRef.current?.focus()
  }, [mobileOpen])

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && mobileOpen) onClose?.()
    }
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [mobileOpen, onClose])

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
      <style>{`
        .kv-sidebar-focus:focus-visible {
          outline: 2px solid rgba(255,58,14,0.5);
          outline-offset: -2px;
        }
      `}</style>

      {/* Logo header */}
      <div
        className="flex h-16 items-center px-6"
        style={{ borderBottom: '1px solid var(--hairline)' }}
      >
        <Image
          src="/images/brand/logo-horizontal.svg"
          alt="João Guirunas"
          width={140}
          height={26}
          priority
          style={{ objectFit: 'contain', objectPosition: 'left center' }}
        />
        {/* Mobile close button */}
        <button
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="Fechar menu"
          className="kv-sidebar-focus ml-auto flex h-8 w-8 items-center justify-center transition-colors focus-visible:outline-none lg:hidden"
          style={{ color: 'var(--bone-mute)' }}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bone)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--bone-mute)' }}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>

      {/* Nav */}
      <nav aria-label="Navegação principal" className="flex flex-1 flex-col py-2">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + '/')
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
              aria-current={active ? 'page' : undefined}
              className={cn(
                'kv-sidebar-focus flex items-center gap-3 px-6 py-3 transition-colors focus-visible:outline-none',
                !active && 'hover:bg-white/[0.04]'
              )}
              style={
                active
                  ? {
                      borderLeft: '2px solid var(--ember)',
                      background: 'rgba(255,58,14,0.06)',
                      color: 'var(--ember)',
                      fontFamily: 'var(--type-sans)',
                      fontSize: '14px',
                    }
                  : {
                      borderLeft: '2px solid transparent',
                      color: 'var(--bone-dim)',
                      fontFamily: 'var(--type-sans)',
                      fontSize: '14px',
                    }
              }
            >
              <Icon
                className="h-4 w-4 shrink-0"
                aria-hidden="true"
                style={{ color: active ? 'var(--ember)' : 'var(--bone-mute)' }}
              />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Logout */}
      <div style={{ borderTop: '1px solid var(--hairline)' }}>
        <button
          className="kv-sidebar-focus flex w-full items-center gap-3 px-6 py-4 transition-colors focus-visible:outline-none"
          style={{ color: 'var(--bone-mute)', fontFamily: 'var(--type-sans)', fontSize: '14px' }}
          aria-label="Sair da conta"
          onClick={handleLogout}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--ember)'
            const icon = e.currentTarget.querySelector('svg')
            if (icon) icon.style.color = 'var(--ember)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'var(--bone-mute)'
            const icon = e.currentTarget.querySelector('svg')
            if (icon) icon.style.color = 'var(--bone-mute)'
          }}
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" style={{ color: 'var(--bone-mute)' }} />
          Sair
        </button>
      </div>
    </>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="fixed inset-y-0 left-0 z-50 hidden w-64 flex-col lg:flex"
        style={{
          background: 'var(--void)',
          borderRight: '1px solid var(--hairline)',
        }}
        aria-label="Barra lateral de navegação"
      >
        {navContent}
      </aside>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          aria-hidden="true"
          onClick={onClose}
          style={{ background: 'rgba(5,5,7,0.80)' }}
        />
      )}

      {/* Mobile drawer */}
      <aside
        id="mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col transition-transform duration-200 lg:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
        style={{
          background: 'var(--void)',
          borderRight: '1px solid var(--hairline)',
        }}
      >
        {navContent}
      </aside>
    </>
  )
}
