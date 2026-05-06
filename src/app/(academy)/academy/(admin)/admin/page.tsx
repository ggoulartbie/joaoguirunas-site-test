import type { Metadata } from 'next'
import { unstable_cache } from 'next/cache'
import {
  DollarSign,
  Users,
  TrendingUp,
  MessageSquare,
  AlertTriangle,
  Clock,
  BarChart3,
  BookOpen,
  Plus,
  Bell,
} from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { RevenueChart } from './RevenueChart'

export const metadata: Metadata = { title: 'Dashboard' }

// ── Queries (cached 5 min) ────────────────────────────────────────────────────

const getMetrics = unstable_cache(
  async () => {
    const now = new Date()
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1).toISOString()
    const cutoff24h = new Date(now.getTime() - 24 * 60 * 60 * 1000).toISOString()
    const cutoff7days = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString()

    const [
      { data: allPayments },
      { data: monthPayments },
      { data: activeMembers },
      { data: declinedPayments },
      { data: expiringMembers },
      { data: newComments },
      { data: newThreads },
    ] = await Promise.all([
      supabaseAdmin
        .from('payments')
        .select('amount_cents')
        .eq('status', 'APPROVED'),
      supabaseAdmin
        .from('payments')
        .select('amount_cents')
        .eq('status', 'APPROVED')
        .gte('paid_at', startOfMonth),
      supabaseAdmin
        .from('cohort_members')
        .select('cohort_id, cohorts!inner(name)')
        .eq('status', 'ACTIVE'),
      supabaseAdmin
        .from('payments')
        .select('id')
        .eq('status', 'DECLINED')
        .gte('created_at', cutoff24h),
      supabaseAdmin
        .from('cohort_members')
        .select('id, expires_at, profiles!inner(name), cohorts!inner(name)')
        .eq('status', 'ACTIVE')
        .not('expires_at', 'is', null)
        .lte('expires_at', cutoff7days)
        .gte('expires_at', now.toISOString())
        .order('expires_at', { ascending: true })
        .limit(50),
      supabaseAdmin
        .from('comments')
        .select('id')
        .is('deleted_at', null)
        .gte('created_at', cutoff24h),
      supabaseAdmin
        .from('forum_threads')
        .select('id')
        .is('deleted_at', null)
        .gte('created_at', cutoff24h),
    ])

    const revenueTotal = (allPayments ?? []).reduce((s, p) => s + p.amount_cents, 0)
    const revenueMonth = (monthPayments ?? []).reduce((s, p) => s + p.amount_cents, 0)

    const cohortCounts: Record<string, { name: string; count: number }> = {}
    for (const m of activeMembers ?? []) {
      const cohort = m.cohorts as { name: string } | null
      if (!cohort) continue
      const key = m.cohort_id
      if (!cohortCounts[key]) cohortCounts[key] = { name: cohort.name, count: 0 }
      cohortCounts[key].count++
    }
    const activeStudentsByCohort = Object.values(cohortCounts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 5)
    const totalActive = activeStudentsByCohort.reduce((s, c) => s + c.count, 0)

    return {
      revenueTotal,
      revenueMonth,
      activeStudentsByCohort,
      totalActive,
      declinedPayments24h: (declinedPayments ?? []).length,
      expiringIn7Days: (expiringMembers ?? []).length,
      expiringMembers: (expiringMembers ?? []) as Array<{
        id: string
        expires_at: string | null
        profiles: { name: string } | null
        cohorts: { name: string } | null
      }>,
      newComments: (newComments ?? []).length,
      newThreads: (newThreads ?? []).length,
    }
  },
  ['admin-dashboard-metrics'],
  { revalidate: 300 }
)

const getRevenueChart = unstable_cache(
  async () => {
    const since = new Date()
    since.setDate(since.getDate() - 29)
    since.setHours(0, 0, 0, 0)

    const { data: payments } = await supabaseAdmin
      .from('payments')
      .select('amount_cents, paid_at')
      .eq('status', 'APPROVED')
      .gte('paid_at', since.toISOString())
      .order('paid_at', { ascending: true })

    const buckets: Record<string, number> = {}
    for (let i = 0; i < 30; i++) {
      const d = new Date(since)
      d.setDate(d.getDate() + i)
      buckets[d.toISOString().slice(0, 10)] = 0
    }

    for (const p of payments ?? []) {
      if (!p.paid_at) continue
      const day = p.paid_at.slice(0, 10)
      if (day in buckets) buckets[day] = (buckets[day] ?? 0) + p.amount_cents
    }

    return Object.entries(buckets)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, amount]) => ({ date, amount }))
  },
  ['admin-dashboard-revenue-chart'],
  { revalidate: 300 }
)

