import { CadastroForm } from './_components/CadastroForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cadastro',
}

export default function CadastroPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Criar conta</h1>
          <p className="mt-2 text-sm text-white/50">
            Comece sua jornada agora
          </p>
        </div>
        <CadastroForm />
      </div>
    </div>
  )
}
