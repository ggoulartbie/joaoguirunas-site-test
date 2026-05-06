import type { Metadata } from 'next'
import Link from 'next/link'
import { Play, Calendar, ArrowRight, AlertTriangle } from 'lucide-react'
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
    <div
      className="mx-auto max-w-5xl space-y-10"
      style={{
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >

      {/* Saudação */}
      <div>
        <p
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
        >
          Bem-vindo de volta
        </p>
        <h1
          className="mt-1 italic"
          style={{
            fontFamily: 'var(--type-display)',
            fontSize: '36px',
            color: 'var(--bone)',
            fontWeight: 'normal',
          }}
        >
          {user.name}
        </h1>
      </div>

      {/* Avisos de expiração */}
      {expiringCohorts.length > 0 && (
        <div className="space-y-2">
          {expiringCohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="flex flex-col gap-3 border-l-2 border-l-[var(--ember)] bg-[var(--ember)]/[0.08] px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 shrink-0" style={{ color: 'var(--ember)' }} />
                <ExpirationBadge expiresAt={cohort.expires_at!} />
                <span className="text-sm" style={{ color: 'var(--bone)' }}>
                  Matrícula em{' '}
                  <span className="font-semibold" style={{ color: 'var(--bone)' }}>{cohort.name}</span>
                </span>
              </div>
              <Link
                href="/academy/perfil"
                className="font-mono text-xs uppercase tracking-wider transition-opacity hover:opacity-70"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
              >
                Renovar
              </Link>
            </div>
          ))}
        </div>
      )}

      {/* Grid principal */}
      <div className="grid gap-6 lg:grid-cols-3">

        {/* Card — Continue de onde parou (lg:col-span-2) */}
        <div className="lg:col-span-2">
          {lastAccessed ? (
            <Link
              href={`/curso/${lastAccessed.lastAccessedCourseSlug}/aula/${lastAccessed.lastAccessedLessonSlug}`}
              className="group block border border-[var(--hairline)] hover:border-[var(--hairline-strong)] p-6 transition-colors"
              style={{
                background: 'var(--ink)',
                borderRadius: 0,
              }}
            >
              <p
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
              >
                Continue de onde parou
              </p>
              <h2
                className="mt-3 italic transition-colors group-hover:text-[var(--ember)]"
                style={{
                  fontFamily: 'var(--type-display)',
                  fontSize: '22px',
                  fontWeight: 'normal',
                  color: 'var(--bone)',
                }}
              >
                {lastAccessed.lastAccessedLessonTitle}
              </h2>
              <p
                className="mt-1 text-sm"
                style={{ fontFamily: 'var(--type-sans)', color: 'var(--bone-mute)' }}
              >
                {lastAccessed.name}
              </p>
              <div className="mt-5 flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center"
                  style={{ background: 'var(--ember)', borderRadius: 0 }}
                >
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
                <span
                  className="text-xs uppercase tracking-widest"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                >
                  Retomar
                </span>
              </div>
            </Link>
          ) : (
            <div
              className="border p-6"
              style={{
                background: 'var(--ink)',
                borderColor: 'var(--hairline)',
                borderRadius: 0,
              }}
            >
              <p
                className="text-xs uppercase tracking-widest"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
              >
                Continue de onde parou
              </p>
              <p className="mt-4 text-sm" style={{ color: 'var(--bone-mute)' }}>
                Nenhuma aula iniciada ainda.{' '}
                <Link href="/academy/meus-cursos" className="hover:underline" style={{ color: 'var(--ember)' }}>
                  Comece agora.
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Card — Próximo encontro (lg:col-span-1) */}
        <div
          className="border p-6"
          style={{
            background: 'var(--ink)',
            borderColor: 'var(--hairline)',
            borderRadius: 0,
          }}
        >
          <p
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
          >
            Próximo encontro
          </p>
          {nextLive?.nextLiveSessionAt ? (
            <div className="mt-4">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0" style={{ color: 'var(--ember)' }} />
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--bone)' }}>
                    {nextLive.name}
                  </p>
                  <p
                    className="mt-1 text-xs"
                    style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                  >
                    {formatDate(nextLive.nextLiveSessionAt)}
                  </p>
                </div>
              </div>
              <Link
                href="/academy/agenda"
                className="mt-5 flex items-center gap-1.5 text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
                style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
              >
                Ver agenda
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm" style={{ color: 'var(--bone-mute)' }}>
              Nenhum encontro agendado.
            </p>
          )}
        </div>
      </div>

      {/* Grid de turmas */}
      <div>
        <h2
          className="text-xs uppercase tracking-widest"
          style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
        >
          Suas turmas
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cohorts.map((cohort) => (
            <Link
              key={cohort.id}
              href="/academy/meus-cursos"
              className="group block border border-[var(--hairline)] hover:border-[var(--hairline-strong)] p-5 transition-colors"
              style={{
                background: 'var(--ink)',
                borderRadius: 0,
              }}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p
                    className="truncate font-medium transition-colors group-hover:text-[var(--ember)]"
                    style={{ color: 'var(--bone)' }}
                  >
                    {cohort.name}
                  </p>
                  {cohort.expires_at && (
                    <ExpirationBadge expiresAt={cohort.expires_at} className="mt-2" />
                  )}
                </div>
                <span
                  className="shrink-0 font-bold"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
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
