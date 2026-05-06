import type { Metadata } from 'next'
import Link from 'next/link'
import { Calendar, Clock, Video, Play, ExternalLink } from 'lucide-react'
import { MOCK_LIVE_SESSIONS } from '@/components/student/mock-data'
import { ICSDownloadButton } from '@/components/student/ICSDownloadButton'
import type { LiveSessionWithCohort } from '@/types/student'

export const metadata: Metadata = { title: 'Agenda' }

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
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
  const linkAvailable = isMeetingLinkAvailable(session.scheduled_at)
  const hasRecording = !!session.recording_url

  return (
    <div className={`border bg-[#0C0C12] p-5 ${isPast ? 'border-white/5 opacity-70' : 'border-white/10'}`}>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {!isPast && (
          <span className="bg-[#FF3A0E]/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]">
            Próximo
          </span>
        )}
        {isPast && hasRecording && (
          <span className="bg-green-500/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-green-400">
            Gravação disponível
          </span>
        )}
        {isPast && !hasRecording && (
          <span className="bg-white/5 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/30">
            Realizado
          </span>
        )}
        <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/30">
          {session.cohortName}
        </span>
      </div>

      <h3 className="font-semibold text-white">{session.title}</h3>

      {session.description && (
        <p className="mt-1.5 text-sm text-white/50">{session.description}</p>
      )}

      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/50">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-[#FF3A0E]" />
          {formatDateTime(session.scheduled_at)}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {session.duration_minutes} min
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        {!isPast && (
          linkAvailable && session.meeting_url ? (
            <a
              href={session.meeting_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-[#FF3A0E] px-3 py-2 font-mono text-xs uppercase tracking-wide text-white hover:bg-[#FF5A1F] transition-colors"
            >
              <Video className="h-3.5 w-3.5" />
              Entrar na aula
            </a>
          ) : (
            <div className="flex items-center gap-1.5 border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/30">
              <Video className="h-3.5 w-3.5" />
              Link disponível {linkAvailableTime(session.scheduled_at)}
            </div>
          )
        )}

        {hasRecording && (
          <a
            href={session.recording_url!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/60 hover:border-white/20 hover:text-white/80 transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            Assistir gravação
            <ExternalLink className="h-3 w-3 opacity-50" />
          </a>
        )}

        {!isPast && <ICSDownloadButton session={session} />}
      </div>
    </div>
  )
}

export default function AgendaPage() {
  // TODO F5.2: substituir por getLiveSessions(userId) — filtra pelas cohorts do aluno
  const sessions = [...MOCK_LIVE_SESSIONS].sort(
    (a, b) => new Date(a.scheduled_at).getTime() - new Date(b.scheduled_at).getTime()
  )

  const now = new Date()
  const upcoming = sessions.filter((s) => new Date(s.scheduled_at) >= now)
  const past = sessions.filter((s) => new Date(s.scheduled_at) < now)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Agenda</h1>
        <p className="mt-1 text-sm text-white/50">Encontros ao vivo das suas turmas</p>
      </div>

      {upcoming.length > 0 ? (
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
            Próximos encontros
          </h2>
          {upcoming.map((s) => <SessionCard key={s.id} session={s} />)}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-white/10 bg-[#0C0C12] py-12 text-center">
          <Calendar className="h-8 w-8 text-white/10" />
          <p className="mt-3 text-sm text-white/30">Nenhum encontro agendado no momento.</p>
        </div>
      )}

      {past.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
            Encontros anteriores
          </h2>
          {past.map((s) => <SessionCard key={s.id} session={s} />)}
        </div>
      )}
    </div>
  )
}
