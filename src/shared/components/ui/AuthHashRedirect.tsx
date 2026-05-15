'use client'

import { useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

// Supabase magic links: Site URL aponta para a homepage, então tokens chegam aqui.
// createBrowserClient usa flowType="pkce" + detectSessionInUrl=true por padrão,
// o que cria race condition com setSession() manual. A solução é usar onAuthStateChange
// para escutar o resultado independentemente de como o Supabase processou os tokens,
// com fallback manual via setSession() caso o auto-detect não dispare.
export function AuthHashRedirect() {
  useEffect(() => {
    const hash = window.location.hash
    const search = window.location.search
    const hasAuth = hash.includes('access_token=') || search.includes('code=')
    if (!hasAuth) return

    // Capturar type e tokens ANTES do Supabase limpar a URL
    const hashParams = new URLSearchParams(hash.substring(1))
    const searchParams = new URLSearchParams(search)
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

    // 1. Subscribir primeiro para capturar eventos assíncronos
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if ((event === 'SIGNED_IN' || event === 'PASSWORD_RECOVERY') && session) {
        go()
      }
    })

    // 2. Verificar se sessão já foi estabelecida (Supabase pode ter auto-processado)
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) go()
    })

    // 3. Fallback: chamar setSession manualmente caso auto-detect não tenha funcionado
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
