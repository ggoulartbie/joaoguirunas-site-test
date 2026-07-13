import { ContentPost } from '@/types/content-post'
import { batch1 } from './batch-1'
import { batch2 } from './batch-2'
import { batch3 } from './batch-3'
import { batch4 } from './batch-4'
import { batch5 } from './batch-5'
import { batch6 } from './batch-6'
import { batch7 } from './batch-7'
import { batch8 } from './batch-8'
import { batch9 } from './batch-9'
import { batch10 } from './batch-10'
import { batch11 } from './batch-11'
import { batch12 } from './batch-12'

export const contentPosts: ContentPost[] = [
  ...batch1,
  ...batch2,
  ...batch3,
  ...batch4,
  ...batch5,
  ...batch6,
  ...batch7,
  ...batch8,
  ...batch9,
  ...batch10,
  ...batch11,
  ...batch12,
]

export function getPostBySlug(slug: string): ContentPost | undefined {
  return contentPosts.find(p => p.slug === slug)
}
