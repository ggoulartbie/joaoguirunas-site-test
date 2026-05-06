import type { Metadata } from 'next'
import Link from 'next/link'
import { CheckCircle2, Award, Download, AlertTriangle } from 'lucide-react'
import { supabaseAdmin } from '@/lib/supabase/admin'

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
      profiles(name),
      courses(title),
      cohorts(name)
    `)
    .eq('verification_code', code.toUpperCase())
    .maybeSingle()

  const profile = cert ? (Array.isArray(cert.profiles) ? cert.profiles[0] : cert.profiles) : null
  const courseData = cert ? (Array.isArray(cert.courses) ? cert.courses[0] : cert.courses) : null
  const cohortData = cert ? (Array.isArray(cert.cohorts) ? cert.cohorts[0] : cert.cohorts) : null

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050507] px-4 py-16">
      <div className="w-full max-w-lg">
        {/* Cabeçalho */}
        <div className="mb-8 text-center">
          <Link href="/" className="font-mono text-xs uppercase tracking-widest text-white/30 hover:text-white/60 transition-colors">
            joaoguirunas.com
          </Link>
        </div>

        {cert ? (
          <div className="border border-white/10 bg-[#0C0C12]">
            {/* Barra accent */}
            <div className="h-1 bg-[#FF3A0E]" />

            <div className="p-8">
              {/* Status */}
              <div className="mb-6 flex items-center gap-3">
                <CheckCircle2 className="h-6 w-6 text-green-400" />
                <div>
                  <p className="font-mono text-xs uppercase tracking-widest text-green-400">
                    Certificado válido
                  </p>
                  <p className="mt-0.5 text-xs text-white/30">
                    Verificado em {formatDate(new Date().toISOString())}
                  </p>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Concluinte
                  </p>
                  <p className="mt-1 text-xl font-bold text-white">
                    {profile?.name ?? '—'}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Curso
                  </p>
                  <p className="mt-1 text-base font-semibold text-white">
                    {courseData?.title ?? '—'}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Turma
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {cohortData?.name ?? '—'}
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                    Data de emissão
                  </p>
                  <p className="mt-1 text-sm text-white/70">
                    {formatDate(cert.issued_at)}
                  </p>
                </div>

                <div className="h-px bg-white/10" />

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-white/30">
                      Código de verificação
                    </p>
                    <p className="mt-1 font-mono text-sm font-bold tracking-widest text-[#FF3A0E]">
                      {cert.verification_code}
                    </p>
                  </div>

                  <a
                    href={`/api/certificado/${cert.verification_code}`}
                    download
                    className="flex items-center gap-1.5 border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
                  >
                    <Download className="h-3 w-3" />
                    PDF
                  </a>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="border border-[#FF3A0E]/30 bg-[#0C0C12]">
            <div className="h-1 bg-[#FF3A0E]/40" />
            <div className="flex flex-col items-center p-12 text-center">
              <AlertTriangle className="h-10 w-10 text-[#FF3A0E]/60" />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-[#FF3A0E]">
                Certificado não encontrado
              </p>
              <p className="mt-2 text-sm text-white/40">
                O código{' '}
                <span className="font-mono text-white/60">{code}</span>{' '}
                não corresponde a nenhum certificado emitido.
              </p>
            </div>
          </div>
        )}

        {/* Rodapé */}
        <div className="mt-6 flex items-center justify-center gap-2 text-center">
          <Award className="h-3.5 w-3.5 text-white/20" />
          <p className="font-mono text-[10px] uppercase tracking-widest text-white/20">
            Certificação João Guirunas
          </p>
        </div>
      </div>
    </div>
  )
}
