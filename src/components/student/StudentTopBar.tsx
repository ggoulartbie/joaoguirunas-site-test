'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
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
      className="sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-sm lg:px-6"
      style={{
        background: 'rgba(5,5,7,0.95)',
        borderColor: 'var(--hairline)',
      }}
    >
      {/* Mobile menu button */}
      <button
        className="mr-3 flex h-8 w-8 items-center justify-center transition-colors hover:text-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-1 focus-visible:ring-offset-[#050507] lg:hidden"
        style={{ color: 'rgba(241,241,243,0.6)' }}
        aria-label="Abrir menu de navegação"
        onClick={onMenuClick}
      >
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" clipRule="evenodd" />
        </svg>
      </button>

      <span
        className="font-mono text-xs uppercase tracking-widest"
        style={{ color: 'rgba(241,241,243,0.35)' }}
      >
        {label}
      </span>

      <div className="flex items-center gap-3 lg:gap-4">
        <NotificationBell initialNotifications={notifications} />

        <Link
          href="/academy/perfil"
          aria-label="Ir para perfil"
          className="flex h-8 w-8 items-center justify-center font-mono text-xs font-bold transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-1 focus-visible:ring-offset-[#050507]"
          style={{
            background: 'var(--ink-3)',
            color: 'var(--bone)',
          }}
        >
          {userInitials}
        </Link>
      </div>
    </header>
  )
}
