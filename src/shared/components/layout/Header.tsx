import Link from 'next/link';
import Image from 'next/image';
import { MentoriaHeaderButton } from './MentoriaHeaderButton';

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(8,8,14,0.98) 0%, rgba(4,4,8,0.95) 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-0.5 sm:gap-1 text-white hover:opacity-90 transition-opacity"
            aria-label="Ir para pagina inicial do GrowthSales AI"
          >
            <Image
              src="/logo.svg"
              alt="Logo GrowthSales AI"
              width={28}
              height={28}
              className="h-6 sm:h-7 w-6 sm:w-7"
            />
            <span className="text-base sm:text-lg tracking-tight">
              <span className="font-extrabold">Growth</span>
              <span className="font-semibold text-[#FF4400]">Sales</span>
            </span>
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <MentoriaHeaderButton />
          </div>
        </div>
      </div>
    </header>
  );
}
