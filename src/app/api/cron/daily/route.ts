import { NextRequest, NextResponse } from 'next/server'
import * as Sentry from '@sentry/nextjs'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendLiveSessionReminderEmail, sendExpirationReminderEmail } from '@/lib/email/send'

export const runtime = 'nodejs'
export const maxDuration = 60

export async function GET(req: NextRequest) {
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? ''

  // Vercel Cron authentication
  const authHeader = req.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const results = {
    expired: 0,
    reminders: { d15: 0, d7: 0, d3: 0 },
    renewalsProcessed: 0,
    liveReminders: 0,
    errors: [] as string[],
  }

  // ── 1. Mark expired memberships ──────────────────────────────────────────

  try {
    const { data: expiredRows } = await supabaseAdmin
      .from('cohort_members')
      .update({ status: 'EXPIRED' })
      .eq('status', 'ACTIVE')
      .lt('expires_at', new Date().toISOString())
      .select('id')

    results.expired = expiredRows?.length ?? 0
  } catch (err) {
    Sentry.captureException(err, { tags: { cron_section: 'expire_memberships' } })
    results.errors.push(`expire: ${err instanceof Error ? err.message : String(err)}`)
  }

  // ── 2. Expiry reminders (15, 7, 3 days) ─────────────────────────────────

  const reminderDays = [15, 7, 3] as const
  for (const days of reminderDays) {
    try {
      const windowStart = startOfDay(daysFromNow(days))
      const windowEnd = endOfDay(daysFromNow(days))

      const { data: memberships } = await supabaseAdmin
        .from('cohort_members')
        .select('id, user_id, cohort_id, expires_at, cohorts(name, slug), profiles(name, email: id)')
        .eq('status', 'ACTIVE')
        .gte('expires_at', windowStart)
        .lte('expires_at', windowEnd)

      for (const member of memberships ?? []) {
        try {
          const profile = await getUserProfile(member.user_id)
          if (!profile?.email) continue

          const cohortName = (member.cohorts as { name: string } | null)?.name ?? 'sua turma'
          const expiresAt = (member as { expires_at?: string | null }).expires_at ?? new Date().toISOString()

          await sendExpirationReminderEmail(
            profile.email,
            profile.name,
            cohortName,
            days,
            expiresAt,
            `${APP_URL}/academy/perfil`,
          )

          if (days === 15) results.reminders.d15++
          else if (days === 7) results.reminders.d7++
          else results.reminders.d3++
        } catch (err) {
          results.errors.push(`reminder-${days}d-${member.id}: ${err instanceof Error ? err.message : String(err)}`)
        }
      }
    } catch (err) {
      Sentry.captureException(err, { tags: { cron_section: `reminders_${days}d` } })
      results.errors.push(`reminders-${days}d: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // ── 3. Process pending auto-renewals ────────────────────────────────────

  try {
    const { data: pendingRenewals } = await supabaseAdmin
      .from('cohort_members')
      .select('id, user_id, cohort_id')
      .eq('auto_renew_enabled', true)
      .eq('status', 'ACTIVE')
      .lte('next_renewal_at', new Date().toISOString())
      .not('next_renewal_at', 'is', null)

    // Stripe Subscription Schedule handles the actual charge.
    // This step just flags members whose renewal date passed without a Stripe event,
    // which shouldn't happen in normal flow — log for monitoring.
    results.renewalsProcessed = pendingRenewals?.length ?? 0

    for (const member of pendingRenewals ?? []) {
      results.errors.push(`renewal-pending-no-stripe-event: membership ${member.id}`)
    }
  } catch (err) {
    Sentry.captureException(err, { tags: { cron_section: 'auto_renewals' } })
    results.errors.push(`renewals: ${err instanceof Error ? err.message : String(err)}`)
  }

  // ── 4. Live session reminders (24h before) ──────────────────────────────

  try {
    const windowStart = startOfDay(daysFromNow(1))
    const windowEnd = endOfDay(daysFromNow(1))

    const { data: sessions } = await supabaseAdmin
      .from('live_sessions')
      .select('id, title, scheduled_at, duration_minutes, meeting_url, cohort_id')
      .gte('scheduled_at', windowStart)
      .lte('scheduled_at', windowEnd)

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
            results.errors.push(`live-reminder-${member.user_id}: ${err instanceof Error ? err.message : String(err)}`)
          }
        }
      } catch (err) {
        results.errors.push(`live-session-${session.id}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  } catch (err) {
    Sentry.captureException(err, { tags: { cron_section: 'live_session_reminders' } })
    results.errors.push(`live-reminders: ${err instanceof Error ? err.message : String(err)}`)
  }

  return NextResponse.json({
    ok: true,
    timestamp: new Date().toISOString(),
    ...results,
  })
}

// ── Helpers ──────────────────────────────────────────────────────────────────

function daysFromNow(days: number): Date {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return d
}

function startOfDay(d: Date): string {
  const copy = new Date(d)
  copy.setHours(0, 0, 0, 0)
  return copy.toISOString()
}

function endOfDay(d: Date): string {
  const copy = new Date(d)
  copy.setHours(23, 59, 59, 999)
  return copy.toISOString()
}

async function getUserProfile(userId: string): Promise<{ name: string; email: string } | null> {
  // email is in auth.users — use admin client to get it via profiles + auth
  const { data } = await supabaseAdmin.auth.admin.getUserById(userId)
  if (!data.user?.email) return null

  const { data: profile } = await supabaseAdmin
    .from('profiles')
    .select('name')
    .eq('id', userId)
    .single()

  return { name: profile?.name ?? 'Aluno', email: data.user.email }
}

