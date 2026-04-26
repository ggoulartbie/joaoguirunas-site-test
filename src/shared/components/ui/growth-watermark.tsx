export function GrowthWatermark({ size = 600, className = '' }: { size?: number; className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none select-none ${className}`}
      style={{ width: size, height: size, opacity: 0.05 }}
      aria-hidden="true"
    >
      <svg viewBox="0 0 1024 1024" width="100%" height="100%" fill="none">
        <defs>
          <linearGradient id="gs-wm-grad" x1="22.75" y1="628.32" x2="804.51" y2="198.61" gradientUnits="userSpaceOnUse">
            <stop offset="0.1" stopColor="#FF4400" />
            <stop offset="1" stopColor="#FF1A00" />
          </linearGradient>
        </defs>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M921.001 706.671L919.622 707.725L920.209 708.15L898.465 723.903L889.106 731.061L888.953 730.795L511.604 1004.19L103 708.15L126.317 691.256L104.876 706.671L512 20V412.399L843.971 652.915L512.001 78.1611V20L921.001 706.671ZM166.956 708.148L511.604 957.849L856.253 708.148L511.604 458.447L166.956 708.148Z"
          fill="url(#gs-wm-grad)"
        />
      </svg>
    </div>
  );
}
