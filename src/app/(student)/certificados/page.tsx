import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Download, ExternalLink, CheckCircle2 } from 'lucide-react'
import { MOCK_CERTIFICATES } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Certificados' }

function formatDate(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default function CertificadosPage() {
  // TODO F5.3: substituir por getUserCertificates(userId)
  const certificates = MOCK_CERTIFICATES

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Certificados</h1>
        <p className="mt-1 text-sm text-white/50">
          Cursos concluídos com certificação disponível
        </p>
      </div>

      {certificates.length === 0 ? (
        <div className="flex flex-col items-center justify-center border border-white/10 bg-[#0C0C12] py-20 text-center">
          <Award className="h-10 w-10 text-white/10" />
          <p className="mt-4 text-sm text-white/30">
            Nenhum certificado ainda. Conclua um curso para emitir seu certificado.
          </p>
          <Link
            href="/meus-cursos"
            className="mt-4 font-mono text-xs uppercase tracking-wider text-[#FF3A0E] hover:text-[#FF5A1F] transition-colors"
          >
            Ver meus cursos
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col gap-4 border border-white/10 bg-[#0C0C12] p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#FF3A0E]/10">
                  <Award className="h-5 w-5 text-[#FF3A0E]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-semibold text-white">{cert.courseName}</h2>
                    <CheckCircle2 className="h-4 w-4 text-green-400" />
                  </div>
                  <p className="mt-0.5 text-sm text-white/50">{cert.cohortName}</p>
                  <p className="mt-1 font-mono text-xs text-white/30">
                    Emitido em {formatDate(cert.issuedAt)}
                  </p>
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-[#FF3A0E]/70">
                    {cert.verificationCode}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 gap-3">
                <Link
                  href={`/certificado/v/${cert.verificationCode}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 border border-white/10 px-3 py-2 font-mono text-xs uppercase tracking-wide text-white/50 transition-colors hover:border-white/20 hover:text-white/80"
                >
                  <ExternalLink className="h-3 w-3" />
                  Verificar
                </Link>
                {cert.pdfAvailable && (
                  <a
                    href={`/api/certificado/${cert.verificationCode}`}
                    download
                    className="flex items-center gap-1.5 bg-[#FF3A0E] px-3 py-2 font-mono text-xs uppercase tracking-wide text-white transition-colors hover:bg-[#FF5A1F]"
                  >
                    <Download className="h-3 w-3" />
                    Baixar PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
