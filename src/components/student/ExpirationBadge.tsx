import { AlertTriangle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'

type Props = {
  expiresAt: string // ISO 8601
  className?: string
}

function daysUntil(iso: string): number {
  const diff = new Date(iso).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function ExpirationBadge({ expiresAt, className }: Props) {
  const days = daysUntil(expiresAt)

  if (days > 30) return null

  const urgent = days <= 7
  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 font-mono text-xs uppercase tracking-wide',
        urgent ? 'bg-[var(--ember)]/15 text-[var(--ember)]' : 'bg-[var(--ink-2)] text-[var(--bone-mute)]',
        className
      )}
    >
      {urgent ? (
        <AlertTriangle className="h-3 w-3 shrink-0" />
      ) : (
        <Clock className="h-3 w-3 shrink-0" />
      )}
      <span>
        {days <= 0 ? 'Expirado' : days === 1 ? 'Expira amanhã' : `Expira em ${days} dias`}
      </span>
    </div>
  )
}
