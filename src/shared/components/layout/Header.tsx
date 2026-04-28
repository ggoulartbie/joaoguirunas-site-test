import Link from 'next/link';
import Image from 'next/image';
import { MentoriaHeaderButton } from './MentoriaHeaderButton';
import { Logo } from '@/shared/components/ui/Logo';

export function Header() {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b border-transparent backdrop-blur-xl"
      style={{
        background:
          'linear-gradient(180deg, rgba(8,8,14,0.98) 0%, rgba(4,4,8,0.95) 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-14 sm:h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
            aria-label="Ir para página inicial de João Guirunas"
          >
            <div
              className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0"
              style={{ boxShadow: '0 0 0 2px var(--color-accent)' }}
            >
              <Image
                src="/images/joao-guirunas-profile.jpg"
                alt="João Guirunas"
                width={28}
                height={28}
                className="w-full h-full object-cover object-[center_20%]"
              />
            </div>
            <Logo variant="alltype" height={22} />
          </Link>

          <div className="flex items-center gap-3 sm:gap-4">
            <MentoriaHeaderButton />
          </div>
        </div>
      </div>
    </header>
  );
}
