'use client'

export function BackButton() {
  return (
    <button
      onClick={() => history.back()}
      className="mt-4 inline-block text-sm transition-colors hover:text-[var(--bone)]"
      style={{ color: 'var(--bone-mute)', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--type-sans)' }}
    >
      Voltar
    </button>
  )
}
