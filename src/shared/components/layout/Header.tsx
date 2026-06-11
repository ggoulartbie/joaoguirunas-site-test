'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { X, Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { NavLinks } from './NavLinks';
import { Logo } from '@/shared/components/ui/Logo';

const NAV_INTERNAL = [
  { href: '/open-source', label: 'Open-source' },
  { href: '/curso-online', label: 'Curso Online' },
  { href: '/mentoria', label: 'Mentoria' },
];

const NAV_EXTERNAL = [
  { href: 'https://www.growthsales.ai', label: 'Consultoria' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

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
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
            aria-label="Ir para página inicial de João Guirunas"
          >
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px var(--color-accent)' }}
            >
              <Image
                src="/images/joao-guirunas-profile.jpg"
                alt="João Guirunas"
                width={28}
                height={28}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <Logo variant="alltype" height={22} />
          </Link>

          <NavLinks />

          {/* Hamburger — only mobile */}
          <button
            className="md:hidden flex items-center justify-center w-11 h-11 -mr-1 transition-colors"
            style={{ color: 'rgba(255,255,255,0.6)' }}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <nav
          className="md:hidden border-t"
          style={{ borderColor: 'rgba(255,255,255,0.07)', background: 'rgba(4,4,8,0.98)' }}
          aria-label="Menu mobile"
        >
          <ul className="px-4 py-3 flex flex-col gap-1">
            {NAV_INTERNAL.map(({ href, label }) => {
              const isActive = pathname === href || pathname.startsWith(href + '/');
              return (
                <li key={href}>
                  <Link
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center w-full px-3 py-3 min-h-[44px] text-[11px] font-medium uppercase tracking-widest transition-colors duration-150"
                    style={{
                      fontFamily: 'var(--font-mono)',
                      color: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.55)',
                    }}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
            {NAV_EXTERNAL.map(({ href, label }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center w-full px-3 py-3 min-h-[44px] text-[11px] font-medium uppercase tracking-widest transition-colors duration-150"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(255,255,255,0.55)',
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
