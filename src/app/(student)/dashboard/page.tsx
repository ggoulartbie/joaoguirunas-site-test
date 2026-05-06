import type { Metadata } from 'next'
import Link from 'next/link'
import { Play, Calendar, ArrowRight, RefreshCw } from 'lucide-react'
import { ProgressBar } from '@/components/student/ProgressBar'
import { ExpirationBadge } from '@/components/student/ExpirationBadge'
import { MOCK_COHORTS } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Dashboard' }

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
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
    .sort((a, b) => a.nextLiveSessionAt!.getTime() - b.nextLiveSessionAt!.getTime())[0]

  const expiringCohorts = cohorts.filter((c) => {
    if (!c.expiresAt) return false
    const days = Math.ceil((c.expiresAt.getTime() - Date.now()) / 86400000)
    return days <= 30
  })

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Saudação */}
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-white/40">
          Bem-vindo de volta
        </p>
        <h1 className="mt-1 text-2xl font-bold text-white">
          {user.name}
        </h1>
      </div>

      {/* Avisos de expiração */}
      {expiringCohorts.length > 0 && (
        <div className="space-y-2">
          {expiringCohorts.map((cohort) => (
            <div
              key={cohort.id}
              className="flex flex-col gap-3 border border-[#FF3A0E]/30 bg-[#FF3A0E]/5 p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <ExpirationBadge expiresAt={cohort.expiresAt!} />
                <span className="text-sm text-white/80">
                  Matrícula em{' '}
                  <span className="font-semibold text-white">{cohort.name}</span>
                </span>
              </div>
              <Link
                href={`/perfil`}
                className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#FF3A0E] hover:text-[#FF5A1F] transition-colors"
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
              className="group block border border-white/10 bg-[#0C0C12] p-6 transition-colors hover:border-white/20 hover:bg-[#121218]"
            >
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                Continue de onde parou
              </p>
              <h2 className="mt-3 text-lg font-semibold text-white group-hover:text-[#FF3A0E] transition-colors">
                {lastAccessed.lastAccessedLessonTitle}
              </h2>
              <p className="mt-1 text-sm text-white/50">{lastAccessed.name}</p>
              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center bg-[#FF3A0E] transition-transform group-hover:scale-105">
                  <Play className="h-4 w-4 fill-white text-white" />
                </div>
                <span className="font-mono text-xs uppercase tracking-wide text-white/60">
                  Retomar aula
                </span>
              </div>
            </Link>
          ) : (
            <div className="border border-white/10 bg-[#0C0C12] p-6">
              <p className="font-mono text-xs uppercase tracking-widest text-white/40">
                Continue de onde parou
              </p>
              <p className="mt-4 text-sm text-white/50">
                Nenhuma aula iniciada ainda.{' '}
                <Link href="/meus-cursos" className="text-[#FF3A0E] hover:underline">
                  Comece agora.
                </Link>
              </p>
            </div>
          )}
        </div>

        {/* Próximo encontro ao vivo */}
        <div className="border border-white/10 bg-[#0C0C12] p-6">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">
            Próximo encontro
          </p>
          {nextLive?.nextLiveSessionAt ? (
            <div className="mt-3">
              <div className="flex items-start gap-3">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-[#FF3A0E]" />
                <div>
                  <p className="text-sm font-medium text-white">
                    {nextLive.name}
                  </p>
                  <p className="mt-1 font-mono text-xs text-white/50">
                    {formatDate(nextLive.nextLiveSessionAt)}
                  </p>
                </div>
              </div>
              <Link
                href="/agenda"
                className="mt-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-[#FF3A0E] hover:text-[#FF5A1F] transition-colors"
              >
                Ver agenda
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          ) : (
            <p className="mt-4 text-sm text-white/40">
              Nenhum encontro agendado.
            </p>
          )}
        </div>
      </div>

      {/* Cards das cohorts com progresso */}
      <div>
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Suas turmas
        </h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          {cohorts.map((cohort) => (
            <Link
              key={cohort.id}
              href="/meus-cursos"
              className="group block border border-white/10 bg-[#0C0C12] p-5 transition-colors hover:border-white/20 hover:bg-[#121218]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <p className="truncate font-semibold text-white group-hover:text-[#FF3A0E] transition-colors">
                    {cohort.name}
                  </p>
                  {cohort.expiresAt && (
                    <ExpirationBadge
                      expiresAt={cohort.expiresAt}
                      className="mt-2"
                    />
                  )}
                </div>
                <span className="shrink-0 font-mono text-lg font-bold text-[#FF3A0E]">
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
