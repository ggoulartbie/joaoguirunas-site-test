import { notFound } from 'next/navigation'
import { getPostBySlug, contentPosts } from '@/data/content-posts'
import { ContentPostPage } from '@/shared/components/ui/ContentPostPage'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return contentPosts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  // Strip hashtags for description
  const plainLegenda = post.legenda.replace(/#\w+/g, '').replace(/\s+/g, ' ').trim()
  const description = plainLegenda.slice(0, 155)

  return {
    title: `${post.titulo} | João Guirunas`,
    description,
    alternates: { canonical: `/open-source/${post.slug}/` },
    openGraph: {
      title: `${post.titulo} | João Guirunas`,
      description,
      images: [{ url: '/images/hero-ultrawide.png', width: 1200, height: 630 }],
    },
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()
  return <ContentPostPage post={post} />
}
