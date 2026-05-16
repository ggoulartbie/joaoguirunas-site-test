import { renderToBuffer } from '@react-pdf/renderer'
import { NextRequest, NextResponse } from 'next/server'
import { CertificatePDF } from '@/components/student/CertificatePDF'
import { supabaseAdmin } from '@/lib/supabase/admin'
import React from 'react'

type Params = { params: Promise<{ code: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { code } = await params

  // Sanitize code to prevent header injection via Content-Disposition
  const safeCode = code.replace(/[^a-zA-Z0-9_-]/g, '')
  if (!safeCode || safeCode.length > 100) {
    return NextResponse.json({ error: 'Invalid code' }, { status: 400 })
  }

  const { data: row } = await supabaseAdmin
    .from('certificates')
    .select(`
      verification_code,
      issued_at,
      revoked_at,
      profiles ( name ),
      courses ( title ),
      cohorts ( name )
    `)
    .eq('verification_code', safeCode.toUpperCase())
    .maybeSingle()

  if (!row) {
    return NextResponse.json({ error: 'Certificado não encontrado' }, { status: 404 })
  }

  if (row.revoked_at) {
    return NextResponse.json({ error: 'Certificado revogado' }, { status: 410 })
  }

  const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles
  const course = Array.isArray(row.courses) ? row.courses[0] : row.courses
  const cohort = Array.isArray(row.cohorts) ? row.cohorts[0] : row.cohorts

  const certData = {
    name: profile?.name ?? 'Aluno',
    courseName: course?.title ?? 'Curso',
    cohortName: cohort?.name ?? 'Turma',
    issuedAt: new Date(row.issued_at),
    verificationCode: row.verification_code,
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com',
  }

  const element = React.createElement(CertificatePDF, certData)

  let buffer: Buffer
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    buffer = await Promise.race([
      renderToBuffer(element as any),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('PDF generation timeout')), 10_000)
      ),
    ])
  } catch {
    return NextResponse.json({ error: 'Erro ao gerar certificado' }, { status: 500 })
  }

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificado-${safeCode}.pdf"`,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
