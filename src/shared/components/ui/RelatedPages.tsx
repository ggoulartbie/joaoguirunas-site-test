import Link from 'next/link';

export interface RelatedPage {
  href: string;
  title: string;
  description: string;
  tag?: string;
  isPrereq?: boolean;
}

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const EYEBROW: React.CSSProperties = {
  fontFamily: MONO,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.16em',
  fontWeight: 500,
  color: 'rgba(255,58,14,0.8)',
};

export function RelatedPages({
  heading = 'Ver também',
  pages,
}: {
  heading?: string;
  pages: RelatedPage[];
}) {
  const prereqs = pages.filter((p) => p.isPrereq);
  const related = pages.filter((p) => !p.isPrereq);

  return (
    <section
      className="py-16 sm:py-20"
      style={{ background: '#0e0e11', borderTop: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-6xl px-6 sm:px-10 lg:px-[140px]">

        {prereqs.length > 0 && (
          <div className="mb-10">
            <p className="mb-5" style={{ ...EYEBROW }}>Pré-requisitos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {prereqs.map((page) => (
                <PageCard key={page.href} page={page} accent />
              ))}
            </div>
          </div>
        )}

        {related.length > 0 && (
          <div>
            <p className="mb-5" style={{ ...EYEBROW }}>{heading}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
              {related.map((page) => (
                <PageCard key={page.href} page={page} />
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}

function PageCard({ page, accent = false }: { page: RelatedPage; accent?: boolean }) {
  return (
    <Link
      href={page.href}
      className="group flex flex-col gap-2 p-5 transition-colors hover:bg-white/[0.03]"
      style={{ background: '#0e0e11' }}
    >
      <div className="flex items-center justify-between gap-2">
        {page.tag && (
          <span
            className="text-[9px] font-bold tracking-[0.16em] uppercase px-2 py-0.5"
            style={{
              fontFamily: MONO,
              color: accent ? 'rgba(255,58,14,0.7)' : 'rgba(255,255,255,0.3)',
              border: `1px solid ${accent ? 'rgba(255,58,14,0.25)' : 'rgba(255,255,255,0.08)'}`,
              background: accent ? 'rgba(255,58,14,0.05)' : 'transparent',
            }}
          >
            {page.tag}
          </span>
        )}
        <svg
          className="w-3.5 h-3.5 flex-shrink-0 ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: 'rgba(255,58,14,0.7)' }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
      </div>
      <strong
        className="text-sm font-semibold text-white leading-snug tracking-tight group-hover:text-white/90 transition-colors"
      >
        {page.title}
      </strong>
      <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {page.description}
      </p>
    </Link>
  );
}
