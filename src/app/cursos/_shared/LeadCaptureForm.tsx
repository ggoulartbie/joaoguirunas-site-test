'use client'

import { useActionState, useRef, useEffect, useState, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { createLeadOnly } from '@/app/actions/createLeadOnly'

const PhoneField = dynamic(
  () =>
    import('@/app/curso-online/_components/PhoneField').then((m) => m.PhoneField),
  {
    ssr: false,
    loading: () => (
      <input
        type="tel"
        placeholder="WhatsApp com DDD"
        disabled
        className="w-full px-4 py-3 outline-none"
        style={{
          background: '#0A0A10',
          border: '1px solid rgba(255,255,255,0.14)',
          color: '#fff',
          fontFamily: 'var(--font-mono)',
          fontSize: '13px',
          borderRadius: 0,
        }}
      />
    ),
  }
)

const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
}

const inputStyle: React.CSSProperties = {
  background: '#0A0A10',
  border: '1px solid rgba(255,255,255,0.14)',
  color: '#fff',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  borderRadius: 0,
}

// Rate limiting: max 3 submits per 60s per course slug
const RATE_LIMIT_MAX = 3
const RATE_LIMIT_WINDOW_MS = 60_000

type ActionState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; message: string }
  | { status: 'rate_limited' }

// Client-side validation — runs before hitting the server
function validateLeadForm(
  name: string,
  email: string,
  phone: string,
): string | null {
  const trimmedName = name.trim()
  if (trimmedName.length < 3) {
    return 'Seu nome deve ter pelo menos 3 caracteres.'
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email.trim())) {
    return 'Informe um e-mail válido.'
  }

  // Phone: strip non-digits and check for min 10 digits (ignoring country dial code prefix symbols)
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 10) {
    return 'Informe o WhatsApp com DDD (mínimo 10 dígitos).'
  }

  return null
}

async function leadAction(
  _prev: ActionState,
  formData: FormData
): Promise<ActionState> {
  const name = (formData.get('name') as string | null) ?? ''
  const email = (formData.get('email') as string | null) ?? ''
  const phone = (formData.get('phone') as string | null) ?? ''
  const courseSlug = (formData.get('courseSlug') as string | null) ?? ''

  // Client-side validation guard (double protection — server also validates)
  const validationError = validateLeadForm(name, email, phone)
  if (validationError) {
    return { status: 'error', message: validationError }
  }

  // Offline check
  if (typeof navigator !== 'undefined' && !navigator.onLine) {
    return {
      status: 'error',
      message: 'Sem conexão com a internet. Verifique sua rede e tente novamente.',
    }
  }

  try {
    const result = await createLeadOnly(name.trim(), email.trim(), phone, courseSlug)
    if ('success' in result) return { status: 'success' }
    return {
      status: 'error',
      message: ('error' in result ? result.error : undefined) ?? 'Erro inesperado. Tente novamente.',
    }
  } catch {
    return {
      status: 'error',
      message: 'Não foi possível registrar. Tente novamente em instantes.',
    }
  }
}

export interface LeadCaptureFormProps {
  courseSlug: string
  label?: string
}

// Per-slug submit timestamps stored in module scope (reset on page reload)
const submitTimestamps: Record<string, number[]> = {}

function checkRateLimit(slug: string): boolean {
  const now = Date.now()
  const ts = submitTimestamps[slug] ?? []
  // Purge timestamps outside the window
  const recent = ts.filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  submitTimestamps[slug] = recent
  return recent.length >= RATE_LIMIT_MAX
}

function recordSubmit(slug: string) {
  const ts = submitTimestamps[slug] ?? []
  submitTimestamps[slug] = [...ts, Date.now()]
}

