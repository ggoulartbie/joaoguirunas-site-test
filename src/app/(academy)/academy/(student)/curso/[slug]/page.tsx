import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  Lock,
  CheckCircle2,
  ChevronDown,
  ExternalLink,
} from 'lucide-react'
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
    <div className="mx-auto max-w-4xl">
      {/* Hero header */}
      <div
        className="border-b p-6 lg:p-8"
        style={{
          background: 'var(--ink)',
          borderColor: 'var(--hairline)',
        }}
      >
        {/* Breadcrumb */}
        <p className="font-mono text-[11px] uppercase tracking-wider" style={{ color: 'var(--bone-mute)' }}>
          <Link
            href="/academy/meus-cursos"
            className="transition-colors hover:text-[var(--bone)]"
            style={{ color: 'var(--bone-mute)' }}
          >
            Meus Cursos
          </Link>
          {' / '}
          <span style={{ color: 'var(--bone-dim)' }}>{course.title}</span>
        </p>

        <h1
          className="mt-3 font-[var(--type-display)] italic"
          style={{
            fontSize: 'clamp(2rem, 5vw, 2.625rem)',
            lineHeight: 1.1,
            color: 'var(--bone)',
          }}
        >
          {course.title}
        </h1>

        <p className="mt-3 text-base" style={{ color: 'var(--bone-dim)' }}>
          {course.description}
        </p>

        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
              {course.completedLessons}/{course.totalLessons} aulas concluídas
            </span>
            <span className="font-mono text-sm font-bold" style={{ color: 'var(--ember)' }}>
              {course.progressPercent}%
            </span>
          </div>
          <div
            className="h-px w-full"
            style={{ background: 'var(--ink-3)' }}
            role="progressbar"
            aria-valuenow={course.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-px transition-all"
              style={{
                width: `${course.progressPercent}%`,
                background: 'var(--ember)',
              }}
            />
          </div>
        </div>

        <div className="mt-4 flex items-center gap-4 font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
          <span>{unlockedModules.length} módulos acessíveis</span>
          <span>{completedModules} módulos concluídos</span>
        </div>
      </div>

      {/* Lista de módulos */}
      <div className="mt-8 space-y-2 px-0">
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
                slug={slug}
              />
            )
          }

          return (
            <ModuleAccordion
              key={module.id}
              module={module}
              index={index}
              slug={slug}
              isComplete={isComplete}
              moduleProgress={moduleProgress}
            />
          )
        })}
      </div>
    </div>
  )
}

function ModuleAccordion({
  module,
  index,
  slug,
  isComplete,
  moduleProgress,
}: {
  module: (typeof MOCK_MODULES)[number]
  index: number
  slug: string
  isComplete: boolean
  moduleProgress: number
}) {
  return (
    <details
      className="group"
      style={{
        background: 'var(--ink)',
        border: '1px solid var(--hairline)',
      }}
      open
    >
      <summary
        className="flex cursor-pointer list-none items-center justify-between p-4"
        style={{ borderBottom: '1px solid var(--hairline)' }}
      >
        <div className="flex items-center gap-3">
          <span className="font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="text-[15px] font-medium" style={{ color: 'var(--bone)' }}>
            {module.title}
          </span>
          {isComplete && (
            <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-400" aria-hidden="true" />
          )}
        </div>
        <div className="flex items-center gap-3">
          <span
            className="font-mono text-[11px]"
            style={{ color: 'var(--bone-mute)' }}
          >
            {module.totalLessons} aulas
          </span>
          {moduleProgress > 0 && moduleProgress < 100 && (
            <span className="font-mono text-[11px]" style={{ color: 'var(--ember)' }}>
              {moduleProgress}%
            </span>
          )}
          <ChevronDown
            className="h-4 w-4 transition-transform group-open:rotate-180"
            style={{ color: 'var(--bone-mute)' }}
            aria-hidden="true"
          />
        </div>
      </summary>

      <div
        className="px-4 py-3"
        style={{ borderTop: '1px solid var(--hairline)' }}
      >
        <p className="font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
          {module.completedLessons}/{module.totalLessons} aulas concluídas
        </p>
      </div>
    </details>
  )
}

function LockedModuleCard({
  module,
  index,
}: {
  module: (typeof MOCK_MODULES)[number]
  index: number
  slug: string
}) {
  return (
    <div
      className="flex items-start gap-4 p-4 opacity-60"
      style={{
        background: 'var(--ink)',
        border: '1px solid var(--hairline)',
      }}
    >
      <span className="mt-0.5 shrink-0 font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Lock className="h-3.5 w-3.5 shrink-0" style={{ color: 'var(--bone-mute)' }} aria-hidden="true" />
          <span className="text-[15px] font-medium" style={{ color: 'var(--bone-mute)' }}>
            {module.title}
          </span>
        </div>

        {module.lockedByCohortName && (
          <p className="mt-1 font-mono text-[11px]" style={{ color: 'var(--bone-mute)' }}>
            Disponível na turma{' '}
            <span style={{ color: 'var(--bone-dim)' }}>{module.lockedByCohortName}</span>
          </p>
        )}

        {module.lockedByCohortSlug && (
          <Link
            href={`/turmas/${module.lockedByCohortSlug}`}
            className="mt-2 flex items-center gap-1 font-mono text-[10px] uppercase tracking-wide transition-colors"
            style={{ color: 'rgba(255,58,14,0.6)' }}
          >
            <ExternalLink className="h-3 w-3" />
            Conhecer turma
          </Link>
        )}
      </div>
    </div>
  )
}
