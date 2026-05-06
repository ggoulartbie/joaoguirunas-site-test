import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, BookOpen } from 'lucide-react'
import { MOCK_COURSES } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Meus Cursos' }

function formatDate(date: string | null): string {
  if (!date) return ''
  return new Intl.DateTimeFormat('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' }).format(new Date(date))
}

export default function MeusCursosPage() {
  // TODO F3.2: substituir por getUserCourses(userId) — união das cohorts ativas
  const courses = MOCK_COURSES

  const available = courses.filter((c) => !c.isPartialAccess || c.accessibleModulesCount > 0)
  const locked = courses.filter((c) => c.isPartialAccess && c.accessibleModulesCount === 0)

  return (
    <div className="mx-auto max-w-5xl space-y-12">
      {/* Page header */}
      <div>
        <p
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--bone-mute)',
            marginBottom: 12,
          }}
        >
          Academy · Área do aluno
        </p>
        <h1
          style={{
            fontFamily: 'var(--type-display)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw, 40px)',
            fontStyle: 'italic',
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: 'var(--bone)',
          }}
        >
          Meus Cursos
        </h1>
        {available.length > 0 && (
          <p
            style={{
              fontFamily: 'var(--type-sans)',
              fontSize: 14,
              color: 'var(--bone-mute)',
              marginTop: 8,
            }}
          >
            {available.length} {available.length === 1 ? 'curso disponível' : 'cursos disponíveis'}
          </p>
        )}
      </div>

      {/* Grid de cursos acessíveis */}
      {available.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-3" style={{ background: 'var(--hairline)' }}>
          {available.map((course) => {
            const isComplete = course.progressPercent === 100
            const status = isComplete ? 'CONCLUÍDO' : course.isPartialAccess ? 'PARCIAL' : 'ATIVO'

            return (
              <Link
                key={course.id}
                href={`/curso/${course.slug}`}
                className="group flex flex-col"
                style={{
                  background: 'var(--ink)',
                  overflow: 'hidden',
                  transition: 'border-color 0.15s',
                  border: '1px solid var(--hairline)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'var(--hairline-strong)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--hairline)')}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: 'var(--ink-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <BookOpen
                    style={{ width: 32, height: 32, color: 'rgba(132,132,140,0.3)' }}
                  />
                </div>

                {/* Body */}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  {/* Badge status */}
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--type-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      border: isComplete
                        ? '1px solid rgba(255,255,255,0.07)'
                        : '1px solid rgba(255,58,14,0.3)',
                      color: isComplete ? 'var(--bone-mute)' : 'var(--ember)',
                      padding: '2px 8px',
                      alignSelf: 'flex-start',
                    }}
                  >
                    {status}
                  </span>

                  {/* Nome */}
                  <p
                    style={{
                      fontFamily: 'var(--type-sans)',
                      fontWeight: 500,
                      fontSize: 16,
                      color: 'var(--bone)',
                      marginTop: 8,
                      lineHeight: 1.3,
                    }}
                  >
                    {course.title}
                  </p>

                  {/* Descrição */}
                  {course.description && (
                    <p
                      style={{
                        fontFamily: 'var(--type-sans)',
                        fontSize: 13,
                        color: 'var(--bone-dim)',
                        marginTop: 4,
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </p>
                  )}

                  {/* Acesso parcial */}
                  {course.isPartialAccess && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                        marginTop: 10,
                      }}
                    >
                      <Lock style={{ width: 12, height: 12, color: 'var(--bone-mute)' }} />
                      <span
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 10,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--bone-mute)',
                        }}
                      >
                        {course.accessibleModulesCount}/{course.totalModulesCount} módulos
                      </span>
                    </div>
                  )}

                  {/* Progress bar */}
                  <div style={{ marginTop: 'auto', paddingTop: 12 }}>
                    <div
                      style={{
                        height: 2,
                        background: 'var(--ink-3)',
                        position: 'relative',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          position: 'absolute',
                          left: 0,
                          top: 0,
                          height: '100%',
                          width: `${course.progressPercent}%`,
                          background: 'var(--ember)',
                        }}
                      />
                    </div>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        marginTop: 4,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--type-mono)',
                          fontSize: 10,
                          fontWeight: 700,
                          color: 'var(--ember)',
                        }}
                      >
                        {course.progressPercent}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card footer */}
                <div
                  style={{
                    borderTop: '1px solid var(--hairline)',
                    padding: '12px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 11,
                      color: 'var(--bone-mute)',
                    }}
                  >
                    {course.completedLessons}/{course.totalLessons} aulas
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ember)',
                      transition: 'color 0.15s',
                    }}
                    className="group-hover:text-[var(--ember-glow)]"
                  >
                    Acessar →
                  </span>
                </div>
              </Link>
            )
          })}
        </div>
      )}

      {/* Cursos bloqueados */}
      {locked.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: 'var(--type-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'var(--bone-mute)',
              marginBottom: 16,
            }}
          >
            Conteúdo bloqueado
          </p>
          <div className="grid gap-px sm:grid-cols-2 xl:grid-cols-3" style={{ background: 'var(--hairline)' }}>
            {locked.map((course) => (
              <div
                key={course.id}
                style={{
                  background: 'var(--ink)',
                  border: '1px solid var(--hairline)',
                  overflow: 'hidden',
                  opacity: 0.6,
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Thumbnail */}
                <div
                  style={{
                    aspectRatio: '16/9',
                    background: 'var(--ink-2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Lock style={{ width: 32, height: 32, color: 'rgba(132,132,140,0.3)' }} />
                </div>

                {/* Body */}
                <div style={{ padding: '20px', flex: 1 }}>
                  <span
                    style={{
                      display: 'inline-block',
                      fontFamily: 'var(--type-mono)',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      border: '1px solid var(--hairline)',
                      color: 'var(--bone-mute)',
                      padding: '2px 8px',
                    }}
                  >
                    Bloqueado
                  </span>
                  <p
                    style={{
                      fontFamily: 'var(--type-sans)',
                      fontWeight: 500,
                      fontSize: 16,
                      color: 'var(--bone)',
                      marginTop: 8,
                    }}
                  >
                    {course.title}
                  </p>
                  {course.description && (
                    <p
                      style={{
                        fontFamily: 'var(--type-sans)',
                        fontSize: 13,
                        color: 'var(--bone-dim)',
                        marginTop: 4,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {course.description}
                    </p>
                  )}
                </div>

                {/* Footer */}
                <div
                  style={{
                    borderTop: '1px solid var(--hairline)',
                    padding: '12px 20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 11,
                      color: 'var(--bone-mute)',
                    }}
                  >
                    {course.cohortName}
                  </span>
                  <Link
                    href={`/turmas/${course.cohortSlug}`}
                    style={{
                      fontFamily: 'var(--type-mono)',
                      fontSize: 11,
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--ember)',
                      textDecoration: 'none',
                    }}
                  >
                    Ver turma →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 40px',
        textAlign: 'center',
        border: '1px solid var(--hairline)',
        background: 'var(--ink)',
      }}
    >
      <BookOpen
        style={{ width: 48, height: 48, color: 'rgba(132,132,140,0.3)', marginBottom: 20 }}
      />
      <p
        style={{
          fontFamily: 'var(--type-sans)',
          fontSize: 16,
          color: 'var(--bone-mute)',
          marginBottom: 20,
        }}
      >
        Nenhum curso encontrado
      </p>
      <Link
        href="/turmas"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 8,
          fontFamily: 'var(--type-mono)',
          fontSize: 11,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--ember)',
          textDecoration: 'none',
        }}
      >
        Explorar turmas →
      </Link>
    </div>
  )
}
