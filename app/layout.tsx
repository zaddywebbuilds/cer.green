import type { Metadata, Viewport } from 'next';
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { CookieBanner } from '@/components/layout/CookieBanner';
import { Analytics } from '@/components/layout/Analytics';
import { JsonLd } from '@/components/layout/JsonLd';
import { getPrimaryNav } from '@/lib/navigation';
import { jsonLd, organisationSchema, websiteSchema } from '@/lib/schema';
import { site, siteUrl } from '@/lib/site';

/**
 * Fonts are downloaded at build time and served from this origin, so there is
 * no runtime request to a third party -- better for performance and for the
 * privacy position stated in the cookie policy. Only the weights actually used
 * are requested.
 */
const manrope = Manrope({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-manrope',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.name} | ${site.descriptor}`,
    template: '%s',
  },
  description: site.positioning,
  // The only one of the six headers in the QA checklist that a static host can
  // actually deliver: browsers honour Referrer-Policy in meta form. The rest
  // (CSP, HSTS, X-Frame-Options, X-Content-Type-Options, Permissions-Policy)
  // are response headers only, and GitHub Pages cannot set them. See README.
  referrer: 'strict-origin-when-cross-origin',
  applicationName: site.name,
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  formatDetection: { telephone: false, address: false, email: false },
  // Both icons come from `app/icon.png` and `app/apple-icon.png` via the file
  // convention, so nothing needs declaring here.
};

export const viewport: Viewport = {
  themeColor: '#123C32',
  width: 'device-width',
  initialScale: 1,
  // Zoom is never disabled: pinch-to-zoom is a WCAG requirement, not a nicety.
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const nav = getPrimaryNav();

  return (
    <html lang="en-SG" className={`${manrope.variable} ${inter.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only rounded-[3px] bg-forest px-5 py-3 font-heading font-semibold text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[60]"
        >
          Skip to main content
        </a>

        <Header nav={nav} />

        <main id="main" className="flex-1">
          {children}
        </main>

        <Footer />
        <CookieBanner />
        <Analytics />

        <JsonLd data={jsonLd(organisationSchema(), websiteSchema())} />
      </body>
    </html>
  );
}
