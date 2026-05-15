'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// Supabase magic links usam fluxo implícito: tokens chegam no hash da URL.
// O Site URL do Supabase aponta para a homepage, então este componente captura
// o hash, estabelece a sessão diretamente aqui e redireciona via window.location.replace
// (hard redirect) — evita o bug do Next.js App Router que descarta o hash em
// navegações soft cross-page (router.replace não preserva fragmentos).
export function AuthHashRedirect() {
  useEffect(() => {
    const hash = window.location.hash.substring(1)
    if (!hash.includes('access_token=')) return

    const params = new URLSearchParams(hash)
    const type = params.get('type')
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) return

    const supabase = createClient()

    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) {
          window.location.replace('/academy/login?error=link-invalido')
          return
        }
        if (type === 'recovery') {
          // Sessão já estabelecida — redireciona pro form sem precisar do hash
          window.location.replace('/academy/redefinir-senha')
        } else {
          window.location.replace('/academy/meus-cursos')
        }
      })
  }, [])

  return null
}
