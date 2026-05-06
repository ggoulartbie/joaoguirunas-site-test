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

export type CertificateItem = {
  id: string
  verificationCode: string
  courseName: string
  courseSlug: string
  cohortName: string
  issuedAt: Date
  pdfAvailable: boolean
}

export const MOCK_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert1',
    verificationCode: 'AIOX-2026-X7K9P2',
    courseName: 'Claude Code',
    courseSlug: 'claude-code',
    cohortName: 'Curso Online — Padrão',
    issuedAt: new Date('2026-04-20'),
    pdfAvailable: true,
  },
]

export type ForumCategory = {
  id: string
  slug: string
  name: string
  description: string
  color: string
  threadCount: number
}

export type ForumThread = {
  id: string
  slug: string
  categorySlug: string
  categoryName: string
  title: string
  content: string
  authorName: string
  authorRole: 'STUDENT' | 'MENTOR' | 'ADMIN'
  createdAt: Date
  lastActivityAt: Date
  replyCount: number
  voteCount: number
  isResolved: boolean
  isPinned: boolean
}

export type ForumReply = {
  id: string
  threadId: string
  authorName: string
  authorRole: 'STUDENT' | 'MENTOR' | 'ADMIN'
  content: string
  createdAt: Date
  voteCount: number
  isAcceptedAnswer: boolean
  parentReplyId: string | null
}

export const MOCK_FORUM_CATEGORIES: ForumCategory[] = [
  {
    id: 'cat1',
    slug: 'duvidas-tecnicas',
    name: 'Dúvidas Técnicas',
    description: 'Perguntas sobre implementação, código e ferramentas.',
    color: '#FF3A0E',
    threadCount: 14,
  },
  {
    id: 'cat2',
    slug: 'geral',
    name: 'Geral',
    description: 'Discussões livres sobre IA, carreira e projetos.',
    color: '#22C55E',
    threadCount: 8,
  },
  {
    id: 'cat3',
    slug: 'networking',
    name: 'Networking',
    description: 'Apresentações, colaborações e oportunidades.',
    color: '#A78BFA',
    threadCount: 5,
  },
]

export const MOCK_FORUM_THREADS: ForumThread[] = [
  {
    id: 't1',
    slug: 'como-estruturar-system-prompt-para-agentes',
    categorySlug: 'duvidas-tecnicas',
    categoryName: 'Dúvidas Técnicas',
    title: 'Como estruturar system prompt para agentes com múltiplos papéis?',
    content: 'Estou tentando criar um agente que alterna entre pesquisador e redator. Qual a melhor abordagem para o system prompt?\n\nJá tentei usar XML tags mas o modelo ignora às vezes.',
    authorName: 'Ana Beatriz',
    authorRole: 'STUDENT',
    createdAt: new Date('2026-05-03T14:30:00'),
    lastActivityAt: new Date('2026-05-04T09:15:00'),
    replyCount: 3,
    voteCount: 7,
    isResolved: true,
    isPinned: false,
  },
  {
    id: 't2',
    slug: 'dica-de-carreira-transicao-para-ia',
    categorySlug: 'geral',
    categoryName: 'Geral',
    title: 'Dica de carreira: como fiz a transição para trabalhar com IA',
    content: 'Depois de 10 anos como dev backend, decidi migrar para engenharia de prompts e automação com IA. Quero compartilhar o que funcionou.',
    authorName: 'Carlos Henrique',
    authorRole: 'STUDENT',
    createdAt: new Date('2026-05-01T10:00:00'),
    lastActivityAt: new Date('2026-05-01T18:20:00'),
    replyCount: 12,
    voteCount: 24,
    isResolved: false,
    isPinned: true,
  },
  {
    id: 't3',
    slug: 'erro-ao-usar-tool-use-com-claude-api',
    categorySlug: 'duvidas-tecnicas',
    categoryName: 'Dúvidas Técnicas',
    title: 'Erro 400 ao usar tool_use com a API do Claude — alguém já viu isso?',
    content: 'Estou recebendo `{"type":"error","error":{"type":"invalid_request_error"}}` ao passar tools com input_schema aninhado.',
    authorName: 'Fernanda Lima',
    authorRole: 'STUDENT',
    createdAt: new Date('2026-05-04T20:00:00'),
    lastActivityAt: new Date('2026-05-05T08:00:00'),
    replyCount: 1,
    voteCount: 3,
    isResolved: false,
    isPinned: false,
  },
]

