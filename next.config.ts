import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
  },
  async redirects() {
    return [
      // mentoria/modulos → mentoria/presencial
      { source: '/mentoria/modulos', destination: '/mentoria/presencial', permanent: true },
      { source: '/mentoria/modulos/:path*', destination: '/mentoria/presencial/:path*', permanent: true },
      // slug rename: bolt.new post foi indexado com slug errado
      { source: '/open-source/app-full-stack-de-um-prompt-no-claude-code', destination: '/open-source/app-full-stack-de-um-prompt-no-bolt-new', permanent: true },
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
