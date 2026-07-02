'use client'

import { useEffect, useState } from 'react'

interface SquadVSLThumbProps {
  videoId: string
  accent: string
  thumbnailUrl?: string
}

export function SquadVSLThumb({ videoId, accent, thumbnailUrl }: SquadVSLThumbProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false) }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [])

  return (
    <>
      <div
        className="relative w-full cursor-pointer group"
        style={{ aspectRatio: '16/9', border: `2px solid ${accent}60`, borderRadius: '10px', overflow: 'hidden', boxShadow: `0 0 0 1px ${accent}20, 0 8px 40px rgba(0,0,0,0.5)` }}
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Abrir vídeo"
      >
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        )}

        <div className="absolute inset-0" style={{ background: thumbnailUrl ? 'rgba(0,0,0,0.50)' : 'rgba(5,5,7,0.92)' }} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full transition-transform group-hover:scale-105"
            style={{ background: 'transparent', border: `3px solid ${accent}`, boxShadow: `0 0 40px ${accent}60` }}
          >
            <svg className="w-10 h-10 sm:w-12 sm:h-12 translate-x-[3px]" fill="currentColor" viewBox="0 0 24 24" style={{ color: accent }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center">
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', letterSpacing: '0.16em',
            textTransform: 'uppercase', color: accent, fontWeight: 600,
            textShadow: `0 0 20px ${accent}80`,
          }}>
            ▶ Assista antes de decidir · 9 min
          </span>
        </div>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-8"
          style={{ background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(8px)' }}
          onClick={() => setOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl"
            style={{ aspectRatio: '16/9' }}
            onClick={e => e.stopPropagation()}
          >
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://player.vimeo.com/video/${videoId}?badge=0&autopause=0&player_id=0&app_id=58479&title=0&byline=0&portrait=0&dnt=1&autoplay=1`}
              allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
              allowFullScreen
              title="VSL Squad de Sites"
            />
          </div>
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
            onClick={() => setOpen(false)}
            aria-label="Fechar vídeo"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}
    </>
  )
}
