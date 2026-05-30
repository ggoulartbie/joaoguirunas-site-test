'use client'

import { useEffect, useRef } from 'react'

const FORM_ID = 'a11d7cc4-17b8-400e-94e4-0f27ca47e9a4'
const SCRIPT_SRC = `https://crm.joaoguirunas.com/embed.js?form_id=${FORM_ID}`

export function RevosForm() {
  const divRef = useRef<HTMLDivElement>(null)
  const done = useRef(false)

  useEffect(() => {
    if (done.current || !divRef.current) return
    done.current = true

    const script = document.createElement('script')
    script.src = SCRIPT_SRC
    script.setAttribute('data-form-id', FORM_ID)
    script.async = true
    // Insert immediately after the div — matches the original embed pattern
    divRef.current.after(script)
  }, [])

  return <div id={`lp-form-${FORM_ID}`} ref={divRef} className="w-full" />
}
