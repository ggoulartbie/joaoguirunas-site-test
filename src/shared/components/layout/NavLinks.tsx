'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
