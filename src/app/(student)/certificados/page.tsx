import type { Metadata } from 'next'
import { Award } from 'lucide-react'

export const metadata: Metadata = { title: 'Certificados' }

export default function CertificadosPage() {
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="text-2xl font-bold text-white">Certificados</h1>
      <p className="mt-1 text-sm text-white/50">Cursos concluídos com certificação</p>

      {/* Placeholder — implementado na Fase 5 */}
      <div className="mt-8 flex flex-col items-center justify-center border border-white/10 bg-[#0C0C12] py-20 text-center">
        <Award className="h-10 w-10 text-white/10" />
        <p className="mt-4 font-mono text-xs uppercase tracking-widest text-white/20">
          Em breve — Fase 5
        </p>
      </div>
    </div>
  )
}
