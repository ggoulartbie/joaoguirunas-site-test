'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/shared/components/ui/button'

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

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    })

    if (error) {
      setServerError('Email ou senha incorretos.')
      return
    }

    const nextRaw = searchParams.get('next') || '/academy/dashboard'
    const next = nextRaw.startsWith('/') && !nextRaw.startsWith('//') ? nextRaw : '/academy/dashboard'
    router.push(next)
    router.refresh()
  }

  return (
    <div
      style={{
        background: 'var(--ink)',
        padding: '48px',
        borderRadius: 0,
        borderTop: '2px solid var(--ember)',
      }}
    >
      <style>{`
        .rf-input {
          width: 100%;
          border: 1px solid var(--hairline-strong);
          background: var(--ink-2);
          border-radius: 0;
          padding: 14px 18px;
          color: var(--bone);
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .rf-input::placeholder {
          color: rgba(241,241,243,0.25);
        }
        .rf-input:focus {
          border-color: var(--ember);
          box-shadow: 0 0 0 1px var(--ember);
        }
        .rf-submit-btn {
          font-size: 12px !important;
          letter-spacing: 0.22em !important;
          transition: filter 0.2s !important;
          background: var(--ember) !important;
          color: var(--void) !important;
          font-family: var(--type-mono) !important;
          text-transform: uppercase !important;
          border-radius: 0 !important;
        }
        .rf-submit-btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }
      `}</style>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label
            className="text-sm"
            htmlFor="email"
            style={{ color: 'rgba(241,241,243,0.6)' }}
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="rf-input"
            placeholder="seu@email.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs" style={{ color: 'var(--ember)' }}>{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              className="text-sm"
              htmlFor="password"
              style={{ color: 'rgba(241,241,243,0.6)' }}
            >
              Senha
            </label>
            <Link
              href="/academy/recuperar-senha"
              className="text-xs transition-colors hover:text-white/70"
              style={{ color: 'rgba(241,241,243,0.35)' }}
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
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs" style={{ color: 'var(--ember)' }}>{errors.password.message}</p>
          )}
        </div>

        {serverError && (
          <div
            style={{
              background: 'rgba(255,58,14,0.1)',
              border: '1px solid rgba(255,58,14,0.2)',
              padding: '10px 16px',
              fontSize: 13,
              color: 'var(--ember)',
            }}
          >
            {serverError}
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="rf-submit-btn w-full disabled:opacity-50"
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </Button>
      </form>

      <p
        className="mt-6 text-center text-sm"
        style={{ color: 'rgba(241,241,243,0.35)' }}
      >
        Não tem conta?{' '}
        <Link
          href="/academy/cadastro"
          className="transition-colors hover:text-white"
          style={{ color: 'rgba(241,241,243,0.65)' }}
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
