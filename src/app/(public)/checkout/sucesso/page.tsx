import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

interface Props {
  searchParams: Promise<{ session_id?: string }>
}

export default async function CheckoutSucessoPage({ searchParams }: Props) {
  const { session_id } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full p-8 text-center space-y-6">
        <div className="mx-auto flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pagamento confirmado!</h1>
          <p className="mt-2 text-gray-600">
            Seu acesso está sendo processado. Em alguns instantes você já pode acessar o conteúdo.
          </p>
        </div>

        <div className="space-y-3">
          <Link
            href="/dashboard"
            className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Ir para o dashboard
          </Link>
          <Link
            href="/meus-cursos"
            className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-colors"
          >
            Ver meus cursos
          </Link>
        </div>
      </div>
    </div>
  )
}
