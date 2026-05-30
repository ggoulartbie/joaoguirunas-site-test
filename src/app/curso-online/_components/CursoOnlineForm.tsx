'use client'

import { useEffect, useState } from 'react'

const FORM_ID = '44e30c7d-03d2-4896-a85a-53daef5c6623'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://crm.joaoguirunas.com/embed.js?form_id=${FORM_ID}`

// Module-level guard: prevents double-injection across StrictMode remounts
// and client-side navigations where the script is already cached in the document.
const activeEmbeds = new Set<string>()

type LoadState = 'loading' | 'loaded' | 'blocked'

export function CursoOnlineForm() {
  const [state, setState] = useState<LoadState>('loading')

  useEffect(() => {
    if (activeEmbeds.has(FORM_ID)) return
    activeEmbeds.add(FORM_ID)

    const container = document.getElementById(DIV_ID)
    if (container) container.innerHTML = ''

    document.querySelectorAll(`script[data-revos="${FORM_ID}"]`).forEach(el => el.remove())

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.setAttribute('data-revos', FORM_ID)
    script.setAttribute('data-form-id', FORM_ID)
    script.async = true
    script.onload = () => setState('loaded')
    script.onerror = () => setState('blocked')
    document.body.appendChild(script)

    const timeout = window.setTimeout(() => {
      setState(prev => prev === 'loading' ? 'blocked' : prev)
    }, 5000)

    return () => {
      activeEmbeds.delete(FORM_ID)
      script.remove()
      window.clearTimeout(timeout)
      const el = document.getElementById(DIV_ID)
      if (el) el.innerHTML = ''
    }
  }, [])

  return (
    <div className="relative min-h-[400px] w-full max-w-full overflow-hidden">
      {state === 'loading' && (
        <div className="absolute inset-0 flex flex-col gap-4 p-6" aria-hidden="true">
          <div className="h-10 w-3/4 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-12 w-full animate-pulse rounded bg-[var(--color-accent)]/[0.15] mt-4" />
        </div>
      )}
      {state === 'blocked' && (
        <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-white/60 text-sm leading-relaxed max-w-xs">
            Formulário bloqueado por extensão do navegador. Desative o ad-blocker nesta página e recarregue.
          </p>
          <a
            href="https://crm.joaoguirunas.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--color-accent)] text-sm underline underline-offset-4"
          >
            Acessar diretamente →
          </a>
        </div>
      )}
      <div id={DIV_ID} className="w-full max-w-full overflow-hidden" />
    </div>
  )
}
