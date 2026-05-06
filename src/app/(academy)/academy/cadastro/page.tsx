import { CadastroForm } from './_components/CadastroForm'
import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Cadastro',
}

export default function CadastroPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-16"
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

      <div className="relative z-10 w-full max-w-[420px]">
        {/* Brand mark */}
        <div className="mb-10 flex flex-col items-center gap-3">
          <Image src="/images/brand/logo-symbol.svg" alt="João Guirunas" width={36} height={32} />
          <span
            style={{
              fontFamily: 'var(--type-mono)',
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'var(--ember)',
              textTransform: 'uppercase',
            }}
          >
            João Guirunas Academy
          </span>
        </div>

        {/* Heading */}
        <div className="mb-8 text-center">
          <h1
            style={{
              fontFamily: 'var(--type-display)',
              fontWeight: 300,
              fontStyle: 'italic',
              fontSize: 48,
              color: 'var(--bone)',
              letterSpacing: '-0.025em',
              lineHeight: 0.95,
            }}
          >
            Criar conta
          </h1>
          <p
            style={{
              fontFamily: 'var(--type-sans)',
              fontSize: 15,
              color: 'var(--bone-dim)',
              marginTop: 12,
              fontWeight: 300,
            }}
          >
            Comece sua jornada agora.
          </p>
        </div>

        {/* Form */}
        <CadastroForm />
      </div>
    </div>
  )
}
