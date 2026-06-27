import { Suspense } from 'react'
import Image from 'next/image'
import { LoginForm } from './_components/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Entrar',
  robots: { index: false, follow: false },
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen" style={{ background: 'var(--void)' }}>
      {/* PAINEL ESQUERDO */}
      <div
        className="relative flex w-full min-h-screen items-center justify-center lg:w-1/2"
        style={{
          background: 'var(--void)',
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="relative z-10 w-full max-w-md px-6 py-16">
          {/* Brand mark */}
          <div className="mb-10">
            <Image
              src="/images/brand/symbol-official.svg"
              alt="Academy"
              width={36}
              height={36}
              priority
            />
            <span
              className="mt-3 block"
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

          <h1
            className="mb-3"
            style={{
              fontFamily: 'var(--type-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 'clamp(42px, 5vw, 56px)',
              lineHeight: 0.9,
              color: 'var(--bone)',
              margin: 0,
            }}
          >
            Entrar
          </h1>
          <p
            className="mb-10"
            style={{
              fontFamily: 'var(--type-sans)',
              fontSize: '15px',
              color: 'var(--bone-dim)',
            }}
          >
            Acesse sua conta para continuar
          </p>

          <Suspense>
            <LoginForm />
          </Suspense>
        </div>
      </div>

      {/* PAINEL DIREITO */}
      <div className="relative hidden overflow-hidden lg:block lg:w-1/2">
        <Image
          src="/images/brand/A1-portrait-founder.png"
          alt="João Guirunas"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(5,5,7,0.4), rgba(5,5,7,0.1))',
          }}
        />
      </div>
    </div>
  )
}
