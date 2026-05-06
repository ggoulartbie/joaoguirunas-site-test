'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

const schema = z
  .object({
    password: z
      .string()
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .regex(/[A-Z]/, 'Senha deve conter ao menos uma letra maiúscula')
      .regex(/[0-9]/, 'Senha deve conter ao menos um número'),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  })

type FormData = z.infer<typeof schema>

export function RedefinirSenhaForm() {
  const router = useRouter()
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

    const { error } = await supabase.auth.updateUser({ password: data.password })

    if (error) {
      setServerError('Erro ao redefinir senha. O link pode ter expirado.')
      return
    }

    setSuccess(true)
    setTimeout(() => {
      router.push('/academy/dashboard')
      router.refresh()
    }, 1500)
  }

  if (success) {
    return (
      <div
        style={{
          background: 'rgba(34,197,94,0.08)',
          border: '1px solid rgba(34,197,94,0.2)',
          padding: '16px',
          borderRadius: 0,
        }}
      >
        <p
          style={{
            fontFamily: 'var(--type-sans)',
            fontSize: '14px',
            color: '#4ade80',
          }}
        >
          Senha redefinida com sucesso. Redirecionando...
        </p>
      </div>
    )
  }

  return (
    <div
      style={{
        background: 'var(--ink)',
        borderTop: '2px solid var(--ember)',
        padding: '52px 48px',
        borderRadius: 0,
      }}
    >
      <style>{`
        .rd-input {
          width: 100%;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.28);
          border-radius: 0;
          padding: 16px 18px;
          color: var(--bone);
          font-family: var(--type-sans);
          font-size: 14px;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }
        .rd-input::placeholder {
          color: rgba(241,241,243,0.35);
        }
        .rd-input:focus {
          border-color: var(--ember);
          box-shadow: 0 0 0 2px rgba(255,58,14,0.15);
        }
        .rd-submit-btn {
          display: block;
          width: 100%;
          height: 48px;
          background: var(--ember);
          color: var(--void);
          font-family: var(--type-mono);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          border: none;
          border-radius: 0;
          cursor: pointer;
          transition: filter 0.2s;
          outline: none;
        }
        .rd-submit-btn:focus-visible {
          outline: 2px solid rgba(255,58,14,0.5);
          outline-offset: 2px;
        }
        .rd-submit-btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        .rd-submit-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label
            htmlFor="password"
            style={{
              display: 'block',
              fontFamily: 'var(--type-sans)',
              fontSize: '12px',
              color: 'var(--bone-dim)',
            }}
          >
            Nova senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="rd-input"
            placeholder="Mínimo 8 caracteres"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs" style={{ color: 'var(--ember)' }}>{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor="confirm"
            style={{
              display: 'block',
              fontFamily: 'var(--type-sans)',
              fontSize: '12px',
              color: 'var(--bone-dim)',
            }}
          >
            Confirmar nova senha
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            className="rd-input"
            placeholder="Repita a senha"
            {...register('confirm')}
          />
          {errors.confirm && (
            <p className="text-xs" style={{ color: 'var(--ember)' }}>{errors.confirm.message}</p>
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
              borderRadius: 0,
            }}
          >
            {serverError}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="rd-submit-btn">
          {isSubmitting ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>

      <p className="mt-6 text-center">
        <Link
          href="/academy/login"
          style={{
            fontFamily: 'var(--type-sans)',
            fontSize: '14px',
            color: 'var(--bone-mute)',
            textDecoration: 'none',
            transition: 'color 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--bone)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--bone-mute)')}
        >
          Voltar ao login
        </Link>
      </p>
    </div>
  )
}
