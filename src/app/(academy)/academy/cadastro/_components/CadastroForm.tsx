'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'

const schema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z
    .string()
    .min(8, 'Senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
    .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
})

type FormData = z.infer<typeof schema>

const formStyles = `
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
`

export function CadastroForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: { name: data.name },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/auth/callback`,
      },
    })

    if (error) {
      if (error.message.includes('already registered')) {
        setServerError('Este email já está cadastrado.')
      } else {
        setServerError('Erro ao criar conta. Tente novamente.')
      }
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div
        style={{
          background: 'var(--ink)',
          border: '1px solid var(--hairline)',
          padding: '40px',
          textAlign: 'center',
        }}
      >
        <div
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--ember)',
            marginBottom: 16,
          }}
        >
          Email enviado
        </div>
        <h2
          style={{
            fontFamily: 'var(--type-display)',
            fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 28,
            color: 'var(--bone)',
            letterSpacing: '-0.025em',
            lineHeight: 1.1,
          }}
        >
          Confirme seu email
        </h2>
        <p
          style={{
            fontFamily: 'var(--type-sans)',
            fontSize: 14,
            color: 'var(--bone-dim)',
            marginTop: 12,
            fontWeight: 300,
            lineHeight: 1.6,
          }}
        >
          Enviamos um link de confirmação para seu email. Clique nele para ativar sua conta.
        </p>
        <Link
          href="/academy/login"
          style={{
            display: 'inline-block',
            marginTop: 24,
            fontFamily: 'var(--type-mono)',
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: 'var(--bone-mute)',
            textDecoration: 'none',
          }}
        >
          Voltar ao login
        </Link>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--ink)',
        border: '1px solid var(--hairline)',
        padding: '40px',
      }}
    >
      <style>{formStyles}</style>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        {/* Nome */}
        <div>
          <label className="rf-label" htmlFor="name">
            Nome completo
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            placeholder="Seu nome"
            className="rf-input"
            {...register('name')}
          />
          {errors.name && (
            <p style={{ fontSize: 12, color: 'var(--ember)', marginTop: 4 }}>
              {errors.name.message}
            </p>
          )}
        </div>

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
          <label className="rf-label" htmlFor="password">
            Senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            placeholder="Mínimo 8 caracteres"
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
          {isSubmitting ? 'Criando conta...' : 'Criar conta'}
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
        Já tem conta?{' '}
        <Link
          href="/academy/login"
          style={{ color: 'var(--ember)', textDecoration: 'none' }}
        >
          Entrar
        </Link>
      </p>
    </div>
  )
}
