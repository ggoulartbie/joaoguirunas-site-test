'use client'

import type { LiveSessionWithCohort } from '@/types/student'

type Props = {
  session: LiveSessionWithCohort
}

function formatICSDate(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, '')
    .replace(/\.\d{3}/, '')
}

function buildGoogleCalendarUrl(session: LiveSessionWithCohort): string {
  const start = new Date(session.scheduled_at)
  const end = new Date(start.getTime() + session.duration_minutes * 60 * 1000)

  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: session.title,
    dates: `${formatICSDate(start)}/${formatICSDate(end)}`,
    ...(session.description ? { details: session.description } : {}),
  })

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

export function ICSDownloadButton({ session }: Props) {
  return (
    <a
      href={buildGoogleCalendarUrl(session)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Adicionar ${session.title} ao Google Agenda`}
      className="flex items-center justify-center px-3 h-9 border border-[var(--hairline)] font-mono text-[11px] uppercase tracking-wider whitespace-nowrap transition-colors hover:border-[var(--hairline-strong)] hover:text-[var(--bone)]"
      style={{ color: 'var(--bone-mute)', borderRadius: 0 }}
    >
      Adicione ao Google Agenda
    </a>
  )
}
