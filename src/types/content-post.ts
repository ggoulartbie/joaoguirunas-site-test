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
}
