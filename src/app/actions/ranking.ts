'use server'

import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'

export type RankingPeriod = 'week' | 'biweek' | 'month'

export type RankingEntry = {
  rank: number
  userId: string
  displayName: string
  avatarUrl: string | null
  lessonsCompleted: number
  lastCompletedAt: string
}

const DAYS_BY_PERIOD: Record<RankingPeriod, number> = { week: 7, biweek: 15, month: 30 }

export async function getRankingByPeriod(period: RankingPeriod): Promise<RankingEntry[]> {
  await requireUser()

  const since = new Date(Date.now() - DAYS_BY_PERIOD[period] * 24 * 60 * 60 * 1000).toISOString()

  const { data: rows, error } = await supabaseAdmin
    .from('lesson_progress')
    .select('user_id, completed_at')
    .eq('completed', true)
    .gte('completed_at', since)
  if (error) throw new Error(error.message)
  if (!rows || rows.length === 0) return []

  const agg = new Map<string, { count: number; last: string }>()
  for (const r of rows) {
    if (!r.completed_at) continue
    const cur = agg.get(r.user_id) ?? { count: 0, last: r.completed_at }
    cur.count += 1
    if (r.completed_at > cur.last) cur.last = r.completed_at
    agg.set(r.user_id, cur)
  }

  const top = [...agg.entries()]
    .map(([userId, v]) => ({ userId, lessonsCompleted: v.count, lastCompletedAt: v.last }))
    .sort((a, b) =>
      b.lessonsCompleted - a.lessonsCompleted ||
      (b.lastCompletedAt > a.lastCompletedAt ? 1 : b.lastCompletedAt < a.lastCompletedAt ? -1 : 0)
    )
    .slice(0, 5)

  if (top.length === 0) return []

  const { data: profiles, error: pErr } = await supabaseAdmin
    .from('profiles')
    .select('id, name, avatar_url')
    .in('id', top.map((t) => t.userId))
  if (pErr) throw new Error(pErr.message)

  const profMap = new Map(profiles?.map((p) => [p.id, p]) ?? [])

  return top.map((t, idx) => {
    const p = profMap.get(t.userId)
    const firstName = (p?.name ?? '').trim().split(/\s+/)[0] || 'Aluno'
    return {
      rank: idx + 1,
      userId: t.userId,
      displayName: firstName,
      avatarUrl: p?.avatar_url ?? null,
      lessonsCompleted: t.lessonsCompleted,
      lastCompletedAt: t.lastCompletedAt,
    }
  })
}
