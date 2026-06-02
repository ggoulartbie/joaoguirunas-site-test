'use client'

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts'

type DayRevenue = { date: string; amount: number }

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(cents / 100)
}

function formatDateShort(iso: string) {
  const [, month, day] = iso.split('-')
  return `${day}/${month}`
}

type TooltipPayload = { value: number }

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean
  payload?: TooltipPayload[]
  label?: string
}) {
  if (!active || !payload?.length) return null
  return (
    <div className="border border-[rgba(255,255,255,0.12)] bg-[var(--ink)] px-3 py-2">
      <p className="font-mono text-[10px] text-[var(--bone-mute)]">{label}</p>
      <p className="font-mono text-sm font-bold text-[var(--bone)]">{formatBRL(payload[0]?.value ?? 0)}</p>
    </div>
  )
}

export function RevenueChart({ data }: { data: DayRevenue[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center">
        <p className="font-mono text-xs text-[var(--bone-mute)]">Sem dados de receita</p>
      </div>
    )
  }

  const chartData = data.map((d) => ({ date: formatDateShort(d.date), amount: d.amount }))

  return (
    <ResponsiveContainer width="100%" height={160}>
      <AreaChart data={chartData} margin={{ top: 4, right: 0, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--ember)" stopOpacity={0.18} />
            <stop offset="95%" stopColor="var(--ember)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="date"
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: 'var(--bone-mute)' }}
          axisLine={false}
          tickLine={false}
          interval="preserveStartEnd"
        />
        <YAxis
          tickFormatter={(v: number) => `R$${Math.round(v / 100)}`}
          tick={{ fontFamily: 'monospace', fontSize: 9, fill: 'var(--bone-mute)' }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip content={<CustomTooltip />} />
        <Area
          type="monotone"
          dataKey="amount"
          stroke="var(--ember)"
          strokeWidth={1.5}
          fill="url(#revenueGradient)"
          dot={false}
          activeDot={{ r: 3, fill: 'var(--ember)', strokeWidth: 0 }}
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
