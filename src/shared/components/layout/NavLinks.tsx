'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useRef } from 'react';

const NAV = [
  { href: '/open-source', label: 'Open-source' },
  { href: '/mentoria', label: 'Mentoria' },
];

const CURSOS_DROPDOWN = [
  { slug: 'curso-online', label: 'Completo', href: '/curso-online' },
  { slug: 'curso-design', label: 'Site', href: '/curso-design' },
  { slug: 'curso-dev', label: 'Devs', href: '/curso-dev' },
  { slug: 'curso-social-media', label: 'Social Media', href: '/curso-social-media' },
  { slug: 'curso-ia-agentes', label: 'Tráfego', href: '/curso-ia-agentes' },
];

const CURSOS_HREFS = CURSOS_DROPDOWN.map((c) => c.href);

export function NavLinks() {
  const pathname = usePathname();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCursosActive = CURSOS_HREFS.some(
    (href) => pathname === href || pathname.startsWith(href + '/')
  );

  function handleMouseEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdownOpen(true);
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setDropdownOpen(false), 120);
  }

  return (
    <nav className="hidden md:flex items-center" aria-label="Navegação principal">
      {/* Item "Cursos" com dropdown */}
      <div
        className="relative"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button
          type="button"
          className="px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors duration-150 cursor-pointer"
          style={{
            fontFamily: 'var(--font-mono)',
            color: isCursosActive ? 'var(--color-accent)' : dropdownOpen ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.45)',
            background: 'none',
            border: 'none',
          }}
          aria-haspopup="true"
          aria-expanded={dropdownOpen}
        >
          Formações
        </button>

        {dropdownOpen && (
          <div
            className="absolute top-full left-1/2 -translate-x-1/2 mt-1 py-1 min-w-[160px] z-50"
            style={{
              background: 'rgba(8,8,14,0.98)',
              border: '1px solid rgba(255,255,255,0.12)',
              borderRadius: '6px',
            }}
          >
            {CURSOS_DROPDOWN.map(({ slug, label, href }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <Link
                  key={slug}
                  href={href}
                  className="block px-4 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors duration-150 whitespace-nowrap"
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
          </div>
        )}
      </div>

      {/* Links regulares */}
      {NAV.map(({ href, label }) => {
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
    </nav>
  );
}
