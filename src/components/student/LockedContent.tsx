import Link from 'next/link'
import { Lock, ArrowRight } from 'lucide-react'

type Props = {
  cohortName: string
  cohortSlug: string
  cohortDescription: string | null
}

export function LockedContent({ cohortName, cohortSlug, cohortDescription }: Props) {
  return (
    <div className="flex flex-col items-center border border-white/10 bg-[#0C0C12] px-8 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center border border-white/10 bg-[#050507]">
        <Lock className="h-7 w-7 text-white/20" />
      </div>

      <h2 className="mt-6 text-xl font-bold text-white">Conteúdo exclusivo</h2>

      <p className="mt-2 max-w-sm text-sm text-white/50">
        Esta aula faz parte de{' '}
        <span className="font-semibold text-white/80">{cohortName}</span>
        {cohortDescription ? ` — ${cohortDescription}` : '.'}
      </p>

      <Link
        href={`/turmas/${cohortSlug}`}
        className="mt-8 flex items-center gap-2 bg-[#FF3A0E] px-5 py-3 font-mono text-xs uppercase tracking-wider text-white transition-colors hover:bg-[#FF5A1F]"
      >
        Ver detalhes da turma
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  )
}
