import type { Metadata } from 'next'
import Link from 'next/link'
import { Lock, BookOpen, CheckCircle2 } from 'lucide-react'
import { ProgressBar } from '@/components/student/ProgressBar'
import { MOCK_COURSES } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Meus Cursos' }

export default function MeusCursosPage() {
  // TODO F3.2: substituir por getUserCourses(userId) — união das cohorts ativas
  const courses = MOCK_COURSES

  const available = courses.filter((c) => !c.isPartialAccess || c.accessibleModulesCount > 0)
  const locked = courses.filter((c) => c.isPartialAccess && c.accessibleModulesCount === 0)

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Meus Cursos</h1>
        <p className="mt-1 text-sm text-white/50">
          Conteúdo liberado pelas suas turmas ativas
        </p>
      </div>

      {/* Cursos acessíveis */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {available.map((course) => (
          <Link
            key={course.id}
            href={`/curso/${course.slug}`}
            className="group flex flex-col border border-white/10 bg-[#0C0C12] p-5 transition-colors hover:border-white/20 hover:bg-[#121218]"
          >
            {/* Cover placeholder */}
            <div className="mb-4 flex h-28 items-center justify-center bg-white/5">
              <BookOpen className="h-8 w-8 text-white/20" />
            </div>

            <div className="flex flex-1 flex-col">
              <h2 className="font-semibold text-white group-hover:text-[#FF3A0E] transition-colors">
                {course.title}
              </h2>
              <p className="mt-1 line-clamp-2 text-xs text-white/50">
                {course.description}
              </p>

              {/* Cohort badge */}
              <div className="mt-3">
                <span className="inline-block border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/40">
                  {course.cohortName}
                </span>
              </div>

              {/* Acesso parcial */}
              {course.isPartialAccess && (
                <div className="mt-2 flex items-center gap-1.5 text-yellow-400">
                  <Lock className="h-3 w-3" />
                  <span className="font-mono text-[10px] uppercase tracking-wide">
                    {course.accessibleModulesCount}/{course.totalModulesCount} módulos
                  </span>
                </div>
              )}

              {/* Progresso */}
              <div className="mt-4 space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-wide text-white/30">
                    {course.completedLessons}/{course.totalLessons} aulas
                  </span>
                  {course.progressPercent === 100 && (
                    <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                  )}
                </div>
                <ProgressBar value={course.progressPercent} showLabel />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Cursos completamente bloqueados */}
      {locked.length > 0 && (
        <div>
          <h2 className="font-mono text-xs uppercase tracking-widest text-white/30">
            Conteúdo bloqueado
          </h2>
          <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {locked.map((course) => (
              <div
                key={course.id}
                className="flex flex-col border border-white/5 bg-[#0C0C12]/50 p-5 opacity-60"
              >
                <div className="mb-4 flex h-28 items-center justify-center bg-white/3">
                  <Lock className="h-8 w-8 text-white/15" />
                </div>
                <h2 className="font-semibold text-white/50">{course.title}</h2>
                <p className="mt-1 text-xs text-white/30">{course.description}</p>
                <Link
                  href={`/turmas/${course.cohortSlug}`}
                  className="mt-4 font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]/70 hover:text-[#FF3A0E] transition-colors"
                >
                  Disponível na turma {course.cohortName} &rarr;
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
