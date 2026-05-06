import { RecuperarSenhaForm } from './_components/RecuperarSenhaForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Recuperar senha',
}

export default function RecuperarSenhaPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Recuperar senha</h1>
          <p className="mt-2 text-sm text-white/50">
            Enviaremos um link para redefinir sua senha
          </p>
        </div>
        <RecuperarSenhaForm />
      </div>
    </div>
  )
}
