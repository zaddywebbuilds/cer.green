import type { NextConfig } from 'next';
import { redirects } from './lib/redirects';

/**
 * Security headers.
 *
 * The CSP allows Google Tag Manager and GA4 because those are the only third
 * parties the site loads, and only once the visitor has consented. Fonts are
 * self-hosted, so no font or style host is permitted. `'unsafe-inline'` is
 * required for style because Next injects critical CSS inline; script uses
 * nonce-free `'unsafe-inline'` only as a fallback for browsers that ignore
 * strict-dynamic, which is the standard trade-off for GTM.
 */
const csp = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
  "font-src 'self' data:",
  "style-src 'self' 'unsafe-inline'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com",
  "frame-src 'self' https://www.googletagmanager.com",
  'upgrade-insecure-requests',
].join('; ');

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // One canonical URL form. Every internal link and every generated URL uses a
  // trailing slash, and Next issues a 308 for the other form.
  trailingSlash: true,

  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [360, 420, 640, 768, 1024, 1280, 1440, 1920],
  },

  async headers() {
    return [
      { source: '/:path*', headers: securityHeaders },
      {
        // Authenticated areas are noindex at the header level as well as in
        // metadata, so a crawler that never renders the page still sees it.
        source: '/portal/:path*',
        headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow, noarchive' }],
      },
    ];
  },

  async redirects() {
    return redirects;
  },
};

export default nextConfig;
