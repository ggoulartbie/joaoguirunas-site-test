import type { Database } from '@/types/database'

type Cohort = Database['public']['Tables']['cohorts']['Row']
type Course = Database['public']['Tables']['courses']['Row']
type Module = Database['public']['Tables']['modules']['Row']
type Profile = Database['public']['Tables']['profiles']['Row']
type Payment = Database['public']['Tables']['payments']['Row']
type Comment = Database['public']['Tables']['comments']['Row']
type ForumThread = Database['public']['Tables']['forum_threads']['Row']
type CohortMember = Database['public']['Tables']['cohort_members']['Row']
type LiveSession = Database['public']['Tables']['live_sessions']['Row']
type Coupon = Database['public']['Tables']['coupons']['Row']
type CohortCourse = Database['public']['Tables']['cohort_courses']['Row']
type CrossExtension = Database['public']['Tables']['cohort_cross_extensions']['Row']

export type MockCohort = Cohort
export type MockCourse = Course & { modules: (Module & { lessonCount: number })[] }
export type MockProfile = Profile & {
  memberships?: (CohortMember & { cohortName: string })[]
  paymentCount?: number
}
export type MockPayment = Payment & { userName: string; cohortName: string; userEmail: string }
export type MockComment = Comment & { authorName: string; lessonTitle: string; cohortName: string }
export type MockThread = ForumThread & { authorName: string; categoryName: string; replyCount: number }

export const MOCK_COURSES: MockCourse[] = [
  {
    id: 'course-1',
    slug: 'javascript-avancado',
    title: 'JavaScript Avançado',
    description: 'Closures, Promises, async/await, padrões avançados.',
    cover_image_url: null,
    sort_order: 1,
    published: true,
    created_at: '2026-01-01T00:00:00Z',
    updated_at: '2026-04-01T00:00:00Z',
    deleted_at: null,
    modules: [
      { id: 'mod-1', course_id: 'course-1', slug: 'closures', title: 'Closures e Escopo', description: null, cover_image_url: null, sort_order: 1, created_at: '', updated_at: '', deleted_at: null, lessonCount: 4 },
      { id: 'mod-2', course_id: 'course-1', slug: 'async', title: 'Programação Assíncrona', description: null, cover_image_url: null, sort_order: 2, created_at: '', updated_at: '', deleted_at: null, lessonCount: 5 },
      { id: 'mod-3', course_id: 'course-1', slug: 'patterns', title: 'Padrões de Design', description: null, cover_image_url: null, sort_order: 3, created_at: '', updated_at: '', deleted_at: null, lessonCount: 6 },
    ],
  },
  {
    id: 'course-2',
    slug: 'react-na-pratica',
    title: 'React na Prática',
    description: 'Componentes, hooks, estado global, performance.',
    cover_image_url: null,
    sort_order: 2,
    published: true,
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-04-10T00:00:00Z',
    deleted_at: null,
    modules: [
      { id: 'mod-4', course_id: 'course-2', slug: 'hooks', title: 'Hooks Essenciais', description: null, cover_image_url: null, sort_order: 1, created_at: '', updated_at: '', deleted_at: null, lessonCount: 6 },
      { id: 'mod-5', course_id: 'course-2', slug: 'estado-global', title: 'Estado Global', description: null, cover_image_url: null, sort_order: 2, created_at: '', updated_at: '', deleted_at: null, lessonCount: 4 },
    ],
  },
  {
    id: 'course-3',
    slug: 'nodejs-backend',
    title: 'Node.js Backend',
    description: 'APIs REST, autenticação, banco de dados com PostgreSQL.',
    cover_image_url: null,
    sort_order: 3,
    published: false,
    created_at: '2026-02-01T00:00:00Z',
    updated_at: '2026-04-20T00:00:00Z',
    deleted_at: null,
    modules: [
      { id: 'mod-6', course_id: 'course-3', slug: 'api-rest', title: 'API REST', description: null, cover_image_url: null, sort_order: 1, created_at: '', updated_at: '', deleted_at: null, lessonCount: 7 },
      { id: 'mod-7', course_id: 'course-3', slug: 'auth', title: 'Autenticação e Segurança', description: null, cover_image_url: null, sort_order: 2, created_at: '', updated_at: '', deleted_at: null, lessonCount: 5 },
      { id: 'mod-8', course_id: 'course-3', slug: 'postgres', title: 'PostgreSQL na Prática', description: null, cover_image_url: null, sort_order: 3, created_at: '', updated_at: '', deleted_at: null, lessonCount: 6 },
    ],
  },
]

