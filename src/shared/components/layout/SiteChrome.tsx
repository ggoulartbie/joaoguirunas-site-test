'use client';

import { usePathname } from 'next/navigation';
import { Header } from './Header';
import { Footer } from './Footer';

// Rotas com layout próprio — não recebem Header/Footer global
const CHROME_EXCLUDED = [
  '/',
  '/dashboard',
  '/meus-cursos',
  '/curso',
  '/forum',
  '/agenda',
  '/certificados',
  '/perfil',
  '/admin',
  '/login',
  '/cadastro',
  '/recuperar-senha',
  '/redefinir-senha',
  '/certificado',
];

function hasChromeExcluded(pathname: string): boolean {
  return CHROME_EXCLUDED.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  );
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (hasChromeExcluded(pathname)) {
    return <>{children}</>;
  }

  return (
    <>
      <a href="#main-content" className="skip-link">
        Pular para conteudo
      </a>
      <Header />
      <main id="main-content" className="pt-16">
        {children}
      </main>
      <Footer />
    </>
  );
}
