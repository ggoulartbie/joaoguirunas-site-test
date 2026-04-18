'use client'

import { useEffect } from 'react'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const DIV_ID = `lp-form-${FORM_ID}`
const SCRIPT_SRC = `https://revos.growthsales.ai/embed.js?form_id=${FORM_ID}`

export function RevosForm() {
  useEffect(() => {
    const formDiv = document.getElementById(DIV_ID)
    if (!formDiv) return

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any

    const tryInit = () => {
      if (typeof w.RevosEmbed?.init === 'function') w.RevosEmbed.init()
    }

    const existingScript = document.querySelector(`script[data-revos-form="${FORM_ID}"]`)

    if (existingScript) {
      // Script já no DOM — div pode ser novo (SPA navigation), força re-init
      tryInit()
      return
    }

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.setAttribute('data-revos-form', FORM_ID)
    script.async = true
    script.onload = tryInit
    document.body.appendChild(script)
  }, [])

  return (
    <div
      id={DIV_ID}
      className="min-h-[400px] w-full max-w-full overflow-hidden"
    />
  )
}
