import Image from 'next/image'
import { Trophy } from 'lucide-react'
import type { RankingEntry } from '@/app/actions/ranking'

type Props = {
  entries: RankingEntry[]
}

function Avatar({ entry }: { entry: RankingEntry }) {
  const initial = entry.displayName[0]?.toUpperCase() ?? 'A'
  if (entry.avatarUrl) {
    return (
      <Image
        src={entry.avatarUrl}
        alt={entry.displayName}
        width={56}
        height={56}
        className="rounded-full object-cover"
        style={{ width: 56, height: 56 }}
      />
    )
  }
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: 56,
        height: 56,
        background: 'rgba(255,58,14,0.15)',
        color: 'var(--ember)',
        fontFamily: 'var(--type-mono)',
        fontSize: '20px',
        fontWeight: 700,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

function PodiumCard({
  entry,
  size = 'md',
}: {
  entry: RankingEntry
  size?: 'lg' | 'md' | 'sm'
}) {
  const isFirst = entry.rank === 1
  const cardPad = size === 'lg' ? 'p-5' : size === 'md' ? 'p-4' : 'p-3'

  return (
    <div
      className={`flex flex-col items-center gap-2 border ${cardPad} text-center`}
      style={{
        background: isFirst ? 'rgba(255,58,14,0.06)' : 'var(--ink)',
        borderColor: isFirst ? 'rgba(255,58,14,0.3)' : 'var(--hairline)',
        minWidth: size === 'lg' ? 140 : size === 'md' ? 120 : 100,
      }}
    >
      {isFirst && (
        <Trophy
          className="h-4 w-4"
          style={{ color: 'var(--ember)' }}
          aria-hidden="true"
        />
      )}
      <Avatar entry={entry} />
      <span
        className="font-mono text-[10px] uppercase tracking-widest"
        style={{ color: 'var(--ember)' }}
      >
        {entry.rank}º
      </span>
      <span
        className="font-[family-name:var(--type-sans)] text-[13px] font-medium leading-tight"
        style={{ color: 'var(--bone)' }}
      >
        {entry.displayName}
      </span>
      <span className="font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
        {entry.lessonsCompleted} {entry.lessonsCompleted === 1 ? 'aula' : 'aulas'}
      </span>
    </div>
  )
}

export function Podium({ entries }: Props) {
  if (entries.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center border py-16 text-center"
        style={{ borderColor: 'var(--hairline)', background: 'var(--ink)' }}
      >
        <Trophy className="h-10 w-10 opacity-20" style={{ color: 'var(--bone-mute)' }} />
        <p
          className="mt-4 max-w-xs font-[family-name:var(--type-sans)] text-[14px]"
          style={{ color: 'var(--bone-mute)' }}
        >
          Ainda não há ranking neste período — comece a concluir aulas para aparecer aqui.
        </p>
      </div>
    )
  }

  const first = entries.find((e) => e.rank === 1)
  const second = entries.find((e) => e.rank === 2)
  const third = entries.find((e) => e.rank === 3)
  const rest = entries.filter((e) => e.rank >= 4)

  return (
    <ol className="list-none" aria-label="Pódio de alunos">
      {/* Top 3 — desktop horizontal, mobile empilhado */}
      <li className="flex flex-col items-center gap-4 sm:flex-row sm:items-end sm:justify-center sm:gap-3">
        {second && (
          <div className="order-2 sm:order-1">
            <PodiumCard entry={second} size="md" />
          </div>
        )}
        {first && (
          <div className="order-1 sm:order-2">
            <PodiumCard entry={first} size="lg" />
          </div>
        )}
        {third && (
          <div className="order-3">
            <PodiumCard entry={third} size="md" />
          </div>
        )}
      </li>

      {/* 4º e 5º lugar */}
      {rest.length > 0 && (
        <li className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-center sm:gap-3">
          {rest.map((entry) => (
            <PodiumCard key={entry.userId} entry={entry} size="sm" />
          ))}
        </li>
      )}
    </ol>
  )
}
