const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const DISPLAY = "var(--font-display), 'Space Grotesk', sans-serif";

interface FacilitatorNoteProps {
  children: React.ReactNode;
  duration?: string;
}

export function FacilitatorNote({ children, duration }: FacilitatorNoteProps) {
  return (
    <div
      className="my-6 p-4 text-sm leading-relaxed"
      style={{
        borderLeft: '3px solid rgba(251,191,36,0.6)',
        background: 'rgba(251,191,36,0.05)',
        border: '1px solid rgba(251,191,36,0.15)',
        borderLeftWidth: '3px',
        borderLeftColor: 'rgba(251,191,36,0.6)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span
          className="font-mono text-[10px] tracking-[0.18em] uppercase"
          style={{ fontFamily: MONO, color: 'rgba(251,191,36,0.8)' }}
        >
          Para o facilitador
        </span>
        {duration && (
          <span
            className="font-mono text-[10px] tracking-[0.15em] uppercase"
            style={{ fontFamily: MONO, color: 'rgba(251,191,36,0.5)' }}
          >
            ⏱ {duration}
          </span>
        )}
      </div>
      <div className="text-white/65" style={{ fontFamily: DISPLAY }}>
        {children}
      </div>
    </div>
  );
}
