import type { Metadata } from 'next'
import Link from 'next/link'
import { Play, Calendar, ArrowRight, RefreshCw } from 'lucide-react'
import { ProgressBar } from '@/components/student/ProgressBar'
import { ExpirationBadge } from '@/components/student/ExpirationBadge'
import { MOCK_COHORTS } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Dashboard' }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function DashboardPage() {
  // TODO F3.2: substituir por getCurrentUser() + getUserCohorts()
  const user = { name: 'João Guirunas', initials: 'JG' }
  const cohorts = MOCK_COHORTS

  const lastAccessed = cohorts.find((c) => c.lastAccessedLessonSlug)
  const nextLive = cohorts
    .filter((c) => c.nextLiveSessionAt)
    .sort((a, b) => new Date(a.nextLiveSessionAt!).getTime() - new Date(b.nextLiveSessionAt!).getTime())[0]

  const expiringCohorts = cohorts.filter((c) => {
    if (!c.expires_at) return false
    const days = Math.ceil((new Date(c.expires_at).getTime() - Date.now()) / 86400000)
    return days <= 30
  })

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Saudação */}
      <div>
        <p className="text-xs uppercase tracking-widest" style={{ fontFamily: 'var(--type-mono)', color: 'rgba(241,241,243,0.4)' }}>
          Bem-vindo de volta
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white" style={{ fontFamily: 'var(--type-sans)' }}>{user.name}</h1>
      </div>

      {/* Avisos de expiração */}
      {expiringCohorts.length > 0 && (
        <div className="space-y-2">
          {expiringCohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="flex flex-col gap-3 border p-4 sm:flex-row sm:items-center sm:justify-between"
              style={{
                borderColor: 'rgba(255,58,14,0.3)',
                background: 'rgba(255,58,14,0.05)',
              }}
            >
              <div className="flex items-center gap-3">
                <ExpirationBadge expiresAt={cohort.expires_at!} />
                <span className="text-sm" style={{ color: 'var(--bone)' }}>
                  Matrícula em{' '}
                  <span className="font-semibold text-white">{cohort.name}</span>
                </span>
              </div>
              <Link
                href="/academy/perfil"
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:brightness-110"
                style={{ color: 'var(--ember)' }}
              >
                <RefreshCw className="h-3 w-3" />
                Renovar acesso
              </Link>
            </div>
          ))}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Card — Continue de onde parou */}
        <div className="lg:col-span-2">
          {lastAccessed ? (
            <Link
              href={`/curso/${lastAccessed.lastAccessedCourseSlug}/aula/${lastAccessed.lastAccessedLessonSlug}`}
              className="group block border p-6 transition-colors"
              style={{
                background: 'var(--ink)',
                borderColor: 'var(--hairline)',
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'rgba(241,241,243,0.4)' }}
              >
                Continue de onde parou
              </p>
              <h2
                className="mt-3 text-lg font-semibold text-white transition-colors group-hover:text-[var(--ember)]"
              >
                {lastAccessed.lastAccessedLessonTitle}
              </h2>
              <p className="mt-1 text-sm" style={{ color: 'rgba(241,241,243,0.5)' }}>{lastAccessed.name}</p>
              <div className="mt-4 flex items-center gap-3">
                <div
                  className="flex h-10 w-10 items-center justify-center transition-transform group-hover:scale-105"
                  style={{ background: 'var(--ember)' }}
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
                <span
                  className="font-mono text-xs uppercase tracking-wide"
                  style={{ color: 'rgba(241,241,243,0.6)' }}
                >
                  Retomar aula
                </span>
              </div>
            </Link>
          ) : (
            <div
              className="border p-6"
              style={{
                background: 'var(--ink)',
                borderColor: 'var(--hairline)',
              }}
            >
              <p
                className="font-mono text-xs uppercase tracking-widest"
                style={{ color: 'rgba(241,241,243,0.4)' }}
              >
                Continue de onde parou
              </p>
              <p className="mt-4 text-sm" style={{ color: 'rgba(241,241,243,0.5)' }}>
                Nenhuma aula iniciada ainda.{' '}
                <Link href="/academy/meus-cursos" className="hover:underline" style={{ color: 'var(--ember)' }}>
                  Comece agora.
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Próximo encontro ao vivo */}
        <div
          className="border p-6"
          style={{
            background: 'var(--ink)',
            borderColor: 'var(--hairline)',
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: 'rgba(241,241,243,0.4)' }}
          >
            Próximo encontro
          </p>
          {nextLive?.nextLiveSessionAt ? (
            <div className="mt-3">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--ember)' }} />
                <div>
                  <p className="text-sm font-medium text-white">{nextLive.name}</p>
                  <p className="mt-1 font-mono text-xs" style={{ color: 'rgba(241,241,243,0.5)' }}>
                    {formatDate(nextLive.nextLiveSessionAt)}
                  </p>
                </div>
              </div>
              <Link
                href="/academy/agenda"
                className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider transition-colors hover:brightness-110"
                style={{ color: 'var(--ember)' }}
              >
                Ver agenda
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm" style={{ color: 'rgba(241,241,243,0.4)' }}>Nenhum encontro agendado.</p>
          )}
        </div>
      </div>

      {/* Cards das cohorts com progresso */}
      <div>
        <h2
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: 'rgba(241,241,243,0.4)' }}
        >
          Suas turmas
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cohorts.map((cohort) => (
            <Link
              key={cohort.id}
              href="/academy/meus-cursos"
              className="group block border p-5 transition-colors"
              style={{
                background: 'var(--ink)',
                borderColor: 'var(--hairline)',
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="truncate font-semibold text-white transition-colors group-hover:text-[var(--ember)]"
                  >
                    {cohort.name}
                  </p>
                  {cohort.expires_at && (
                    <ExpirationBadge expiresAt={cohort.expires_at} className="mt-2" />
                  )}
                </div>
                <span
                  className="shrink-0 font-mono text-lg font-bold"
                  style={{ color: 'var(--ember)' }}
                >
                  {cohort.progressPercent}%
                </span>
              </div>
              <div className="mt-4">
                <ProgressBar value={cohort.progressPercent} showLabel={false} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
