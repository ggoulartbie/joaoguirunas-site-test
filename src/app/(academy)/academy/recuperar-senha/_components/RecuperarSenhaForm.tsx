'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/shared/components/ui/button'

const schema = z.object({
  email: z.string().email('Email inválido'),
})

type FormData = z.infer<typeof schema>

export function RecuperarSenhaForm() {
  const [success, setSuccess] = useState(false)
  const [serverError, setServerError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setServerError(null)
    const supabase = createClient()

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000'}/redefinir-senha`,
    })

    if (error) {
      setServerError('Erro ao enviar email. Tente novamente.')
      return
    }

    setSuccess(true)
  }

  if (success) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="mb-3 text-3xl">✉️</div>
        <h2 className="text-lg font-semibold text-white">Email enviado</h2>
        <p className="mt-2 text-sm text-white/50">
          Se este email estiver cadastrado, você receberá o link de recuperação em breve.
        </p>
        <Link
          href="/login"
          className="mt-6 inline-block text-sm text-white/70 hover:text-white transition-colors"
        >
          Voltar ao login
        </Link>
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="space-y-1.5">
          <label className="text-sm text-white/70" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/20"
            placeholder="seu@email.com"
            {...register('email')}
          />
          {errors.email && (
            <p className="text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {serverError && (
          <p className="rounded-lg bg-red-500/10 px-4 py-2.5 text-sm text-red-400">
            {serverError}
          </p>
        )}

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-white text-black hover:bg-white/90 disabled:opacity-50"
        >
          {isSubmitting ? 'Enviando...' : 'Enviar link de recuperação'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-white/40">
        Lembrou a senha?{' '}
        <Link href="/login" className="text-white/70 hover:text-white transition-colors">
          Entrar
        </Link>
      </p>
    </div>
  )
}
