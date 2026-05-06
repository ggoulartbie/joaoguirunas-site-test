'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu } from 'lucide-react'
import { NotificationBell } from './NotificationBell'

const BREADCRUMB_MAP: Record<string, string> = {
  '/academy/dashboard': 'Dashboard',
  '/academy/meus-cursos': 'Meus Cursos',
  '/academy/forum': 'Fórum',
  '/academy/agenda': 'Agenda',
  '/academy/certificados': 'Certificados',
  '/academy/perfil': 'Perfil',
}

type Notification = {
  id: string
  title: string
  message: string | null
  notification_type: string
  action_url: string | null
  read_at: string | null
  created_at: string
}

type Props = {
  notifications: Notification[]
  userInitials: string
  onMenuClick?: () => void
}

export function StudentTopBar({ notifications, userInitials, onMenuClick }: Props) {
  const pathname = usePathname()
  const label = BREADCRUMB_MAP[pathname] ?? 'Área do Aluno'

  return (
    <header
      className="sticky top-0 z-30 flex h-14 items-center justify-between px-4 sm:px-6"
      style={{
        background: 'var(--void)',
        borderBottom: '1px solid var(--hairline)',
      }}
    >
      {/* Left: hamburger + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          className="flex h-8 w-8 items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--void)] lg:hidden"
          style={{ color: 'var(--bone-mute)' }}
          aria-label="Abrir menu de navegação"
          onClick={onMenuClick}
          onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--bone)' }}
          onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--bone-mute)' }}
        >
          <Menu className="h-5 w-5" aria-hidden="true" />
        </button>

        <span
          className="hidden lg:block"
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: '11px',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--bone-mute)',
          }}
        >
          {label}
        </span>
      </div>

      {/* Right: notifications + avatar */}
      <div className="flex items-center gap-3 lg:gap-4">
        <NotificationBell initialNotifications={notifications} />

        <Link
          href="/academy/perfil"
          aria-label="Ir para perfil"
          className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold uppercase transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--void)]"
          style={{
            background: 'rgba(255,58,14,0.20)',
            color: 'var(--ember)',
            fontFamily: 'var(--type-mono)',
          }}
        >
          {userInitials}
        </Link>
      </div>
    </header>
  )
}
