export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { getRankingByPeriod } from '@/app/actions/ranking'
import { RankingTabs } from '@/components/student/RankingTabs'

export const metadata: Metadata = { title: 'Ranking' }

export default async function RankingPage() {
  const [week, biweek, month] = await Promise.all([
    getRankingByPeriod('week'),
    getRankingByPeriod('biweek'),
    getRankingByPeriod('month'),
  ])

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
          Os alunos com mais aulas concluídas em cada período.
        </p>
      </div>

      <RankingTabs week={week} biweek={biweek} month={month} />
    </main>
  )
}
