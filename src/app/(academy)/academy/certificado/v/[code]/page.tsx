import type { Metadata } from 'next'
import Image from 'next/image'
import { Download } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'

export const dynamic = 'force-dynamic'

type Props = {
  params: Promise<{ code: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { code } = await params
  return {
    title: `Verificação de Certificado — ${code}`,
    robots: { index: false, follow: false },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function CertificateVerificationPage({ params }: Props) {
  const { code } = await params

  const { data: cert } = await supabaseAdmin
    .from('certificates')
    .select(`
      id,
      verification_code,
      issued_at,
      revoked_at,
      profiles(name),
      courses(title),
      cohorts(name)
    `)
    .eq('verification_code', code.toUpperCase())
    .maybeSingle()

  const isRevoked = !!cert?.revoked_at
  const profile = cert ? (Array.isArray(cert.profiles) ? cert.profiles[0] : cert.profiles) : null
  const courseData = cert ? (Array.isArray(cert.courses) ? cert.courses[0] : cert.courses) : null
  const cohortData = cert ? (Array.isArray(cert.cohorts) ? cert.cohorts[0] : cert.cohorts) : null

  return (
    <div
      className="flex min-h-screen items-center justify-center px-4 py-16"
      style={{ backgroundColor: 'var(--void)' }}
    >
      <div className="w-full max-w-2xl">
        {/* Card central */}
        <div
          className="border p-8"
          style={{
            backgroundColor: 'var(--ink)',
            borderColor: 'var(--hairline)',
            borderRadius: 0,
          }}
        >
          {/* Branding */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/images/brand/symbol-official.svg"
              alt="João Guirunas Academy"
              width={48}
              height={48}
              className="shrink-0"
            />
            <p
              className="font-mono text-[11px] uppercase tracking-[0.2em]"
              style={{ color: 'var(--bone-mute)' }}
            >
              João Guirunas Academy
            </p>
          </div>

          {/* Separador */}
          <div className="h-px mb-8" style={{ backgroundColor: 'var(--hairline)' }} />

          {cert && isRevoked ? (
            <>
              <h1
                className="font-display italic text-[36px] leading-tight mb-8"
                style={{ color: 'rgba(255,58,14,0.70)' }}
              >
                Certificado Revogado
              </h1>
              <div className="space-y-4">
                <span
                  className="inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-1 border"
                  style={{
                    color: 'var(--ember)',
                    backgroundColor: 'rgba(255,58,14,0.10)',
                    borderColor: 'rgba(255,58,14,0.30)',
                    borderRadius: 0,
                  }}
                >
                  Revogado
                </span>
                <p className="font-sans text-[14px]" style={{ color: 'var(--bone-mute)' }}>
                  Este certificado foi revogado e não é mais válido.
                </p>
              </div>
            </>
          ) : cert ? (
            <>
              {/* Heading válido */}
              <h1
                className="font-display italic text-[36px] leading-tight mb-8"
                style={{ color: 'var(--bone)' }}
              >
                Certificado Verificado
              </h1>

              <div className="space-y-5">
                {/* Nome do aluno */}
                <div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                    style={{ color: 'var(--bone-mute)' }}
                  >
                    Concluinte
                  </p>
                  <p
                    className="font-sans text-[20px] font-semibold"
                    style={{ color: 'var(--bone)' }}
                  >
                    {profile?.name ?? '—'}
                  </p>
                </div>

                {/* Curso + turma */}
                <div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                    style={{ color: 'var(--bone-mute)' }}
                  >
                    Curso
                  </p>
                  <p
                    className="font-mono text-[13px]"
                    style={{ color: 'var(--bone-dim)' }}
                  >
                    {courseData?.title ?? '—'}
                  </p>
                  <p
                    className="font-mono text-[13px] mt-0.5"
                    style={{ color: 'var(--bone-mute)' }}
                  >
                    {cohortData?.name ?? '—'}
                  </p>
                </div>

                {/* Data */}
                <div>
                  <p
                    className="font-mono text-[10px] uppercase tracking-[0.18em] mb-1"
                    style={{ color: 'var(--bone-mute)' }}
                  >
                    Data de emissão
                  </p>
                  <p className="font-mono text-[12px]" style={{ color: 'var(--bone-mute)' }}>
                    {formatDate(cert.issued_at)}
                  </p>
                </div>

                {/* Separador */}
                <div className="h-px" style={{ backgroundColor: 'var(--hairline)' }} />

                {/* Badge + código + PDF */}
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="font-mono text-[10px] uppercase tracking-wider px-2 py-1 border"
                      style={{
                        color: 'var(--ember)',
                        backgroundColor: 'rgba(255,58,14,0.08)',
                        borderColor: 'rgba(255,58,14,0.25)',
                        borderRadius: 0,
                      }}
                    >
                      Válido
                    </span>
                    <p
                      className="font-mono text-[11px] font-bold tracking-widest"
                      style={{ color: 'var(--ember)' }}
                    >
                      {cert.verification_code}
                    </p>
                  </div>

                  <a
                    href={`/api/certificado/${cert.verification_code}`}
                    download
                    className="flex items-center gap-1.5 border border-[var(--hairline)] hover:border-[var(--hairline-strong)] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[var(--bone-mute)] hover:text-[var(--bone)] transition-colors"
                    style={{ borderRadius: 0 }}
                  >
                    <Download className="h-3 w-3" />
                    PDF
                  </a>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Heading inválido */}
              <h1
                className="font-display italic text-[36px] leading-tight mb-8"
                style={{ color: 'rgba(255,58,14,0.70)' }}
              >
                Certificado Inválido
              </h1>

              <div className="space-y-4">
                <span
                  className="inline-block font-mono text-[10px] uppercase tracking-wider px-2 py-1 border"
                  style={{
                    color: 'var(--ember)',
                    backgroundColor: 'rgba(255,58,14,0.10)',
                    borderColor: 'rgba(255,58,14,0.30)',
                    borderRadius: 0,
                  }}
                >
                  Inválido
                </span>
                <p className="font-sans text-[14px]" style={{ color: 'var(--bone-mute)' }}>
                  O código{' '}
                  <span className="font-mono" style={{ color: 'var(--bone-dim)' }}>
                    {code}
                  </span>{' '}
                  não corresponde a nenhum certificado emitido.
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
