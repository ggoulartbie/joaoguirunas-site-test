import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { NewThreadForm } from '@/components/student/NewThreadForm'
import { MOCK_FORUM_CATEGORIES } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Novo Tópico — Fórum' }

export default function NovoTopicoPage() {
  // TODO F5.1: buscar categorias ativas do Supabase
  const categories = MOCK_FORUM_CATEGORIES

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Link
        href="/forum"
        className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-white/40 hover:text-white/70 transition-colors"
      >
        <ArrowLeft className="h-3 w-3" />
        Fórum
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-white">Novo tópico</h1>
        <p className="mt-1 text-sm text-white/50">
          Compartilhe dúvidas, ideias ou experiências com a comunidade.
        </p>
      </div>

      <NewThreadForm categories={categories} />
    </div>
  )
}
