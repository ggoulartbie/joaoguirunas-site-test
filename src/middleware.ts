import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_PATHS = [
  '/login',
  '/cadastro',
  '/recuperar-senha',
  '/redefinir-senha',
  '/auth',
  '/turmas',
  '/checkout',
  '/certificado',
  '/403',
  '/_next',
  '/favicon',
  '/api/webhooks',
]

function isPublic(pathname: string) {
  return PUBLIC_PATHS.some((p) => pathname.startsWith(p))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isPublic(pathname)) {
    return NextResponse.next()
  }

  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          response = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // rotas /admin/* exigem role ADMIN — verificado no servidor
  if (pathname.startsWith('/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/403', request.url))
    }
  }

  return response
}

export const config = {
  // Middleware ONLY runs on course platform routes.
  // Institutional site routes (/, /mentoria, /agentes, etc.) are never matched.
  matcher: [
    '/login',
    '/cadastro',
    '/recuperar-senha',
    '/redefinir-senha',
    '/auth/:path*',
    '/turmas/:path*',
    '/certificado/:path*',
    '/403',
    '/api/webhooks/:path*',
    '/dashboard/:path*',
    '/meus-cursos/:path*',
    '/curso/:path*',
    '/admin/:path*',
    '/forum/:path*',
    '/agenda/:path*',
    '/certificados/:path*',
    '/perfil/:path*',
    '/checkout/:path*',
  ],
}
