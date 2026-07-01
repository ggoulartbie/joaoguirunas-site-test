import { Logo } from '@/shared/components/ui/Logo'
import Link from 'next/link'

export default function SquadLPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-950/95 backdrop-blur border-b border-zinc-800">
        <Link href="/" aria-label="Voltar para o site">
          <Logo variant="alltype" height={22} />
        </Link>
        <a
          href="#inscricao"
          className="bg-[#FF3A0E] hover:bg-[#e03000] text-white text-sm font-semibold px-4 py-2 rounded-md transition-colors"
          aria-label="Garantir vaga neste curso"
        >
          Garantir vaga
        </a>
      </header>
      <main className="pt-16">
        {children}
      </main>
    </>
  )
}
