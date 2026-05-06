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
        border: '1px solid var(--hairline)',
        padding: '40px',
      }}
    >
      <style>{`
        .rf-input {
          background: var(--ink-2);
          border: 1px solid var(--hairline);
          color: var(--bone);
          width: 100%;
          padding: 12px 16px;
          font-size: 14px;
          outline: none;
          border-radius: 0;
          font-family: var(--type-sans);
          transition: border-color 0.15s;
          box-sizing: border-box;
        }
        .rf-input::placeholder { color: var(--bone-mute); }
        .rf-input:focus { border-color: var(--hairline-strong); }
        .rf-label {
          font-family: var(--type-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--bone-mute);
          font-weight: 500;
          display: block;
          margin-bottom: 6px;
        }
        .rf-forgot {
          font-family: var(--type-mono);
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--bone-mute);
          text-decoration: none;
          transition: color 0.15s;
        }
        .rf-forgot:hover { color: var(--bone); }
      `}</style>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Email */}
        <div>
          <label className="rf-label" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="seu@email.com"
            className="rf-input"
            {...register('email')}
          />
          {errors.email && (
            <p style={{ fontSize: 12, color: 'var(--ember)', marginTop: 4 }}>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Senha */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
            <label className="rf-label" style={{ marginBottom: 0 }} htmlFor="password">
              Senha
            </label>
            <Link href="/academy/recuperar-senha" className="rf-forgot">
              Esqueci minha senha
            </Link>
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            className="rf-input"
            {...register('password')}
          />
          {errors.password && (
            <p style={{ fontSize: 12, color: 'var(--ember)', marginTop: 4 }}>
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Erro servidor */}
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

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            background: 'var(--ember)',
            color: 'var(--void)',
            fontFamily: 'var(--type-mono)',
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            width: '100%',
            padding: '12px 0',
            border: 'none',
            borderRadius: 0,
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            opacity: isSubmitting ? 0.5 : 1,
            transition: 'opacity 0.15s',
            fontWeight: 500,
          }}
        >
          {isSubmitting ? 'Entrando...' : 'Entrar'}
        </button>
      </form>

      <p
        style={{
          marginTop: 24,
          textAlign: 'center',
          fontSize: 13,
          color: 'var(--bone-mute)',
          fontFamily: 'var(--type-sans)',
        }}
      >
        Não tem conta?{' '}
        <Link
          href="/academy/cadastro"
          style={{ color: 'var(--ember)', textDecoration: 'none' }}
        >
          Cadastre-se
        </Link>
      </p>
    </div>
  )
}
