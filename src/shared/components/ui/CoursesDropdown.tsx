'use client';

import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import type { MouseEvent, KeyboardEvent } from 'react';
import { usePathname, useRouter } from 'next/navigation';

// Deixa cmd/ctrl/shift/alt + clique e botão do meio abrirem nova aba normalmente.
function isModifiedClick(e: MouseEvent): boolean {
  return e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button === 1;
}

const COURSES: Array<{ href: string; label: string; dot: string | null }> = [
  { href: '/curso-online', label: 'Todos os cursos', dot: null },
  { href: '/squad-sites', label: 'Squad de Sites · R$297', dot: '#FF3A0E' },
  { href: '/squad-social', label: 'Squad de Social · R$297', dot: '#EC4899' },
  { href: '/squad-dev', label: 'Squad de Dev · R$397', dot: '#A78BFA' },
];

export function CoursesDropdown() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  const isActive = COURSES.some(
    ({ href }) => pathname === href || pathname.startsWith(href + '/')
  );

  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') setOpen(false);
  }

  function navPush(href: string, e: MouseEvent) {
    if (isModifiedClick(e)) return;
    e.preventDefault();
    setOpen(false);
    router.push(href);
  }

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onKeyDown={handleKeyDown}
    >
      <button
        className="px-3 py-2 text-[11px] font-medium uppercase tracking-widest transition-colors duration-150 bg-transparent border-0 cursor-pointer"
        style={{
          fontFamily: 'var(--font-mono)',
          color: isActive
            ? 'var(--color-accent)'
            : open
              ? 'rgba(255,255,255,0.8)'
              : 'rgba(255,255,255,0.45)',
        }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Cursos
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full left-0 z-50 py-2 min-w-[200px] border"
          style={{
            background: 'rgba(4,4,8,0.98)',
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        >
          {COURSES.map(({ href, label, dot }) => {
            const itemActive = pathname === href || pathname.startsWith(href + '/');
            return (
              <Link
                key={href}
                href={href}
                role="menuitem"
                className="flex items-center gap-2 px-4 py-2 text-[10px] font-medium uppercase tracking-widest transition-colors duration-150 whitespace-nowrap"
                style={{
                  fontFamily: 'var(--font-mono)',
                  color: itemActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.55)',
                }}
                onClick={(e) => navPush(href, e)}
                onMouseEnter={(e) => {
                  if (!itemActive) e.currentTarget.style.color = 'rgba(255,255,255,0.8)';
                }}
                onMouseLeave={(e) => {
                  if (!itemActive) e.currentTarget.style.color = 'rgba(255,255,255,0.55)';
                }}
              >
                {dot && (
                  <span
                    className="w-2 h-2 rounded-full flex-shrink-0"
                    style={{ background: dot }}
                  />
                )}
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
