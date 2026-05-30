'use client'

import { useEffect, useRef } from 'react'

const FORM_ID = '44e30c7d-03d2-4896-a85a-53daef5c6623'
const SCRIPT_SRC = `https://crm.joaoguirunas.com/embed.js?form_id=${FORM_ID}`

export function CursoOnlineForm() {
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
