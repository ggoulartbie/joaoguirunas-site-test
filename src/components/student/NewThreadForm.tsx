'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Send } from 'lucide-react'
import type { ForumCategory } from '@/types/student'

type Props = {
  categories: ForumCategory[]
}

export function NewThreadForm({ categories }: Props) {
  const router = useRouter()
  const [title, setTitle] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim() || !categoryId || !content.trim()) return

    setSubmitting(true)
    // TODO F5.1: Server Action createForumThread(categoryId, title, content)
    await new Promise((r) => setTimeout(r, 800))
    setSubmitting(false)
    router.push('/forum')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Categoria */}
      <div>
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-white/50">
          Categoria
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          className="w-full border border-white/10 bg-[#0C0C12] px-3 py-2.5 text-sm text-white focus:border-white/20 focus:outline-none"
        >
          <option value="" disabled>
            Selecione uma categoria...
          </option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Título */}
      <div>
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-white/50">
          Título
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Seja específico e claro..."
          required
          maxLength={200}
          className="w-full border border-white/10 bg-[#0C0C12] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
        />
        <p className="mt-1 text-right font-mono text-[10px] text-white/20">
          {title.length}/200
        </p>
      </div>

      {/* Conteúdo */}
      <div>
        <label className="mb-1.5 block font-mono text-[10px] uppercase tracking-widest text-white/50">
          Conteúdo
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Descreva sua dúvida, ideia ou experiência... (Markdown suportado)"
          rows={8}
          required
          className="w-full resize-y border border-white/10 bg-[#0C0C12] p-3 text-sm text-white placeholder:text-white/30 focus:border-white/20 focus:outline-none"
        />
        <p className="mt-1 font-mono text-[10px] text-white/20">
          Suporte a Markdown: **negrito**, *itálico*, `código`, ```bloco```
        </p>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => router.back()}
          className="font-mono text-xs uppercase tracking-wide text-white/30 hover:text-white/60 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={submitting || !title.trim() || !categoryId || !content.trim()}
          className="flex items-center gap-2 bg-[#FF3A0E] px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#FF5A1F] disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send className="h-3.5 w-3.5" />
          {submitting ? 'Publicando...' : 'Publicar tópico'}
        </button>
      </div>
    </form>
  )
}
