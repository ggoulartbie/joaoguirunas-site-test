'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type CalloutKind = 'info' | 'warning' | 'tip' | 'danger'

const styles: Record<CalloutKind, { container: string; icon: string }> = {
  info: { container: 'border-blue-500/30 bg-blue-500/10 text-blue-200', icon: 'ℹ' },
  warning: { container: 'border-yellow-500/30 bg-yellow-500/10 text-yellow-200', icon: '⚠' },
  tip: { container: 'border-green-500/30 bg-green-500/10 text-green-200', icon: '✦' },
  danger: { container: 'border-red-500/30 bg-red-500/10 text-red-200', icon: '✕' },
}

interface CalloutProps {
  kind?: CalloutKind
  title?: string
  children: ReactNode
}

export function Callout({ kind = 'info', title, children }: CalloutProps) {
  const { container, icon } = styles[kind]
  return (
    <div className={cn('my-4 rounded-lg border px-4 py-3', container)}>
      <div className="flex items-start gap-2">
        <span className="mt-0.5 shrink-0 text-sm font-bold">{icon}</span>
        <div className="flex-1 text-sm">
          {title && <p className="mb-1 font-semibold">{title}</p>}
          {children}
        </div>
      </div>
    </div>
  )
}
