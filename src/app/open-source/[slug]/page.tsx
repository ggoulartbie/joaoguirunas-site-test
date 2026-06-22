import { notFound } from 'next/navigation'
import { getPostBySlug, contentPosts } from '@/data/content-posts'
import { SkillPage } from '@/shared/components/ui/SkillPage'
import { TutorialBody } from '@/shared/components/ui/TutorialBody'
import type { ContentPost } from '@/types/content-post'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return contentPosts.map((post) => ({ slug: post.slug }))
}

// Limpa hashtags/espaços extras da legenda para usar como texto corrido.
function plainLegenda(post: ContentPost): string {
  return post.legenda.replace(/#\w+/g, '').replace(/\s+/g, ' ').trim()
}

function isPendente(link: string): boolean {
  return link === 'PENDENTE' || link.startsWith('PENDENTE:')
}

// Mapeia ContentPost → props do SkillPage, com fallbacks para posts ainda
// não enriquecidos com campos de tutorial (migração em andamento).
function toSkillPageProps(post: ContentPost) {
  const longDescription =
    post.longDescription && post.longDescription.length > 0
      ? post.longDescription
      : [plainLegenda(post)]

  const link = isPendente(post.link) ? undefined : post.link

  return {
    title: post.titulo,
    description: post.longDescription?.[0] ?? plainLegenda(post).slice(0, 180),
    category: post.categoryLabel ?? post.categoryId ?? post.pilar,
    categoryColor: post.categoryColor ?? post.categoryId ?? 'aprendizado',
    longDescription,
    features: post.features ?? [],
    primaryLink: post.primaryLink ?? link,
    primaryLabel: post.primaryLabel ?? post.ferramenta,
    isExternal: post.isExternal ?? true,
    author: post.author ?? '@joaoguirunas',
    authorUrl: post.authorUrl,
    bgImage: post.bgImage ?? '/images/bg-open-source.png',
    bgPosition: post.bgPosition,
    canonicalPath: `/open-source/${post.slug}`,
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  const description = (post.longDescription?.[0] ?? plainLegenda(post)).slice(0, 155)

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

  return (
    <SkillPage {...toSkillPageProps(post)}>
      {post.body && post.body.length > 0 && <TutorialBody body={post.body} />}
    </SkillPage>
  )
}
