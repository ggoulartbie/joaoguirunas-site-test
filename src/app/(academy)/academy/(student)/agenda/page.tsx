export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import { Calendar, Download, Video } from 'lucide-react'
import { ICSDownloadButton } from '@/components/student/ICSDownloadButton'
import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import type { LiveSessionWithCohort } from '@/types/student'

export const metadata: Metadata = { title: 'Agenda' }

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit' })
}

function formatMonth(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { month: 'short' }).toUpperCase().replace('.', '')
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
}

function isMeetingLinkAvailable(scheduledAt: string): boolean {
  const start = new Date(scheduledAt).getTime()
  const now = Date.now()
  return now >= start - 30 * 60 * 1000 && now <= start + 120 * 60 * 1000
}

function linkAvailableTime(scheduledAt: string): string {
  const thirtyBefore = new Date(new Date(scheduledAt).getTime() - 30 * 60 * 1000).toISOString()
  return formatTime(thirtyBefore)
}

function SessionCard({ session }: { session: LiveSessionWithCohort }) {
  const isPast = new Date(session.scheduled_at) < new Date()
  const isLive = isMeetingLinkAvailable(session.scheduled_at)
  const hasRecording = !!session.recording_url

  return (
    <div
      className="group flex gap-4 items-start border border-[var(--hairline)] hover:border-[var(--hairline-strong)] p-5 transition-colors"
      style={{ backgroundColor: 'var(--ink)', borderRadius: 0 }}
    >
      {/* Date column */}
      <div
        className="flex flex-col items-center justify-center p-3 min-w-[64px] shrink-0 text-center"
        style={{ backgroundColor: 'var(--ink-2)', borderRadius: 0 }}
      >
        <span className="font-mono font-bold text-[28px] leading-none" style={{ color: 'var(--bone)' }}>
          {formatDay(session.scheduled_at)}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-wider mt-1" style={{ color: 'var(--ember)' }}>
          {formatMonth(session.scheduled_at)}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-2">
          {isLive && (
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border border-[var(--ember)]/20 bg-[var(--ember)]/10"
              style={{ color: 'var(--ember)', borderRadius: 0 }}
            >
              Ao Vivo
            </span>
          )}
          {!isPast && !isLive && (
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5"
              style={{ color: 'var(--bone-mute)' }}
            >
              Em breve
            </span>
          )}
          {isPast && hasRecording && (
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 border"
              style={{
                color: 'var(--bone-mute)',
                backgroundColor: 'var(--ink-2)',
                borderColor: 'var(--hairline)',
                borderRadius: 0,
              }}
            >
              Gravação disponível
            </span>
          )}
          {isPast && !hasRecording && (
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5"
              style={{ color: 'var(--bone-mute)' }}
            >
              Realizado
            </span>
          )}
        </div>

        <p className="font-sans text-[16px] font-medium leading-snug" style={{ color: 'var(--bone)' }}>
          {session.title}
        </p>
        <p className="font-mono text-[11px] mt-1" style={{ color: 'var(--bone-mute)' }}>
          {session.cohortName}
        </p>
        <p className="font-mono text-[12px] mt-0.5" style={{ color: 'var(--bone-dim)' }}>
          {formatTime(session.scheduled_at)} · {session.duration_minutes} min
        </p>
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-2 shrink-0">
        {!isPast && isLive && session.meeting_url && (
          <a
            href={session.meeting_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 h-9 font-mono text-[11px] uppercase tracking-wider transition-colors"
            style={{ backgroundColor: 'var(--ember)', color: 'var(--void)', borderRadius: 0 }}
          >
            <Video className="h-3.5 w-3.5" />
            Entrar
          </a>
        )}
        {!isPast && !isLive && (
          <div
            className="flex items-center gap-1.5 px-3 h-9 font-mono text-[11px] uppercase tracking-wider"
            style={{ color: 'var(--bone-mute)', borderRadius: 0 }}
          >
            <Video className="h-3.5 w-3.5" />
            {linkAvailableTime(session.scheduled_at)}
          </div>
        )}
        {!isPast && (
          <ICSDownloadButton session={session} />
        )}
        {hasRecording && (
          <a
            href={session.recording_url!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 h-9 border font-mono text-[11px] uppercase tracking-wider transition-colors hover:border-[var(--hairline-strong)] hover:text-[var(--bone-dim)]"
            style={{ borderColor: 'var(--hairline)', color: 'var(--bone-mute)', borderRadius: 0 }}
          >
            <Download className="h-3.5 w-3.5" />
            Gravação
          </a>
        )}
      </div>
    </div>
  )
}

export default async function AgendaPage() {
  const profile = await requireUser()
  const supabase = await createClient()

  // Cohorts ativas do aluno
  const { data: memberRows } = await supabase
    .from('cohort_members')
    .select('cohort_id, cohorts (name, slug)')
    .eq('user_id', profile.id)
    .eq('status', 'ACTIVE')

  const members = memberRows ?? []
  const cohortIds = members.map((m) => m.cohort_id)

  // Live sessions das cohorts ativas
  const { data: sessionRows } = cohortIds.length > 0
    ? await supabaseAdmin
        .from('live_sessions')
        .select('id, title, description, scheduled_at, duration_minutes, cohort_id, meeting_url, recording_url')
        .in('cohort_id', cohortIds)
        .order('scheduled_at', { ascending: true })
    : { data: [] }

  const nowIso = new Date().toISOString()

  const sessions: LiveSessionWithCohort[] = (sessionRows ?? []).map((s) => {
    const member = members.find((m) => m.cohort_id === s.cohort_id)
    const cohortObj = member && (Array.isArray(member.cohorts) ? member.cohorts[0] : member.cohorts)

    // meeting_url só exposto se dentro da janela de 30min antes / 2h depois
    const start = new Date(s.scheduled_at).getTime()
    const nowMs = Date.now()
    const inWindow = nowMs >= start - 30 * 60 * 1000 && nowMs <= start + 120 * 60 * 1000

    return {
      id: s.id,
      title: s.title,
      description: s.description ?? null,
      scheduled_at: s.scheduled_at,
      duration_minutes: s.duration_minutes,
      meeting_url: inWindow ? (s.meeting_url ?? null) : null,
      recording_url: s.recording_url ?? null,
      cohortName: cohortObj?.name ?? '',
      cohortSlug: cohortObj?.slug ?? '',
    }
  })

  const upcoming = sessions.filter((s) => s.scheduled_at >= nowIso)
  const past = sessions.filter((s) => s.scheduled_at < nowIso).reverse()

  return (
    <div
      className="mx-auto max-w-3xl space-y-8"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2" style={{ color: 'var(--ember)' }}>
          Agenda
        </p>
        <h1 className="font-display italic text-[36px] leading-tight" style={{ color: 'var(--bone)' }}>
          Encontros ao vivo
        </h1>
        <p className="font-sans text-[16px] mt-2" style={{ color: 'var(--bone-dim)' }}>
          Seus próximos encontros ao vivo
        </p>
      </div>

      {upcoming.length > 0 ? (
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--bone-mute)' }}>
            Próximos encontros
          </p>
          {upcoming.map((s) => <SessionCard key={s.id} session={s} />)}
        </div>
      ) : (
        <div
          className="flex flex-col items-center justify-center py-16 text-center border"
          style={{ backgroundColor: 'var(--ink)', borderColor: 'var(--hairline)', borderRadius: 0 }}
        >
          <Calendar className="h-12 w-12 opacity-30" style={{ color: 'var(--bone-mute)' }} />
          <p className="mt-4 font-sans text-[14px]" style={{ color: 'var(--bone-mute)' }}>
            Nenhum encontro agendado
          </p>
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: 'var(--bone-mute)' }}>
            Encontros anteriores
          </p>
          {past.map((s) => <SessionCard key={s.id} session={s} />)}
        </div>
      )}
    </div>
  )
}
