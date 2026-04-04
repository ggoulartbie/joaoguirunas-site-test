'use client'

import { useEffect, useRef } from 'react'

export function RevosForm() {
  const loaded = useRef(false)

  useEffect(() => {
    if (loaded.current) return

    // Verificar se script ou form ja existe no DOM
    const existingScript = document.querySelector('script[src*="revos.growthsales.ai/embed.js"]')
    const formDiv = document.getElementById('lp-form-a11d7cc4-17b8-400e-94e4-0f27ca47e9a4')
    if (existingScript || (formDiv && formDiv.children.length > 0)) return

    loaded.current = true

    const script = document.createElement('script')
    script.src = 'https://revos.growthsales.ai/embed.js?form_id=a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
    script.setAttribute('data-form-id', 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4')
    script.async = true
    document.body.appendChild(script)
  }, [])

  return <div id="lp-form-a11d7cc4-17b8-400e-94e4-0f27ca47e9a4" className="min-h-[400px] w-full max-w-full overflow-hidden" />
}
