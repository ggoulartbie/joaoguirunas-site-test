'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { createCourse } from '../actions'

function slugify(str: string) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
}

export function NewCourseForm() {
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [description, setDescription] = useState('')

  function handleTitleChange(v: string) {
    setTitle(v)
    setSlug(slugify(v))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    startTransition(async () => {
      try {
        const course = await createCourse({ title, slug, description: description || null, cover_image_url: null })
        router.push(`/academy/admin/cursos/${course.id}`)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao criar curso')
      }
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Título</label>
        <input
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)}
          required
          placeholder="Ex.: Fundamentos de Copywriting"
          className="w-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-sm text-white/80 placeholder-white/20 outline-none focus:border-white/20"
        />
      </div>

      <div className="space-y-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Slug</label>
        <input
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          required
          placeholder="fundamentos-de-copywriting"
          className="w-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-xs text-white/60 placeholder-white/20 outline-none focus:border-white/20"
        />
        <p className="font-mono text-[10px] text-white/20">Gerado automaticamente — pode editar</p>
      </div>

      <div className="space-y-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-white/40">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          placeholder="Descrição breve do curso..."
          className="w-full border border-white/10 bg-white/[0.03] px-4 py-2.5 font-mono text-sm text-white/80 placeholder-white/20 outline-none focus:border-white/20"
        />
      </div>

      {error && (
        <p className="font-mono text-xs text-red-400">{error}</p>
      )}

      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => router.back()}
          className="px-4 py-2 font-mono text-xs uppercase tracking-wider text-white/40 transition-colors hover:text-white/70"
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending || !title || !slug}
          className="bg-[#FF3A0E] px-5 py-2 font-mono text-xs font-semibold uppercase tracking-wider text-white transition-opacity hover:opacity-90 disabled:opacity-40"
        >
          {pending ? 'Criando...' : 'Criar Curso'}
        </button>
      </div>
    </form>
  )
}
