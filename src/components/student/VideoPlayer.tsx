'use client'

import { useEffect, useRef, useCallback } from 'react'
import Player from '@vimeo/player'
import { isVideoProvider } from '@/lib/video/interface'
import { saveProgress, markLessonComplete } from '@/app/actions/progress'

const PROGRESS_INTERVAL_MS = 10_000
const COMPLETE_THRESHOLD = 0.95

interface VideoPlayerProps {
  lessonId: string
  videoId: string
  provider: string | null
  initialSeconds?: number
  className?: string
}

export function VideoPlayer({
  lessonId,
  videoId,
  provider,
  initialSeconds = 0,
  className,
}: VideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const playerRef = useRef<Player | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = useRef(false)
  const currentSecondsRef = useRef(initialSeconds)

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startProgressInterval = useCallback(() => {
    stopInterval()
    intervalRef.current = setInterval(() => {
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
    }, PROGRESS_INTERVAL_MS)
  }, [lessonId, stopInterval])

  useEffect(() => {
    if (!containerRef.current || !videoId) return
    if (!isVideoProvider(provider)) return

    // Only Vimeo is implemented — other providers throw in the adapter
    if (provider !== 'VIMEO') return

    const numericId = parseInt(videoId, 10)
    if (isNaN(numericId)) return

    const player = new Player(containerRef.current, {
      id: numericId,
      responsive: true,
      autopause: false,
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
    })

    playerRef.current = player

    player.ready().then(() => {
      // Resume from saved position
      if (initialSeconds > 0) {
        player.setCurrentTime(initialSeconds).catch(() => null)
      }
    })

    player.on('play', startProgressInterval)

    player.on('pause', () => {
      stopInterval()
      // Flush current position immediately on pause
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
    })

    player.on('ended', () => {
      stopInterval()
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
      if (!completedRef.current) {
        completedRef.current = true
        markLessonComplete(lessonId).catch(() => null)
      }
    })

    player.on('timeupdate', ({ seconds, duration }) => {
      currentSecondsRef.current = seconds
      if (!completedRef.current && duration > 0 && seconds / duration >= COMPLETE_THRESHOLD) {
        completedRef.current = true
        markLessonComplete(lessonId).catch(() => null)
      }
    })

    return () => {
      stopInterval()
      // Save final position before unmount
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
      player.destroy().catch(() => null)
      playerRef.current = null
    }
  }, [lessonId, videoId, provider, initialSeconds, startProgressInterval, stopInterval])

  if (!videoId || !isVideoProvider(provider) || provider !== 'VIMEO') {
    return (
      <div
        className="flex aspect-video w-full items-center justify-center"
        style={{ background: 'var(--ink-3)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'var(--bone-mute)' }}>Vídeo não disponível</p>
      </div>
    )
  }

  return (
    <div className={className}>
      {/* Vimeo Player SDK mounts the iframe inside this div */}
      <div ref={containerRef} className="aspect-video w-full overflow-hidden" style={{ background: 'var(--void)' }} />
    </div>
  )
}
