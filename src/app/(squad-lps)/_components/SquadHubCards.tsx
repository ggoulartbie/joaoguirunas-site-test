'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

const SQUADS_HUB = [
  {
    id: 'sites', label: 'Squad Sites', race: 'Luminari',
    description: 'Crie e publique sites profissionais com uma squad de IA — do zero ao primeiro cliente pagante.',
    price: 'R$297', priceInstallments: '5x R$64,90',
    href: '/squad-sites', accent: '#FF3A0E',
    planetTexture: '/textures/planets/mars-8k.jpg', agentCount: 10,
  },
  {
    id: 'social', label: 'Squad Social', race: 'Xelvari',
    description: 'Monte uma squad que cria imagens, vídeos com avatar e publica conteúdo automaticamente nas redes.',
    price: 'R$297', priceInstallments: '5x R$64,90',
    href: '/squad-social', accent: '#EC4899',
    planetTexture: '/textures/planets/venus-8k.jpg', agentCount: 7,
  },
  {
    id: 'dev', label: 'Squad Dev', race: 'Arcturiana',
    description: 'Construa sistemas com banco de dados real, login e API usando Supabase — sem contratar um dev.',
    price: 'R$397', priceInstallments: '5x R$86,90',
    href: '/squad-dev', accent: '#A78BFA',
    planetTexture: '/textures/planets/jupiter-4k.jpg', agentCount: 10,
  },
]

const MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)', fontSize: '0.6rem',
  letterSpacing: '0.14em', textTransform: 'uppercase' as const,
}
const DISPLAY: React.CSSProperties = {
  fontFamily: 'var(--font-display-serif)', fontWeight: 400,
  letterSpacing: '-0.02em', lineHeight: 1.1,
}

export function SquadHubCards() {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-16">
        <p className="mb-8 text-center" style={{ ...MONO, color: 'rgba(255,255,255,0.35)' }}>
          — Módulos Disponíveis —
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {SQUADS_HUB.map((squad, i) => (
            <motion.div
              key={squad.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative flex flex-col overflow-hidden transition-all duration-200"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: `1px solid ${squad.accent}20`,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${squad.accent}50`
                ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1.01)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${squad.accent}20`
                ;(e.currentTarget as HTMLDivElement).style.transform = 'scale(1)'
              }}
            >
              {/* Planet image */}
              <div
                className="w-full"
                style={{
                  aspectRatio: '4/3',
                  backgroundImage: `url(${squad.planetTexture})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  position: 'relative',
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, rgba(5,5,7,0.2) 0%, rgba(5,5,7,0.85) 100%)' }}
                />
                {/* Race badge */}
                <div className="absolute bottom-3 left-3">
                  <span style={{ ...MONO, color: squad.accent,
                    background: 'rgba(0,0,0,0.6)', padding: '0.2rem 0.5rem',
                    border: `1px solid ${squad.accent}30`, display: 'inline-block',
                  }}>
                    {squad.race} · {squad.agentCount} agentes
                  </span>
                </div>
              </div>
              {/* Content */}
              <div className="flex flex-col flex-1 p-5">
                <h3 className="text-xl text-white mb-2" style={DISPLAY}>{squad.label}</h3>
                <p className="text-white/50 text-sm leading-relaxed flex-1 mb-4">{squad.description}</p>
                <div className="mb-4">
                  <span className="text-2xl text-white" style={DISPLAY}>{squad.price}</span>
                  <span className="ml-2 text-white/35 text-xs" style={{ fontFamily: 'var(--font-mono)' }}>
                    ou {squad.priceInstallments}
                  </span>
                </div>
                <Link
                  href={squad.href}
                  className="w-full text-center py-3 transition-all hover:brightness-110"
                  style={{
                    background: squad.accent, color: '#050507',
                    ...MONO, fontSize: '0.65rem',
                  }}
                >
                  Conhecer Squad →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
