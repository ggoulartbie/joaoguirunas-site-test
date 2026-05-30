'use client'

import Script from 'next/script'
import { useState } from 'react'

const FORM_ID = '44e30c7d-03d2-4896-a85a-53daef5c6623'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://crm.joaoguirunas.com/embed.js?form_id=${FORM_ID}`

type LoadState = 'loading' | 'loaded' | 'error'

export function CursoOnlineForm() {
  const [state, setState] = useState<LoadState>('loading')

  return (
    <div className="relative min-h-[400px] w-full max-w-full overflow-hidden">
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        data-form-id={FORM_ID}
        data-revos={FORM_ID}
        onLoad={() => setState('loaded')}
        onError={() => setState('error')}
      />
      {state === 'loading' && (
        <div className="absolute inset-0 flex flex-col gap-4 p-6" aria-hidden="true">
          <div className="h-10 w-3/4 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-12 w-full animate-pulse rounded bg-[var(--color-accent)]/[0.15] mt-4" />
        </div>
      )}
      {state === 'error' && (
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