export const MOCK_COHORTS: MockCohort[] = [
  {
    id: 'cohort-1',
    slug: 'mentoria-maio-2026',
    name: 'Mentoria Maio 2026',
    description: 'Turma presencial de mentoria intensiva com suporte ao vivo.',
    cover_image_url: null,
    status: 'IN_PROGRESS',
    start_date: '2026-05-05',
    end_date: '2026-08-05',
    total_seats: 20,
    filled_seats: 18,
    access_duration_days: 365,
    group_url: 'https://chat.whatsapp.com/exemplo',
    has_live_sessions: true,
    has_support: true,
    is_purchasable: false,
    has_public_page: false,
    entry_price_cents: 870000,
    extension_price_cents: 49900,
    max_installments_entry: 12,
    max_installments_extension: 3,
    extension_duration_days: 365,
    allows_auto_renewal: false,
    stripe_price_entry_id: null,
    stripe_price_extension_id: null,
    payment_provider: 'STRIPE',
    infinitepay_handle: null,
    infinitepay_checkout_url: null,
    created_at: '2026-01-10T00:00:00Z',
    updated_at: '2026-05-01T00:00:00Z',
  },
  {
    id: 'cohort-2',
    slug: 'online-padrao',
    name: 'Online Padrão',
    description: 'Acesso completo ao conteúdo gravado por 6 meses.',
    cover_image_url: null,
    status: 'OPEN',
    start_date: null,
    end_date: null,
    total_seats: null,
    filled_seats: 134,
    access_duration_days: 180,
    group_url: null,
    has_live_sessions: false,
    has_support: false,
    is_purchasable: true,
    has_public_page: true,
    entry_price_cents: 49900,
    extension_price_cents: 29900,
    max_installments_entry: 6,
    max_installments_extension: 3,
    extension_duration_days: 180,
    allows_auto_renewal: true,
    stripe_price_entry_id: 'price_test_entry',
    stripe_price_extension_id: 'price_test_ext',
    payment_provider: 'STRIPE',
    infinitepay_handle: null,
    infinitepay_checkout_url: null,
    created_at: '2026-01-15T00:00:00Z',
    updated_at: '2026-04-20T00:00:00Z',
  },
  {
    id: 'cohort-3',
    slug: 'mentoria-marco-2026',
    name: 'Mentoria Março 2026',
    description: 'Turma encerrada — março a junho 2026.',
    cover_image_url: null,
    status: 'CLOSED',
    start_date: '2026-03-01',
    end_date: '2026-06-01',
    total_seats: 20,
    filled_seats: 20,
    access_duration_days: 365,
    group_url: null,
    has_live_sessions: true,
    has_support: true,
    is_purchasable: false,
    has_public_page: false,
    entry_price_cents: 870000,
    extension_price_cents: 49900,
    max_installments_entry: 12,
    max_installments_extension: 3,
    extension_duration_days: 365,
    allows_auto_renewal: false,
    stripe_price_entry_id: null,
    stripe_price_extension_id: null,
    payment_provider: 'STRIPE',
    infinitepay_handle: null,
    infinitepay_checkout_url: null,
    created_at: '2025-12-01T00:00:00Z',
    updated_at: '2026-03-01T00:00:00Z',
  },
]

