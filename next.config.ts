import type {NextConfig} from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const securityHeaders = [
  {key: 'X-Content-Type-Options', value: 'nosniff'},
  {key: 'X-DNS-Prefetch-Control', value: 'off'},
  {key: 'X-Permitted-Cross-Domain-Policies', value: 'none'},
  {key: 'Origin-Agent-Cluster', value: '?1'},
  {key: 'X-Frame-Options', value: 'DENY'},
  {key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin'},
  {key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=(), usb=()'},
  {key: 'Cross-Origin-Opener-Policy', value: 'same-origin'},
  {key: 'Cross-Origin-Resource-Policy', value: 'same-origin'},
  {
    key: 'Content-Security-Policy',
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      "script-src 'self' 'unsafe-inline'",
      "script-src-attr 'none'",
      "connect-src 'self'",
      "worker-src 'self' blob:",
    ].join('; '),
  },
];

if (process.env.NODE_ENV === 'production') {
  securityHeaders.push({key: 'Strict-Transport-Security', value: 'max-age=31536000; includeSubDomains; preload'});
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  output: 'standalone',
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [],
    minimumCacheTTL: 86400,
    deviceSizes: [360, 640, 768, 1024, 1280, 1536],
    imageSizes: [32, 48, 64, 96, 128, 256, 384]
  },
  experimental: {optimizePackageImports: ['lucide-react']},
  async headers() {
    return [
      {source: '/:path*', headers: securityHeaders},
      {
        source: '/images/:path*',
        headers: [{key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'}]
      },
      {
        source: '/brand/:path*',
        headers: [{key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800'}]
      },
      {source: '/admin/:path*', headers: [{key: 'Cache-Control', value: 'no-store, max-age=0'}]},
      {source: '/api/:path*', headers: [{key: 'Cache-Control', value: 'no-store'}]},
    ];
  },
};

export default withNextIntl(nextConfig);

