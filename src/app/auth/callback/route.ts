import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'
import { sendWelcomeEmail } from '@/lib/email/send'

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  const next = searchParams.get('next') ?? '/academy/dashboard'

  if (code) {
    const supabase = await createClient()
    const { data, error } = await supabase.auth.exchangeCodeForSession(code)

    if (!error && data.user) {
      // Send welcome email only on first confirmation (email_confirmed_at just set)
      const email = data.user.email
      const name = (data.user.user_metadata?.name as string | undefined) ?? ''
      if (email) {
        const { data: profile } = await supabaseAdmin
          .from('profiles')
          .select('created_at')
          .eq('id', data.user.id)
          .single()

        // Only send if account is brand new (created within last 5 minutes)
        const isNew = profile?.created_at
          ? Date.now() - new Date(profile.created_at).getTime() < 5 * 60 * 1000
          : false

        if (isNew) {
          sendWelcomeEmail(email, name).catch(() => null)
        }
      }

      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/academy/login?error=auth`)
}