export const MOCK_COHORT_COURSES: CohortCourse[] = [
  { cohort_id: 'cohort-1', course_id: 'course-1', included_module_ids: [], sort_order: 1 },
  { cohort_id: 'cohort-1', course_id: 'course-2', included_module_ids: ['mod-4'], sort_order: 2 },
  { cohort_id: 'cohort-2', course_id: 'course-1', included_module_ids: [], sort_order: 1 },
  { cohort_id: 'cohort-2', course_id: 'course-2', included_module_ids: [], sort_order: 2 },
]

export const MOCK_CROSS_EXTENSIONS: CrossExtension[] = [
  {
    id: 'ext-1',
    source_cohort_id: 'cohort-2',
    target_cohort_id: 'cohort-1',
    days_granted: 180,
    is_active: true,
    description: 'Mentorado que comprar Online ganha 180 dias adicionais na Mentoria',
    created_at: '2026-02-01T00:00:00Z',
  },
]

export const MOCK_COHORT_MEMBERS: (CohortMember & { userName: string; userEmail: string })[] = [
  { id: 'mem-1', cohort_id: 'cohort-1', user_id: 'user-1', member_role: 'STUDENT', joined_at: '2026-05-05T00:00:00Z', expires_at: '2027-05-05T00:00:00Z', status: 'ACTIVE', auto_renew_enabled: false, next_renewal_at: null, userName: 'Ana Lima', userEmail: 'ana@exemplo.com' },
  { id: 'mem-2', cohort_id: 'cohort-1', user_id: 'user-2', member_role: 'STUDENT', joined_at: '2026-05-05T00:00:00Z', expires_at: '2027-05-05T00:00:00Z', status: 'ACTIVE', auto_renew_enabled: false, next_renewal_at: null, userName: 'Bruno Costa', userEmail: 'bruno@exemplo.com' },
  { id: 'mem-3', cohort_id: 'cohort-2', user_id: 'user-3', member_role: 'STUDENT', joined_at: '2026-02-10T00:00:00Z', expires_at: '2026-08-10T00:00:00Z', status: 'ACTIVE', auto_renew_enabled: true, next_renewal_at: '2026-08-03T00:00:00Z', userName: 'Carlos Dias', userEmail: 'carlos@exemplo.com' },
]

export const MOCK_LIVE_SESSIONS: (LiveSession & { cohortName: string })[] = [
  { id: 'ls-1', cohort_id: 'cohort-1', title: 'Aula ao Vivo — Closures Avançados', description: 'Revisão e exercícios ao vivo.', scheduled_at: '2026-05-12T18:00:00Z', duration_minutes: 90, meeting_url: 'https://meet.google.com/xxx', recording_url: null, lesson_id: null, created_at: '2026-05-01T00:00:00Z', reminder_1h_sent_at: null, cohortName: 'Mentoria Maio 2026' },
  { id: 'ls-2', cohort_id: 'cohort-1', title: 'Mentoria Individual — Semana 2', description: null, scheduled_at: '2026-05-19T19:00:00Z', duration_minutes: 60, meeting_url: null, recording_url: null, lesson_id: null, created_at: '2026-05-01T00:00:00Z', reminder_1h_sent_at: null, cohortName: 'Mentoria Maio 2026' },
]

export const MOCK_COUPONS: (Coupon & { cohortName: string })[] = [
  { id: 'cup-1', cohort_id: 'cohort-2', code: 'LAUNCH50', discount_kind: 'PERCENT', discount_value: 50, applies_to: 'ENTRY', valid_from: '2026-01-01T00:00:00Z', valid_until: '2026-06-30T23:59:00Z', max_uses: 100, current_uses: 34, is_active: true, stripe_coupon_id: 'stripe_coupon_1', created_at: '2026-01-01T00:00:00Z', cohortName: 'Online Padrão' },
  { id: 'cup-2', cohort_id: 'cohort-2', code: 'RENOVACAO', discount_kind: 'FIXED', discount_value: 5000, applies_to: 'EXTENSION', valid_from: null, valid_until: null, max_uses: null, current_uses: 8, is_active: true, stripe_coupon_id: null, created_at: '2026-02-01T00:00:00Z', cohortName: 'Online Padrão' },
]

