const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";
const ACCENT = 'var(--color-accent)';

interface ExternalLinkProps {
  href: string;
  label: string;
  display?: string;
  note?: string;
}

export function ExternalLink({ href, label, display, note }: ExternalLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between p-4 transition-colors hover:bg-white/[0.03]"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="flex flex-col gap-0.5">
        <strong className="text-sm text-white group-hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: DISPLAY }}>
          {label}
        </strong>
        {note && <span className="text-xs text-white/40">{note}</span>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {display && (
          <code className="text-xs text-white/30 group-hover:text-white/50 transition-colors" style={{ fontFamily: MONO }}>
            {display}
          </code>
        )}
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          style={{ color: ACCENT }}
        >
          <path d="M2 12L12 2M12 2H6M12 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}

interface InternalLinkProps {
  href: string;
  label: string;
  display?: string;
  note?: string;
}

export function InternalLink({ href, label, display, note }: InternalLinkProps) {
  return (
    <a
      href={href}
      className="group flex items-center justify-between p-4 transition-colors hover:bg-white/[0.03]"
      style={{ border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}
    >
      <div className="flex flex-col gap-0.5">
        <strong className="text-sm text-white group-hover:text-[var(--color-accent)] transition-colors" style={{ fontFamily: DISPLAY }}>
          {label}
        </strong>
        {note && <span className="text-xs text-white/40">{note}</span>}
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        {display && (
          <code className="text-xs text-white/30 group-hover:text-white/50 transition-colors" style={{ fontFamily: MONO }}>
            {display}
          </code>
        )}
        <svg
          width="14" height="14" viewBox="0 0 14 14" fill="none"
          className="transition-transform group-hover:translate-x-1"
          style={{ color: 'rgba(255,255,255,0.3)' }}
        >
          <path d="M2 7H12M12 7L8 3M12 7L8 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </a>
  );
}
