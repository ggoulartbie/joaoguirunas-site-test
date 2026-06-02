'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'

export default function AuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    const supabase = createClient()

    // Implicit flow: Supabase returns tokens in URL hash fragment
    const hash = window.location.hash.substring(1)
    const params = new URLSearchParams(hash)
    const accessToken = params.get('access_token')
    const refreshToken = params.get('refresh_token')

    if (!accessToken || !refreshToken) {
      router.replace('/academy/login')
      return
    }

    supabase.auth
      .setSession({ access_token: accessToken, refresh_token: refreshToken })
      .then(({ error }) => {
        if (error) {
          router.replace('/academy/login?error=link-invalido')
        } else {
          router.replace('/academy/aluno')
          router.refresh()
        }
      })
  }, [router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--ink)]">
      <p className="font-mono text-xs uppercase tracking-widest text-[var(--bone-mute)]">
        Ativando conta…
      </p>
    </div>
  )
}
