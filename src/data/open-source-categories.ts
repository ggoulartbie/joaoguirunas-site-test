import type { TutorialCategoryId } from '@/types/content-post'

// ── Fonte única da verdade para as categorias do catálogo open source ──
// Os writers definem APENAS categoryId nos posts; label, cor e ícone de
// fallback são derivados aqui, no render. Usado por [slug]/page.tsx e
// open-source-client.tsx.
export interface CategoryMeta {
  label: string   // rótulo exibido (badge / card)
  color: string   // token de cor (prop categoryColor do SkillPage)
  icon: string    // chave de ícone (skillIcons) para o card do catálogo
}

export const CATEGORY_META: Record<TutorialCategoryId, CategoryMeta> = {
  squads:      { label: 'Squads',       color: 'squads-aiox',  icon: 'agents'  },
  skills:      { label: 'Skills',       color: 'produtividade', icon: 'setup'  },
  apps:        { label: 'Apps',         color: 'produtividade', icon: 'monitor' },
  integracoes: { label: 'Integrações',  color: 'produtividade', icon: 'plugin' },
  aprendizado: { label: 'Aprendizado',  color: 'produtividade', icon: 'book'   },
}

const FALLBACK: CategoryMeta = CATEGORY_META.aprendizado

// Resolve a metadata de uma categoria, com fallback seguro.
export function categoryMeta(id?: TutorialCategoryId | string): CategoryMeta {
  if (id && id in CATEGORY_META) return CATEGORY_META[id as TutorialCategoryId]
  return FALLBACK
}
