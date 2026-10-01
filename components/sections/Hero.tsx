import Link from 'next/link';
import { Button } from '@/components/ui/primitives';
import { cta } from '@/lib/site';

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <section
      className="relative flex min-h-[100dvh] overflow-hidden bg-forest-900 text-white"
      data-surface="dark"
    >
      {/* LEFT: solid dark panel with all content */}
      <div className="relative z-10 flex w-full flex-col justify-between lg:w-[46%] xl:w-[42%]">

        {/* Top tagline */}
        <div className="px-8 pt-8 sm:px-12 xl:px-16">
          <p className="font-heading text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/50">
            Sustainability Intelligence
            <br />
            for a Brighter Tomorrow
          </p>
        </div>

        {/* Main content */}
        <div className="flex flex-1 flex-col justify-center px-8 py-12 sm:px-12 xl:px-16">
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

          <h1 className="font-heading font-semibold leading-[0.95] tracking-[-0.03em] text-[clamp(2.5rem,5vw,4.25rem)]">
            Sustainability,
            <br />
            <em className="not-italic text-lime">measured.</em>
            <br />
            Strategy,
            <br />
            implemented.
          </h1>

          <p className="mt-7 max-w-[44ch] text-[1.0625rem] leading-[1.65] text-white/65">
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

        {/* Bottom bar */}
        <div className="border-t border-white/10 px-8 py-5 sm:px-12 xl:px-16">
          <div className="grid grid-cols-2 gap-x-6 gap-y-4 sm:flex sm:flex-wrap sm:items-center sm:gap-x-8">
            {PRACTICE_AREAS.map((area) => (
              <Link
                key={area.label}
                href={area.href}
                className="group flex items-center gap-2.5 opacity-55 transition-opacity hover:opacity-100"
              >
                <area.Icon className="h-4 w-4 flex-shrink-0 text-lime" />
                <span className="font-heading text-[9px] font-semibold uppercase leading-tight tracking-[0.18em] text-white">
                  {area.label}
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
            <span className="flex flex-wrap items-center gap-x-4 text-xs text-white/40">
              <span>Singapore-based</span>
              <span aria-hidden="true" className="text-white/20">·</span>
              <span>Asia-focused</span>
            </span>
            <Link
              href="/about/"
              className="font-heading text-xs font-semibold text-lime transition-colors hover:text-white"
            >
              About CER &rarr;
            </Link>
          </div>
        </div>
      </div>

      {/* RIGHT: video on the surface, covering center to right edge */}
      <div className="absolute inset-y-0 right-0 w-full lg:relative lg:flex-1">
        <video
          src={`${base}/video/hero.mp4`}
          autoPlay
          loop
          muted
          playsInline
          className="h-full w-full object-cover"
          aria-label="CER sustainability advisory and ESG implementation across Asia"
        />
        {/* Feather the left edge so it blends into the dark left panel */}
        <div className="absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-forest-900 to-transparent" />
        {/* On mobile: darken the whole video so text above is still readable */}
        <div className="absolute inset-0 bg-black/60 lg:hidden" />
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
        <circle cx="12" cy="12" r="4" />
        <circle cx="12" cy="12" r="8" strokeOpacity="0.35" />
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
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <line x1="2" y1="20" x2="22" y2="20" />
      </svg>
    ),
  },
];
