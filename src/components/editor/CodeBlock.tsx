'use client'

import { useState, type ReactNode } from 'react'
import { Copy, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CodeBlockProps {
  children: ReactNode
  language?: string
  filename?: string
  className?: string
}

export function CodeBlock({ children, language, filename, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const code = typeof children === 'string'
    ? children
    : (children as { props?: { children?: string } })?.props?.children ?? ''

  async function handleCopy() {
    await navigator.clipboard.writeText(code.trim())
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className={cn('relative my-4 overflow-hidden rounded-lg border border-white/10 bg-zinc-900', className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-white/10 bg-zinc-800/50 px-4 py-2">
          <span className="text-xs text-zinc-400">{filename ?? language}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      )}
      {!filename && !language && (
        <div className="flex justify-end px-4 pt-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-zinc-400 transition-colors hover:text-white"
          >
            {copied ? <Check size={14} /> : <Copy size={14} />}
            {copied ? 'Copiado!' : 'Copiar'}
          </button>
        </div>
      )}
      <div
        className={cn(
          'pointer-events-none absolute right-4 top-10 z-10 rounded-md bg-zinc-700 px-3 py-1.5 text-xs text-white shadow-lg transition-all duration-300',
          copied ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'
        )}
      >
        Copiado com sucesso
      </div>
      <div className="overflow-x-auto p-4 text-sm">{children}</div>
    </div>
  )
}
