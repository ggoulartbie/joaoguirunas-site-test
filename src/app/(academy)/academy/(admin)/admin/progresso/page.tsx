export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import {
  getStudentsProgress,
  getLessonsCompletionStats,
  getCoursesForFilter,
  getCohortsForFilter,
} from '@/app/actions/admin-progress'

export const metadata: Metadata = { title: 'Progresso' }

function formatDate(iso: string | null): string {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('pt-BR')
}

type SearchParams = Promise<{ courseId?: string; cohortId?: string }>

export default async function AdminProgressoPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const params = await searchParams
  const courseId = params.courseId
  const cohortId = params.cohortId

  const [students, courses, cohorts, lessonStats] = await Promise.all([
    getStudentsProgress({ courseId, cohortId }),
    getCoursesForFilter(),
    getCohortsForFilter(),
    courseId ? getLessonsCompletionStats(courseId) : Promise.resolve(null),
  ])

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[var(--hairline)] pb-4">
        <p className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Admin / Progresso
        </p>
        <h1 className="mt-1 font-[family-name:var(--type-display)] text-[32px] italic font-light text-[var(--bone)]">
          Progresso dos Alunos
        </h1>
        <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
          Acompanhe o avanço dos alunos por curso e turma
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <FilterSelect
          name="courseId"
          label="Curso"
          value={courseId ?? ''}
          options={courses.map((c) => ({ value: c.id, label: c.title }))}
          currentCohortId={cohortId}
        />
        <FilterSelect
          name="cohortId"
          label="Turma"
          value={cohortId ?? ''}
          options={cohorts.map((c) => ({ value: c.id, label: c.name }))}
          currentCourseId={courseId}
        />
        {(courseId || cohortId) && (
          <a
            href="/academy/admin/progresso"
            className="flex items-center px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[var(--bone-mute)] border border-[var(--hairline)] hover:border-[var(--hairline-strong)] transition-colors"
            style={{ borderRadius: 0 }}
          >
            Limpar filtros
          </a>
        )}
      </div>

      {/* Students Table */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
            Alunos — {students.length} resultado{students.length !== 1 ? 's' : ''}
          </span>
        </div>
        <div className="border border-[var(--hairline)]" style={{ borderRadius: 0 }}>
          {students.length === 0 ? (
            <div className="px-4 py-10 text-center">
              <p className="font-mono text-xs text-[var(--bone-mute)]">
                Nenhum aluno encontrado com os filtros selecionados.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px]">
                <thead>
                  <tr className="border-b border-[var(--hairline-strong)] bg-[var(--ink-2)]">
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Aluno
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Email
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Curso
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Progresso
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Última atividade
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((student) =>
                    student.courses.map((course) => (
                      <tr
                        key={`${student.userId}:${course.courseId}`}
                        className="border-b border-[var(--hairline)] last:border-0 hover:bg-[rgba(14,14,17,0.5)]"
                      >
                        <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)]">
                          {student.name}
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">
                          {student.email}
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">
                          {course.courseTitle}
                        </td>
                        <td className="px-4 py-3 min-w-[160px]">
                          <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                              <span className="font-mono text-[11px] text-[var(--bone-dim)]">
                                {course.completedLessons}/{course.totalLessons}
                              </span>
                              <span className="font-mono text-[11px] font-bold text-[var(--bone)]">
                                {course.progressPercent}%
                              </span>
                            </div>
                            <div
                              className="w-full bg-[rgba(255,255,255,0.07)]"
                              style={{ height: '4px', borderRadius: '2px' }}
                            >
                              <div
                                style={{
                                  width: `${course.progressPercent}%`,
                                  height: '4px',
                                  borderRadius: '2px',
                                  background: 'var(--ember)',
                                }}
                              />
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">
                          {formatDate(course.lastActivityAt)}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Lesson Completion Stats — only when courseId is selected */}
      {courseId && lessonStats !== null && (
        <div>
          <div className="mb-3">
            <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
              Conclusões por Aula
            </span>
          </div>
          <div className="border border-[var(--hairline)]" style={{ borderRadius: 0 }}>
            {lessonStats.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <p className="font-mono text-xs text-[var(--bone-mute)]">
                  Nenhuma aula encontrada para este curso.
                </p>
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--hairline-strong)] bg-[var(--ink-2)]">
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Módulo
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Aula
                    </th>
                    <th className="px-4 py-3 text-left font-mono text-[10px] uppercase tracking-widest text-[var(--bone-mute)]">
                      Conclusões
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lessonStats.map((stat) => (
                    <tr
                      key={stat.lessonId}
                      className="border-b border-[var(--hairline)] last:border-0 hover:bg-[rgba(14,14,17,0.5)]"
                    >
                      <td className="px-4 py-3 font-mono text-[11px] text-[var(--bone-mute)]">
                        {stat.moduleTitle}
                      </td>
                      <td className="px-4 py-3 font-sans text-sm text-[var(--bone-dim)]">
                        {stat.lessonTitle}
                      </td>
                      <td className="px-4 py-3 min-w-[200px]">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="font-mono text-[11px] text-[var(--bone-mute)]">
                              {stat.completedCount}/{stat.totalEnrolledStudents} alunos
                            </span>
                            <span className="font-mono text-[11px] font-bold text-[var(--bone)]">
                              {stat.completionRate}%
                            </span>
                          </div>
                          <div
                            className="w-full bg-[rgba(255,255,255,0.07)]"
                            style={{ height: '4px', borderRadius: '2px' }}
                          >
                            <div
                              style={{
                                width: `${stat.completionRate}%`,
                                height: '4px',
                                borderRadius: '2px',
                                background: 'var(--ember)',
                              }}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ── Filter Select (server-rendered form) ─────────────────────────────────────

type FilterOption = { value: string; label: string }

function FilterSelect({
  name,
  label,
  value,
  options,
  currentCourseId,
  currentCohortId,
}: {
  name: string
  label: string
  value: string
  options: FilterOption[]
  currentCourseId?: string
  currentCohortId?: string
}) {
  return (
    <form method="GET" action="/academy/admin/progresso" className="flex items-center gap-0">
      {/* Preserve the other filter value */}
      {name !== 'courseId' && currentCourseId && (
        <input type="hidden" name="courseId" value={currentCourseId} />
      )}
      {name !== 'cohortId' && currentCohortId && (
        <input type="hidden" name="cohortId" value={currentCohortId} />
      )}
      <label className="sr-only" htmlFor={`filter-${name}`}>
        {label}
      </label>
      <select
        id={`filter-${name}`}
        name={name}
        defaultValue={value}
        className="appearance-none border border-[var(--hairline)] bg-[var(--ink-2)] px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-[var(--bone-dim)] focus:border-[var(--ember)] focus:outline-none"
        style={{ borderRadius: 0 }}
      >
        <option value="">Todos os {label.toLowerCase()}s</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <button
        type="submit"
        className="border border-l-0 border-[var(--hairline)] bg-[var(--ink-2)] px-3 py-2 font-mono text-[10px] uppercase tracking-wider text-[var(--bone-mute)] hover:bg-[var(--ink-3)] hover:text-[var(--bone)] transition-colors"
        style={{ borderRadius: 0 }}
      >
        Ok
      </button>
    </form>
  )
}
