import Link from 'next/link';
import { Button } from '@/components/ui/primitives';
import { cta } from '@/lib/site';

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <section
      className="relative overflow-hidden bg-forest-900 text-white"
      data-surface="dark"
    >
      {/* Hero region. The practice-area bar sits outside it, so the video only
          has to span the text block and stays close to its native 736x400
          ratio rather than being scaled up to fill a tall box. */}
      <div className="relative">

      {/* Video. In normal flow on mobile, pinned to the right half on desktop. */}
      <div className="relative aspect-[736/400] w-full lg:absolute lg:inset-y-0 lg:right-0 lg:aspect-auto lg:w-[68%]">
        <video
          src={`${base}/video/hero.mp4`}
          poster={`${base}/video/hero-poster.jpg`}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-hidden="true"
        />
        {/* Left edge melts into the dark panel so the two halves read as one */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-forest-900 via-forest-900/45 to-transparent lg:block"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-forest-900/45 via-transparent to-forest-900/25 lg:block"
        />
      </div>

      {/* Content, left column */}
      <div className="shell relative z-10">
        <div className="flex flex-col justify-center py-12 lg:min-h-[420px] lg:w-[38%]">

          <p className="font-heading text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/55">
            Sustainability Intelligence
            <br />
            for a Brighter Tomorrow
          </p>

          <h1
            className="mt-6 font-heading font-semibold leading-[0.98] tracking-[-0.03em]"
            style={{ fontSize: 'clamp(1.9rem, 3.4vw, 3rem)' }}
          >
            Sustainability,
            <br />
            <em className="not-italic text-lime">measured.</em>
            <br />
            Strategy,
            <br />
            implemented.
          </h1>

          <p className="mt-4 max-w-[40ch] text-[0.95rem] leading-[1.6] text-white/70">
            CER helps organisations across Asia turn complex ESG, carbon and climate requirements
            into measurable business action, from assessment to implementation.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button href={cta.consulting.href} variant="invert">
              {cta.consulting.label}
            </Button>
            <Button
              href={cta.solutions.href}
              variant="secondary"
              className="border-white/35 text-white hover:border-white hover:bg-white hover:text-forest-900"
            >
              {cta.solutions.label}
            </Button>
          </div>

        </div>
      </div>

      </div>

      {/* Practice areas, full-width bar beneath the video region */}
      <div className="relative z-10 border-t border-white/15 bg-forest-900">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.label}
                href={area.href}
                className="group flex items-center gap-2 opacity-60 transition-opacity hover:opacity-100"
              >
                <area.Icon className="h-4 w-4 flex-shrink-0 text-lime" />
                <span className="font-heading text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-white">
                  {area.label}
                </span>
              </Link>
            ))}
          </div>
          <Link
            href="/about/"
            className="font-heading text-xs font-semibold text-lime transition-colors hover:text-white"
          >
            About CER &rarr;
          </Link>
        </div>
      </div>
    </section>
  );
}

const PRACTICE_AREAS = [
  {
    label: 'Carbon & Climate',
    href: '/solutions/carbon-climate/',
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 3a6 6 0 0 0 6 6 6 6 0 0 0-6 6 6 6 0 0 0-6-6 6 6 0 0 0 6-6z" />
      </svg>
    ),
  },
  {
    label: 'ESG & Sustainability',
    href: '/solutions/esg-sustainability/',
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="4" /><circle cx="12" cy="12" r="8" strokeOpacity="0.35" />
        <path d="M2 12h3M19 12h3M12 2v3M12 19v3" />
      </svg>
    ),
  },
  {
    label: 'Compliance & Standards',
    href: '/solutions/compliance-standards/',
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <polyline points="9 12 11 14 15 10" />
      </svg>
    ),
  },
  {
    label: 'Sustainable & Green Finance',
    href: '/solutions/sustainable-finance/',
    Icon: ({ className }: { className?: string }) => (
      <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" /><line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];
