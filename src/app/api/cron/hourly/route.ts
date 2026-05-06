import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendLiveSessionReminderEmail } from '@/lib/email/send'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = { liveReminders: 0, errors: [] as string[] }

  // Sessions starting in ~1h (window: 50–70 min from now) not yet reminded
  const now = new Date()
  const windowStart = new Date(now.getTime() + 50 * 60 * 1000).toISOString()
  const windowEnd = new Date(now.getTime() + 70 * 60 * 1000).toISOString()

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const liveSessionsTable = supabaseAdmin.from('live_sessions') as any

  try {
    const { data: sessions } = await liveSessionsTable
      .select('id, title, scheduled_at, duration_minutes, meeting_url, cohort_id')
      .gte('scheduled_at', windowStart)
      .lte('scheduled_at', windowEnd)
      .is('reminder_1h_sent_at', null)

    for (const session of sessions ?? []) {
      try {
        const { data: members } = await supabaseAdmin
          .from('cohort_members')
          .select('user_id')
          .eq('cohort_id', session.cohort_id)
          .eq('status', 'ACTIVE')

        const { data: cohort } = await supabaseAdmin
          .from('cohorts')
          .select('name')
          .eq('id', session.cohort_id)
          .single()

        const cohortName = cohort?.name ?? 'sua turma'

        for (const member of members ?? []) {
          try {
            const profile = await getUserProfile(member.user_id)
            if (!profile?.email) continue

            await sendLiveSessionReminderEmail(
              profile.email,
              profile.name,
              cohortName,
              session.title,
              session.scheduled_at,
              session.duration_minutes,
              session.meeting_url,
            )
            results.liveReminders++
          } catch (err) {
            results.errors.push(`member-${member.user_id}: ${err instanceof Error ? err.message : String(err)}`)
          }
        }

        // Mark as reminded regardless of per-member failures — prevents duplicate blasts
        await liveSessionsTable
          .update({ reminder_1h_sent_at: new Date().toISOString() })
          .eq('id', session.id)
      } catch (err) {
        Sentry.captureException(err, { tags: { cron_section: 'hourly_live_reminder', session_id: session.id } })
        results.errors.push(`session-${session.id}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  } catch (err) {
    Sentry.captureException(err, { tags: { cron_section: 'hourly_live_sessions_query' } })
    results.errors.push(`query: ${err instanceof Error ? err.message : String(err)}`)
  }

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    ...results,
  })
}

async function getUserProfile(userId: string): Promise<{ name: string; email: string } | null> {
  const { data } = await supabaseAdmin.auth.admin.getUserById(userId)
  if (!data.user?.email) return null

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('name')
    .eq('id', userId)
    .single()

  return { name: profile?.name ?? 'Aluno', email: data.user.email }
}
