'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ChevronDown, ArrowRight } from 'lucide-react';

const EMBER = '#FF3A0E';

interface Course {
  title: string;
  href: string;
  badge: string;
  active: boolean;
  separator?: boolean;
}

const COURSES: Course[] = [
  { title: 'Claude Agents Team', href: '/curso-online', badge: 'Ativo', active: true },
  { title: 'Site', href: '/curso-design', badge: 'Em breve', active: false },
  { title: 'Dev com IA', href: '/curso-dev', badge: 'Em breve', active: false },
  { title: 'Tráfego', href: '/curso-ia-agentes', badge: 'Em breve', active: false },
  { title: 'Social Media & Conteúdo', href: '/curso-social-media', badge: 'Em breve', active: false },
  { title: 'Bundle — os 4 cursos', href: '/curso-bundle', badge: 'Em breve', active: false, separator: true },
];

export function CoursesDropdown() {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on click outside
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [open]);

  return (
    <div ref={containerRef} className="relative">
      {/* Trigger button — matches other hero CTAs */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center justify-center gap-1.5 px-7 py-3 text-sm font-semibold text-white/70 transition-all duration-200 hover:text-white hover:bg-white/[0.05]"
        style={{ border: '1px solid rgba(255,255,255,0.14)', letterSpacing: '-0.01em' }}
        aria-expanded={open}
        aria-haspopup="true"
      >
        Cursos
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <ChevronDown size={15} />
        </motion.span>
      </button>

      {/* Popover */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.18 }}
            className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 overflow-hidden"
            style={{
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.10)',
              minWidth: '240px',
            }}
          >
            {COURSES.map((course) => (
              <div key={course.href}>
                {course.separator && (
                  <hr style={{ borderColor: 'rgba(255,255,255,0.08)', margin: 0 }} />
                )}
                <Link
                  href={course.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-between gap-3 px-4 py-3 transition-colors duration-150 hover:bg-white/[0.04]"
                >
                  {/* Left side: badge + title */}
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="flex-shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded"
                      style={
                        course.active
                          ? { background: EMBER, color: '#ffffff' }
                          : { background: 'rgba(255,255,255,0.15)', color: 'rgba(255,255,255,0.55)' }
                      }
                    >
                      {course.badge}
                    </span>
                    <span
                      className="text-sm font-medium truncate"
                      style={{ color: course.active ? '#ffffff' : 'rgba(255,255,255,0.50)' }}
                    >
                      {course.title}
                    </span>
                  </div>

                  {/* Right side: arrow only for active course */}
                  {course.active && (
                    <ArrowRight
                      size={14}
                      className="flex-shrink-0"
                      style={{ color: 'rgba(255,255,255,0.50)' }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
