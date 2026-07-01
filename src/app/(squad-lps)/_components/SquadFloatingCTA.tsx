'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function SquadFloatingCTA({ ctaLabel, price, accent }: { ctaLabel: string; price: string; accent: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const scrolled = window.scrollY > 400
      const el = document.getElementById('inscricao')
      const inView = el ? el.getBoundingClientRect().top < window.innerHeight : false
      setVisible(scrolled && !inView)
    }
    window.addEventListener('scroll', check, { passive: true })
    check()
    return () => window.removeEventListener('scroll', check)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-0 sm:bottom-6 sm:right-6 left-0 sm:left-auto right-0 sm:w-auto z-50"
        >
          <a
            href="#inscricao"
            aria-label="Ir para inscrição"
            className="flex sm:inline-flex items-center justify-between sm:justify-center gap-3 px-6 py-4 sm:py-3 w-full sm:w-auto transition-all hover:brightness-110 active:scale-[0.98]"
            style={{
              background: accent, color: '#050507',
              fontFamily: 'var(--font-mono)', fontSize: '0.7rem',
              letterSpacing: '0.12em', textTransform: 'uppercase',
            }}
          >
            <span style={{ color: 'rgba(0,0,0,0.65)', fontSize: '0.6rem' }}>{price}</span>
            <span>{ctaLabel.split('—')[0]?.trim() ?? ctaLabel}</span>
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
