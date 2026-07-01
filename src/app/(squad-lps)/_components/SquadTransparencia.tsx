const KV_MONO: React.CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '11px',
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
  fontWeight: 500,
};

export function SquadTransparencia() {
  return (
    <div
      className="py-5 sm:py-6"
      style={{ borderTop: '1px solid rgba(255,255,255,0.07)', borderBottom: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8 flex items-start sm:items-center gap-3">
        <span className="text-[#FF3A0E]/60 text-lg flex-shrink-0 mt-0.5 sm:mt-0" aria-hidden="true">◆</span>
        <p style={{ ...KV_MONO, color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
          Nota de transparência — este módulo cobre o mesmo conteúdo da Mentoria presencial de R$8.700.
          Aqui você aprende no seu ritmo, com acesso por 6 meses, sem horário fixo.
        </p>
      </div>
    </div>
  );
}
