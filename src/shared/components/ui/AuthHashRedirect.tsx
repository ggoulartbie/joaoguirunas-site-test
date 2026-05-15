'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Supabase magic links usam fluxo implícito: tokens chegam no hash da URL.
// O Site URL do Supabase aponta para a homepage, então este componente captura
// o hash e roteia para a página correta conforme o tipo do token.
export function AuthHashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (!hash.includes('access_token=')) return

    const params = new URLSearchParams(hash)
    const type = params.get('type')

    if (type === 'recovery') {
      router.replace(`/academy/redefinir-senha#${hash}`)
    } else {
      router.replace(`/academy/auth/callback#${hash}`)
    }
  }, [router])

  return null
}
