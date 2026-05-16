import type { Database } from '../src/types/database'

type Tables = Database['public']['Tables']

// Identidade
export type Profile = Tables['profiles']['Row']
export type ProfileInsert = Tables['profiles']['Insert']
export type ProfileUpdate = Tables['profiles']['Update']

// Catálogo
export type Course = Tables['courses']['Row']
export type CourseInsert = Tables['courses']['Insert']
export type CourseUpdate = Tables['courses']['Update']

export type Module = Tables['modules']['Row']
export type ModuleInsert = Tables['modules']['Insert']

export type Lesson = Tables['lessons']['Row']
export type LessonInsert = Tables['lessons']['Insert']

export type Material = Tables['materials']['Row']
export type MaterialInsert = Tables['materials']['Insert']

// Cohorts
export type Cohort = Tables['cohorts']['Row']
export type CohortInsert = Tables['cohorts']['Insert']
export type CohortUpdate = Tables['cohorts']['Update']

export type CohortCourse = Tables['cohort_courses']['Row']
export type CohortCrossExtension = Tables['cohort_cross_extensions']['Row']

export type CohortMember = Tables['cohort_members']['Row']
export type CohortMemberInsert = Tables['cohort_members']['Insert']
export type CohortMemberUpdate = Tables['cohort_members']['Update']

export type LiveSession = Tables['live_sessions']['Row']

// Pagamentos
export type Coupon = Tables['coupons']['Row']
export type Payment = Tables['payments']['Row']
export type PaymentInsert = Tables['payments']['Insert']
export type WebhookEvent = Tables['webhook_events']['Row']
export type WebhookEventInsert = Tables['webhook_events']['Insert']

// Progresso e certificados
export type LessonProgress = Tables['lesson_progress']['Row']
export type LessonProgressInsert = Tables['lesson_progress']['Insert']
export type Certificate = Tables['certificates']['Row']

// Comunidade
export type Comment = Tables['comments']['Row']
export type CommentInsert = Tables['comments']['Insert']

export type ForumCategory = Tables['forum_categories']['Row']
export type ForumThread = Tables['forum_threads']['Row']
export type ForumThreadInsert = Tables['forum_threads']['Insert']
export type ForumReply = Tables['forum_replies']['Row']
export type ForumReplyInsert = Tables['forum_replies']['Insert']
export type Vote = Tables['votes']['Row']

// Auxiliares
export type Notification = Tables['notifications']['Row']

// Enums úteis (derivados dos checks — mantidos em sync com o schema)
export type UserRole = 'STUDENT' | 'MENTOR' | 'SUPPORT' | 'ADMIN'
export type CohortStatus = 'DRAFT' | 'OPEN' | 'IN_PROGRESS' | 'CLOSED' | 'ARCHIVED'
export type MemberStatus = 'ACTIVE' | 'EXPIRED' | 'REMOVED' | 'PAST_DUE'
export type MemberRole = 'STUDENT' | 'MONITOR' | 'MENTOR'
export type LessonKind = 'VIDEO' | 'LIVE' | 'IN_PERSON' | 'CODE' | 'READING'
export type VideoProvider = 'VIMEO' | 'YOUTUBE' | 'CLOUDFLARE_STREAM'
export type ContentFormat = 'MDX' | 'HTML' | 'MARKDOWN'
export type MaterialKind = 'PDF' | 'ZIP' | 'IMAGE' | 'LINK' | 'OTHER'
export type PurchaseKind = 'ENTRY' | 'EXTENSION' | 'AUTO_RENEWAL'
export type PaymentStatus = 'PENDING' | 'APPROVED' | 'DECLINED' | 'REFUNDED'
export type DiscountKind = 'PERCENT' | 'FIXED'
export type CouponAppliesTo = 'ENTRY' | 'EXTENSION' | 'BOTH'