// ── UI Components ─────────────────────────────────────────────────────────────

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
      className="group relative flex flex-col gap-4 border border-[var(--hairline)] bg-[var(--ink)] p-5 transition-colors hover:border-[var(--hairline-strong)]"
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

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function AdminDashboardPage() {
  const [metrics, chartData] = await Promise.all([getMetrics(), getRevenueChart()])

  return (
    <div className="mx-auto max-w-6xl space-y-10">

      {/* Header */}
      <div className="space-y-1">
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Painel Admin
        </span>
        <h1 className="font-[family-name:var(--type-display)] text-4xl italic font-light text-[var(--bone)]">
          Visão Geral
        </h1>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Receita Total"
          value={formatBRL(metrics.revenueTotal)}
          variation="Todos os pagamentos aprovados"
          icon={DollarSign}
        />
        <StatCard
          label="Receita do Mês"
          value={formatBRL(metrics.revenueMonth)}
          variation="Mês corrente"
          variant={metrics.revenueMonth > 0 ? 'positive' : 'default'}
          icon={TrendingUp}
        />
        <StatCard
          label="Alunos Ativos"
          value={String(metrics.totalActive)}
          variation={`${metrics.activeStudentsByCohort.length} turma${metrics.activeStudentsByCohort.length !== 1 ? 's' : ''}`}
          icon={Users}
        />
        <StatCard
          label="Moderação (24h)"
          value={String(metrics.newComments + metrics.newThreads)}
          variation={`${metrics.newComments} comentários · ${metrics.newThreads} tópicos`}
          variant={metrics.newComments + metrics.newThreads > 0 ? 'warning' : 'default'}
          icon={MessageSquare}
        />
        <StatCard
          label="Pagamentos Recusados"
          value={String(metrics.declinedPayments24h)}
          variation="Últimas 24h"
          variant={metrics.declinedPayments24h > 0 ? 'danger' : 'default'}
          icon={AlertTriangle}
        />
        <StatCard
          label="Expirando em 7 dias"
          value={String(metrics.expiringIn7Days)}
          variation="Matrículas para renovar"
          variant={metrics.expiringIn7Days > 0 ? 'warning' : 'default'}
          icon={Clock}
        />
        <StatCard
          label="Tópicos no Fórum"
          value={String(metrics.newThreads)}
          variation="Novos (24h)"
          icon={BookOpen}
        />
        <StatCard
          label="Comentários"
          value={String(metrics.newComments)}
          variation="Novos (24h)"
          icon={BarChart3}
        />
      </div>

      {/* Revenue Chart */}
      <div>
        <div className="mb-3">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Receita — últimos 30 dias
          </span>
        </div>
        <div className="border border-[var(--hairline)] bg-[var(--ink)] px-4 pt-4 pb-2" style={{ borderRadius: 0 }}>
          <RevenueChart data={chartData} />
        </div>
      </div>

      {/* Expiring enrollments + cohort breakdown */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

        {/* Expiring table */}
        <div className="lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
              Matrículas expirando nos próximos 7 dias
            </span>
            <a
              href="/academy/admin/usuarios"
              className="font-mono text-[10px] uppercase tracking-wider text-[var(--ember)] transition-opacity hover:opacity-70"
            >
              Ver alunos
            </a>
          </div>
          <div className="border border-[var(--hairline)]" style={{ borderRadius: 0 }}>
            {metrics.expiringMembers.length === 0 ? (
              <div className="px-4 py-8 text-center">
                <p className="font-mono text-xs text-[var(--bone-mute)]">Nenhuma matrícula expirando</p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--hairline-strong)] bg-[var(--ink-2)]">
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Aluno</th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Turma</th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Expira em</th>
                  </tr>
                </thead>
                <tbody>
                  {metrics.expiringMembers.map((m) => (
                    <tr
                      key={m.id}
                      className="border-b border-[var(--hairline)] last:border-0 hover:bg-[rgba(14,14,17,0.5)]"
                    >
                      <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)]">
                        {m.profiles?.name ?? '—'}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">
                        {m.cohorts?.name ?? '—'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-[11px] text-amber-400">
                          {m.expires_at
                            ? new Date(m.expires_at).toLocaleDateString('pt-BR')
                            : '—'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
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
          <div className="border border-[var(--hairline)] bg-[var(--ink)] p-5" style={{ borderRadius: 0 }}>
            {metrics.activeStudentsByCohort.length === 0 ? (
              <p className="font-mono text-xs text-[var(--bone-mute)]">Nenhum aluno ativo</p>
            ) : (
              <div className="space-y-5">
                {metrics.activeStudentsByCohort.map((cohort) => {
                  const pct = metrics.totalActive > 0
                    ? Math.round((cohort.count / metrics.totalActive) * 100)
                    : 0
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
            )}
            <div className="mt-6 border-t border-[var(--hairline)] pt-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Total</span>
                <span className="font-mono text-xl font-bold text-[var(--bone)]">{metrics.totalActive}</span>
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
            { label: 'Nova Turma', icon: BookOpen, href: '/academy/admin/turmas/nova' },
            { label: 'Novo Curso', icon: Plus, href: '/academy/admin/cursos/novo' },
            { label: 'Moderação', icon: Bell, href: '/academy/admin/moderacao' },
            { label: 'Pagamentos', icon: BarChart3, href: '/academy/admin/pagamentos' },
          ].map((action) => (
            <a
              key={action.label}
              href={action.href}
              className="flex flex-col gap-3 border border-[var(--hairline)] bg-[var(--ink)] p-4 transition-colors hover:border-[var(--ember)]"
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
