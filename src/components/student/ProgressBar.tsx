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
      <div className="h-1 flex-1 bg-white/10">
        <div
          className="h-full bg-[#FF3A0E] transition-all duration-500"
          style={{ width: `${clamped}%` }}
          role="progressbar"
          aria-valuenow={clamped}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${clamped}% concluído`}
        />
      </div>
      {showLabel && (
        <span className="w-8 shrink-0 text-right font-mono text-xs text-white/40">
          {clamped}%
        </span>
      )}
    </div>
  )
}
