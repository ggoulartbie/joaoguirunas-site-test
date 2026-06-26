'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import type { MouseEvent } from 'react';

// Deixa cmd/ctrl/shift/alt + clique e botão do meio abrirem nova aba normalmente.
function isModifiedClick(e: MouseEvent): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1;
}

const NAV_INTERNAL = [
  { href: '/open-source', label: 'Open-source' },
  { href: '/curso-online', label: 'Curso Online' },
  { href: '/mentoria', label: 'Mentoria' },
];

const NAV_EXTERNAL = [
  { href: 'https://www.growthsales.ai', label: 'Consultoria' },
];

export function NavLinks() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="hidden md:flex items-center" aria-label="Navegação principal">
      {NAV_INTERNAL.map(({ href, label }) => {
        const isActive = pathname === href || pathname.startsWith(href + '/');
        return (
          <Link
            key={href}
            href={href}
            className="px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors duration-150"
            style={{
              fontFamily: 'var(--font-mono)',
              color: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.45)',
            }}
            // Navegação imperativa: o canvas Spline do hero de /mentoria chama
            // preventDefault() nos cliques de uma faixa do header, então o <Link>
            // não navega. O onClick dispara no bubble mesmo com defaultPrevented.
            onClick={(e) => {
              if (isModifiedClick(e)) return;
              e.preventDefault();
              router.push(href);
            }}
            onMouseEnter={(e) => {
              if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
            }}
            onMouseLeave={(e) => {
              if (!isActive) e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
            }}
            aria-current={isActive ? 'page' : undefined}
          >
            {label}
          </Link>
        );
      })}

      {NAV_EXTERNAL.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors duration-150"
          style={{
            fontFamily: 'var(--font-mono)',
            color: 'rgba(255,255,255,0.45)',
          }}
          // Mesmo motivo dos links internos: garante a abertura mesmo se o hero
          // chamar preventDefault(). Preserva modificadores/botão do meio.
          onClick={(e) => {
            if (isModifiedClick(e)) return;
            e.preventDefault();
            window.open(href, '_blank', 'noopener,noreferrer');
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = 'rgba(255,255,255,0.45)';
          }}
        >
          {label}
        </a>
      ))}
    </nav>
  );
}
