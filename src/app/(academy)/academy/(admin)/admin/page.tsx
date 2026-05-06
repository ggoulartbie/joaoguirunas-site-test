import type { Metadata } from 'next'
import {
  DollarSign,
  Users,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Clock,
} from 'lucide-react'

export const metadata: Metadata = { title: 'Dashboard' }

const MOCK_METRICS = {
  revenueTotal: 187400_00,
  revenueMonth: 12300_00,
  activeStudentsByCohort: [
    { name: 'Mentoria Maio 2026', count: 18 },
    { name: 'Online Padrão', count: 134 },
    { name: 'Mentoria Março 2026', count: 22 },
  ],
  avgCompletion: 64,
  newComments: 12,
  newThreads: 3,
  declinedPayments24h: 2,
  expiringIn7Days: 7,
}

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

type AccentVariant = 'default' | 'warning' | 'danger'

type StatCardProps = {
  label: string
  value: string
  sub?: string
  icon: React.ComponentType<{ className?: string }>
  accent?: AccentVariant
}

function StatCard({ label, value, sub, icon: Icon, accent = 'default' }: StatCardProps) {
  const accentColors: Record<AccentVariant, string> = {
    default: 'text-[#FF3A0E]',
    warning: 'text-amber-400',
    danger: 'text-red-400',
  }
  const accentColor = accentColors[accent]

  return (
    <div className="flex flex-col gap-3 border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-white/40">
          {label}
        </span>
        <Icon className={`h-4 w-4 ${accentColor}`} />
      </div>
      <span className="font-mono text-2xl font-semibold text-white">{value}</span>
      {sub && (
        <span className="font-mono text-[10px] uppercase tracking-wider text-white/30">
          {sub}
        </span>
      )}
    </div>
  )
}

export default function AdminDashboardPage() {
  const m = MOCK_METRICS
  const totalActive = m.activeStudentsByCohort.reduce((s, c) => s + c.count, 0)

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-mono text-lg font-semibold uppercase tracking-widest text-white/90">
          Dashboard
        </h1>
        <p className="mt-1 font-mono text-xs text-white/30">
          Dados mockados — integração real após F1.8 + F2.3
        </p>
      </div>

      {/* Primary metrics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <StatCard
          label="Receita Total"
          value={formatBRL(m.revenueTotal)}
          sub="Todas as vendas"
          icon={DollarSign}
        />
        <StatCard
          label="Receita do Mês"
          value={formatBRL(m.revenueMonth)}
          sub="Maio 2026"
          icon={TrendingUp}
        />
        <StatCard
          label="Alunos Ativos"
          value={String(totalActive)}
          sub={`Em ${m.activeStudentsByCohort.length} turmas`}
          icon={Users}
        />
        <StatCard
          label="Conclusão Média"
          value={`${m.avgCompletion}%`}
          sub="Média de todas as turmas"
          icon={TrendingUp}
        />
        <StatCard
          label="Comentários Novos"
          value={String(m.newComments + m.newThreads)}
          sub={`${m.newComments} comentários · ${m.newThreads} tópicos`}
          icon={MessageSquare}
        />
        <StatCard
          label="Pagamentos Recusados"
          value={String(m.declinedPayments24h)}
          sub="Últimas 24h"
          icon={AlertTriangle}
          accent={m.declinedPayments24h > 0 ? 'danger' : 'default'}
        />
      </div>

      {/* Expiring memberships alert */}
      <div className="border border-amber-400/20 bg-amber-400/5 p-5">
        <div className="flex items-start gap-3">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-400" />
          <div>
            <p className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              Matrículas expirando em 7 dias
            </p>
            <p className="mt-1 font-mono text-2xl font-semibold text-white">
              {m.expiringIn7Days}
            </p>
            <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-white/30">
              Alunos que precisam renovar em breve
            </p>
          </div>
        </div>
      </div>

      {/* Active students by cohort */}
      <div className="border border-white/10 bg-white/[0.03] p-5">
        <h2 className="mb-4 font-mono text-[10px] uppercase tracking-widest text-white/40">
          Alunos Ativos por Turma
        </h2>
        <div className="space-y-3">
          {m.activeStudentsByCohort.map((cohort) => {
            const pct = Math.round((cohort.count / totalActive) * 100)
            return (
              <div key={cohort.name} className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-white/70">{cohort.name}</span>
                  <span className="font-mono text-xs text-white/40">{cohort.count}</span>
                </div>
                <div className="h-1 w-full bg-white/10">
                  <div
                    className="h-1 bg-[#FF3A0E]"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
