import 'server-only'
import type { VideoAdapter, VideoProvider, LessonRow } from './interface'
import { isVideoProvider } from './interface'
import { VimeoAdapter } from './vimeo'

export type { VideoAdapter, VideoProvider, EmbedOptions, VideoMetadata, LessonRow } from './interface'
export { isVideoProvider } from './interface'

const adapters: Record<VideoProvider, () => VideoAdapter> = {
  VIMEO: () => new VimeoAdapter(),
  YOUTUBE: () => { throw new Error('YouTube adapter not implemented') },
  CLOUDFLARE_STREAM: () => { throw new Error('Cloudflare Stream adapter not implemented') },
}

export function getVideoAdapter(provider: VideoProvider): VideoAdapter {
  const factory = adapters[provider]
  if (!factory) throw new Error(`Unknown video provider: ${provider}`)
  return factory()
}

// Convenience helper — accepts a lessons row directly and narrows the provider type
export function getVideoAdapterForLesson(lesson: LessonRow): {
  adapter: VideoAdapter
  videoId: string
} | null {
  if (!lesson.video_id || !isVideoProvider(lesson.video_provider)) return null
  return {
    adapter: getVideoAdapter(lesson.video_provider),
    videoId: lesson.video_id,
  }
}
