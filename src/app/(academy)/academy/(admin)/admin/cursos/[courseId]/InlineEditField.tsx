'use client'

import { useState, useEffect, useRef } from 'react'
import { Check, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface InlineEditFieldProps {
  value: string
  onSave: (next: string) => Promise<void>
  isEditing: boolean
  onEditingChange: (editing: boolean) => void
  className?: string
  inputClassName?: string
  placeholder?: string
  'aria-label'?: string
}

export function InlineEditField({
  value,
  onSave,
  isEditing,
  onEditingChange,
  className,
  inputClassName,
  placeholder = 'Título...',
  'aria-label': ariaLabel,
}: InlineEditFieldProps) {
  const [draft, setDraft] = useState(value)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Sync draft with external value when not editing
  useEffect(() => {
    if (!isEditing) {
      setDraft(value)
    }
  }, [value, isEditing])

  // Reset error when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setError(null)
    }
  }, [isEditing])

  async function save() {
    const trimmed = draft.trim()
    if (!trimmed) {
      setError('Título não pode ser vazio')
      return
    }
    if (trimmed === value) {
      onEditingChange(false)
      return
    }
    setSaving(true)
    setError(null)
    try {
      await onSave(trimmed)
      setSaving(false)
      onEditingChange(false)
    } catch {
      setSaving(false)
      setError('Erro ao salvar. Tente novamente.')
    }
  }

  function cancel() {
    setDraft(value)
    setError(null)
    onEditingChange(false)
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault()
      save()
    }
    if (e.key === 'Escape') {
      cancel()
    }
  }

  function handleBlur() {
    if (saving) return
    const trimmed = draft.trim()
    if (!trimmed || trimmed === value) {
      cancel()
      return
    }
    save()
  }

  if (!isEditing) {
    return <span className={className}>{value}</span>
  }

  return (
    <span className="flex min-w-0 flex-1 items-center gap-1">
      <input
        autoFocus
        value={draft}
        onChange={(e) => { setDraft(e.target.value); setError(null) }}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        onPointerDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
        disabled={saving}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={cn(
          'min-w-0 flex-1 border-b border-[var(--ember)] bg-transparent outline-none',
          saving && 'cursor-wait opacity-60',
          inputClassName
        )}
      />
      {error && (
        <span className="font-mono text-[10px] text-red-400">{error}</span>
      )}
      {!saving && (
        <>
          <button
            type="button"
            aria-label="Salvar"
            onPointerDown={(e) => { e.preventDefault(); e.stopPropagation() }}
            onClick={(e) => { e.stopPropagation(); save() }}
            className="shrink-0 p-0.5 text-emerald-400 transition-opacity hover:opacity-80"
          >
            <Check className="h-3 w-3" />
          </button>
          <button
            type="button"
            aria-label="Cancelar"
            onPointerDown={(e) => { e.preventDefault(); e.stopPropagation() }}
            onClick={(e) => { e.stopPropagation(); cancel() }}
            className="shrink-0 p-0.5 text-[var(--bone-mute)] transition-opacity hover:opacity-80"
          >
            <X className="h-3 w-3" />
          </button>
        </>
      )}
    </span>
  )
}
