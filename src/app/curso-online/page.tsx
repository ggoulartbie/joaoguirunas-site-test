import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'
import { CursoOnlineHero } from './_components/CursoOnlineHero'
import { CursoFaqAccordion } from './_components/CursoFaqAccordion'
import { SquadHubCards } from '../(squad-lps)/_components/SquadHubCards'
import { CourseHubBackground } from './_components/CourseHubBackground'

export const metadata: Metadata = {
  title: 'Cursos Online — Escolha sua Squad de Agentes IA | João Guirunas',
  description: 'Três módulos especializados em Claude Agent Teams. Cada squad é um time de IA pronto para trabalhar no seu negócio. Sites, Social Media e Dev.',
  alternates: { canonical: '/curso-online' },
  openGraph: {
    title: 'Cursos Online — Escolha sua Squad de Agentes IA | João Guirunas',
    description: 'Três módulos especializados em Claude Agent Teams. Sites, Social e Dev.',
    url: `${siteConfig.url}/curso-online`,
    images: [{ url: '/images/og-default.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cursos Online — Escolha sua Squad de Agentes IA | João Guirunas',
    description: 'Três módulos especializados em Claude Agent Teams. Sites, Social e Dev.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Claude Agent Teams — Squads disponíveis',
  description: 'Módulos especializados em Claude Agent Teams: Squad Sites, Squad Social, Squad Dev.',
  itemListElement: [
    { '@type': 'ListItem', position: 1, url: `${siteConfig.url}/squad-sites`, name: 'Squad de Sites — R$297' },
    { '@type': 'ListItem', position: 2, url: `${siteConfig.url}/squad-social`, name: 'Squad de Social Media — R$297' },
    { '@type': 'ListItem', position: 3, url: `${siteConfig.url}/squad-dev`, name: 'Squad de Dev — R$397' },
  ],
}

const KV_DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)',
  fontWeight: 400,
  letterSpacing: '-0.03em',
}

import React from 'react'

export default function CursoOnlinePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <CourseHubBackground />

      <div className="relative z-10">

        <CursoOnlineHero />

        <SquadHubCards />

        {/* ===== FAQ ===== */}
        <section
          id="faq"
          className="py-16 sm:py-24"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
            <div className="text-center mb-10 sm:mb-16">
              <p
                className="mb-4 sm:mb-6"
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 58, 14, 0.85)',
                  fontWeight: 500,
                }}
              >
                FAQ
              </p>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-white"
                style={{ ...KV_DISPLAY, lineHeight: 0.95 }}
              >
                Dúvidas Comuns
              </h2>
              <div className="mx-auto mt-4 sm:mt-6 w-12 sm:w-16 h-[1px] bg-[#FF3A0E]/40" />
            </div>
            <CursoFaqAccordion />
          </div>
        </section>
      </div>
    </>
  )
}