export const MOCK_PROFILES: MockProfile[] = [
  { id: 'user-1', name: 'Ana Lima', avatar_url: null, bio: null, role: 'STUDENT', stripe_customer_id: 'cus_1', created_at: '2026-01-10T00:00:00Z', updated_at: '2026-05-01T00:00:00Z', has_set_password: true, paymentCount: 1, memberships: [{ id: 'mem-1', cohort_id: 'cohort-1', user_id: 'user-1', member_role: 'STUDENT', joined_at: '2026-05-05T00:00:00Z', expires_at: '2027-05-05T00:00:00Z', status: 'ACTIVE', auto_renew_enabled: false, next_renewal_at: null, cohortName: 'Mentoria Maio 2026' }] },
  { id: 'user-2', name: 'Bruno Costa', avatar_url: null, bio: null, role: 'STUDENT', stripe_customer_id: 'cus_2', created_at: '2026-01-12T00:00:00Z', updated_at: '2026-04-20T00:00:00Z', has_set_password: true, paymentCount: 2, memberships: [{ id: 'mem-2', cohort_id: 'cohort-1', user_id: 'user-2', member_role: 'STUDENT', joined_at: '2026-05-05T00:00:00Z', expires_at: '2027-05-05T00:00:00Z', status: 'ACTIVE', auto_renew_enabled: false, next_renewal_at: null, cohortName: 'Mentoria Maio 2026' }] },
  { id: 'user-3', name: 'Carlos Dias', avatar_url: null, bio: null, role: 'STUDENT', stripe_customer_id: 'cus_3', created_at: '2026-02-05T00:00:00Z', updated_at: '2026-04-15T00:00:00Z', has_set_password: true, paymentCount: 1, memberships: [{ id: 'mem-3', cohort_id: 'cohort-2', user_id: 'user-3', member_role: 'STUDENT', joined_at: '2026-02-10T00:00:00Z', expires_at: '2026-08-10T00:00:00Z', status: 'ACTIVE', auto_renew_enabled: true, next_renewal_at: '2026-08-03T00:00:00Z', cohortName: 'Online Padrão' }] },
  { id: 'user-4', name: 'Diana Rocha', avatar_url: null, bio: null, role: 'MENTOR', stripe_customer_id: null, created_at: '2025-12-01T00:00:00Z', updated_at: '2026-01-01T00:00:00Z', has_set_password: true, paymentCount: 0, memberships: [] },
  { id: 'user-admin', name: 'João Guirunas', avatar_url: null, bio: null, role: 'ADMIN', stripe_customer_id: null, created_at: '2025-11-01T00:00:00Z', updated_at: '2026-05-01T00:00:00Z', has_set_password: true, paymentCount: 0, memberships: [] },
]

