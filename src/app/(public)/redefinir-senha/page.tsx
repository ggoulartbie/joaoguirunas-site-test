import { RedefinirSenhaForm } from './_components/RedefinirSenhaForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Redefinir senha',
}

export default function RedefinirSenhaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Redefinir senha</h1>
          <p className="mt-2 text-sm text-white/50">
            Escolha uma nova senha para sua conta
          </p>
        </div>
        <RedefinirSenhaForm />
      </div>
    </div>
  )
}
