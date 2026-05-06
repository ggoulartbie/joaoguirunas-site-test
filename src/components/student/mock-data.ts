// Dados mockados para desenvolvimento da UI — serão substituídos por queries Supabase na F3.2+

export type CohortCard = {
  id: string
  name: string
  slug: string
  progressPercent: number
  expiresAt: Date | null
  lastAccessedLessonTitle: string | null
  lastAccessedLessonSlug: string | null
  lastAccessedCourseSlug: string | null
  hasLiveSessions: boolean
  nextLiveSessionAt: Date | null
}

export type CourseCard = {
  id: string
  slug: string
  title: string
  description: string
  coverImageUrl: string | null
  progressPercent: number
  totalLessons: number
  completedLessons: number
  cohortName: string
  cohortSlug: string
  isPartialAccess: boolean
  accessibleModulesCount: number
  totalModulesCount: number
}

export type ModuleItem = {
  id: string
  slug: string
  title: string
  sortOrder: number
  isLocked: boolean
  lockedByCohortName: string | null
  lockedByCohortSlug: string | null
  totalLessons: number
  completedLessons: number
}

export const MOCK_COHORTS: CohortCard[] = [
  {
    id: '1',
    name: 'Mentoria — Turma Maio 2026',
    slug: 'mentoria-maio-2026',
    progressPercent: 34,
    expiresAt: new Date('2026-11-30'),
    lastAccessedLessonTitle: 'Frameworks de decisão com IA',
    lastAccessedLessonSlug: 'frameworks-decisao-ia',
    lastAccessedCourseSlug: 'estrategia-ia',
    hasLiveSessions: true,
    nextLiveSessionAt: new Date('2026-05-08T19:00:00'),
  },
  {
    id: '2',
    name: 'Curso Online — Padrão',
    slug: 'online-padrao',
    progressPercent: 72,
    expiresAt: new Date('2026-06-15'),
    lastAccessedLessonTitle: 'Claude Code na prática',
    lastAccessedLessonSlug: 'claude-code-pratica',
    lastAccessedCourseSlug: 'claude-code',
    hasLiveSessions: false,
    nextLiveSessionAt: null,
  },
]

export const MOCK_COURSES: CourseCard[] = [
  {
    id: 'c1',
    slug: 'estrategia-ia',
    title: 'Estratégia com IA',
    description: 'Frameworks de decisão, planejamento e execução com modelos de linguagem.',
    coverImageUrl: null,
    progressPercent: 34,
    totalLessons: 24,
    completedLessons: 8,
    cohortName: 'Mentoria — Turma Maio 2026',
    cohortSlug: 'mentoria-maio-2026',
    isPartialAccess: false,
    accessibleModulesCount: 4,
    totalModulesCount: 4,
  },
  {
    id: 'c2',
    slug: 'claude-code',
    title: 'Claude Code',
    description: 'Do zero ao fluxo de trabalho com Claude Code, Cursor e agentes de código.',
    coverImageUrl: null,
    progressPercent: 72,
    totalLessons: 18,
    completedLessons: 13,
    cohortName: 'Curso Online — Padrão',
    cohortSlug: 'online-padrao',
    isPartialAccess: false,
    accessibleModulesCount: 3,
    totalModulesCount: 3,
  },
  {
    id: 'c3',
    slug: 'multi-agent',
    title: 'Multi-Agent Systems',
    description: 'Arquitetura e orquestração de sistemas com múltiplos agentes.',
    coverImageUrl: null,
    progressPercent: 0,
    totalLessons: 16,
    completedLessons: 0,
    cohortName: 'Mentoria — Turma Maio 2026',
    cohortSlug: 'mentoria-maio-2026',
    isPartialAccess: true,
    accessibleModulesCount: 1,
    totalModulesCount: 4,
  },
]

export const MOCK_MODULES: ModuleItem[] = [
  {
    id: 'm1',
    slug: 'fundamentos',
    title: 'Fundamentos',
    sortOrder: 1,
    isLocked: false,
    lockedByCohortName: null,
    lockedByCohortSlug: null,
    totalLessons: 6,
    completedLessons: 6,
  },
  {
    id: 'm2',
    slug: 'prompt-engineering',
    title: 'Prompt Engineering Avançado',
    sortOrder: 2,
    isLocked: false,
    lockedByCohortName: null,
    lockedByCohortSlug: null,
    totalLessons: 8,
    completedLessons: 5,
  },
  {
    id: 'm3',
    slug: 'agentes-autonomos',
    title: 'Agentes Autônomos',
    sortOrder: 3,
    isLocked: false,
    lockedByCohortName: null,
    lockedByCohortSlug: null,
    totalLessons: 7,
    completedLessons: 2,
  },
  {
    id: 'm4',
    slug: 'producao-e-deploy',
    title: 'Produção & Deploy',
    sortOrder: 4,
    isLocked: true,
    lockedByCohortName: 'Mentoria — Turma Avançada',
    lockedByCohortSlug: 'mentoria-avancada',
    totalLessons: 5,
    completedLessons: 0,
  },
]
