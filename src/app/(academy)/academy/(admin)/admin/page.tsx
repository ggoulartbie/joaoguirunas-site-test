import type { Metadata } from 'next'
import {
  DollarSign,
  Users,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Clock,
  BarChart3,
  BookOpen,
  Bell,
  Plus,
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

const MOCK_RECENT_ACTIVITY = [
  { id: '1', type: 'enrollment', user: 'Ana Souza', detail: 'Mentoria Maio 2026', time: '2min', status: 'ativo' },
  { id: '2', type: 'payment', user: 'Carlos Lima', detail: 'Pagamento recusado', time: '15min', status: 'erro' },
  { id: '3', type: 'comment', user: 'Bia Ferreira', detail: 'Comentário em Módulo 3', time: '1h', status: 'novo' },
  { id: '4', type: 'enrollment', user: 'Pedro Alves', detail: 'Online Padrão', time: '3h', status: 'ativo' },
  { id: '5', type: 'expiring', user: 'Mariana Costa', detail: 'Expira em 5 dias', time: '—', status: 'alerta' },
]

function formatBRL(cents: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(cents / 100)
}

type StatVariant = 'default' | 'warning' | 'danger' | 'positive'

type StatCardProps = {
  label: string
  value: string
  variation?: string
  variant?: StatVariant
  icon: React.ComponentType<{ className?: string }>
}

function StatCard({ label, value, variation, variant = 'default', icon: Icon }: StatCardProps) {
  const variationColor =
    variant === 'positive'
      ? 'text-emerald-400'
      : variant === 'danger'
        ? 'text-[var(--ember)]'
        : variant === 'warning'
          ? 'text-amber-400'
          : 'text-[var(--bone-mute)]'

  return (
    <div
      className="group relative flex flex-col gap-4 border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-5 transition-colors hover:border-[rgba(255,255,255,0.16)]"
      style={{ borderRadius: 0 }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          {label}
        </span>
        <Icon className="h-5 w-5 text-[var(--bone-mute)]" />
      </div>
      <span className="font-mono text-[32px] font-bold leading-none text-[var(--bone)]">
        {value}
      </span>
      {variation && (
        <span className={`font-mono text-[11px] uppercase tracking-wider ${variationColor}`}>
          {variation}
        </span>
      )}
    </div>
  )
}

const STATUS_STYLES: Record<string, string> = {
  ativo: 'border-emerald-400/40 text-emerald-400',
  erro: 'border-[var(--ember)]/40 text-[var(--ember)]',
  novo: 'border-[rgba(255,255,255,0.16)] text-[var(--bone-dim)]',
  alerta: 'border-amber-400/40 text-amber-400',
}

export default function AdminDashboardPage() {
  const m = MOCK_METRICS
  const totalActive = m.activeStudentsByCohort.reduce((s, c) => s + c.count, 0)

  return (
    <div className="mx-auto max-w-6xl space-y-10">

      {/* Header */}
      <div className="space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Painel Admin
        </span>
        <h1 className="font-serif text-4xl italic text-[var(--bone)]">
          Visão Geral
        </h1>
        <p className="font-mono text-[10px] text-[var(--bone-mute)]">
          Dados mockados — integração real após F1.8 + F2.3
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Receita Total"
          value={formatBRL(m.revenueTotal)}
          variation="Todas as vendas"
          icon={DollarSign}
        />
        <StatCard
          label="Receita do Mês"
          value={formatBRL(m.revenueMonth)}
          variation="+8.4% vs abril"
          variant="positive"
          icon={TrendingUp}
        />
        <StatCard
          label="Alunos Ativos"
          value={String(totalActive)}
          variation={`${m.activeStudentsByCohort.length} turmas`}
          icon={Users}
        />
        <StatCard
          label="Conclusão Média"
          value={`${m.avgCompletion}%`}
          variation="-2% vs mês anterior"
          variant="danger"
          icon={BarChart3}
        />
        <StatCard
          label="Comentários Novos"
          value={String(m.newComments + m.newThreads)}
          variation={`${m.newComments} comentários · ${m.newThreads} tópicos`}
          icon={MessageSquare}
        />
        <StatCard
          label="Pagamentos Recusados"
          value={String(m.declinedPayments24h)}
          variation="Últimas 24h"
          variant={m.declinedPayments24h > 0 ? 'danger' : 'default'}
          icon={AlertTriangle}
        />
        <StatCard
          label="Expirando em 7 dias"
          value={String(m.expiringIn7Days)}
          variation="Alunos para renovar"
          variant="warning"
          icon={Clock}
        />
        <StatCard
          label="Novos Tópicos"
          value={String(m.newThreads)}
          variation="Fórum esta semana"
          icon={BookOpen}
        />
      </div>

      {/* Main content: activity table + cohort breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Recent Activity Table */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
              Atividade Recente
            </span>
            <a
              href="/academy/admin/alunos"
              className="font-mono text-[10px] uppercase tracking-wider text-[var(--ember)] transition-opacity hover:opacity-70"
            >
              Ver tudo
            </a>
          </div>
          <div className="border border-[rgba(255,255,255,0.07)]" style={{ borderRadius: 0 }}>
            <table className="w-full">
              <thead>
                <tr className="border-b border-[rgba(255,255,255,0.16)] bg-[var(--ink-2)]">
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                    Aluno
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                    Detalhe
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                    Tempo
                  </th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {MOCK_RECENT_ACTIVITY.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[rgba(255,255,255,0.07)] transition-colors last:border-0 hover:bg-[rgba(14,14,17,0.5)]"
                  >
                    <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)]">{row.user}</td>
                    <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)]">{row.detail}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">{row.time}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${STATUS_STYLES[row.status] ?? 'border-[rgba(255,255,255,0.07)] text-[var(--bone-mute)]'}`}
                        style={{ borderRadius: 0 }}
                      >
                        {row.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cohort Breakdown */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
              Alunos por Turma
            </span>
            <a
              href="/academy/admin/turmas"
              className="font-mono text-[10px] uppercase tracking-wider text-[var(--ember)] transition-opacity hover:opacity-70"
            >
              Ver tudo
            </a>
          </div>
          <div className="border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-5" style={{ borderRadius: 0 }}>
            <div className="space-y-5">
              {m.activeStudentsByCohort.map((cohort) => {
                const pct = Math.round((cohort.count / totalActive) * 100)
                return (
                  <div key={cohort.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-[var(--bone-dim)]">{cohort.name}</span>
                      <span className="font-mono text-[11px] font-bold text-[var(--bone)]">
                        {cohort.count}
                      </span>
                    </div>
                    <div className="h-px w-full bg-[rgba(255,255,255,0.07)]">
                      <div
                        className="h-px bg-[var(--ember)]"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="font-mono text-[10px] text-[var(--bone-mute)]">{pct}% do total</span>
                  </div>
                )
              })}
            </div>
            <div className="mt-6 border-t border-[rgba(255,255,255,0.07)] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                  Total
                </span>
                <span className="font-mono text-xl font-bold text-[var(--bone)]">{totalActive}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Ações Rápidas
          </span>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: 'Novo Aluno', icon: Plus, href: '/academy/admin/alunos/novo' },
            { label: 'Nova Turma', icon: BookOpen, href: '/academy/admin/turmas/nova' },
            { label: 'Enviar Aviso', icon: Bell, href: '/academy/admin/comunicados/novo' },
            { label: 'Ver Relatório', icon: BarChart3, href: '/academy/admin/relatorios' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col gap-3 border border-[rgba(255,255,255,0.07)] bg-[var(--ink)] p-4 transition-colors hover:border-[var(--ember)]"
              style={{ borderRadius: 0 }}
            >
              <action.icon className="h-5 w-5 text-[var(--ember)]" />
              <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--bone-dim)]">
                {action.label}
              </span>
            </a>
          ))}
        </div>
      </div>

    </div>
  )
}
