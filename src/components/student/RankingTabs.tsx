'use client'

import { useState, useRef, useCallback } from 'react'
import type { RankingEntry } from '@/app/actions/ranking'
import { Podium } from './Podium'

type Period = 'week' | 'biweek' | 'month'

const DAYS_BY_PERIOD: Record<Period, number> = { week: 7, biweek: 15, month: 30 }

function formatRange(period: Period): string {
  const fmt = new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
  const now = new Date()
  const since = new Date(now.getTime() - DAYS_BY_PERIOD[period] * 24 * 60 * 60 * 1000)
  return `De ${fmt.format(since)} até ${fmt.format(now)}`
}

const TABS: { id: Period; label: string }[] = [
  { id: 'week', label: 'Semanal' },
  { id: 'biweek', label: 'Quinzenal' },
  { id: 'month', label: 'Mensal' },
]

type Props = {
  week: RankingEntry[]
  biweek: RankingEntry[]
  month: RankingEntry[]
}

export function RankingTabs({ week, biweek, month }: Props) {
  const [active, setActive] = useState<Period>('week')
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const entries: Record<Period, RankingEntry[]> = { week, biweek, month }

  const handleKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % TABS.length
      tabRefs.current[next]?.focus()
      setActive(TABS[next]!.id)
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + TABS.length) % TABS.length
      tabRefs.current[prev]?.focus()
      setActive(TABS[prev]!.id)
    }
  }, [])

  return (
    <div>
      <div role="tablist" aria-label="Período do ranking" className="flex gap-0 border-b" style={{ borderColor: 'var(--hairline)' }}>
        {TABS.map(({ id, label }, idx) => {
          const isActive = active === id
          return (
            <button
              key={id}
              ref={(el) => { tabRefs.current[idx] = el }}
              role="tab"
              aria-selected={isActive}
              aria-controls={`panel-${id}`}
              id={`tab-${id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(id)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="px-5 py-3 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-inset"
              style={
                isActive
                  ? {
                      color: 'var(--ember)',
                      borderBottom: '2px solid var(--ember)',
                      marginBottom: -1,
                    }
                  : {
                      color: 'var(--bone-mute)',
                      borderBottom: '2px solid transparent',
                      marginBottom: -1,
                    }
              }
            >
              {label}
            </button>
          )
        })}
      </div>

      <p className="mt-3 text-xs text-center" style={{ color: 'var(--bone-mute)' }}>
        {formatRange(active)}
      </p>

      {TABS.map(({ id }) => (
        <div
          key={id}
          role="tabpanel"
          id={`panel-${id}`}
          aria-labelledby={`tab-${id}`}
          hidden={active !== id}
          className="pt-8"
        >
          <Podium entries={entries[id]} />
        </div>
      ))}
    </div>
  )
}
