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
        className="relative w-full overflow-hidden cursor-pointer group"
        style={{ aspectRatio: '16/9', border: `1px solid ${accent}30` }}
        onClick={() => setOpen(true)}
        role="button"
        aria-label="Abrir vídeo"
      >
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt="" className="absolute inset-0 w-full h-full object-cover" aria-hidden="true" />
        )}

        <div className="absolute inset-0" style={{ background: thumbnailUrl ? 'rgba(0,0,0,0.28)' : 'rgba(5,5,7,0.92)' }} />

        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full transition-transform group-hover:scale-110"
            style={{ background: accent, boxShadow: `0 0 40px ${accent}60` }}
          >
            <svg className="w-6 h-6 sm:w-8 sm:h-8 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24" style={{ color: '#050507' }}>
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>

        <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.6rem', letterSpacing: '0.14em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
          }}>
            Assista antes de decidir · 9 min
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
