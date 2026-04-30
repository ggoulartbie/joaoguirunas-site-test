import { CopyButton } from './CopyButton';

const MONO = "'Geist Mono', 'Roboto Mono', monospace";
const ACCENT = 'var(--color-accent)';

interface CodeBlockProps {
  children: string;
  label?: string;
}

export function CodeBlock({ children, label }: CodeBlockProps) {
  return (
    <div className="my-4" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{ background: '#111', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
      >
        <span
          className="font-mono text-[10px] tracking-[0.15em] uppercase"
          style={{ fontFamily: MONO, color: 'rgba(255,255,255,0.3)' }}
        >
          {label ?? 'prompt'}
        </span>
        <CopyButton text={children} />
      </div>
      <pre
        className="overflow-x-auto p-4 text-sm leading-relaxed"
        style={{
          fontFamily: MONO,
          background: '#1a1a1a',
          borderLeft: `3px solid ${ACCENT}`,
          color: 'rgba(255,255,255,0.85)',
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-word',
          margin: 0,
        }}
      >
        <code>{children}</code>
      </pre>
    </div>
  );
}
