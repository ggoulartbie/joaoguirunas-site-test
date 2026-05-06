import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Download, ExternalLink } from 'lucide-react'
import { MOCK_CERTIFICATES } from '@/components/student/mock-data'

export const metadata: Metadata = { title: 'Certificados' }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
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
        <p
          className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2"
          style={{ color: 'var(--ember)' }}
        >
          Certificados
        </p>
        <h1
          className="font-display italic text-[36px] leading-tight"
          style={{ color: 'var(--bone)' }}
        >
          Suas conquistas
        </h1>
      </div>

      {certificates.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-20 text-center border"
          style={{
            backgroundColor: 'var(--ink)',
            borderColor: 'var(--hairline)',
            borderRadius: 0,
          }}
        >
          <Award className="h-12 w-12" style={{ color: 'rgba(132,132,140,0.30)' }} />
          <p className="mt-4 font-sans text-[14px]" style={{ color: 'var(--bone-mute)' }}>
            Nenhum certificado ainda. Conclua um curso para emitir seu certificado.
          </p>
          <Link
            href="/academy/meus-cursos"
            className="mt-4 font-mono text-[11px] uppercase tracking-wider transition-colors hover:opacity-80"
            style={{ color: 'var(--ember)' }}
          >
            Ver meus cursos
          </Link>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 gap-4">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="border p-5 flex flex-col"
              style={{
                backgroundColor: 'var(--ink)',
                borderColor: 'var(--hairline)',
                borderRadius: 0,
              }}
            >
              <Award className="h-6 w-6" style={{ color: 'var(--ember)' }} />

              <p
                className="font-sans text-[15px] font-medium mt-3 leading-snug"
                style={{ color: 'var(--bone)' }}
              >
                {cert.courseName}
              </p>
              <p className="font-mono text-[11px] mt-1" style={{ color: 'var(--bone-mute)' }}>
                {cert.issued_at ? formatDate(cert.issued_at) : '—'}
              </p>
              <p className="font-mono text-[11px] mt-0.5" style={{ color: 'var(--bone-mute)' }}>
                {cert.cohortName}
              </p>
              <p
                className="font-mono text-[10px] mt-1"
                style={{ color: 'rgba(132,132,140,0.50)' }}
              >
                {cert.verification_code}
              </p>

              <div className="flex items-center gap-3 mt-4">
                {cert.pdf_storage_path && (
                  <a
                    href={`/api/certificado/${cert.verification_code}`}
                    download
                    className="flex items-center gap-1.5 border px-3 py-2 font-mono text-[11px] uppercase tracking-wider transition-colors hover:border-[var(--ember)]"
                    style={{
                      borderColor: 'var(--hairline)',
                      color: 'var(--ember)',
                      borderRadius: 0,
                    }}
                  >
                    <Download className="h-3 w-3" />
                    Baixar PDF
                  </a>
                )}
                <Link
                  href={`/academy/certificado/v/${cert.verification_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider transition-colors hover:text-[var(--bone)]"
                  style={{ color: 'var(--bone-mute)' }}
                >
                  <ExternalLink className="h-3 w-3" />
                  Verificar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
