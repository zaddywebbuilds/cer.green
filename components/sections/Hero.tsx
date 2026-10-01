import Link from 'next/link';
import { Button } from '@/components/ui/primitives';
import { cta } from '@/lib/site';

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <section
      className="relative flex min-h-[100dvh] flex-col overflow-hidden bg-forest-900 text-white"
      data-surface="dark"
    >
      {/* Full-bleed background video */}
      <video
        src={`${base}/video/hero.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
        aria-hidden="true"
      />

      {/* Gradient: strong dark on left for legibility, lighter on right to let the visual breathe */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      {/* Top tagline strip */}
      <div className="relative z-10 shell pt-6">
        <p className="font-heading text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/55">
          Sustainability Intelligence
          <br />
          for a Brighter Tomorrow
        </p>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-1 items-center">
        <div className="shell w-full pb-10 pt-10 lg:max-w-[60%] xl:max-w-[54%]">

          {/* Discipline tags */}
          <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
            {['ESG', 'Carbon', 'Climate', 'Sustainable Finance'].map((label, i) => (
              <span key={label} className="flex items-center gap-4">
                {i > 0 && <span aria-hidden="true" className="text-white/20">·</span>}
                <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-lime/80">
                  {label}
                </span>
              </span>
            ))}
          </div>

          <h1 className="font-heading font-semibold leading-[0.95] tracking-[-0.03em] text-[clamp(2.75rem,6.5vw,5rem)]">
            Sustainability,
            <br />
            <em className="not-italic text-lime">measured.</em>
            <br />
            Strategy,
            <br />
            implemented.
          </h1>

          <p className="mt-7 max-w-[52ch] text-[1.0625rem] leading-[1.65] text-white/70">
            CER helps organisations across Asia turn complex ESG, carbon and climate requirements
            into measurable business action, from initial assessment to full implementation.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
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

      {/* Bottom info bar */}
      <div className="relative z-10 border-t border-white/15">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-4 py-5">
          {/* Practice area icons */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:items-center sm:gap-x-8">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.label}
                href={area.href}
                className="group flex items-center gap-2.5 opacity-60 transition-opacity hover:opacity-100"
              >
                <area.Icon className="h-4 w-4 flex-shrink-0 text-lime" />
                <span className="font-heading text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-white">
                  {area.label}
                </span>
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-x-6 text-sm text-white/50">
            <span>Singapore-based</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>Asia-focused</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <Link
              href="/about/"
              className="font-heading font-semibold text-lime transition-colors hover:text-white"
            >
              About CER &rarr;
            </Link>
          </div>
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
        <path d="M2 12h3M19 12h3M12 2v3M12 19v3" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="8" strokeOpacity="0.35" />
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
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];
