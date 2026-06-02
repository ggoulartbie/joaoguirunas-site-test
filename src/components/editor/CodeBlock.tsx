'use client'

import { useState, type ReactNode } from 'react'
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
    <div className={cn('my-4 overflow-hidden rounded-lg border border-white/10 bg-zinc-900', className)}>
      {(filename || language) && (
        <div className="flex items-center justify-between border-b border-white/10 bg-zinc-800/50 px-4 py-2">
          <span className="text-xs text-zinc-400">{filename ?? language}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-400 transition-colors hover:text-white"
          >
            {copied ? 'copiado!' : 'copiar'}
          </button>
        </div>
      )}
      {!filename && !language && (
        <div className="flex justify-end px-4 pt-2">
          <button
            onClick={handleCopy}
            className="text-xs text-zinc-400 transition-colors hover:text-white"
          >
            {copied ? 'copiado!' : 'copiar'}
          </button>
        </div>
      )}
      <div className="overflow-x-auto p-4 text-sm">{children}</div>
    </div>
  )
}
