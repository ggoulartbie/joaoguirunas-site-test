'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// Supabase devolve auth params na homepage (Site URL).
// Trata 3 casos:
// 1. error=otp_expired (link consumido por scanner ou expirado) → login com aviso
// 2. type=recovery com access_token (fluxo "Esqueci minha senha") → estabelece sessão e vai redefinir
// 3. signup/magiclink legado (compat: usuários antigos ainda podem ter links pendentes) → meus-cursos
export function AuthHashRedirect() {
  useEffect(() => {
    const hash = window.location.hash
    const search = window.location.search

    const hashParams = new URLSearchParams(hash.replace(/^#/, ''))
    const searchParams = new URLSearchParams(search)

    // Erro do Supabase vem SEMPRE no hash (#error=...&error_code=...&error_description=...).
    // Restringir ao hash evita falsos positivos em URLs com ?error_code= de tracking/analytics.
    const errorCode = hashParams.get('error_code')
    const errorDescription = hashParams.get('error_description')
    const hasToken = hash.includes('access_token=') || search.includes('code=')

    // Caso 1: Supabase devolveu erro (OTP expirado, consumido por scanner, etc.)
    // Exige error_code + error_description juntos pra ter certeza que é do Supabase
    if (errorCode && errorDescription) {
      const reason =
        errorCode === 'otp_expired'
          ? 'link-expirado'
          : errorCode
      window.location.replace(`/academy/login?error=${encodeURIComponent(reason)}`)
      return
    }

    if (!hasToken) return

    // Caso 2 e 3: tem token de auth — deixa Supabase processar e escuta resultado
    const type = hashParams.get('type') || searchParams.get('type')
    const accessToken = hashParams.get('access_token')
    const refreshToken = hashParams.get('refresh_token')

    const supabase = createClient()
    let done = false

    const go = () => {
      if (done) return
      done = true
      window.location.replace(
        type === 'recovery' ? '/academy/redefinir-senha' : '/academy/meus-cursos'
      )
    }

    const fail = () => {
      if (done) return
      done = true
      window.location.replace('/academy/login?error=link-invalido')
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') && session) {
        go()
      }
    })

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) go()
    })

    if (accessToken && refreshToken) {
      supabase.auth
        .setSession({ access_token: accessToken, refresh_token: refreshToken })
        .then(({ data: { session }, error }) => {
          if (error) fail()
          else if (session) go()
        })
        .catch(fail)
    }

    return () => subscription.unsubscribe()
  }, [])

  return null
}
