import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Calendar,
  Clock,
  Video,
  Play,
  Download,
  ExternalLink,
} from 'lucide-react'
import { MOCK_LIVE_SESSIONS, type LiveSession } from '@/components/student/mock-data'
import { ICSDownloadButton } from '@/components/student/ICSDownloadButton'

export const metadata: Metadata = { title: 'Agenda' }

function formatDateTime(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatTime(date: Date) {
  return date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function isMeetingLinkAvailable(scheduledAt: Date): boolean {
  const now = new Date()
  const thirtyMinBefore = new Date(scheduledAt.getTime() - 30 * 60 * 1000)
  return now >= thirtyMinBefore && now <= new Date(scheduledAt.getTime() + 120 * 60 * 1000)
}

function SessionCard({ session }: { session: LiveSession }) {
  const now = new Date()
  const isPast = session.scheduledAt < now
  const linkAvailable = isMeetingLinkAvailable(session.scheduledAt)
  const hasRecording = !!session.recordingUrl

  return (
    <div
      className={`border bg-[#0C0C12] p-5 ${
        isPast ? 'border-white/5 opacity-70' : 'border-white/10'
      }`}
    >
      {/* Status badge + cohort */}
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

      {/* Date + duration */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-white/50">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3.5 w-3.5 shrink-0 text-[#FF3A0E]" />
          {formatDateTime(session.scheduledAt)}
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          {session.durationMinutes} min
        </div>
      </div>

      {/* Actions */}
      <div className="mt-4 flex flex-wrap items-center gap-3">
        {/* Meeting link — só disponível 30min antes */}
        {!isPast && (
          linkAvailable && session.meetingUrl ? (
            <a
              href={session.meetingUrl}
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
              Link disponível {formatTime(new Date(session.scheduledAt.getTime() - 30 * 60 * 1000))}
            </div>
          )
        )}

        {/* Recording */}
        {hasRecording && (
          <a
            href={session.recordingUrl!}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/60 hover:border-white/20 hover:text-white/80 transition-colors"
          >
            <Play className="h-3.5 w-3.5" />
            Assistir gravação
            <ExternalLink className="h-3 w-3 opacity-50" />
          </a>
        )}

        {/* ICS download */}
        {!isPast && (
          <ICSDownloadButton session={session} />
        )}
      </div>
    </div>
  )
}

export default function AgendaPage() {
  // TODO F5.2: substituir por getLiveSessions(userId) — filtra pelas cohorts do aluno
  const sessions = MOCK_LIVE_SESSIONS.sort(
    (a, b) => a.scheduledAt.getTime() - b.scheduledAt.getTime()
  )

  const now = new Date()
  const upcoming = sessions.filter((s) => s.scheduledAt >= now)
  const past = sessions.filter((s) => s.scheduledAt < now)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Agenda</h1>
        <p className="mt-1 text-sm text-white/50">
          Encontros ao vivo das suas turmas
        </p>
      </div>

      {/* Próximos */}
      {upcoming.length > 0 ? (
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
            Próximos encontros
          </h2>
          {upcoming.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border border-white/10 bg-[#0C0C12] py-12 text-center">
          <Calendar className="h-8 w-8 text-white/10" />
          <p className="mt-3 text-sm text-white/30">
            Nenhum encontro agendado no momento.
          </p>
        </div>
      )}

      {/* Passados */}
      {past.length > 0 && (
        <div className="space-y-3">
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
            Encontros anteriores
          </h2>
          {past.map((s) => (
            <SessionCard key={s.id} session={s} />
          ))}
        </div>
      )}
    </div>
  )
}
