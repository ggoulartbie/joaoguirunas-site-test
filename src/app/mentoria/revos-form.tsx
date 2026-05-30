'use client'

import { useEffect, useRef, useState } from 'react'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://crm.joaoguirunas.com/embed.js?form_id=${FORM_ID}`

type LoadState = 'loading' | 'loaded' | 'blocked'

export function RevosForm() {
  const [state, setState] = useState<LoadState>('loading')
  const initialized = useRef(false)

  useEffect(() => {
    // useRef persists across StrictMode's fake unmount/remount, preventing
    // double injection. Resets naturally on real navigation (new component instance).
    if (initialized.current) return
    initialized.current = true

    document.querySelectorAll(`script[data-revos="${FORM_ID}"]`).forEach(el => el.remove())
    const container = document.getElementById(DIV_ID)
    if (container) container.innerHTML = ''

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
      window.clearTimeout(timeout)
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
