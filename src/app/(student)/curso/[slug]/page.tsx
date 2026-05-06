import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Lock,
  CheckCircle2,
  Circle,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react'
import { ProgressBar } from '@/components/student/ProgressBar'
import { MOCK_COURSES, MOCK_MODULES } from '@/components/student/mock-data'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const course = MOCK_COURSES.find((c) => c.slug === slug)
  return { title: course?.title ?? 'Curso' }
}

export default async function CursoPage({ params }: Props) {
  const { slug } = await params

  // TODO F3.2: substituir por getCourseWithModules(slug, userId)
  // valida acesso, carrega módulos com progresso real
  const course = MOCK_COURSES.find((c) => c.slug === slug)

  if (!course) notFound()

  const modules = MOCK_MODULES
  const completedModules = modules.filter(
    (m) => !m.isLocked && m.completedLessons === m.totalLessons && m.totalLessons > 0
  ).length
  const unlockedModules = modules.filter((m) => !m.isLocked)

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      {/* Breadcrumb */}
      <div>
        <Link
          href="/meus-cursos"
          className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
        >
          <ArrowLeft className="h-3 w-3" />
          Meus Cursos
        </Link>
      </div>

      {/* Header do curso */}
      <div className="border border-white/10 bg-[#0C0C12] p-6">
        <div className="mb-1">
          <span className="border border-white/10 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide text-white/40">
            {course.cohortName}
          </span>
        </div>
        <h1 className="mt-3 text-2xl font-bold text-white">{course.title}</h1>
        <p className="mt-2 text-sm text-white/60">{course.description}</p>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-white/40">
              {course.completedLessons}/{course.totalLessons} aulas concluídas
            </span>
            <span className="font-mono text-sm font-bold text-[#FF3A0E]">
              {course.progressPercent}%
            </span>
          </div>
          <ProgressBar value={course.progressPercent} />
        </div>

        <div className="mt-4 flex items-center gap-4 font-mono text-xs text-white/30">
          <span>{unlockedModules.length} módulos acessíveis</span>
          <span>{completedModules} módulos concluídos</span>
        </div>
      </div>

      {/* Lista de módulos */}
      <div className="space-y-3">
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/40">
          Módulos
        </h2>

        {modules.map((module, index) => {
          const moduleProgress =
            module.totalLessons > 0
              ? Math.round((module.completedLessons / module.totalLessons) * 100)
              : 0
          const isComplete =
            !module.isLocked &&
            module.totalLessons > 0 &&
            module.completedLessons === module.totalLessons

          if (module.isLocked) {
            return (
              <LockedModuleCard
                key={module.id}
                module={module}
                index={index}
              />
            )
          }

          return (
            <Link
              key={module.id}
              href={`/curso/${slug}/modulo/${module.slug}`}
              className="group flex items-start gap-4 border border-white/10 bg-[#0C0C12] p-4 transition-colors hover:border-white/20 hover:bg-[#121218]"
            >
              {/* Index */}
              <span className="mt-0.5 shrink-0 font-mono text-sm text-white/20">
                {String(index + 1).padStart(2, '0')}
              </span>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-white group-hover:text-[#FF3A0E] transition-colors">
                    {module.title}
                  </h3>
                  {isComplete && (
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-green-400" aria-hidden="true" />
                  )}
                </div>

                <div className="mt-2 flex items-center gap-3">
                  <span className="font-mono text-xs text-white/40">
                    {module.completedLessons}/{module.totalLessons} aulas
                  </span>
                  {moduleProgress > 0 && moduleProgress < 100 && (
                    <span className="font-mono text-xs text-[#FF3A0E]">
                      Em andamento
                    </span>
                  )}
                </div>

                <div className="mt-2">
                  <ProgressBar value={moduleProgress} />
                </div>
              </div>

              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-white/20 transition-colors group-hover:text-white/60" aria-hidden="true" />
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function LockedModuleCard({
  module,
  index,
}: {
  module: (typeof MOCK_MODULES)[number]
  index: number
}) {
  return (
    <div className="flex items-start gap-4 border border-white/5 bg-[#0C0C12]/40 p-4 opacity-70">
      <span className="mt-0.5 shrink-0 font-mono text-sm text-white/15">
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0 text-white/30" aria-hidden="true" />
          <h3 className="font-semibold text-white/40">{module.title}</h3>
        </div>

        <p className="mt-1 text-xs text-white/30">
          Esta aula faz parte da turma{' '}
          <span className="text-white/50">{module.lockedByCohortName}</span>
        </p>

        {module.lockedByCohortSlug && (
          <Link
            href={`/turmas/${module.lockedByCohortSlug}`}
            className="mt-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide text-[#FF3A0E]/60 hover:text-[#FF3A0E] transition-colors"
          >
            <ExternalLink className="h-3 w-3" />
            Conhecer turma
          </Link>
        )}
      </div>

      <Circle className="mt-1 h-4 w-4 shrink-0 text-white/10" aria-hidden="true" />
    </div>
  )
}
