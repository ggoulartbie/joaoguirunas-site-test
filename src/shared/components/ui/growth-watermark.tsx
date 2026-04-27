export function GrowthWatermark({
  size = 600,
  className = '',
  color = 'white',
  opacity = 0.05,
}: {
  size?: number;
  className?: string;
  color?: string;
  opacity?: number;
}) {
  const height = Math.round(size * (390 / 530));
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ width: size, height, opacity }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 530 390" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M464.151 357.5H136.795L300.473 73.999L464.151 357.5Z" stroke={color} strokeWidth="9" />
        <path d="M434.945 344H92L263.473 47L434.945 344ZM175 302H351L263 149L175 302Z" fill={color} />
        <path d="M393.151 320.5H65.7949L229.473 36.999L393.151 320.5Z" stroke={color} strokeWidth="9" />
      </svg>
    </div>
  );
}
