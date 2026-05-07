// Edge Function: cron-hourly
// Handles: 1h live session reminders
// Triggered by pg_cron every hour at :00
// AC4

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

function liveSessionReminderHtml(name: string, cohortName: string, sessionTitle: string, scheduledAt: string, durationMinutes: number, meetingUrl: string | null): string {
  const formattedTime = new Date(scheduledAt).toLocaleTimeString('pt-BR', {
    hour: '2-digit', minute: '2-digit', timeZone: 'America/Sao_Paulo',
  })
  const meetingLine = meetingUrl
    ? `<a href="${meetingUrl}" style="display:inline-block;background:#000;color:#fff;padding:12px 24px;border-radius:6px;text-decoration:none;margin-top:16px">Entrar agora</a>`
    : `<p>Acesse pelo painel: <a href="${APP_URL}/academy/meus-cursos">Meus Cursos</a></p>`
  return `<!DOCTYPE html><html><body style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:24px">
<h2>Olá, ${name}</h2>
<p>A sessão ao vivo <strong>${sessionTitle}</strong> da turma <strong>${cohortName}</strong> começa <strong>em 1 hora</strong> (${formattedTime}).</p>
<p>Duração: ${durationMinutes} minutos</p>
${meetingLine}
</body></html>`
}

Deno.serve(async (req) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 })
  }

  const results = { liveReminders: 0, errors: [] as string[] }

  const now = new Date()
  // Window: sessions starting 50–70 minutes from now (same logic as old hourly route)
  const windowStart = new Date(now.getTime() + 50 * 60 * 1000)
  const windowEnd = new Date(now.getTime() + 70 * 60 * 1000)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const liveSessionsTable = supabase.from('live_sessions') as any

  try {
    const { data: sessions, error } = await liveSessionsTable
      .select('id, title, scheduled_at, duration_minutes, meeting_url, cohort_id')
      .gte('scheduled_at', windowStart.toISOString())
      .lte('scheduled_at', windowEnd.toISOString())
      .is('reminder_1h_sent_at', null)

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
            await sendEmail(profile.email, `Sessão em 1 hora: ${s.title}`, html)
            results.liveReminders++
          } catch (err) {
            results.errors.push(`member-${(member as { user_id?: string }).user_id}: ${err instanceof Error ? err.message : String(err)}`)
          }
        }

        // Mark as reminded — prevents duplicate blasts even if cron fires twice
        await liveSessionsTable
          .update({ reminder_1h_sent_at: now.toISOString() })
          .eq('id', s.id)
      } catch (err) {
        results.errors.push(`session-${(session as { id?: string }).id}: ${err instanceof Error ? err.message : String(err)}`)
      }
    }
  } catch (err) {
    results.errors.push(`query: ${err instanceof Error ? err.message : String(err)}`)
  }

  return new Response(JSON.stringify({ ok: true, timestamp: now.toISOString(), ...results }), {
    headers: { 'Content-Type': 'application/json' },
  })
})
