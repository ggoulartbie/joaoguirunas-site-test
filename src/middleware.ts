import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient } from '@supabase/ssr'

// Rotas que bypass completo do middleware (sem session refresh necessário)
const BYPASS_PATHS = [
  '/_next',
  '/favicon',
]

// Rotas públicas que precisam de session refresh mas não redirecionam para login
const PUBLIC_WITH_REFRESH_PATHS = [
  '/academy/login',
  '/academy/recuperar-senha',
  '/academy/redefinir-senha',
  '/academy/auth',
  '/turmas',
  '/academy/turmas',
  '/academy/checkout',
  '/certificado',
  '/academy/403',
  '/api/webhooks',
]

function isBypass(pathname: string) {
  return BYPASS_PATHS.some((p) => pathname.startsWith(p))
}

function isPublicWithRefresh(pathname: string) {
  return PUBLIC_WITH_REFRESH_PATHS.some((p) => pathname.startsWith(p))
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (isBypass(pathname)) {
    return NextResponse.next()
  }

  // /academy raiz — redireciona conforme estado de autenticação
  if (pathname === '/academy') {
    const supabaseCheck = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll() {},
        },
      }
    )
    const { data: { user } } = await supabaseCheck.auth.getUser()
    return NextResponse.redirect(
      new URL(user ? '/academy/aluno' : '/academy/login', request.url)
    )
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

  if (!user && !isPublicWithRefresh(pathname)) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/academy/login'
    loginUrl.searchParams.set('next', pathname)
    return NextResponse.redirect(loginUrl)
  }

  // Enforcement de senha não definida + role ADMIN — uma query só para ambos
  if (user) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('role, has_set_password')
      .eq('id', user.id)
      .single()

    // Primeiro acesso (senha temporária) → bloqueia acesso a qualquer rota exceto
    // redefinir-senha, login (caso queira logout) e callbacks de auth.
    if (profile?.has_set_password === false) {
      const isAllowedDuringSetup =
        pathname.startsWith('/academy/redefinir-senha') ||
        pathname.startsWith('/academy/auth') ||
        pathname.startsWith('/academy/login')
      if (!isAllowedDuringSetup) {
        return NextResponse.redirect(
          new URL('/academy/redefinir-senha?primeiro-acesso=1', request.url),
        )
      }
    }

    // Rotas /academy/admin/* exigem role ADMIN
    if (pathname.startsWith('/academy/admin')) {
      if (!profile || profile.role !== 'ADMIN') {
        return NextResponse.redirect(new URL('/academy/403', request.url))
      }
    }
  }

  return response
}

export const config = {
  // Middleware ONLY runs on course platform routes.
  // Institutional site routes (/, /mentoria, /agentes, etc.) are never matched.
  matcher: [
    '/academy',
    '/academy/login',
    '/academy/recuperar-senha',
    '/academy/redefinir-senha',
    '/academy/auth/:path*',
    '/turmas/:path*',
    '/academy/turmas/:path*',
    '/certificado/:path*',
    '/academy/403',
    '/api/webhooks/:path*',
    '/academy/aluno',
    '/academy/aluno/:path*',
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
