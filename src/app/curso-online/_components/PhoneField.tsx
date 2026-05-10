'use client'

import { useState, forwardRef } from 'react'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const inputStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: 'none',
  color: '#fff',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
  padding: '12px',
}

const CustomInput = forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <input {...props} ref={ref} style={inputStyle} />
)
CustomInput.displayName = 'CustomInput'

interface PhoneFieldProps {
  name: string
  required?: boolean
}

export function PhoneField({ name, required }: PhoneFieldProps) {
  const [value, setValue] = useState<string | undefined>()

  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.15)',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <input type="hidden" name={name} value={value ?? ''} />
      <PhoneInput
        international
        defaultCountry="BR"
        value={value}
        onChange={setValue}
        inputComponent={CustomInput}
        required={required}
        style={{ width: '100%' }}
      />
    </div>
  )
}
