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

    router.push('/academy/dashboard')
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
          display: block;
          width: 100%;
          min-height: 44px;
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
        .rf-submit-btn:focus-visible {
          outline: 2px solid rgba(255,58,14,0.5);
          outline-offset: 2px;
        }
        .rf-submit-btn:hover:not(:disabled) {
          filter: brightness(1.1);
        }
        .rf-submit-btn:disabled {
          opacity: 0.45;
          cursor: not-allowed;
        }
      `}</style>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label
            className="text-sm"
            htmlFor="password"
            style={{ color: 'rgba(241,241,243,0.6)' }}
          >
            Nova senha
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            className="rf-input"
            placeholder="Mínimo 8 caracteres"
            {...register('password')}
          />
          {errors.password && (
            <p className="text-xs" style={{ color: 'var(--ember)' }}>{errors.password.message}</p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            className="text-sm"
            htmlFor="confirm"
            style={{ color: 'rgba(241,241,243,0.6)' }}
          >
            Confirmar nova senha
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            className="rf-input"
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
            }}
          >
            {serverError}
          </div>
        )}

        <button type="submit" disabled={isSubmitting} className="rf-submit-btn">
          {isSubmitting ? 'Salvando...' : 'Salvar nova senha'}
        </button>
      </form>

      <p
        className="mt-6 text-center text-sm"
        style={{ color: 'rgba(241,241,243,0.35)' }}
      >
        <Link
          href="/academy/login"
          className="transition-colors"
          style={{ color: 'var(--bone-mute)' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--bone)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--bone-mute)')}
        >
          Voltar para o login
        </Link>
      </p>
    </div>
  )
}
