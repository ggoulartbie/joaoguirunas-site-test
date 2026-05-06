import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

const PUBLIC_PATHS = [
  '/academy/login',
  '/academy/cadastro',
  '/academy/recuperar-senha',
  '/academy/redefinir-senha',
  '/academy/auth',
  '/turmas',
  '/academy/checkout',
  '/certificado',
  '/academy/403',
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
    loginUrl.pathname = '/academy/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // rotas /academy/admin/* exigem role ADMIN — verificado no servidor
  if (pathname.startsWith('/academy/admin')) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single()

    if (!profile || profile.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/academy/403', request.url))
    }
  }

  return response
}

export const config = {
  // Middleware ONLY runs on course platform routes.
  // Institutional site routes (/, /mentoria, /agentes, etc.) are never matched.
  matcher: [
    '/academy/login',
    '/academy/cadastro',
    '/academy/recuperar-senha',
    '/academy/redefinir-senha',
    '/academy/auth/:path*',
    '/turmas/:path*',
    '/certificado/:path*',
    '/academy/403',
    '/api/webhooks/:path*',
    '/academy/dashboard/:path*',
    '/academy/meus-cursos/:path*',
    '/academy/curso/:path*',
    '/academy/admin/:path*',
    '/academy/forum/:path*',
    '/academy/agenda/:path*',
    '/academy/certificados/:path*',
    '/academy/perfil/:path*',
    '/academy/checkout/:path*',
  ],
}
