'use client'

import { useEffect } from 'react'
import Script from 'next/script'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://revos.growthsales.ai/embed.js?form_id=${FORM_ID}`

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const tryInit = () => { const w = window as any; if (typeof w.RevosEmbed?.init === 'function') w.RevosEmbed.init() }

export function RevosForm() {
  useEffect(() => {
    // Cobre SPA navigation: script já carregado, div é novo — chama init direto
    tryInit()
  }, [])

  return (
    <>
      <div id={DIV_ID} className="min-h-[400px] w-full max-w-full overflow-hidden" />
      <Script
        src={SCRIPT_SRC}
        strategy="afterInteractive"
        data-form-id={FORM_ID}
        onLoad={tryInit}
      />
    </>
  )
}
