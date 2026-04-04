'use client'

import { useEffect } from 'react'

export function RevosForm() {
  useEffect(() => {
    // Verificar se script ja existe
    if (document.querySelector('script[data-revos-form]')) return

    const script = document.createElement('script')
    script.src = 'https://revos.growthsales.ai/embed.js?form_id=a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
    script.setAttribute('data-form-id', 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4')
    script.setAttribute('data-revos-form', 'true')
    script.async = true
    document.body.appendChild(script)

    return () => {
      const s = document.querySelector('script[data-revos-form]')
      if (s) s.remove()
    }
  }, [])

  return <div id="lp-form-a11d7cc4-17b8-400e-94e4-0f27ca47e9a4" className="min-h-[400px]" />
}
