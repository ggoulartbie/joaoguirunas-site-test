'use client'

import { useState, useRef } from 'react'

const COUNTRIES = [
  { code: 'BR', dial: '+55', label: '🇧🇷 +55', mask: '(##) #####-####' },
  { code: 'US', dial: '+1',  label: '🇺🇸 +1',  mask: '(###) ###-####' },
  { code: 'PT', dial: '+351',label: '🇵🇹 +351', mask: '### ### ###' },
  { code: 'AR', dial: '+54', label: '🇦🇷 +54', mask: '(###) ###-####' },
  { code: 'MX', dial: '+52', label: '🇲🇽 +52', mask: '## #### ####' },
  { code: 'CO', dial: '+57', label: '🇨🇴 +57', mask: '### ### ####' },
  { code: 'CL', dial: '+56', label: '🇨🇱 +56', mask: '# #### ####' },
  { code: 'PE', dial: '+51', label: '🇵🇪 +51', mask: '### ### ###' },
  { code: 'UY', dial: '+598',label: '🇺🇾 +598', mask: '# ### ## ##' },
  { code: 'DE', dial: '+49', label: '🇩🇪 +49', mask: '### ########' },
  { code: 'GB', dial: '+44', label: '🇬🇧 +44', mask: '#### ### ####' },
  { code: 'FR', dial: '+33', label: '🇫🇷 +33', mask: '# ## ## ## ##' },
  { code: 'ES', dial: '+34', label: '🇪🇸 +34', mask: '### ### ###' },
  { code: 'IT', dial: '+39', label: '🇮🇹 +39', mask: '### ### ####' },
]

function applyMask(value: string, mask: string): string {
  const digits = value.replace(/\D/g, '')
  let result = ''
  let di = 0
  for (let i = 0; i < mask.length && di < digits.length; i++) {
    if (mask[i] === '#') {
      result += digits[di++]
    } else {
      result += mask[i]
    }
  }
  return result
}

const wrapperStyle: React.CSSProperties = {
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.15)',
  display: 'flex',
  alignItems: 'stretch',
}

const selectStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  borderRight: '1px solid rgba(255,255,255,0.12)',
  color: 'rgba(255,255,255,0.8)',
  fontFamily: 'var(--font-mono)',
  fontSize: '12px',
  padding: '0 10px',
  outline: 'none',
  cursor: 'pointer',
  flexShrink: 0,
  appearance: 'none',
  WebkitAppearance: 'none',
}

const inputStyle: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  color: '#fff',
  fontFamily: 'var(--font-mono)',
  fontSize: '13px',
  padding: '12px',
  outline: 'none',
  width: '100%',
  minWidth: 0,
}

interface PhoneFieldProps {
  name: string
  required?: boolean
}

export function PhoneField({ name, required }: PhoneFieldProps) {
  const [country, setCountry] = useState<(typeof COUNTRIES)[number]>(COUNTRIES[0]!)
  const [local, setLocal] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const fullValue = local ? `${country.dial}${local.replace(/\D/g, '')}` : ''

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    const masked = applyMask(e.target.value, country.mask)
    setLocal(masked)
  }

  function handleCountryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const c = COUNTRIES.find((x) => x.code === e.target.value) ?? COUNTRIES[0]!
    setCountry(c)
    setLocal('')
    inputRef.current?.focus()
  }

  return (
    <div style={wrapperStyle}>
      <input type="hidden" name={name} value={fullValue} />
      <select
        value={country.code}
        onChange={handleCountryChange}
        style={selectStyle}
        aria-label="País"
      >
        {COUNTRIES.map((c) => (
          <option key={c.code} value={c.code} style={{ background: '#0e0e11' }}>
            {c.label}
          </option>
        ))}
      </select>
      <input
        ref={inputRef}
        type="tel"
        value={local}
        onChange={handleInput}
        required={required}
        placeholder={country.mask.replace(/#/g, '9')}
        autoComplete="tel-national"
        style={inputStyle}
      />
    </div>
  )
}
