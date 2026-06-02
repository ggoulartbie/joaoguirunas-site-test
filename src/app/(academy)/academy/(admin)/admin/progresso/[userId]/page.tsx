import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, BookOpen, MessageSquare, Users, ThumbsUp } from 'lucide-react'
import { getStudentDetail } from '@/app/actions/admin-progress'

export const metadata: Metadata = { title: 'Detalhe do Aluno' }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

function formatDateTime(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function AvatarInitial({ name, avatarUrl }: { name: string; avatarUrl: string | null }) {
  if (avatarUrl) {
    return (
      <img
        src={avatarUrl}
        alt={name}
        className="h-14 w-14 rounded-full object-cover border border-[rgba(255,255,255,0.07)]"
      />
    )
  }
  const initial = name.trim().charAt(0).toUpperCase()
  return (
    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--ember)] border border-[rgba(255,255,255,0.07)]">
      <span className="font-mono text-xl font-bold text-white">{initial}</span>
    </div>
  )
}

function SectionHeader({ icon: Icon, label }: { icon: React.ComponentType<{ className?: string }>; label: string }) {
  return (
    <div className="mb-4 flex items-center gap-2">
      <Icon className="h-4 w-4 text-[var(--ember)]" />
      <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">{label}</span>
    </div>
  )
}

function EmptyState({ message }: { message: string }) {
  return (
    <p className="py-6 text-center font-mono text-xs text-[var(--bone-mute)]">{message}</p>
  )
}

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const { userId } = await params
  const student = await getStudentDetail(userId)

  if (!student) notFound()

  const { profile, courseProgress, recentComments, forumActivity, votes } = student

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Breadcrumb + back */}
      <div className="flex items-center gap-3">
        <Link
          href="/academy/admin/progresso"
          className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] transition-opacity hover:opacity-70"
        >
          <ArrowLeft className="h-3 w-3" />
          Progresso
        </Link>
        <span className="font-mono text-[10px] text-[var(--bone-mute)]">/</span>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-dim)]">Detalhe</span>
      </div>

      {/* Header — aluno */}
      <div className="border-b border-[var(--hairline)] pb-6">
        <div className="flex items-center gap-4">
          <AvatarInitial name={profile.name} avatarUrl={profile.avatarUrl} />
          <div className="space-y-1">
            <h1 className="font-[family-name:var(--type-display)] text-[28px] italic font-light text-[var(--bone)] leading-tight">
              {profile.name}
            </h1>
            <p className="font-mono text-xs text-[var(--bone-mute)]">{profile.email}</p>
            <div className="flex items-center gap-3 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] border border-[rgba(255,255,255,0.07)] px-2 py-0.5">
                {profile.role}
              </span>
              <span className="font-mono text-[10px] text-[var(--bone-mute)]">
                Desde {formatDate(profile.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Progresso por curso */}
      <section>
        <SectionHeader icon={BookOpen} label="Progresso nos Cursos" />
        <div className="border border-[var(--hairline)] bg-[var(--ink-2)]">
          {courseProgress.length === 0 ? (
            <EmptyState message="Nenhum progresso registrado" />
          ) : (
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {courseProgress.map((cp) => {
                const pct = cp.totalLessons > 0
                  ? Math.round((cp.completedLessons / cp.totalLessons) * 100)
                  : 0
                return (
                  <div key={cp.courseId} className="space-y-3 p-5">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-sans text-sm text-[var(--bone-dim)]">{cp.courseTitle}</span>
                      <span className="font-mono text-sm font-bold text-[var(--bone)] tabular-nums">{pct}%</span>
                    </div>
                    <div className="h-px w-full bg-[rgba(255,255,255,0.07)]">
                      <div
                        className="h-px bg-[var(--ember)] transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] text-[var(--bone-mute)]">
                        {cp.completedLessons} de {cp.totalLessons} aula{cp.totalLessons !== 1 ? 's' : ''} concluída{cp.completedLessons !== 1 ? 's' : ''}
                      </span>
                      {cp.lastActivityAt && (
                        <span className="font-mono text-[10px] text-[var(--bone-mute)]">
                          Última atividade: {formatDate(cp.lastActivityAt)}
                        </span>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* Comentários recentes */}
      <section>
        <SectionHeader icon={MessageSquare} label={`Comentários Recentes (${recentComments.length})`} />
        <div className="border border-[var(--hairline)]">
          {recentComments.length === 0 ? (
            <EmptyState message="Nenhum comentário" />
          ) : (
            <table className="w-full">
              <thead>
                <tr className="border-b border-[var(--hairline-strong)] bg-[var(--ink-2)]">
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Aula</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Comentário</th>
                  <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)] whitespace-nowrap">Data</th>
                </tr>
              </thead>
              <tbody>
                {recentComments.map((c) => (
                  <tr key={c.id} className="border-b border-[rgba(255,255,255,0.07)] last:border-0 hover:bg-[rgba(14,14,17,0.5)]">
                    <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)] max-w-[180px] truncate">
                      {c.lessonTitle}
                    </td>
                    <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)] max-w-xs">
                      <p className="line-clamp-2">{c.content}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)] whitespace-nowrap">
                      {formatDateTime(c.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>

      {/* Fórum */}
      <section>
        <SectionHeader icon={Users} label="Participação no Fórum" />
        <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-2">
          <div className="border border-[var(--hairline)] bg-[var(--ink-2)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Tópicos criados</p>
            <p className="mt-2 font-mono text-3xl font-bold text-[var(--bone)]">{forumActivity.threads}</p>
          </div>
          <div className="border border-[var(--hairline)] bg-[var(--ink-2)] p-5">
            <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Respostas</p>
            <p className="mt-2 font-mono text-3xl font-bold text-[var(--bone)]">{forumActivity.replies}</p>
          </div>
        </div>

        {forumActivity.recentThreads.length > 0 && (
          <div className="border border-[var(--hairline)]">
            <div className="border-b border-[var(--hairline-strong)] bg-[var(--ink-2)] px-4 py-3">
              <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">Tópicos recentes</span>
            </div>
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {forumActivity.recentThreads.map((t) => (
                <div key={t.id} className="flex items-center justify-between px-4 py-3 hover:bg-[rgba(14,14,17,0.5)]">
                  <span className="font-sans text-sm text-[var(--bone-dim)] line-clamp-1">{t.title}</span>
                  <span className="ml-4 shrink-0 font-mono text-[10px] text-[var(--bone-mute)]">
                    {formatDate(t.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Votos no fórum */}
      <section>
        <SectionHeader icon={ThumbsUp} label={`Votos dados no Fórum (${votes.length})`} />
        <div className="border border-[var(--hairline)]">
          {votes.length === 0 ? (
            <EmptyState message="Nenhum voto registrado" />
          ) : (
            <div className="divide-y divide-[rgba(255,255,255,0.07)]">
              {votes.map((v) => (
                <div key={v.id} className="flex items-center justify-between px-4 py-3 hover:bg-[rgba(14,14,17,0.5)]">
                  <div className="space-y-0.5">
                    {v.threadTitle ? (
                      <p className="font-sans text-sm text-[var(--bone-dim)] line-clamp-1">{v.threadTitle}</p>
                    ) : null}
                    <p className="font-mono text-[10px] text-[var(--bone-mute)]">
                      {v.replyId ? 'Voto em resposta' : 'Voto em tópico'}
                    </p>
                  </div>
                  <span className="ml-4 shrink-0 font-mono text-[10px] text-[var(--bone-mute)]">
                    {formatDate(v.createdAt)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

    </div>
  )
}
