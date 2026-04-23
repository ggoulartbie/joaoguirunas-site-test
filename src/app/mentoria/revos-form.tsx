'use client'

import { useEffect, useState } from 'react'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://revos.growthsales.ai/embed.js?form_id=${FORM_ID}`

export function RevosForm() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Remove qualquer script anterior — garante execução limpa no novo div
    document.querySelectorAll(`script[data-revos="${FORM_ID}"]`).forEach(el => el.remove())

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.setAttribute('data-revos', FORM_ID)
    script.setAttribute('data-form-id', FORM_ID)
    script.async = true
    script.onload = () => setLoaded(true)
    document.body.appendChild(script)

    return () => { script.remove() }
  }, [])

  return (
    <div className="relative min-h-[400px] w-full max-w-full overflow-hidden">
      {!loaded && (
        <div className="absolute inset-0 flex flex-col gap-4 p-6" aria-hidden="true">
          <div className="h-10 w-3/4 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-full animate-pulse rounded bg-white/[0.06]" />
          <div className="h-10 w-2/3 animate-pulse rounded bg-white/[0.06]" />
          <div className="h-12 w-full animate-pulse rounded bg-[#FF4400]/[0.15] mt-4" />
        </div>
      )}
      <div id={DIV_ID} className="w-full max-w-full overflow-hidden" />
    </div>
  )
}
