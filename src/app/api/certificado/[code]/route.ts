import { renderToBuffer } from '@react-pdf/renderer'
import { NextRequest, NextResponse } from 'next/server'
import { CertificatePDF } from '@/components/student/CertificatePDF'
import React from 'react'

type Params = { params: Promise<{ code: string }> }

export async function GET(_req: NextRequest, { params }: Params) {
  const { code } = await params

  // TODO F5.3: buscar certificado real via supabaseAdmin
  // const cert = await supabaseAdmin.from('certificates').select('...').eq('verification_code', code).single()
  // if (!cert.data) return NextResponse.json({ error: 'not found' }, { status: 404 })

  // Mock para desenvolvimento
  const cert = {
    name: 'João Guirunas',
    courseName: 'Estratégia com IA',
    cohortName: 'Mentoria — Turma Maio 2026',
    issuedAt: new Date('2026-05-05'),
    verificationCode: code,
    appUrl: process.env.NEXT_PUBLIC_APP_URL ?? 'https://joaoguirunas.com',
  }

  // renderToBuffer espera ReactElement com Document como root — CertificatePDF já wrappa Document
  const element = React.createElement(CertificatePDF, cert)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const buffer = await renderToBuffer(element as any)

  return new NextResponse(new Uint8Array(buffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="certificado-${code}.pdf"`,
      'Cache-Control': 'private, max-age=3600',
    },
  })
}