export const MOCK_PAYMENTS: MockPayment[] = [
  { id: 'pay-1', user_id: 'user-1', cohort_id: 'cohort-1', purchase_kind: 'ENTRY', membership_id: 'mem-1', stripe_checkout_session_id: 'cs_test_1', stripe_payment_intent_id: 'pi_test_1', stripe_subscription_id: null, amount_cents: 870000, coupon_id: null, status: 'APPROVED', payment_method: 'card', payment_provider: 'STRIPE',
    infinitepay_order_nsu: null, infinitepay_invoice_slug: null, created_at: '2026-05-04T14:00:00Z', paid_at: '2026-05-04T14:01:00Z', userName: 'Ana Lima', cohortName: 'Mentoria Maio 2026', userEmail: 'ana@exemplo.com' },
  { id: 'pay-2', user_id: 'user-2', cohort_id: 'cohort-1', purchase_kind: 'ENTRY', membership_id: 'mem-2', stripe_checkout_session_id: 'cs_test_2', stripe_payment_intent_id: 'pi_test_2', stripe_subscription_id: null, amount_cents: 870000, coupon_id: null, status: 'APPROVED', payment_method: 'card', payment_provider: 'STRIPE',
    infinitepay_order_nsu: null, infinitepay_invoice_slug: null, created_at: '2026-05-04T15:00:00Z', paid_at: '2026-05-04T15:02:00Z', userName: 'Bruno Costa', cohortName: 'Mentoria Maio 2026', userEmail: 'bruno@exemplo.com' },
  { id: 'pay-3', user_id: 'user-3', cohort_id: 'cohort-2', purchase_kind: 'ENTRY', membership_id: 'mem-3', stripe_checkout_session_id: 'cs_test_3', stripe_payment_intent_id: 'pi_test_3', stripe_subscription_id: null, amount_cents: 49900, coupon_id: null, status: 'APPROVED', payment_method: 'card', payment_provider: 'STRIPE',
    infinitepay_order_nsu: null, infinitepay_invoice_slug: null, created_at: '2026-02-10T10:00:00Z', paid_at: '2026-02-10T10:01:00Z', userName: 'Carlos Dias', cohortName: 'Online Padrão', userEmail: 'carlos@exemplo.com' },
  { id: 'pay-4', user_id: 'user-2', cohort_id: 'cohort-2', purchase_kind: 'EXTENSION', membership_id: 'mem-2', stripe_checkout_session_id: 'cs_test_4', stripe_payment_intent_id: 'pi_test_4', stripe_subscription_id: null, amount_cents: 29900, coupon_id: null, status: 'DECLINED', payment_method: 'card', payment_provider: 'STRIPE',
    infinitepay_order_nsu: null, infinitepay_invoice_slug: null, created_at: '2026-04-28T09:00:00Z', paid_at: null, userName: 'Bruno Costa', cohortName: 'Online Padrão', userEmail: 'bruno@exemplo.com' },
]

export const MOCK_COMMENTS_QUEUE: MockComment[] = [
  { id: 'c-1', lesson_id: 'lesson-1', author_id: 'user-3', parent_comment_id: null, content: 'Ótima explicação! Mas fiquei com dúvida sobre closures em loops — poderiam dar um exemplo?', is_pinned: false, deleted_at: null, created_at: '2026-05-05T08:00:00Z', updated_at: '2026-05-05T08:00:00Z', authorName: 'Carlos Dias', lessonTitle: 'Introdução a Closures', cohortName: 'Online Padrão' },
  { id: 'c-2', lesson_id: 'lesson-2', author_id: 'user-1', parent_comment_id: null, content: 'Link do material da aula está quebrado!', is_pinned: false, deleted_at: null, created_at: '2026-05-05T09:15:00Z', updated_at: '2026-05-05T09:15:00Z', authorName: 'Ana Lima', lessonTitle: 'Promises na Prática', cohortName: 'Mentoria Maio 2026' },
]

export const MOCK_THREADS_QUEUE: MockThread[] = [
  { id: 't-1', category_id: 'cat-1', author_id: 'user-2', title: 'Qual a diferença entre Promise.all e Promise.allSettled?', slug: 'promise-all-vs-allsettled', content: 'Estava estudando promises e fiquei confuso com os dois...', is_pinned: false, is_resolved: false, view_count: 12, deleted_at: null, created_at: '2026-05-04T20:00:00Z', last_activity_at: '2026-05-05T07:30:00Z', authorName: 'Bruno Costa', categoryName: 'Dúvidas Técnicas', replyCount: 2 },
  { id: 't-2', category_id: 'cat-2', author_id: 'user-3', title: 'Networking — alguém da área de São Paulo?', slug: 'networking-sao-paulo', content: 'Queria conectar com outros alunos que trabalham em SP.', is_pinned: false, is_resolved: false, view_count: 8, deleted_at: null, created_at: '2026-05-05T06:00:00Z', last_activity_at: '2026-05-05T06:00:00Z', authorName: 'Carlos Dias', categoryName: 'Networking', replyCount: 0 },
]
