import Link from 'next/link';
import Image from 'next/image';

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
            <a
              href="/mentoria#inscricao"
              className="hidden sm:inline-flex items-center gap-2 border border-[#FF4400]/50 bg-transparent px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-widest text-[#FF4400] hover:bg-[#FF4400] hover:text-white hover:border-[#FF4400] transition-all duration-200"
              style={{ fontFamily: "'Geist Mono', monospace" }}
              aria-label="Ir para pagina de mentoria"
            >
              Mentoria
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7l5 5m0 0l-5 5m5-5H6"
                />
              </svg>
            </a>

            <a
              href="/mentoria#inscricao"
              className="sm:hidden inline-flex items-center gap-1.5 border border-[#FF4400]/50 bg-transparent px-4 py-2 text-[#FF4400] hover:bg-[#FF4400] hover:text-white transition-all duration-200"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: '0.7rem',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                fontWeight: 600,
              }}
              aria-label="Ir para pagina de mentoria"
            >
              Mentoria
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
