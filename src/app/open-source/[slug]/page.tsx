import { notFound } from 'next/navigation'
import { getPostBySlug, contentPosts } from '@/data/content-posts'
import { SkillPage } from '@/shared/components/ui/SkillPage'
import { TutorialBody } from '@/shared/components/ui/TutorialBody'
import { categoryMeta } from '@/data/open-source-categories'
import { resolveSkillIcon } from '@/data/skill-icons'
import type { ContentPost } from '@/types/content-post'
import type { Metadata } from 'next'

export async function generateStaticParams() {
  return contentPosts.map((post) => ({ slug: post.slug }))
}

// Limpa hashtags/espaços extras da legenda para usar como texto corrido.
// legenda é legado/opcional — pode estar ausente em tutoriais migrados.
function plainLegenda(post: ContentPost): string {
  return (post.legenda ?? '').replace(/#\w+/g, '').replace(/\s+/g, ' ').trim()
}

function isPendente(link: string): boolean {
  return link === 'PENDENTE' || link.startsWith('PENDENTE:')
}

// Mapeia ContentPost → props do SkillPage, com fallbacks para posts ainda
// não enriquecidos com campos de tutorial (migração em andamento).
function toSkillPageProps(post: ContentPost) {
  // Fallback p/ posts NÃO migrados (restaurados sem campos de tutorial):
  // usa a legenda limpa se existir, senão uma frase genérica derivada do título.
  // Evita "O que é" / descrição vazios quando legenda foi removida (#26 strip).
  const legendaText = plainLegenda(post)
  const fallbackText =
    legendaText || `${post.titulo} — recurso open source da curadoria de João Guirunas.`

  const longDescription =
    post.longDescription && post.longDescription.length > 0
      ? post.longDescription
      : [fallbackText]

  const link = isPendente(post.link) ? undefined : post.link

  // categoryId é a fonte da verdade; label/cor derivam do mapa central
  // (writer só define categoryId). Overrides explícitos no post têm prioridade.
  const meta = categoryMeta(post.categoryId)

  return {
    title: post.titulo,
    description: post.longDescription?.[0] ?? fallbackText.slice(0, 180),
    category: post.categoryLabel ?? meta.label,
    categoryColor: post.categoryColor ?? meta.color,
    longDescription,
    // Resolve nome de token → SVG path (writers usam 'plugin'/'setup'/etc;
    // batch-1/5 usam path inline — resolveSkillIcon aceita os dois).
    features: (post.features ?? []).map((f) => ({
      ...f,
      icon: resolveSkillIcon(f.icon),
    })),
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

  const description = (
    post.longDescription?.[0] ||
    plainLegenda(post) ||
    `${post.titulo} — recurso open source da curadoria de João Guirunas.`
  ).slice(0, 155)

  return {
    // Sufixo "| João Guirunas" vem do template raiz (layout); não repetir aqui.
    title: post.titulo,
    description,
    // Canonical SEM barra final — é a URL servida em 200 (a versão com barra dá 308).
    alternates: { canonical: `/open-source/${post.slug}` },
    openGraph: {
      title: post.titulo,
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