export function LeadCaptureForm({
  courseSlug,
  label = 'Quero ser avisado(a)',
}: LeadCaptureFormProps) {
  const [state, formAction, isPending] = useActionState<ActionState, FormData>(
    leadAction,
    { status: 'idle' }
  )

  // Rate limiting state (visual)
  const [isRateLimited, setIsRateLimited] = useState(false)

  // Form ref for programmatic reset
  const formRef = useRef<HTMLFormElement>(null)

  // Reset rate limit flag periodically
  useEffect(() => {
    if (!isRateLimited) return
    const timer = setTimeout(() => {
      if (!checkRateLimit(courseSlug)) {
        setIsRateLimited(false)
      }
    }, RATE_LIMIT_WINDOW_MS)
    return () => clearTimeout(timer)
  }, [isRateLimited, courseSlug])

  // Wrap formAction to add rate limit check before submission
  const handleFormAction = useCallback(
    (formData: FormData) => {
      if (checkRateLimit(courseSlug)) {
        setIsRateLimited(true)
        return
      }
      recordSubmit(courseSlug)
      formAction(formData)
    },
    [courseSlug, formAction]
  )

  if (state.status === 'success') {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 py-10 px-6 text-center"
        style={{
          background: 'rgba(255,58,14,0.05)',
          border: '1px solid rgba(255,58,14,0.25)',
        }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="h-10 w-10"
          style={{ color: '#FF3A0E' }}
          aria-hidden="true"
        />
        <div>
          <p
            className="text-white text-base font-semibold mb-1"
            style={{ fontFamily: 'var(--font-display-serif)' }}
          >
            Você está na lista!
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Você será avisado(a) assim que abrirmos as inscrições!
          </p>
        </div>
      </div>
    )
  }

  if (isRateLimited) {
    return (
      <div
        className="flex flex-col items-center justify-center gap-4 py-10 px-6 text-center"
        style={{
          background: 'rgba(255,58,14,0.05)',
          border: '1px solid rgba(255,58,14,0.25)',
        }}
        role="status"
        aria-live="polite"
      >
        <CheckCircle2
          className="h-10 w-10"
          style={{ color: '#FF3A0E' }}
          aria-hidden="true"
        />
        <div>
          <p
            className="text-white text-base font-semibold mb-1"
            style={{ fontFamily: 'var(--font-display-serif)' }}
          >
            Você já está na lista!
          </p>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Seu interesse já foi registrado. Avisaremos assim que as inscrições abrirem.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full">
      {/* Badge "EM BREVE" */}
      <div className="mb-5 flex items-center gap-3">
        <span
          className="inline-flex items-center gap-2 px-3 py-1.5"
          style={{
            background: 'rgba(255,58,14,0.12)',
            border: '1px solid rgba(255,58,14,0.5)',
            ...KV_MONO,
            color: '#FF3A0E',
          }}
        >
          <span className="relative inline-flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3A0E] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF3A0E]" />
          </span>
          EM BREVE
        </span>
        <span
          className="text-xs"
          style={{ color: 'rgba(255,255,255,0.35)', fontFamily: 'var(--font-mono)' }}
        >
          Inscrições em breve
        </span>
      </div>

      <form ref={formRef} action={handleFormAction} className="flex flex-col gap-3 w-full">
        <input type="hidden" name="courseSlug" value={courseSlug} />

        <input
          type="text"
          name="name"
          required
          minLength={3}
          placeholder="Seu nome"
          autoComplete="name"
          className="w-full px-4 py-3 outline-none placeholder:text-white/30 focus:border-[#FF3A0E]/50 transition-colors"
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          required
          placeholder="seu@email.com"
          autoComplete="email"
          className="w-full px-4 py-3 outline-none placeholder:text-white/30 focus:border-[#FF3A0E]/50 transition-colors"
          style={inputStyle}
        />
        <PhoneField name="phone" required />

        <button
          type="submit"
          disabled={isPending}
          aria-disabled={isPending}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-semibold uppercase transition-all hover:brightness-110 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed w-full"
          style={{ ...KV_MONO, background: '#FF3A0E', color: '#050507', fontSize: '12px' }}
        >
          {isPending ? 'Registrando...' : label}
          {!isPending && <ArrowRight size={14} aria-hidden="true" />}
        </button>
      </form>

      {state.status === 'error' && (
        <div
          className="mt-4 flex items-start gap-3 px-4 py-3"
          style={{
            background: 'rgba(255,58,14,0.1)',
            border: '1px solid rgba(255,58,14,0.3)',
          }}
          role="alert"
          aria-live="assertive"
        >
          <span style={{ color: '#FF3A0E', flexShrink: 0 }} aria-hidden="true">!</span>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.5 }}>
            {state.message}
          </p>
        </div>
      )}
    </div>
  )
}
