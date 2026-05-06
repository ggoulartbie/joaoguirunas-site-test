'use client'

import { Download } from 'lucide-react'
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

function generateICS(session: LiveSessionWithCohort): string {
  const startDate = new Date(session.scheduled_at)
  const endDate = new Date(startDate.getTime() + session.duration_minutes * 60 * 1000)
  const start = formatICSDate(startDate)
  const end = formatICSDate(endDate)
  const now = formatICSDate(new Date())
  const uid = `${session.id}-${Date.now()}@joaoguirunas.com`

  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//João Guirunas//Plataforma//PT',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${session.title}`,
    session.description ? `DESCRIPTION:${session.description.replace(/\n/g, '\\n')}` : '',
    `ORGANIZER;CN=João Guirunas:mailto:joaoguirunasramos@gmail.com`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
    .filter(Boolean)
    .join('\r\n')

  return lines
}

export function ICSDownloadButton({ session }: Props) {
  function handleDownload() {
    const ics = generateICS(session)
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `encontro-${session.id}.ics`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      onClick={handleDownload}
      aria-label={`Exportar ${session.title} para calendário (.ics)`}
      className="flex items-center gap-1.5 border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/40 hover:border-white/20 hover:text-white/70 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--void)]"
    >
      <Download className="h-3.5 w-3.5" aria-hidden="true" />
      Exportar .ics
    </button>
  )
}
