interface SquadVSLProps {
  vslTitle?: string
  accent: string
}

export function SquadVSL({ vslTitle, accent }: SquadVSLProps) {
  return (
    <section className="w-full py-8 sm:py-12">
      <div className="mx-auto max-w-4xl px-5 sm:px-10 lg:px-16">
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: '16/9',
            border: `1px solid ${accent}30`,
          }}
        >
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://player.vimeo.com/video/1206325946?badge=0&autopause=0&player_id=0&app_id=58479"
            allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media"
            allowFullScreen
            title="VSL Squad de Sites"
          />
        </div>
        <p
          className="mt-3 text-center text-white/40"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.65rem', letterSpacing: '0.12em', textTransform: 'uppercase' }}
        >
          {vslTitle ?? 'Assista antes de decidir'}
        </p>
      </div>
    </section>
  )
}
