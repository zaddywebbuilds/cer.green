import Link from 'next/link';
import { Button } from '@/components/ui/primitives';
import { cta } from '@/lib/site';

export function Hero() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

  return (
    <section
      className="relative w-full overflow-hidden bg-forest-900 text-white"
      data-surface="dark"
    >
      {/* Video: full-bleed, contained so the full scene is always visible */}
      <video
        src={`${base}/video/hero.mp4`}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-contain"
        aria-hidden="true"
      />

      {/* Dark gradient from left so text is legible over the video */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-black/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

      {/* Content wrapper sized to the video's native aspect ratio so we never crop it */}
      <div className="relative z-10 flex flex-col" style={{ aspectRatio: '736 / 400', minHeight: '480px' }}>

        {/* Top tagline */}
        <div className="shell pt-6 sm:pt-8">
          <p className="font-heading text-[10px] font-semibold uppercase leading-relaxed tracking-[0.22em] text-white/55">
            Sustainability Intelligence
            <br />
            for a Brighter Tomorrow
          </p>
        </div>

        {/* Main content: left half */}
        <div className="flex flex-1 items-center">
          <div className="shell w-full lg:max-w-[50%] xl:max-w-[44%]">

            {/* Discipline tags */}
            <div className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2">
              {['ESG', 'Carbon', 'Climate', 'Sustainable Finance'].map((label, i) => (
                <span key={label} className="flex items-center gap-4">
                  {i > 0 && <span aria-hidden="true" className="text-white/20">·</span>}
                  <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-lime/80">
                    {label}
                  </span>
                </span>
              ))}
            </div>

            <h1 className="font-heading font-semibold leading-[0.95] tracking-[-0.03em] text-[clamp(2rem,5vw,4rem)]">
              Sustainability,
              <br />
              <em className="not-italic text-lime">measured.</em>
              <br />
              Strategy,
              <br />
              implemented.
            </h1>

            <p className="mt-5 max-w-[44ch] text-[1rem] leading-[1.65] text-white/70">
              CER helps organisations across Asia turn complex ESG, carbon and climate requirements
              into measurable business action, from initial assessment to full implementation.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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

        {/* Bottom bar */}
        <div className="border-t border-white/15">
          <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {PRACTICE_AREAS.map((area) => (
                <Link
                  key={area.label}
                  href={area.href}
                  className="group flex items-center gap-2 opacity-55 transition-opacity hover:opacity-100"
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
