'use server'

import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'

import { getCycleRange } from '@/lib/ranking-cycle'

export type RankingPeriod = 'week' | 'biweek' | 'month'

export type RankingEntry = {
  rank: number
  userId: string
  displayName: string
  avatarUrl: string | null
  lessonsCompleted: number
  lastCompletedAt: string
}

// ─── internal helpers ──────────────────────────────────────────────────────

async function resolvePeriodMs(period: RankingPeriod): Promise<string> {
  const { startMs } = getCycleRange(period)
  return new Date(startMs).toISOString()
}

async function resolveProfiles(userIds: string[]) {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('id, name, avatar_url')
    .in('id', userIds)
  if (error) throw new Error(error.message)
  return new Map((data ?? []).map((p) => [p.id, p]))
}

function buildEntries(
  top: { userId: string; score: number; lastAt: string }[],
  profMap: Map<string, { name: string | null; avatar_url: string | null }>,
): RankingEntry[] {
  return top.map((t, idx) => {
    const p = profMap.get(t.userId)
    const firstName = (p?.name ?? '').trim().split(/\s+/)[0] || 'Aluno'
    return {
      rank: idx + 1,
      userId: t.userId,
      displayName: firstName,
      avatarUrl: p?.avatar_url ?? null,
      lessonsCompleted: t.score,
      lastCompletedAt: t.lastAt,
    }
  })
}

async function getLessonScores(since: string): Promise<Map<string, { count: number; last: string }>> {
  const { data: rows, error } = await supabaseAdmin
    .from('lesson_progress')
    .select('user_id, completed_at')
    .eq('completed', true)
    .gte('completed_at', since)
  if (error) throw new Error(error.message)

  const agg = new Map<string, { count: number; last: string }>()
  for (const r of rows ?? []) {
    if (!r.completed_at) continue
    const cur = agg.get(r.user_id) ?? { count: 0, last: r.completed_at }
    cur.count += 1
    if (r.completed_at > cur.last) cur.last = r.completed_at
    agg.set(r.user_id, cur)
  }
  return agg
}

async function getCommentScores(since: string): Promise<Map<string, { count: number; last: string }>> {
  const [commentsRes, threadsRes, repliesRes] = await Promise.all([
    supabaseAdmin
      .from('comments')
      .select('author_id, created_at')
      .is('deleted_at', null)
      .gte('created_at', since),
    supabaseAdmin
      .from('forum_threads')
      .select('author_id, created_at')
      .is('deleted_at', null)
      .gte('created_at', since),
    supabaseAdmin
      .from('forum_replies')
      .select('author_id, created_at')
      .is('deleted_at', null)
      .gte('created_at', since),
  ])

  if (commentsRes.error) throw new Error(commentsRes.error.message)
  if (threadsRes.error) throw new Error(threadsRes.error.message)
  if (repliesRes.error) throw new Error(repliesRes.error.message)

  const agg = new Map<string, { count: number; last: string }>()

  const all = [
    ...(commentsRes.data ?? []).map((r) => ({ userId: r.author_id, at: r.created_at })),
    ...(threadsRes.data ?? []).map((r) => ({ userId: r.author_id, at: r.created_at })),
    ...(repliesRes.data ?? []).map((r) => ({ userId: r.author_id, at: r.created_at })),
  ]

  for (const r of all) {
    if (!r.at || !r.userId) continue
    const cur = agg.get(r.userId) ?? { count: 0, last: r.at }
    cur.count += 1
    if (r.at > cur.last) cur.last = r.at
    agg.set(r.userId, cur)
  }
  return agg
}

function topFiveFromMap(agg: Map<string, { count: number; last: string }>) {
  return [...agg.entries()]
    .map(([userId, v]) => ({ userId, score: v.count, lastAt: v.last }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.lastAt > a.lastAt ? 1 : b.lastAt < a.lastAt ? -1 : 0),
    )
    .slice(0, 5)
}

// ─── public server actions ─────────────────────────────────────────────────

export async function getRankingByPeriod(period: RankingPeriod): Promise<RankingEntry[]> {
  await requireUser()
  const since = await resolvePeriodMs(period)
  const agg = await getLessonScores(since)
  const top = topFiveFromMap(agg)
  if (top.length === 0) return []
  const profMap = await resolveProfiles(top.map((t) => t.userId))
  return buildEntries(top, profMap)
}

export async function getRankingByComments(period: RankingPeriod): Promise<RankingEntry[]> {
  await requireUser()
  const since = await resolvePeriodMs(period)
  const agg = await getCommentScores(since)
  const top = topFiveFromMap(agg)
  if (top.length === 0) return []
  const profMap = await resolveProfiles(top.map((t) => t.userId))
  return buildEntries(top, profMap)
}

export async function getRankingGeneral(period: RankingPeriod): Promise<RankingEntry[]> {
  await requireUser()
  const since = await resolvePeriodMs(period)

  const [lessons, comments] = await Promise.all([
    getLessonScores(since),
    getCommentScores(since),
  ])

  const combined = new Map<string, { score: number; last: string }>()

  for (const [userId, v] of lessons) {
    const cur = combined.get(userId) ?? { score: 0, last: v.last }
    cur.score += v.count
    if (v.last > cur.last) cur.last = v.last
    combined.set(userId, cur)
  }

  for (const [userId, v] of comments) {
    const cur = combined.get(userId) ?? { score: 0, last: v.last }
    cur.score += v.count
    if (v.last > cur.last) cur.last = v.last
    combined.set(userId, cur)
  }

  const top = [...combined.entries()]
    .map(([userId, v]) => ({ userId, score: v.score, lastAt: v.last }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        (b.lastAt > a.lastAt ? 1 : b.lastAt < a.lastAt ? -1 : 0),
    )
    .slice(0, 5)

  if (top.length === 0) return []
  const profMap = await resolveProfiles(top.map((t) => t.userId))
  return buildEntries(top, profMap)
}
