// Edge Function: cron-daily
// Handles: expiry reminders (D-15/D-7/D-3), auto-renewal monitoring, 24h live session reminders
// Triggered by pg_cron at 06:05 UTC daily
// AC2 + AC3 + section of AC4 (daily reminders)

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')!
const FROM = Deno.env.get('RESEND_FROM_EMAIL') ?? 'noreply@example.com'
const APP_URL = Deno.env.get('NEXT_PUBLIC_APP_URL') ?? 'https://joaoguirunas.com'

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
})

interface UserProfile {
  name: string
  email: string
}

async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const { data } = await supabase.auth.admin.getUserById(userId)
  if (!data.user?.email) return null

  const { data: profile } = await supabase
    .from('profiles')
    .select('name')
    .eq('id', userId)
    .single()

  return { name: (profile as { name?: string } | null)?.name ?? 'Aluno', email: data.user.email }
}

async function sendEmail(to: string, subject: string, html: string): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({ from: FROM, to, subject, html }),
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend error ${res.status}: ${body}`)
  }
}

function expirationReminderHtml(name: string, cohortName: string, daysLeft: number, expiresAt: string, renewUrl: string): string {
  const formattedDate = new Date(expiresAt).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
<h2>Olá, ${name}</h2>
<p>Seu acesso à turma <strong>${cohortName}</strong> expira em <strong>${daysLeft} dias</strong> (${formattedDate}).</p>
<p>Renove agora para manter acesso ao conteúdo.</p>
<a href="${renewUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px">Renovar acesso</a>
</body></html>`
}

function liveSessionReminderHtml(name: string, cohortName: string, sessionTitle: string, scheduledAt: string, durationMinutes: number, meetingUrl: string | null): string {
  const formattedDate = new Date(scheduledAt).toLocaleString('pt-BR', {
    dateStyle: 'full', timeStyle: 'short', timeZone: 'America/Sao_Paulo',
  })
  const meetingLine = meetingUrl
    ? `<a href="${meetingUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px">Entrar na sessão</a>`
    : '<p>O link de acesso será enviado em breve.</p>'
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
<h2>Olá, ${name}</h2>
<p>Lembrete: a sessão ao vivo <strong>${sessionTitle}</strong> da turma <strong>${cohortName}</strong> acontece <strong>amanhã</strong>.</p>
<p>Data: ${formattedDate} | Duração: ${durationMinutes} minutos</p>
${meetingLine}
</body></html>`
}

Deno.serve(async (req) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const results = {
    reminders: { d15: 0, d7: 0, d3: 0 },
    renewalsPending: 0,
    liveReminders: 0,
    errors: [] as string[],
  }

  const now = new Date()

  // ── 1. Expiry reminders (AC2) ─────────────────────────────────────────────

  const reminderDays = [15, 7, 3] as const
  for (const days of reminderDays) {
    try {
      const windowStart = new Date(now)
      windowStart.setDate(windowStart.getDate() + days)
      windowStart.setHours(0, 0, 0, 0)

      const windowEnd = new Date(windowStart)
      windowEnd.setHours(23, 59, 59, 999)

      const { data: memberships, error } = await supabase
        .from('cohort_members')
        .select('id, user_id, cohort_id, expires_at, cohorts(name)')
        .eq('status', 'ACTIVE')
        .gte('expires_at', windowStart.toISOString())
        .lte('expires_at', windowEnd.toISOString())

      if (error) throw error

      for (const member of memberships ?? []) {
        try {
          const profile = await getUserProfile(member.user_id as string)
          if (!profile) continue

          const cohortName = (member.cohorts as { name?: string } | null)?.name ?? 'sua turma'
          const expiresAt = (member as { expires_at?: string }).expires_at ?? now.toISOString()

          const html = expirationReminderHtml(
            profile.name, cohortName, days, expiresAt, `${APP_URL}/academy/perfil`,
          )
          await sendEmail(profile.email, `Seu acesso a ${cohortName} expira em ${days} dias`, html)

          if (days === 15) results.reminders.d15++
          else if (days === 7) results.reminders.d7++
          else results.reminders.d3++
        } catch (err) {
          results.errors.push(`reminder-${days}d-${(member as { id?: string }).id}: ${err instanceof Error ? err.message : String(err)}`)
        }
      }
    } catch (err) {
      results.errors.push(`reminders-${days}d: ${err instanceof Error ? err.message : String(err)}`)
    }
  }

  // ── 2. Auto-renewal monitoring (AC3) ─────────────────────────────────────
  // Stripe Subscription Schedule handles the actual charge.
  // Log any members whose renewal_at passed without a Stripe event (anomaly detection).

  try {
    const { data: pendingRenewals, error } = await supabase
      .from('cohort_members')
      .select('id')
      .eq('auto_renew_enabled', true)
      .eq('status', 'ACTIVE')
      .lte('next_renewal_at', now.toISOString())
      .not('next_renewal_at', 'is', null)

    if (error) throw error

    results.renewalsPending = pendingRenewals?.length ?? 0

    for (const member of pendingRenewals ?? []) {
      results.errors.push(`renewal-pending-no-stripe-event: membership ${(member as { id: string }).id}`)
    }
  } catch (err) {
    results.errors.push(`renewals: ${err instanceof Error ? err.message : String(err)}`)
  }

  // ── 3. Live session reminders 24h before (daily portion) ─────────────────

  try {
    const tomorrow = new Date(now)
    tomorrow.setDate(tomorrow.getDate() + 1)
    const windowStart = new Date(tomorrow)
    windowStart.setHours(0, 0, 0, 0)
    const windowEnd = new Date(tomorrow)
    windowEnd.setHours(23, 59, 59, 999)

    const { data: sessions, error } = await supabase
      .from('live_sessions')
      .select('id, title, scheduled_at, duration_minutes, meeting_url, cohort_id')
      .gte('scheduled_at', windowStart.toISOString())
      .lte('scheduled_at', windowEnd.toISOString())

    if (error) throw error

    for (const session of sessions ?? []) {
      try {
        const s = session as {
          id: string; title: string; scheduled_at: string
          duration_minutes: number; meeting_url: string | null; cohort_id: string
        }

        const { data: members } = await supabase
          .from('cohort_members')
          .select('user_id')
          .eq('cohort_id', s.cohort_id)
          .eq('status', 'ACTIVE')

        const { data: cohort } = await supabase
          .from('cohorts')
          .select('name')
          .eq('id', s.cohort_id)
          .single()

        const cohortName = (cohort as { name?: string } | null)?.name ?? 'sua turma'

        for (const member of members ?? []) {
          try {
            const m = member as { user_id: string }
            const profile = await getUserProfile(m.user_id)
            if (!profile) continue

            const html = liveSessionReminderHtml(
              profile.name, cohortName, s.title, s.scheduled_at, s.duration_minutes, s.meeting_url,
            )
            await sendEmail(profile.email, `Lembrete: ${s.title} — amanhã`, html)
            results.liveReminders++
          } catch (err) {
            results.errors.push(`live-member-${(member as { user_id?: string }).user_id}: ${err instanceof Error ? err.message : String(err)}`)
          }
        }
      } catch (err) {
        results.errors.push(`live-session-${(session as { id?: string }).id}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  } catch (err) {
    results.errors.push(`live-reminders: ${err instanceof Error ? err.message : String(err)}`)
  }

  return new Response(JSON.stringify({ ok: true, timestamp: now.toISOString(), ...results }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
