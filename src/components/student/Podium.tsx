import Image from 'next/image'
import { Trophy, Crown } from 'lucide-react'
import type { RankingEntry } from '@/app/actions/ranking'

type Props = {
  entries: RankingEntry[]
}

type RankStyle = {
  pedestal: string
  border: string
  bg: string
}

const RANK_STYLES: Record<1 | 2 | 3 | 4 | 5, RankStyle> = {
  1: { pedestal: '#FFB800', border: 'rgba(255,184,0,0.5)', bg: 'rgba(255,184,0,0.08)' },
  2: { pedestal: '#9CA3AF', border: 'rgba(156,163,175,0.4)', bg: 'rgba(156,163,175,0.06)' },
  3: { pedestal: '#B87333', border: 'rgba(184,115,51,0.4)', bg: 'rgba(184,115,51,0.06)' },
  4: { pedestal: 'rgba(184,115,51,0.35)', border: 'rgba(184,115,51,0.2)', bg: 'rgba(184,115,51,0.03)' },
  5: { pedestal: 'rgba(150,150,150,0.18)', border: 'rgba(150,150,150,0.12)', bg: 'rgba(150,150,150,0.02)' },
}

const PEDESTAL_H: Record<1 | 2 | 3 | 4 | 5, number> = { 1: 80, 2: 56, 3: 40, 4: 26, 5: 14 }

function Avatar({ entry, size }: { entry: RankingEntry; size: number }) {
  const initial = entry.displayName[0]?.toUpperCase() ?? 'A'
  const fontSize = size === 72 ? 26 : 20
  if (entry.avatarUrl) {
    return (
      <Image
        src={entry.avatarUrl}
        alt={entry.displayName}
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }
  return (
    <div
      className="flex items-center justify-center rounded-full"
      style={{
        width: size,
        height: size,
        background: 'rgba(255,58,14,0.15)',
        color: 'var(--ember)',
        fontFamily: 'var(--type-mono)',
        fontSize,
        fontWeight: 700,
      }}
      aria-hidden="true"
    >
      {initial}
    </div>
  )
}

function PodiumSlot({ entry }: { entry: RankingEntry }) {
  const rank = entry.rank as 1 | 2 | 3 | 4 | 5
  const style = RANK_STYLES[rank]
  const pedestalH = PEDESTAL_H[rank]
  const avatarSize = rank === 1 ? 72 : rank === 2 || rank === 3 ? 56 : 40
  const isFirst = rank === 1

  return (
    <div className="flex flex-col items-center">
      {/* Card */}
      <div
        className="flex flex-col items-center gap-2 border p-4 text-center"
        style={{
          background: style.bg,
          borderColor: style.border,
          minWidth: isFirst ? 140 : rank <= 3 ? 120 : 96,
        }}
      >
        {isFirst ? (
          <Crown className="h-5 w-5" style={{ color: '#FFB800' }} aria-hidden="true" />
        ) : null}
        <Avatar entry={entry} size={avatarSize} />
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

      {/* Pedestal */}
      <div
        style={{
          height: pedestalH,
          width: '100%',
          background: style.pedestal,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: 20,
            fontWeight: 700,
            color: '#fff',
          }}
        >
          {rank}º
        </span>
      </div>
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

  const first  = entries.find((e) => e.rank === 1)
  const second = entries.find((e) => e.rank === 2)
  const third  = entries.find((e) => e.rank === 3)
  const fourth = entries.find((e) => e.rank === 4)
  const fifth  = entries.find((e) => e.rank === 5)

  return (
    <ol className="list-none" aria-label="Pódio de alunos">
      {/* Ordem olímpica: 2º | 1º | 3º | 4º | 5º, alinhados pela base do pedestal */}
      <li className="flex items-end justify-center gap-2">
        {second && <PodiumSlot entry={second} />}
        {first  && <PodiumSlot entry={first}  />}
        {third  && <PodiumSlot entry={third}  />}
        {fourth && <PodiumSlot entry={fourth} />}
        {fifth  && <PodiumSlot entry={fifth}  />}
      </li>
    </ol>
  )
}
