import 'server-only'
import type { VideoAdapter, VideoProvider, EmbedOptions, VideoMetadata } from './interface'

export class VimeoAdapter implements VideoAdapter {
  private readonly accessToken: string
  private readonly allowedDomain: string

  constructor() {
    this.accessToken = process.env.VIMEO_ACCESS_TOKEN ?? ''
    this.allowedDomain = process.env.VIMEO_DOMAIN_WHITELIST ?? ''
  }

  getProvider(): VideoProvider {
    return 'VIMEO'
  }

  getEmbedUrl(videoId: string, options: EmbedOptions = {}): string {
    const params = new URLSearchParams({
      dnt: '1',
      title: '0',
      byline: '0',
      portrait: '0',
    })

    if (this.allowedDomain) {
      // Vimeo domain-locking: embeds only work from the specified domain
      params.set('domain', this.allowedDomain)
    }

    if (options.autoplay) params.set('autoplay', '1')
    if (options.muted) params.set('muted', '1')
    if (options.loop) params.set('loop', '1')
    if (options.startAt) params.set('t', String(options.startAt))

    return `https://player.vimeo.com/video/${videoId}?${params.toString()}`
  }

  async getVideoMetadata(videoId: string): Promise<VideoMetadata> {
    if (!this.accessToken) {
      throw new Error('VIMEO_ACCESS_TOKEN not configured')
    }

    const res = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${this.accessToken}`,
        Accept: 'application/vnd.vimeo.*+json;version=3.4',
      },
      next: { revalidate: 3600 },
    })

    if (!res.ok) {
      throw new Error(`Vimeo API error: ${res.status} for video ${videoId}`)
    }

    const data = await res.json()

    return {
      id: videoId,
      title: data.name ?? '',
      durationSeconds: data.duration ?? 0,
      thumbnailUrl: data.pictures?.sizes?.at(-1)?.link ?? '',
      provider: 'VIMEO',
    }
  }
}
