'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Senha deve ter no mínimo 6 caracteres'),
})

type FormData = z.infer<typeof schema>

export function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    const supabase = createClient()

    const { error, data: authData } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setServerError('Email ou senha incorretos.')
      return
    }

    // Determinar destino: se ADMIN → /academy/admin, senão usar ?next ou fallback
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user!.id)
      .single()

    if (profile?.role === 'ADMIN') {
      router.push('/academy/admin')
      router.refresh()
      return
    }

    const raw = searchParams.get('next') ?? ''
    // Sanitizar: aceitar apenas paths internos que não contenham /login
    const next = raw.startsWith('/') && !raw.includes('/login') ? raw : '/academy/aluno'
    router.push(next)
    router.refresh()
  }

  return (
    <>
      <style>{`
        .rf-input {
          width: 100%;
          border: 1px solid rgba(255,255,255,0.28);
          background: transparent;
          border-radius: 0;
          padding: 16px 18px;
          min-height: 52px;
          color: var(--bone);
          font-family: var(--type-sans);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .rf-input::placeholder {
          color: rgba(241,241,243,0.35);
        }
        .rf-input:focus {
          border-color: var(--ember);
          box-shadow: 0 0 0 2px rgba(255,58,14,0.15);
        }
        .rf-btn {
          display: block;
          width: 100%;
          height: 48px;
          background: var(--ember);
          color: var(--void);
          font-family: var(--type-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          cursor: pointer;
          transition: background-color 0.2s;
          outline: none;
        }
        .rf-btn:hover:not(:disabled) {
          background: var(--ember-glow);
        }
        .rf-btn:focus-visible {
          outline: 2px solid rgba(255,58,14,0.5);
          outline-offset: 2px;
        }
        .rf-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>

      <div
        style={{
          background: 'var(--ink)',
          borderTop: '2px solid var(--ember)',
          padding: '52px 48px',
          borderRadius: 0,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Email */}
          <div className="space-y-1.5">
            <label
              htmlFor="email"
              style={{
                display: 'block',
                fontFamily: 'var(--type-sans)',
                fontSize: '12px',
                color: 'var(--bone-dim)',
              }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              className="rf-input"
              placeholder="seu@email.com"
              aria-describedby={errors.email ? 'email-error' : undefined}
              {...register('email')}
            />
            {errors.email && (
              <p
                id="email-error"
                role="alert"
                style={{
                  fontSize: '12px',
                  color: 'var(--ember)',
                  marginTop: '4px',
                }}
              >
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Senha */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                style={{
                  fontFamily: 'var(--type-sans)',
                  fontSize: '12px',
                  color: 'var(--bone-dim)',
                }}
              >
                Senha
              </label>
              <Link
                href="/academy/recuperar-senha"
                style={{
                  fontFamily: 'var(--type-sans)',
                  fontSize: '12px',
                  color: 'var(--bone-mute)',
                  transition: 'color 0.2s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--bone)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--bone-mute)')
                }
              >
                Esqueci minha senha
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              className="rf-input"
              placeholder="••••••••"
              aria-describedby={errors.password ? 'password-error' : undefined}
              {...register('password')}
            />
            {errors.password && (
              <p
                id="password-error"
                role="alert"
                style={{
                  fontSize: '12px',
                  color: 'var(--ember)',
                  marginTop: '4px',
                }}
              >
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Erro do servidor */}
          {serverError && (
            <div
              role="alert"
              style={{
                background: 'rgba(255,58,14,0.1)',
                border: '1px solid rgba(255,58,14,0.2)',
                padding: '12px 16px',
                borderRadius: 0,
                fontFamily: 'var(--type-sans)',
                fontSize: '13px',
                color: 'var(--ember)',
              }}
            >
              {serverError}
            </div>
          )}

          <div style={{ marginTop: '8px' }} />
          <button type="submit" disabled={isSubmitting} className="rf-btn">
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

      </div>
    </>
  )
}
