import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      { source: '/login', destination: '/academy/login', permanent: true },
      { source: '/cadastro', destination: '/academy/cadastro', permanent: true },
      { source: '/recuperar-senha', destination: '/academy/recuperar-senha', permanent: true },
      { source: '/redefinir-senha', destination: '/academy/redefinir-senha', permanent: true },
      { source: '/dashboard', destination: '/academy/dashboard', permanent: true },
      { source: '/meus-cursos', destination: '/academy/meus-cursos', permanent: true },
      { source: '/perfil', destination: '/academy/perfil', permanent: true },
      { source: '/agenda', destination: '/academy/agenda', permanent: true },
      { source: '/certificados', destination: '/academy/certificados', permanent: true },
      { source: '/turmas', destination: '/academy/turmas', permanent: true },
      { source: '/turmas/:slug', destination: '/academy/turmas/:slug', permanent: true },
      { source: '/certificado/:path*', destination: '/academy/certificado/:path*', permanent: true },
      { source: '/checkout/:path*', destination: '/academy/checkout/:path*', permanent: true },
      { source: '/curso/:path*', destination: '/academy/curso/:path*', permanent: true },
      { source: '/forum/:path*', destination: '/academy/forum/:path*', permanent: true },
      { source: '/admin/:path*', destination: '/academy/admin/:path*', permanent: true },
      { source: '/403', destination: '/academy/403', permanent: true },
      // mentoria/modulos → mentoria/presencial
      { source: '/mentoria/modulos', destination: '/mentoria/presencial', permanent: true },
      { source: '/mentoria/modulos/:path*', destination: '/mentoria/presencial/:path*', permanent: true },
    ]
  },
  async rewrites() {
    return [];
  },
};

export default withSentryConfig(nextConfig, {
  org: 'joao-guirunas',
  project: 'plataforma-cursos',

  // Upload source maps apenas em prod (CI define a var)
  silent: !process.env.CI,

  // Tunneling evita ad-blockers bloquearem o endpoint do Sentry
  tunnelRoute: '/monitoring',

  // Tree-shake código do Sentry no bundle do cliente
  widenClientFileUpload: true,

  sourcemaps: {
    disable: process.env.NODE_ENV !== 'production',
  },

  webpack: {
    automaticVercelMonitors: true,
    treeshake: {
      removeDebugLogging: true,
    },
  },
});
