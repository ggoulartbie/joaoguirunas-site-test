import type { Database } from '@/types/database'

// Derived from lessons.video_provider — matches the DB CHECK constraint values
export type VideoProvider = 'VIMEO' | 'YOUTUBE' | 'CLOUDFLARE_STREAM'

// Narrows the `string | null` from the generated DB type to VideoProvider
export function isVideoProvider(value: string | null | undefined): value is VideoProvider {
  return value === 'VIMEO' || value === 'YOUTUBE' || value === 'CLOUDFLARE_STREAM'
}

// Lesson row shape from the generated schema
export type LessonRow = Database['public']['Tables']['lessons']['Row']

export interface EmbedOptions {
  autoplay?: boolean
  muted?: boolean
  loop?: boolean
  startAt?: number
}

export interface VideoMetadata {
  id: string
  title: string
  durationSeconds: number
  thumbnailUrl: string
  provider: VideoProvider
}

export interface VideoAdapter {
  getProvider(): VideoProvider
  getEmbedUrl(videoId: string, options?: EmbedOptions): string
  getVideoMetadata(videoId: string): Promise<VideoMetadata>
}
