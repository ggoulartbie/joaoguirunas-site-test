import type { TutorialBlock } from '@/types/content-post'

// ── Design tokens (alinhados a SkillPage / aiox-monitor) ──
const EYEBROW: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  fontWeight: 500,
  color: 'rgba(255,58,14,0.8)',
}

interface TutorialBodyProps {
  body: TutorialBlock[]
}

/**
 * Renderiza o corpo estruturado de um tutorial (TutorialBlock[]) no estilo
 * visual da aiox-monitor. Usado como children do <SkillPage>.
 */
export function TutorialBody({ body }: TutorialBodyProps) {
  if (!body || body.length === 0) return null

  return (
    <section
      className="py-14 sm:py-20 lg:py-24"
      style={{ background: '#050507', borderTop: '1px solid rgba(255,255,255,0.07)' }}
      aria-labelledby="tutorial-heading"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-10 lg:px-[140px]">
        <div className="max-w-3xl">
          <p className="mb-4" style={EYEBROW}>
            Passo a passo
          </p>
          <h2
            id="tutorial-heading"
            className="text-2xl sm:text-3xl font-semibold text-white mb-8 tracking-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Como fazer
          </h2>

          <div className="space-y-6">
            {body.map((block, i) => (
              <Block key={i} block={block} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Block({ block }: { block: TutorialBlock }) {
  switch (block.type) {
    case 'heading':
      return (
        <h3 className="text-lg sm:text-xl font-semibold text-white tracking-tight pt-4">
          {block.text}
        </h3>
      )

    case 'paragraph':
      return (
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: 'rgba(255,255,255,0.65)' }}
        >
          {block.text}
        </p>
      )

    case 'steps':
      return (
        <ol className="space-y-3">
          {block.items.map((item, i) => (
            <li key={i} className="flex gap-3 items-start">
              <span
                className="flex-shrink-0 inline-flex items-center justify-center w-6 h-6 text-xs font-semibold"
                style={{
                  fontFamily: 'var(--font-mono)',
                  background: '#16161a',
                  border: '1px solid rgba(255,58,14,0.35)',
                  color: '#FF3A0E',
                }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <span
                className="text-base leading-relaxed pt-0.5"
                style={{ color: 'rgba(255,255,255,0.7)' }}
              >
                {item}
              </span>
            </li>
          ))}
        </ol>
      )

    case 'code':
      return (
        <div className="overflow-x-auto">
          <pre
            className="font-mono text-sm whitespace-pre-wrap min-w-0 p-4"
            style={{
              background: '#16161a',
              border: '1px solid rgba(255,255,255,0.1)',
              color: '#FF3A0E',
            }}
          >
            <code>{block.code}</code>
          </pre>
        </div>
      )

    case 'callout':
      return (
        <p
          className="text-sm sm:text-base leading-relaxed p-4"
          style={{
            background: 'rgba(255,58,14,0.06)',
            borderLeft: '2px solid #FF3A0E',
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          {block.text}
        </p>
      )

    default:
      return null
  }
}
