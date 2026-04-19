'use client'

import { useEffect } from 'react'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://revos.growthsales.ai/embed.js?form_id=${FORM_ID}`

export function RevosForm() {
  useEffect(() => {
    // Remove qualquer script anterior — garante execução limpa no novo div
    document.querySelectorAll(`script[data-revos="${FORM_ID}"]`).forEach(el => el.remove())

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.setAttribute('data-revos', FORM_ID)
    script.setAttribute('data-form-id', FORM_ID)
    script.async = true
    document.body.appendChild(script)

    return () => { script.remove() }
  }, [])

  return (
    <div id={DIV_ID} className="min-h-[400px] w-full max-w-full overflow-hidden" />
  )
}
