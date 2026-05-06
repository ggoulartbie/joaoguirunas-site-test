import { Suspense } from 'react'
import { LoginForm } from './_components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Entrar na plataforma</h1>
          <p className="mt-2 text-sm text-white/50">
            Acesse sua conta para continuar
          </p>
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
