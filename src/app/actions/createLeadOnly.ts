'use server'

// Server action para criar lead nas LPs de cursos (sem pagamento — "Em Breve")
// Recebe: name, email, phone, courseSlug, interests?, origin?
// Dispara CRM webhook + lead webhook (fire-and-forget)
// NÃO faz redirect, NÃO cria usuário no Supabase, NÃO gera checkout session

import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabase/admin'

const VALID_COURSE_SLUGS = [
  'curso-ia-agentes',
  'curso-design',
  'curso-dev',
  'curso-social-media',
  'curso-bundle',
] as const

type CourseSlug = (typeof VALID_COURSE_SLUGS)[number]

const schema = z.object({
  // min 3 chars — consistent with client-side validation
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().optional(),
  courseSlug: z.enum(VALID_COURSE_SLUGS),
  interests: z.array(z.string()).max(10).optional(),
  origin: z.string().max(100).optional(),
})

const LEAD_WEBHOOK_URL =
  'https://wotuyxscsfralqpoiyfv.supabase.co/functions/v1/webhook-inbound?token=104077b6-1c2e-4497-ac63-2ce017c5b337'

function fireLeadWebhook(payload: { name: string; email: string; phone?: string }) {
  fetch(LEAD_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      Nome: payload.name,
      'E-mail': payload.email,
      Whatsapp: payload.phone ?? '',
    }),
  }).catch((err) => {
    // Fire-and-forget: log silently without propagating
    console.warn('[createLeadOnly] lead webhook failed (non-critical):', err instanceof Error ? err.message : String(err))
  })
}

async function getCrmWebhookUrl(): Promise<string | null> {
  const { data } = await supabaseAdmin
    .from('settings')
    .select('value')
    .eq('key', 'crm_webhook_url')
    .maybeSingle()
  return data?.value || process.env.CRM_WEBHOOK_URL || null
}

function fireCrmWebhook(payload: {
  name: string
  email: string
  phone?: string
  courseSlug: CourseSlug
  interests?: string[]
  origin?: string
}) {
  getCrmWebhookUrl()
    .then((url) => {
      if (!url) {
        console.warn('[createLeadOnly] CRM webhook URL not configured — skipping CRM dispatch')
        return
      }
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: payload.name,
          email: payload.email,
          phone: payload.phone ?? '',
          course_slug: payload.courseSlug,
          source: 'landing-page-curso',
          timestamp: new Date().toISOString(),
          ...(payload.interests && payload.interests.length > 0
            ? { interests: payload.interests.join(',') }
            : {}),
          ...(payload.origin ? { origin: payload.origin } : {}),
        }),
      }).catch((err) => {
        // Fire-and-forget: log silently without propagating
        console.warn('[createLeadOnly] CRM webhook failed (non-critical):', err instanceof Error ? err.message : String(err))
      })
    })
    .catch((err) => {
      console.warn('[createLeadOnly] getCrmWebhookUrl failed (non-critical):', err instanceof Error ? err.message : String(err))
    })
}

export async function createLeadOnly(
  name: string,
  email: string,
  phone: string | undefined,
  courseSlug: string,
  interests?: string[],
  origin?: string,
): Promise<{ success: true } | { error: string }> {
  const parsed = schema.safeParse({ name, email, phone, courseSlug, interests, origin })

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Dados inválidos.'
    // Log validation failures for debugging (no PII beyond masked email domain)
    const emailDomain = email.includes('@') ? email.split('@')[1] : 'unknown'
    console.info('[createLeadOnly] validation failed — slug:', courseSlug, '| domain:', emailDomain, '| error:', firstError)
    return { error: firstError }
  }

  const {
    name: validName,
    email: validEmail,
    phone: validPhone,
    courseSlug: validCourseSlug,
    interests: validInterests,
    origin: validOrigin,
  } = parsed.data

  // Log successful lead capture for traceability (no PII — only slug and masked email)
  const emailDomain = validEmail.includes('@') ? validEmail.split('@')[1] : 'unknown'
  console.info('[createLeadOnly] lead captured — slug:', validCourseSlug, '| domain:', emailDomain)

  // Both webhooks are fire-and-forget — errors must not propagate to the user
  fireCrmWebhook({
    name: validName,
    email: validEmail,
    phone: validPhone,
    courseSlug: validCourseSlug,
    interests: validInterests,
    origin: validOrigin,
  })
  fireLeadWebhook({ name: validName, email: validEmail, phone: validPhone })

  return { success: true }
}
