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

  const inputClass =
    'w-full border border-[rgba(255,255,255,0.16)] bg-[#16161a] px-3 py-3 font-mono text-sm text-[#f1f1f3] placeholder-[#84848c] outline-none focus:border-[#ff3a0e] transition-colors'

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Título</label>
          <input
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            required
            placeholder="Ex.: Fundamentos de Copywriting"
            className={inputClass}
            style={{ borderRadius: 0 }}
          />
        </div>

        <div className="space-y-1.5">
          <label className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Slug</label>
          <input
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
            placeholder="fundamentos-de-copywriting"
            className={inputClass}
            style={{ borderRadius: 0 }}
          />
          <p className="font-mono text-[10px] text-[#84848c]">Gerado automaticamente — pode editar</p>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="font-mono text-[10px] uppercase tracking-widest text-[#84848c]">Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Descrição breve do curso..."
          className={`${inputClass} min-h-32 resize-none`}
          style={{ borderRadius: 0 }}
        />
      </div>

      {error && (
        <p className="font-mono text-xs text-[#ff3a0e]">{error}</p>
      )}

      <div className="flex justify-end gap-3 border-t border-[rgba(255,255,255,0.07)] pt-4">
        <button
          type="button"
          onClick={() => router.back()}
          className="border border-[rgba(255,255,255,0.16)] px-4 py-2.5 font-mono text-xs uppercase tracking-wider text-[#c5c5ca] transition-colors hover:border-[rgba(255,255,255,0.3)] hover:text-[#f1f1f3]"
          style={{ borderRadius: 0 }}
        >
          Cancelar
        </button>
        <button
          type="submit"
          disabled={pending || !title || !slug}
          className="bg-[#ff3a0e] px-5 py-2.5 font-mono text-xs font-semibold uppercase tracking-wider text-[#050507] transition-opacity hover:opacity-90 disabled:opacity-40"
          style={{ borderRadius: 0 }}
        >
          {pending ? 'Criando...' : 'Criar Curso'}
        </button>
      </div>
    </form>
  )
}
