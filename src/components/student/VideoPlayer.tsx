'use client'

import { useEffect, useRef, useCallback, useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import Player from '@vimeo/player'
import { Play } from 'lucide-react'
import { isVideoProvider } from '@/lib/video/interface'
import { saveProgress, markLessonComplete } from '@/app/actions/progress'

// saveProgress errors are intentionally best-effort: a missed heartbeat is acceptable.
// markLessonComplete errors are critical (affects completion state) and must be captured.
function captureMarkCompleteError(err: unknown, lessonId: string) {
  Sentry.captureException(err, { tags: { action: 'markLessonComplete', lesson_id: lessonId } })
}

const PROGRESS_INTERVAL_MS = 10_000
const COMPLETE_THRESHOLD = 0.95

export function extractYouTubeId(input: string): string | null {
  if (!input) return null
  const trimmed = input.trim()
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) return trimmed
  const m =
    trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/) ??
    trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/) ??
    trimmed.match(/youtube\.com\/embed\/([a-zA-Z0-9_-]{11})/) ??
    trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/)
  return m?.[1] ?? null
}

interface YTPlayerInstance {
  getCurrentTime(): number
  getDuration(): number
  seekTo(seconds: number, allowSeekAhead: boolean): void
  destroy(): void
}

declare global {
  interface Window {
    YT?: {
      Player: new (
        el: HTMLElement,
        opts: {
          videoId: string
          playerVars?: Record<string, number | string>
          events?: {
            onReady?: (e: { target: YTPlayerInstance }) => void
            onStateChange?: (e: { data: number; target: YTPlayerInstance }) => void
          }
        }
      ) => YTPlayerInstance
      PlayerState: { ENDED: number; PLAYING: number; PAUSED: number }
    }
    onYouTubeIframeAPIReady?: () => void
  }
}

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
  const vimeoContainerRef = useRef<HTMLDivElement>(null)
  const ytContainerRef = useRef<HTMLDivElement>(null)
  const vimeoPlayerRef = useRef<Player | null>(null)
  const ytPlayerRef = useRef<YTPlayerInstance | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const completedRef = useRef(false)
  const currentSecondsRef = useRef(initialSeconds)
  const [ytStarted, setYtStarted] = useState(false)

  const stopInterval = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  const startVimeoProgressInterval = useCallback(() => {
    stopInterval()
    intervalRef.current = setInterval(() => {
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
    }, PROGRESS_INTERVAL_MS)
  }, [lessonId, stopInterval])

  // --- Vimeo player ---
  useEffect(() => {
    if (!vimeoContainerRef.current || !videoId || provider !== 'VIMEO') return
    if (!isVideoProvider(provider)) return

    const numericId = parseInt(videoId, 10)
    if (isNaN(numericId)) return

    const player = new Player(vimeoContainerRef.current, {
      id: numericId,
      responsive: true,
      autopause: false,
      dnt: true,
      title: false,
      byline: false,
      portrait: false,
    })

    vimeoPlayerRef.current = player

    player.ready().then(() => {
      if (initialSeconds > 0) player.setCurrentTime(initialSeconds).catch(() => null)
    })

    player.on('play', startVimeoProgressInterval)
    player.on('pause', () => {
      stopInterval()
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
    })
    player.on('ended', () => {
      stopInterval()
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
      if (!completedRef.current) {
        completedRef.current = true
        markLessonComplete(lessonId).catch((err) => captureMarkCompleteError(err, lessonId))
      }
    })
    player.on('timeupdate', ({ seconds, duration }) => {
      currentSecondsRef.current = seconds
      if (!completedRef.current && duration > 0 && seconds / duration >= COMPLETE_THRESHOLD) {
        completedRef.current = true
        markLessonComplete(lessonId).catch((err) => captureMarkCompleteError(err, lessonId))
      }
    })

    return () => {
      stopInterval()
      saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
      player.destroy().catch(() => null)
      vimeoPlayerRef.current = null
    }
  }, [lessonId, videoId, provider, initialSeconds, startVimeoProgressInterval, stopInterval])

  // --- YouTube player (mounted after thumbnail click) ---
  useEffect(() => {
    if (provider !== 'YOUTUBE' || !ytStarted || !ytContainerRef.current) return
    const ytId = extractYouTubeId(videoId)
    if (!ytId) return

    let destroyed = false

    const mountPlayer = () => {
      if (destroyed || !ytContainerRef.current || !window.YT?.Player) return

      const p = new window.YT.Player(ytContainerRef.current, {
        videoId: ytId,
        playerVars: {
          autoplay: 1,
          rel: 0,
          modestbranding: 1,
          start: Math.floor(initialSeconds),
        },
        events: {
          onReady: ({ target }) => {
            if (destroyed) return
            intervalRef.current = setInterval(() => {
              if (destroyed) return
              const secs = target.getCurrentTime()
              const dur = target.getDuration()
              currentSecondsRef.current = secs
              saveProgress(lessonId, Math.floor(secs)).catch(() => null)
              if (!completedRef.current && dur > 0 && secs / dur >= COMPLETE_THRESHOLD) {
                completedRef.current = true
                markLessonComplete(lessonId).catch((err) => captureMarkCompleteError(err, lessonId))
              }
            }, PROGRESS_INTERVAL_MS)
          },
          onStateChange: ({ data, target }) => {
            if (data === window.YT!.PlayerState.ENDED) {
              stopInterval()
              saveProgress(lessonId, Math.floor(target.getCurrentTime())).catch(() => null)
              if (!completedRef.current) {
                completedRef.current = true
                markLessonComplete(lessonId).catch((err) => captureMarkCompleteError(err, lessonId))
              }
            } else if (data === window.YT!.PlayerState.PAUSED) {
              saveProgress(lessonId, Math.floor(target.getCurrentTime())).catch(() => null)
            }
          },
        },
      })
      ytPlayerRef.current = p
    }

    if (window.YT?.Player) {
      mountPlayer()
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script')
        tag.src = 'https://www.youtube.com/iframe_api'
        document.head.appendChild(tag)
      }
      const prev = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        prev?.()
        mountPlayer()
      }
    }

    return () => {
      destroyed = true
      stopInterval()
      if (ytPlayerRef.current) {
        saveProgress(lessonId, Math.floor(currentSecondsRef.current)).catch(() => null)
        ytPlayerRef.current.destroy()
        ytPlayerRef.current = null
      }
    }
  }, [ytStarted, lessonId, videoId, provider, initialSeconds, stopInterval])

  // --- YouTube: thumbnail + play button ---
  if (provider === 'YOUTUBE') {
    const ytId = extractYouTubeId(videoId)

    if (!ytId) {
      return (
        <div className="flex aspect-video w-full items-center justify-center" style={{ background: 'var(--ink-3)' }}>
          <p className="font-mono text-xs" style={{ color: 'var(--bone-mute)' }}>URL do YouTube inválida</p>
        </div>
      )
    }

    if (!ytStarted) {
      return (
        <div className={className}>
          <button
            type="button"
            onClick={() => setYtStarted(true)}
            className="relative block w-full overflow-hidden group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ember)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--void)]"
            style={{ aspectRatio: '16/9', background: '#000' }}
            aria-label="Reproduzir vídeo"
          >
            <img
              src={`https://img.youtube.com/vi/${ytId}/maxresdefault.jpg`}
              alt=""
              className="w-full h-full object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
              }}
            />
            <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.32)' }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="flex items-center justify-center transition-transform duration-200 group-hover:scale-110 active:scale-95"
                style={{ width: 72, height: 52, background: '#FF0000', borderRadius: 10 }}
              >
                <Play className="h-7 w-7 fill-white text-white ml-1" aria-hidden="true" />
              </div>
            </div>
          </button>
        </div>
      )
    }

    return (
      <div className={className}>
        <div
          ref={ytContainerRef}
          className="w-full overflow-hidden"
          style={{ aspectRatio: '16/9', background: 'var(--void)' }}
        />
      </div>
    )
  }

  // --- Not supported ---
  if (!videoId || !isVideoProvider(provider) || provider !== 'VIMEO') {
    return (
      <div
        className="flex w-full items-center justify-center"
        style={{ aspectRatio: '16/9', background: 'var(--ink-3)' }}
      >
        <p className="font-mono text-xs" style={{ color: 'var(--bone-mute)' }}>
          Vídeo não disponível
        </p>
      </div>
    )
  }

  return (
    <div className={className}>
      <div
        ref={vimeoContainerRef}
        className="w-full overflow-hidden"
        style={{ aspectRatio: '16/9', background: 'var(--void)' }}
      />
    </div>
  )
}
