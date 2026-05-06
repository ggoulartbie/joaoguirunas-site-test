import { Suspense } from 'react'
import Image from 'next/image'
import { LoginForm } from './_components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar',
}

export default function LoginPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center px-4"
      style={{ background: 'var(--void)' }}
    >
      {/* Dot texture */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.55,
        }}
      />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand mark */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-2">
            <Image
              src="/images/brand/logo-symbol.svg"
              alt="Academy"
              width={28}
              height={24}
              priority
            />
            <span
              style={{
                fontFamily: 'var(--type-mono)',
                fontSize: '10px',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: 'var(--bone)',
                fontWeight: 500,
              }}
            >
              Academy
            </span>
          </div>

          <hr
            style={{
              border: 'none',
              borderTop: '1px solid var(--hairline)',
              marginBottom: '28px',
            }}
          />

          <h1
            style={{
              fontFamily: 'var(--type-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: '56px',
              lineHeight: 0.9,
              color: 'var(--bone)',
              margin: 0,
            }}
          >
            Entrar
          </h1>
          <p
            className="mt-3"
            style={{
              fontSize: '16px',
              color: 'rgba(241,241,243,0.45)',
            }}
          >
            Acesse sua conta para continuar
          </p>
        </div>

        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  )
}