export const MOCK_FORUM_REPLIES: ForumReply[] = [
  {
    id: 'r1',
    threadId: 't1',
    authorName: 'João Guirunas',
    authorRole: 'MENTOR',
    content: 'Ótima pergunta! Para agentes multi-papel, prefiro usar uma seção `<role>` explícita no início do prompt e um `<current_role>` dinâmico que você injeta a cada turno. O XML funciona bem quando você usa `prefill` no assistant turn para forçar o modelo a iniciar dentro da tag.',
    createdAt: new Date('2026-05-03T15:00:00'),
    voteCount: 5,
    isAcceptedAnswer: true,
    parentReplyId: null,
  },
  {
    id: 'r2',
    threadId: 't1',
    authorName: 'Ricardo Souza',
    authorRole: 'STUDENT',
    content: 'Confirmo o que o João disse. Eu também uso um `<mode>` tag e funciona muito bem.',
    createdAt: new Date('2026-05-03T16:30:00'),
    voteCount: 2,
    isAcceptedAnswer: false,
    parentReplyId: null,
  },
  {
    id: 'r3',
    threadId: 't1',
    authorName: 'Ana Beatriz',
    authorRole: 'STUDENT',
    content: 'Perfeito, resolveu! O prefill foi a chave. Obrigada!',
    createdAt: new Date('2026-05-04T09:15:00'),
    voteCount: 1,
    isAcceptedAnswer: false,
    parentReplyId: 'r1',
  },
]

export type LiveSession = {
  id: string
  title: string
  description: string | null
  scheduledAt: Date
  durationMinutes: number
  cohortName: string
  cohortSlug: string
  meetingUrl: string | null
  recordingUrl: string | null
}

export const MOCK_LIVE_SESSIONS: LiveSession[] = [
  {
    id: 'ls1',
    title: 'Aula ao Vivo — Frameworks de Decisão com IA',
    description: 'Vamos explorar como estruturar processos de decisão assistidos por modelos de linguagem, com exercícios práticos.',
    scheduledAt: new Date('2026-05-08T19:00:00-03:00'),
    durationMinutes: 90,
    cohortName: 'Mentoria — Turma Maio 2026',
    cohortSlug: 'mentoria-maio-2026',
    meetingUrl: null, // liberado 30min antes
    recordingUrl: null,
  },
  {
    id: 'ls2',
    title: 'Sessão de Dúvidas — Multi-Agent Systems',
    description: 'Tire suas dúvidas sobre a implementação de sistemas multi-agente.',
    scheduledAt: new Date('2026-05-15T19:00:00-03:00'),
    durationMinutes: 60,
    cohortName: 'Mentoria — Turma Maio 2026',
    cohortSlug: 'mentoria-maio-2026',
    meetingUrl: null,
    recordingUrl: null,
  },
  {
    id: 'ls3',
    title: 'Workshop — Claude Code na Prática',
    description: 'Hands-on: configurando Claude Code, criando skills customizadas e automatizando fluxos de desenvolvimento.',
    scheduledAt: new Date('2026-04-24T19:00:00-03:00'),
    durationMinutes: 120,
    cohortName: 'Mentoria — Turma Maio 2026',
    cohortSlug: 'mentoria-maio-2026',
    meetingUrl: null,
    recordingUrl: 'https://vimeo.com/123456789',
  },
]

export type Comment = {
  id: string
  lessonId: string
  authorName: string
  authorRole: 'STUDENT' | 'MENTOR' | 'ADMIN'
  content: string
  createdAt: Date
  updatedAt: Date
  deletedAt: Date | null
  isPinned: boolean
  parentCommentId: string | null
}

export const MOCK_COMMENTS: Comment[] = [
  {
    id: 'c1',
    lessonId: 'lesson-demo',
    authorName: 'João Guirunas',
    authorRole: 'MENTOR',
    content: 'Ótima aula! Lembrem de que os conceitos desta aula serão fundamentais para o módulo de agentes.',
    createdAt: new Date('2026-05-01T10:00:00'),
    updatedAt: new Date('2026-05-01T10:00:00'),
    deletedAt: null,
    isPinned: true,
    parentCommentId: null,
  },
  {
    id: 'c2',
    lessonId: 'lesson-demo',
    authorName: 'Ana Beatriz',
    authorRole: 'STUDENT',
    content: 'Ficou muito claro! Tenho uma dúvida: a técnica de prefill funciona também com Sonnet ou apenas com Opus?',
    createdAt: new Date('2026-05-02T14:30:00'),
    updatedAt: new Date('2026-05-02T14:30:00'),
    deletedAt: null,
    isPinned: false,
    parentCommentId: null,
  },
  {
    id: 'c3',
    lessonId: 'lesson-demo',
    authorName: 'João Guirunas',
    authorRole: 'MENTOR',
    content: 'Funciona em todos os modelos da família Claude! O prefill é um recurso da API, não do modelo específico.',
    createdAt: new Date('2026-05-02T15:00:00'),
    updatedAt: new Date('2026-05-02T15:00:00'),
    deletedAt: null,
    isPinned: false,
    parentCommentId: 'c2',
  },
  {
    id: 'c4',
    lessonId: 'lesson-demo',
    authorName: 'Carlos Henrique',
    authorRole: 'STUDENT',
    content: null as unknown as string, // soft deleted
    createdAt: new Date('2026-05-03T09:00:00'),
    updatedAt: new Date('2026-05-03T09:00:00'),
    deletedAt: new Date('2026-05-03T10:00:00'),
    isPinned: false,
    parentCommentId: null,
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
