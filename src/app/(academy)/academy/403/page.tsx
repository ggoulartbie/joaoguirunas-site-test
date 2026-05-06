import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Acesso restrito',
}

export default function ForbiddenPage() {
  return (
    <div
      className="flex min-h-screen items-center justify-center px-4"
      style={{
        background: 'var(--void)',
        backgroundImage:
          'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div className="flex flex-col items-center text-center">
        <Image
          src="/images/brand/B5-icosahedron.png"
          alt=""
          width={200}
          height={200}
          className="mb-8"
          style={{ opacity: 0.6, filter: 'grayscale(1)' }}
          priority
        />

        <p
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: '120px',
            fontWeight: 700,
            lineHeight: 1,
            color: 'var(--ember)',
            margin: 0,
          }}
        >
          403
        </p>

        <h1
          className="mt-4"
          style={{
            fontFamily: 'var(--type-display)',
            fontStyle: 'italic',
            fontSize: '32px',
            fontWeight: 400,
            color: 'var(--bone)',
            margin: 0,
          }}
        >
          Acesso restrito
        </h1>

        <p
          className="mt-3"
          style={{
            fontFamily: 'var(--type-sans)',
            fontSize: '16px',
            color: 'var(--bone-dim)',
            maxWidth: '360px',
          }}
        >
          Você não tem permissão para acessar esta área.
        </p>

        <Link
          href="/academy/dashboard"
          className="mt-8 inline-block"
          style={{
            fontFamily: 'var(--type-mono)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            background: 'var(--ember)',
            color: 'var(--void)',
            padding: '14px 32px',
            borderRadius: 0,
            textDecoration: 'none',
            transition: 'filter 0.2s',
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.filter = 'brightness(1.1)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.filter = '')}
        >
          Ir para o Dashboard
        </Link>

        <Link
          href="#"
          onClick={(e) => { e.preventDefault(); history.back() }}
          className="mt-4 inline-block text-sm transition-colors"
          style={{ color: 'var(--bone-mute)', textDecoration: 'none' }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--bone)')}
          onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--bone-mute)')}
        >
          Voltar
        </Link>
      </div>
    </div>
  )
}
