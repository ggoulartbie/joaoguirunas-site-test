export const dynamic = 'force-dynamic'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { supabaseAdmin } from '@/lib/supabase/admin'

interface Props {
  searchParams: Promise<{ session_id?: string; order_nsu?: string; provider?: string }>
}

export default async function CheckoutSucessoPage({ searchParams }: Props) {
  const { session_id, order_nsu, provider } = await searchParams

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const isInfinitePay = provider === 'infinitepay'

  // Public checkout: no active session yet — webhook creates the account asynchronously.
  const isPublicCheckout = !user && !!(session_id || order_nsu)

  if (!user && !session_id && !order_nsu) {
    redirect('/academy/login')
  }

  // Para InfinitePay, tenta buscar o payment para exibir dados confirmados.
  // Falha graciosamente se order_nsu for inválido ou pagamento ainda estiver PENDING.
  let infinitePayConfirmed = false
  if (isInfinitePay && order_nsu) {
    const { data: payment } = await supabaseAdmin
      .from('payments')
      .select('status')
      .eq('infinitepay_order_nsu', order_nsu)
      .maybeSingle()
    infinitePayConfirmed = payment?.status === 'APPROVED'
  }

  // Se InfinitePay mas payment não aprovado ainda, mostra mensagem de processamento
  const isInfinitePayPending = isInfinitePay && order_nsu && !infinitePayConfirmed

  const nextStepsAuthenticated = [
    'Verifique seu email — enviamos a confirmação do pagamento',
    'Acesse a área do aluno para ver o conteúdo disponível',
    'Entre na comunidade exclusiva da turma',
    'Configure seu perfil e preferências',
  ]

  const nextStepsPublic = [
    'Verifique seu email — enviamos o link de acesso',
    'Clique no link para ativar sua conta e acessar o curso',
    'O link é válido para login imediato, sem precisar criar senha',
    'Não encontrou o email? Verifique a pasta de spam',
  ]

  const nextStepsPending = [
    'Seu pagamento está sendo processado',
    'Você receberá um email com o link de acesso em instantes',
    'Não feche esta página — pode levar até 1 minuto',
    'Não encontrou o email? Verifique a pasta de spam',
  ]

  const nextSteps = isInfinitePayPending
    ? nextStepsPending
    : isPublicCheckout
      ? nextStepsPublic
      : nextStepsAuthenticated

  const heading = isInfinitePayPending
    ? 'Processando...'
    : isPublicCheckout
      ? 'Pagamento confirmado!'
      : 'Tudo certo!'

  const subtitle = isInfinitePayPending
    ? 'Seu pagamento está sendo processado. Você receberá um email com o link de acesso.'
    : isPublicCheckout
      ? 'Enviamos o link de acesso para o seu email. Clique no link para ativar sua conta.'
      : 'Bem-vindo à turma. Seu acesso está confirmado.'

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
        {/* Check icon */}
        <div className="flex items-center justify-center mb-6">
          <svg
            width="64"
            height="64"
            viewBox="0 0 64 64"
            fill="none"
            style={{ animation: 'scale-in 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) both' }}
          >
            <circle cx="32" cy="32" r="30" stroke="var(--ember)" strokeWidth="2" />
            {isInfinitePayPending ? (
              <path
                d="M22 32h20M32 22v20"
                stroke="var(--ember)"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            ) : (
              <path
                d="M20 33l8 8 16-18"
                stroke="var(--ember)"
                strokeWidth="2.5"
                strokeLinecap="square"
              />
            )}
          </svg>
        </div>

        <h1
          className="text-4xl mb-3"
          style={{
            fontFamily: 'var(--type-display)',
            fontStyle: 'italic',
            color: 'var(--bone)',
          }}
        >
          {heading}
        </h1>

        <p
          className="text-sm mb-8 leading-relaxed"
          style={{ color: 'var(--bone-dim)' }}
        >
          {subtitle}
        </p>

        {/* Next steps */}
        <div className="text-left mb-8">
          <p
            className="text-xs tracking-widest uppercase mb-3"
            style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
          >
            Próximos passos
          </p>
          <ul className="space-y-2">
            {nextSteps.map((step, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="text-xs shrink-0 mt-0.5"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--ember)' }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="text-xs"
                  style={{ fontFamily: 'var(--type-mono)', color: 'var(--bone-mute)' }}
                >
                  {step}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* CTA */}
        {isPublicCheckout || isInfinitePayPending ? (
          <Link
            href="/academy/login"
            className="flex items-center justify-center w-full h-12 text-xs tracking-widest uppercase font-bold mb-4 transition-opacity hover:opacity-90"
            style={{
              backgroundColor: 'var(--ember)',
              color: 'var(--void)',
              fontFamily: 'var(--type-mono)',
              borderRadius: 0,
            }}
          >
            Ir para o login
          </Link>
        ) : (
          <>
            <Link
              href="/academy/meus-cursos"
              className="flex items-center justify-center w-full h-12 text-xs tracking-widest uppercase font-bold mb-4 transition-opacity hover:opacity-90"
              style={{
                backgroundColor: 'var(--ember)',
                color: 'var(--void)',
                fontFamily: 'var(--type-mono)',
                borderRadius: 0,
              }}
            >
              Acessar minha área
            </Link>

            <Link
              href="/academy/certificados"
              className="text-xs tracking-wider uppercase transition-colors hover:text-[var(--bone)]"
              style={{
                fontFamily: 'var(--type-mono)',
                color: 'var(--bone-mute)',
              }}
            >
              Ver certificados
            </Link>
          </>
        )}
      </div>

      <style>{`
        @keyframes scale-in {
          from { transform: scale(0.5); opacity: 0; }
          to   { transform: scale(1);   opacity: 1; }
        }
      `}</style>
    </div>
  )
}
