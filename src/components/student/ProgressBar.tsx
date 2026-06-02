import { cn } from '@/lib/utils'

type Props = {
  value: number // 0–100
  className?: string
  showLabel?: boolean
}

export function ProgressBar({ value, className, showLabel = false }: Props) {
  const clamped = Math.min(100, Math.max(0, value))
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className="h-1 flex-1" style={{ background: 'var(--ink-2)' }}>
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${clamped}%`, background: 'var(--ember)' }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${clamped}% concluído`}
        />
      </div>
      {showLabel && (
        <span className="w-8 shrink-0 text-right font-mono text-xs" style={{ color: 'var(--bone-mute)' }}>
          {clamped}%
        </span>
      )}
    </div>
  )
}
