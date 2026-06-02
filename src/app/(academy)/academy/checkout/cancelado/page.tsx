import Link from 'next/link'
import Image from 'next/image'

interface Props {
  searchParams: Promise<{ turma?: string }>
}

export default async function CheckoutCanceladoPage({ searchParams }: Props) {
  const { turma } = await searchParams
  const turmaHref = turma ? `/academy/turmas/${turma}` : '/academy/turmas'

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundColor: 'var(--void)',
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px)',
        backgroundSize: '24px 24px',
      }}
    >
      <div
        className="w-full max-w-md p-10 text-center"
        style={{
          backgroundColor: 'var(--ink)',
          border: '1px solid var(--hairline)',
          borderRadius: 0,
        }}
      >
        <div className="flex items-center justify-center mb-6">
          <Image
            src="/images/brand/symbol-official.svg"
            alt="Academy"
            width={40}
            height={40}
            style={{ opacity: 0.4 }}
          />
        </div>

        <h1
          className="text-4xl mb-3"
          style={{
            fontFamily: 'var(--type-display)',
            fontStyle: 'italic',
            color: 'var(--bone)',
          }}
        >
          Compra não concluída
        </h1>

        <p
          className="text-sm mb-8"
          style={{
            fontFamily: 'var(--type-sans)',
            color: 'var(--bone-mute)',
            lineHeight: 1.6,
          }}
        >
          Nenhuma cobrança foi realizada. Você pode tentar novamente quando quiser.
        </p>

        <Link
          href={turmaHref}
          className="flex items-center justify-center w-full h-12 text-xs tracking-widest uppercase font-bold mb-4 transition-opacity hover:opacity-90"
          style={{
            backgroundColor: 'var(--ember)',
            color: 'var(--void)',
            fontFamily: 'var(--type-mono)',
            borderRadius: 0,
            textDecoration: 'none',
          }}
        >
          Voltar à turma
        </Link>

        <Link
          href="/academy/turmas"
          className="text-xs tracking-wider uppercase transition-colors hover:text-[var(--bone)]"
          style={{
            fontFamily: 'var(--type-mono)',
            color: 'var(--bone-mute)',
            textDecoration: 'none',
          }}
        >
          Ver todas as turmas
        </Link>
      </div>
    </div>
  )
}
