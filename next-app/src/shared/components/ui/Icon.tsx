/**
 * AIOX Icon System v1.0
 * Based on brandbook specifications
 *
 * Specifications:
 * - Stroke width: 2px (fixed)
 * - Stroke linecap: round
 * - Stroke linejoin: round
 * - Fill: none
 * - Color: currentColor (inherits from parent)
 * - Base viewBox: 24x24
 */

export type IconName =
  | 'arrow-right'
  | 'chevron-down'
  | 'chevron-right'
  | 'close'
  | 'check'
  | 'alert-circle'
  | 'target'
  | 'laptop'
  | 'wrench'
  | 'plug'
  | 'building'
  | 'palette'
  | 'zap'
  | 'trophy'
  | 'brain'
  | 'users'
  | 'handshake'
  | 'briefcase'
  | 'rocket'
  | 'megaphone'
  | 'file-text'
  | 'code'
  | 'bar-chart'
  | 'settings'
  | 'clock'
  | 'lock'
  | 'linkedin'
  | 'instagram';

export type IconSize = '16' | '24' | '32' | '48';

interface IconProps {
  name: IconName;
  size?: IconSize;
  className?: string;
}

const sizeMap: Record<IconSize, string> = {
  '16': 'w-4 h-4',
  '24': 'w-6 h-6',
  '32': 'w-8 h-8',
  '48': 'w-12 h-12',
};

const icons: Record<IconName, string> = {
  'arrow-right':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>',
  'chevron-down':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7"/>',
  'chevron-right':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"/>',
  close:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M6 18L18 6"/>',
  check:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>',
  'alert-circle':
    '<circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01"/>',
  target:
    '<circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="6" stroke-linecap="round" stroke-linejoin="round"/><circle cx="12" cy="12" r="2" stroke-linecap="round" stroke-linejoin="round"/>',
  laptop:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M20 16V7a2 2 0 00-2-2H6a2 2 0 00-2 2v9m16 0H4m16 0l1.28 2.55a1 1 0 01-.9 1.45H3.62a1 1 0 01-.9-1.45L4 16"/>',
  wrench:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>',
  plug:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 2v4m0 0a4 4 0 014 4v4a4 4 0 01-8 0v-4a4 4 0 014-4zm-2 0V2m4 0v4m-4 8v8m0 0H8m4 0h2"/>',
  building:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>',
  palette:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>',
  zap:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/>',
  trophy:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 3h6m-6 0a2 2 0 00-2 2v1m8-3a2 2 0 012 2v1M9 3v3m6-3v3m-3 9a6 6 0 003-5.197M12 15c-1.657 0-3-2.239-3-5.197M12 15v6m0 0H9m3 0h3M6 6H4a2 2 0 00-2 2v3a2 2 0 002 2h2m12-7h2a2 2 0 012 2v3a2 2 0 01-2 2h-2"/>',
  brain:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9.5 2A2.5 2.5 0 007 4.5v15A2.5 2.5 0 009.5 22h5a2.5 2.5 0 002.5-2.5v-15A2.5 2.5 0 0014.5 2h-5zm0 0A2.5 2.5 0 007 4.5m2.5-2.5h5m-5 0v20m5-20v20m-2.5-10h0"/>',
  users:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"/>',
  handshake:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>',
  briefcase:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M3 7h18M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M3 7l3-4h12l3 4M8 3v4m8-4v4"/>',
  rocket:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M15 3l6 6m-6-6a9 9 0 00-9 9v6l3-3 3 3 3-3 3 3V9a9 9 0 00-9-9z"/>',
  megaphone:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>',
  'file-text':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>',
  code:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>',
  'bar-chart':
    '<path stroke-linecap="round" stroke-linejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>',
  settings:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>',
  clock:
    '<circle cx="12" cy="12" r="10" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6l4 2"/>',
  lock:
    '<rect x="5" y="11" width="14" height="10" rx="2" ry="2" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M12 17a1.5 1.5 0 100-3 1.5 1.5 0 000 3zM8 11V7a4 4 0 118 0v4"/>',
  linkedin:
    '<path stroke-linecap="round" stroke-linejoin="round" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" stroke-linecap="round" stroke-linejoin="round"/>',
  instagram:
    '<rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke-linecap="round" stroke-linejoin="round"/><path stroke-linecap="round" stroke-linejoin="round" d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/><path stroke-linecap="round" stroke-linejoin="round" d="M17.5 6.5h.01"/>',
};

export function Icon({ name, size = '24', className = '' }: IconProps) {
  const sizeClass = sizeMap[size];

  return (
    <svg
      className={`${sizeClass} ${className}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: icons[name] }}
    />
  );
}
