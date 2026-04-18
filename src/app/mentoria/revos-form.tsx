'use client'

import { useEffect } from 'react'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const DIV_ID = `lp-form-${FORM_ID}`

// flag de módulo — persiste entre remounts do StrictMode
let scriptAppended = false

export function RevosForm() {
  useEffect(() => {
    const formDiv = document.getElementById(DIV_ID)
    if (!formDiv) return

    // Se já tem conteúdo, não faz nada
    if (formDiv.children.length > 0) return

    if (scriptAppended) {
      // Script já foi carregado — aciona o embed manualmente se a API estiver disponível
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      if (typeof w.RevosEmbed?.init === 'function') w.RevosEmbed.init()
      return
    }

    scriptAppended = true
    const script = document.createElement('script')
    script.src = `https://revos.growthsales.ai/embed.js?form_id=${FORM_ID}`
    script.setAttribute('data-form-id', FORM_ID)
    script.async = true
    document.body.appendChild(script)
  }, [])

  return (
    <div
      id={DIV_ID}
      className="min-h-[400px] w-full max-w-full overflow-hidden"
    />
  )
}
