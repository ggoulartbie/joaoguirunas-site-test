'use client'

import { useState, useRef, useCallback } from 'react'
import type { RankingEntry } from '@/app/actions/ranking'
import { getCycleRange } from '@/lib/ranking-cycle'
import { Podium } from './Podium'

type Period = 'week' | 'biweek' | 'month'
type Category = 'lessons' | 'comments' | 'general'

function formatRange(period: Period): string {
  const fmt = new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit', month: '2-digit', year: 'numeric',
    timeZone: 'America/Sao_Paulo',
  })
  const { startMs, endMs } = getCycleRange(period)
  return `De ${fmt.format(new Date(startMs))} até ${fmt.format(new Date(endMs))}`
}

const PERIOD_TABS: { id: Period; label: string }[] = [
  { id: 'week', label: 'Semanal' },
  { id: 'biweek', label: 'Quinzenal' },
  { id: 'month', label: 'Mensal' },
]

const CATEGORY_TABS: { id: Category; label: string; description: string }[] = [
  { id: 'lessons', label: 'Aulas', description: 'Aulas concluídas no período' },
  { id: 'comments', label: 'Comentários', description: 'Comentários em aulas e fórum' },
  { id: 'general', label: 'Geral', description: 'Soma de aulas + comentários' },
]

type CategoryData = {
  week: RankingEntry[]
  biweek: RankingEntry[]
  month: RankingEntry[]
}

type Props = {
  lessons: CategoryData
  comments: CategoryData
  general: CategoryData
}

export function RankingTabs({ lessons, comments, general }: Props) {
  const [activeCategory, setActiveCategory] = useState<Category>('lessons')
  const [activePeriod, setActivePeriod] = useState<Period>('week')

  const catRefs = useRef<(HTMLButtonElement | null)[]>([])
  const periodRefs = useRef<(HTMLButtonElement | null)[]>([])

  const handleCatKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % CATEGORY_TABS.length
      catRefs.current[next]?.focus()
      setActiveCategory(CATEGORY_TABS[next]!.id)
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + CATEGORY_TABS.length) % CATEGORY_TABS.length
      catRefs.current[prev]?.focus()
      setActiveCategory(CATEGORY_TABS[prev]!.id)
    }
  }, [])

  const handlePeriodKeyDown = useCallback((e: React.KeyboardEvent, idx: number) => {
    if (e.key === 'ArrowRight') {
      const next = (idx + 1) % PERIOD_TABS.length
      periodRefs.current[next]?.focus()
      setActivePeriod(PERIOD_TABS[next]!.id)
    } else if (e.key === 'ArrowLeft') {
      const prev = (idx - 1 + PERIOD_TABS.length) % PERIOD_TABS.length
      periodRefs.current[prev]?.focus()
      setActivePeriod(PERIOD_TABS[prev]!.id)
    }
  }, [])

  const data: Record<Category, CategoryData> = { lessons, comments, general }
  const entries = data[activeCategory][activePeriod]

  return (
    <div className="space-y-0">
      {/* Category selector — group of toggle buttons (not tablist: all control the same output area) */}
      <div
        role="group"
        aria-label="Categoria do ranking"
        className="flex gap-1 border-b pb-3"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {CATEGORY_TABS.map(({ id, label, description }, idx) => {
          const isActive = activeCategory === id
          return (
            <button
              key={id}
              ref={(el) => { catRefs.current[idx] = el }}
              aria-pressed={isActive}
              onClick={() => setActiveCategory(id)}
              onKeyDown={(e) => handleCatKeyDown(e, idx)}
              title={description}
              className="rounded px-4 py-1.5 font-mono text-[11px] uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)]"
              style={
                isActive
                  ? { background: 'var(--ember)', color: '#fff' }
                  : { background: 'transparent', color: 'var(--bone-mute)', border: '1px solid var(--hairline)' }
              }
            >
              {label}
            </button>
          )
        })}
      </div>

      {/* Period tabs — tablist controlling #ranking-podium */}
      <div
        role="tablist"
        aria-label="Período do ranking"
        className="flex gap-0 border-b"
        style={{ borderColor: 'var(--hairline)' }}
      >
        {PERIOD_TABS.map(({ id, label }, idx) => {
          const isActive = activePeriod === id
          return (
            <button
              key={id}
              ref={(el) => { periodRefs.current[idx] = el }}
              role="tab"
              aria-selected={isActive}
              aria-controls="ranking-podium"
              id={`period-tab-${id}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActivePeriod(id)}
              onKeyDown={(e) => handlePeriodKeyDown(e, idx)}
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

      <p className="mt-3 text-center text-xs" style={{ color: 'var(--bone-mute)' }}>
        {formatRange(activePeriod)}
      </p>

      <div
        id="ranking-podium"
        role="tabpanel"
        aria-labelledby={`period-tab-${activePeriod}`}
        aria-live="polite"
        className="pt-8"
      >
        <Podium entries={entries} category={activeCategory} />
      </div>
    </div>
  )
}
