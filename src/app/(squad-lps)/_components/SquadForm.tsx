'use client'

import { useEffect, useRef } from 'react'

const DEFAULT_FORM_ID = '44e30c7d-03d2-4896-a85a-53daef5c6623'

interface SquadFormProps {
  formId?: string;
}

export function SquadForm({ formId = DEFAULT_FORM_ID }: SquadFormProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const done = useRef(false)

  useEffect(() => {
    if (done.current || !divRef.current) return
    done.current = true

    const script = document.createElement('script')
    script.src = `https://crm.joaoguirunas.com/embed.js?form_id=${formId}`
    script.setAttribute('data-form-id', formId)
    script.async = true
    divRef.current.after(script)
  }, [formId])

  return <div id={`lp-form-${formId}`} ref={divRef} className="w-full" />
}
