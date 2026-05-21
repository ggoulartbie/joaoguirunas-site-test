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

function CopyBtn({ copied, onClick }: { copied: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 rounded-md border px-2.5 py-1 text-xs font-medium transition-all ${
        copied
          ? 'border-green-500/40 bg-green-500/10 text-green-400'
          : 'border-zinc-600 bg-zinc-700/60 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-700 hover:text-white'
      }`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copiado!' : 'Copiar'}
    </button>
  )
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
          <CopyBtn copied={copied} onClick={handleCopy} />
        </div>
      )}
      {!filename && !language && (
        <div className="flex justify-end px-4 pt-2">
          <CopyBtn copied={copied} onClick={handleCopy} />
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
