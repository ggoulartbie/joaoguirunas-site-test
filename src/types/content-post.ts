// ── Categorias do catálogo open source (alinhadas ao filtro de /open-source) ──
export type TutorialCategoryId =
  | 'squads'
  | 'skills'
  | 'apps'
  | 'integracoes'
  | 'aprendizado'

// ── Feature exibida no grid "Principais recursos" (props do SkillPage) ──
export interface TutorialFeature {
  title: string
  description: string
  icon: string           // SVG path interno (mesmo formato de SkillPage.features)
}

export interface ContentPost {
  slug: string
  data: string           // "2026-06-18"
  slot: 'A' | 'B'
  formato: 'Reel' | 'Carrossel'
  titulo: string
  ferramenta: string
  link: string           // pode ser "PENDENTE:..." para links ainda a verificar
  roteiro: string        // texto completo do roteiro
  legenda: string        // texto completo da legenda Instagram
  keyword_cta: string    // palavra-chave para o CTA (ex: "VÍDEO")
  pilar: string          // pilar de conteúdo
  duracao: string        // "35s" para Reel, "8 slides" para Carrossel

  // ── Campos de tutorial (opcionais) — alinhados às props do SkillPage ──
  // Preenchidos durante a migração post→tutorial. Enquanto ausentes, o post
  // continua compatível com o render antigo (não quebram typecheck).
  categoryId?: TutorialCategoryId       // categoria do catálogo (filtro)
  categoryLabel?: string                // rótulo exibido (ex: "Aprendizado")
  categoryColor?: string                // token de cor da categoria
  longDescription?: string[]            // seção "O que é" (2-3 parágrafos)
  features?: TutorialFeature[]          // seção "Principais recursos"
  primaryLink?: string                  // CTA primário (repo/doc)
  primaryLabel?: string                 // rótulo do CTA primário
  isExternal?: boolean                  // CTA abre em nova aba
  author?: string                       // autor exibido no hero
  authorUrl?: string                    // link do autor
  bgImage?: string                      // imagem de fundo do hero
  bgPosition?: string                   // object-position do bg do hero
}
