'use client'

import { useState, useRef, useEffect, useTransition } from 'react'
import Link from 'next/link'
import { Bell, X, Check, CheckCheck } from 'lucide-react'
import { markNotificationRead, markAllNotificationsRead } from '@/app/actions/notifications'

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
  initialNotifications: Notification[]
}

function timeAgo(iso: string): string {
  const diffMs = Date.now() - new Date(iso).getTime()
  const diffDays = Math.floor(diffMs / 86400000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffMins = Math.floor(diffMs / 60000)
  if (diffDays > 0) return `${diffDays}d`
  if (diffHours > 0) return `${diffHours}h`
  return `${Math.max(diffMins, 1)}min`
}

export function NotificationBell({ initialNotifications }: Props) {
  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState(initialNotifications)
  const [pending, startTransition] = useTransition()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const unreadCount = notifications.filter((n) => !n.read_at).length

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node) &&
        !buttonRef.current?.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  // Close on Escape
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false)
    }
    if (open) document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [open])

  function handleMarkRead(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read_at: new Date().toISOString() } : n))
    )
    startTransition(() => markNotificationRead(id))
  }

  function handleMarkAllRead() {
    setNotifications((prev) =>
      prev.map((n) => ({ ...n, read_at: n.read_at ?? new Date().toISOString() }))
    )
    startTransition(() => markAllNotificationsRead())
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={() => setOpen((v) => !v)}
        aria-label={`Notificações${unreadCount > 0 ? ` — ${unreadCount} não lidas` : ''}`}
        aria-expanded={open}
        aria-haspopup="true"
        className="relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)]"
      >
        <Bell className="h-5 w-5 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)]" />
        {unreadCount > 0 && (
          <span
            aria-hidden="true"
            className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center bg-[var(--ember)] font-mono text-[9px] text-white"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label="Notificações"
          className="absolute right-0 top-full mt-2 w-80 border border-[var(--hairline)] bg-[var(--ink)] shadow-xl z-50"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--hairline)] px-4 py-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
              Notificações
            </span>
            <div className="flex items-center gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  disabled={pending}
                  title="Marcar todas como lidas"
                  aria-label="Marcar todas as notificações como lidas"
                  className="text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] disabled:opacity-40 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ember)]"
                >
                  <CheckCheck className="h-3.5 w-3.5" />
                </button>
              )}
              <button
                onClick={() => setOpen(false)}
                aria-label="Fechar notificações"
                className="text-[var(--bone-mute)] transition-colors hover:text-[var(--bone-dim)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ember)]"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* List */}
          <ul
            role="list"
            className="max-h-80 overflow-y-auto divide-y divide-[var(--hairline)]"
            aria-label="Lista de notificações"
          >
            {notifications.length === 0 ? (
              <li className="px-4 py-8 text-center font-mono text-xs text-[var(--bone-mute)]">
                Nenhuma notificação
              </li>
            ) : (
              notifications.map((n) => {
                const isUnread = !n.read_at
                const content = (
                  <div className="flex items-start gap-3 px-4 py-3">
                    <div
                      className={`mt-1 h-1.5 w-1.5 shrink-0 ${isUnread ? 'bg-[var(--ember)]' : 'bg-transparent'}`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className={`text-xs font-medium leading-snug ${isUnread ? 'text-[var(--bone)]' : 'text-[var(--bone-mute)]'}`}>
                        {n.title}
                      </p>
                      {n.message && (
                        <p className="mt-0.5 text-[11px] leading-snug text-[var(--bone-mute)] line-clamp-2">
                          {n.message}
                        </p>
                      )}
                      <p className="mt-1 font-mono text-[10px] text-[var(--bone-mute)]">
                        {timeAgo(n.created_at)}
                      </p>
                    </div>
                    {isUnread && (
                      <button
                        onClick={(e) => { e.stopPropagation(); e.preventDefault(); handleMarkRead(n.id) }}
                        aria-label={`Marcar "${n.title}" como lida`}
                        className="shrink-0 text-[var(--bone-mute)] transition-colors hover:text-[var(--bone)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[var(--ember)]"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                )

                return (
                  <li key={n.id} className={isUnread ? 'bg-[var(--ink-2)]' : ''}>
                    {n.action_url ? (
                      <Link
                        href={n.action_url}
                        onClick={() => { if (isUnread) handleMarkRead(n.id); setOpen(false) }}
                        className="block transition-colors hover:bg-[var(--ink-2)] focus-visible:outline-none focus-visible:ring-inset focus-visible:ring-1 focus-visible:ring-[var(--ember)]"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div>{content}</div>
                    )}
                  </li>
                )
              })
            )}
          </ul>
        </div>
      )}
    </div>
  )
}
