export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import Link from 'next/link'
import { Award, Download, ExternalLink } from 'lucide-react'
import { requireUser } from '@/lib/auth/helpers'
import { supabaseAdmin } from '@/lib/supabase/admin'
import type { CertificateView } from '@/types/student'

export const metadata: Metadata = { title: 'Certificados' }

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  })
}

export default async function CertificadosPage() {
  const profile = await requireUser()

  // Certificados do aluno com joins para course e cohort
  const { data: certRows } = await supabaseAdmin
    .from('certificates')
    .select(`
      id, verification_code, issued_at, pdf_storage_path,
      courses (title, slug),
      cohorts (name)
    `)
    .eq('user_id', profile.id)
    .order('issued_at', { ascending: false })

  const certificates: CertificateView[] = (certRows ?? []).map((c) => {
    const course = Array.isArray(c.courses) ? c.courses[0] : c.courses
    const cohort = Array.isArray(c.cohorts) ? c.cohorts[0] : c.cohorts

    return {
      id: c.id,
      verification_code: c.verification_code,
      issued_at: c.issued_at,
      pdf_storage_path: c.pdf_storage_path,
      courseName: course?.title ?? '',
      courseSlug: course?.slug ?? '',
      cohortName: cohort?.name ?? '',
    }
  })

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-[color:var(--ember)]">
          Certificados
        </p>
        <h1
          className="font-[family-name:var(--type-display)] italic text-[color:var(--bone)]"
          style={{ fontSize: '36px', lineHeight: 1.1 }}
        >
          Suas conquistas
        </h1>
      </div>

      {certificates.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center border border-[color:var(--hairline)] bg-[color:var(--ink)] py-20 text-center"
          style={{ borderRadius: 0 }}
        >
          <Award className="h-12 w-12 text-[color:var(--bone-mute)] opacity-30" />
          <p className="mt-4 font-[family-name:var(--type-sans)] text-[14px] text-[color:var(--bone-mute)]">
            Nenhum certificado ainda. Conclua um curso para emitir seu certificado.
          </p>
          <Link
            href="/academy/meus-cursos"
            className="mt-4 font-mono text-[11px] uppercase tracking-wider text-[color:var(--ember)] transition-colors hover:text-[color:var(--ember-glow)]"
          >
            Ver meus cursos
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {certificates.map((cert) => (
            <div
              key={cert.id}
              className="flex flex-col border border-[color:var(--hairline)] bg-[color:var(--ink)] p-5 transition-colors hover:border-[color:var(--hairline-strong)]"
              style={{ borderRadius: 0 }}
            >
              <Award className="h-6 w-6 text-[color:var(--ember)]" />

              <p className="mt-3 font-[family-name:var(--type-sans)] text-[15px] font-medium leading-snug text-[color:var(--bone)]">
                {cert.courseName}
              </p>
              <p className="mt-1 font-mono text-[11px] text-[color:var(--bone-mute)]">
                {cert.issued_at ? formatDate(cert.issued_at) : '—'}
              </p>
              <p className="mt-0.5 font-mono text-[11px] text-[color:var(--bone-mute)]">
                {cert.cohortName}
              </p>
              <p className="mt-1 font-mono text-[10px] text-[color:var(--bone-mute)] opacity-50">
                {cert.verification_code}
              </p>

              <div className="mt-4 flex items-center gap-3">
                <a
                  href={`/api/certificado/${cert.verification_code}`}
                  download
                  className="flex items-center gap-1.5 border border-[color:var(--hairline)] px-3 py-2 font-mono text-[11px] uppercase tracking-wider text-[color:var(--bone-mute)] transition-colors hover:border-[color:var(--hairline-strong)] hover:text-[color:var(--bone)]"
                  style={{ borderRadius: 0 }}
                >
                  <Download className="h-3 w-3" />
                  Baixar PDF
                </a>
                <Link
                  href={`/academy/certificado/v/${cert.verification_code}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[color:var(--bone-mute)] transition-colors hover:text-[color:var(--bone)]"
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
