'use client';

import { usePathname } from 'next/navigation';

export function MentoriaHeaderButton() {
  const pathname = usePathname();
  const isMentoria = pathname === '/mentoria';

  const label = isMentoria ? 'Fale com um Especialista' : 'Mentoria';
  const href = isMentoria ? '#inscricao' : '/mentoria';

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    if (isMentoria) {
      e.preventDefault();
      const el = document.getElementById('inscricao');
      if (el) {
        const offset = 80;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }

  return (
    <>
      {/* Desktop */}
      <a
        href={href}
        onClick={handleClick}
        className="hidden sm:inline-flex items-center gap-2 border border-[#FF4400]/50 bg-transparent px-4 sm:px-5 py-2 sm:py-2.5 text-xs font-semibold uppercase tracking-widest text-[#FF4400] hover:bg-[#FF4400] hover:text-white hover:border-[#FF4400] transition-all duration-200"
        style={{ fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace" }}
        aria-label={isMentoria ? 'Ir para formulario de inscricao' : 'Ir para pagina de mentoria'}
      >
        {label}
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
            d={isMentoria ? 'M19 9l-7 7-7-7' : 'M13 7l5 5m0 0l-5 5m5-5H6'}
          />
        </svg>
      </a>

      {/* Mobile */}
      <a
        href={href}
        onClick={handleClick}
        className="sm:hidden inline-flex items-center gap-1.5 border border-[#FF4400]/50 bg-transparent px-4 py-2 text-[#FF4400] hover:bg-[#FF4400] hover:text-white transition-all duration-200"
        style={{
          fontFamily: "'Roboto Mono', var(--font-bb-mono), monospace",
          fontSize: '0.7rem',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          fontWeight: 600,
        }}
        aria-label={isMentoria ? 'Ir para formulario de inscricao' : 'Ir para pagina de mentoria'}
      >
        {isMentoria ? 'Inscreva-se' : 'Mentoria'}
      </a>
    </>
  );
}
