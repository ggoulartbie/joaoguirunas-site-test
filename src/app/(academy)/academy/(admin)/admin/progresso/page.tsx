import type { Metadata } from 'next'
import Link from 'next/link'
import { requireAdmin } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const metadata: Metadata = { title: 'Progresso dos Alunos' }

export default async function AdminProgressoPage() {
  await requireAdmin()

  const [{ data: profiles }, { data: progressAgg }] = await Promise.all([
    supabaseAdmin
      .from('profiles')
      .select('id, name, avatar_url, role, created_at')
      .eq('role', 'STUDENT')
      .order('created_at', { ascending: false }),

    supabaseAdmin
      .from('lesson_progress')
      .select('user_id, completed'),
  ])

  const completedByUser: Record<string, number> = {}
  const totalByUser: Record<string, number> = {}
  for (const row of progressAgg ?? []) {
    totalByUser[row.user_id] = (totalByUser[row.user_id] ?? 0) + 1
    if (row.completed) completedByUser[row.user_id] = (completedByUser[row.user_id] ?? 0) + 1
  }

  const { data: authList } = await supabaseAdmin.auth.admin.listUsers({ perPage: 1000 })
  const emailMap: Record<string, string> = {}
  for (const u of authList?.users ?? []) {
    if (u.email) emailMap[u.id] = u.email
  }

  const students = (profiles ?? []).map((p) => ({
    ...p,
    email: emailMap[p.id] ?? '—',
    completedLessons: completedByUser[p.id] ?? 0,
    totalLessons: totalByUser[p.id] ?? 0,
  }))

  return (
    <div className="space-y-6">
      <div className="border-b border-[var(--hairline)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Admin / Progresso</p>
        <h1 className="mt-1 font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">
          Progresso dos Alunos
        </h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          {students.length} aluno{students.length !== 1 ? 's' : ''} encontrado{students.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="border border-[var(--hairline)]">
        {students.length === 0 ? (
          <p className="py-8 text-center font-mono text-xs text-[var(--bone-mute)]">Nenhum aluno encontrado</p>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b border-[var(--hairline-strong)] bg-[var(--ink-2)]">
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Aluno</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Email</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Aulas concluídas</th>
                <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]"></th>
              </tr>
            </thead>
            <tbody>
              {students.map((s) => {
                const pct = s.totalLessons > 0 ? Math.round((s.completedLessons / s.totalLessons) * 100) : 0
                return (
                  <tr key={s.id} className="border-b border-[rgba(255,255,255,0.07)] last:border-0 hover:bg-[rgba(14,14,17,0.5)]">
                    <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)]">{s.name}</td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">{s.email}</td>
                    <td className="px-4 py-3">
                      <span className="font-mono text-[11px] text-[var(--bone-dim)]">
                        {s.completedLessons}/{s.totalLessons}
                      </span>
                      <span className="ml-2 font-mono text-[10px] text-[var(--bone-mute)]">({pct}%)</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/academy/admin/progresso/${s.id}`}
                        className="font-mono text-[10px] uppercase tracking-wider text-[var(--ember)] transition-opacity hover:opacity-70"
                      >
                        Ver detalhe
                      </Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}
