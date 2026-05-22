export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getRankingByPeriod, getRankingByComments, getRankingGeneral } from '@/app/actions/ranking'
import type { RankingEntry } from '@/app/actions/ranking'
import { RankingTabs } from '@/components/student/RankingTabs'

export const metadata: Metadata = { title: 'Ranking' }

const EMPTY: RankingEntry[] = []

function settled(r: PromiseSettledResult<RankingEntry[]>): RankingEntry[] {
  return r.status === 'fulfilled' ? r.value : EMPTY
}

export default async function RankingPage() {
  const results = await Promise.allSettled([
    getRankingByPeriod('week'),
    getRankingByPeriod('biweek'),
    getRankingByPeriod('month'),
    getRankingByComments('week'),
    getRankingByComments('biweek'),
    getRankingByComments('month'),
    getRankingGeneral('week'),
    getRankingGeneral('biweek'),
    getRankingGeneral('month'),
  ])

  const [lw, lb, lm, cw, cb, cm, gw, gb, gm] = results.map(settled) as [
    RankingEntry[], RankingEntry[], RankingEntry[],
    RankingEntry[], RankingEntry[], RankingEntry[],
    RankingEntry[], RankingEntry[], RankingEntry[],
  ]

  return (
    <main id="main-content" className="mx-auto max-w-4xl space-y-8">
      <div>
        <p
          className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em]"
          style={{ color: 'var(--ember)' }}
        >
          Ranking
        </p>
        <h1
          className="font-[family-name:var(--type-display)] italic"
          style={{ fontSize: '36px', lineHeight: 1.1, color: 'var(--bone)' }}
        >
          Top alunos
        </h1>
        <p
          className="mt-2 font-[family-name:var(--type-sans)] text-[14px]"
          style={{ color: 'var(--bone-mute)' }}
        >
          Os alunos mais ativos em cada período — por aulas concluídas, participação ou combinado.
        </p>
      </div>

      <RankingTabs
        lessons={{ week: lw, biweek: lb, month: lm }}
        comments={{ week: cw, biweek: cb, month: cm }}
        general={{ week: gw, biweek: gb, month: gm }}
      />
    </main>
  )
}
