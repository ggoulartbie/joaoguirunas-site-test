import type { NextConfig } from 'next';
import { withSentryConfig } from '@sentry/nextjs';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@react-pdf/renderer'],
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
  async redirects() {
    return [];
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
