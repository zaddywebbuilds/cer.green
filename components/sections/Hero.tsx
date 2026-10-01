import Link from 'next/link';
import { HeroSceneLoader } from '@/components/3d/HeroSceneLoader';
import { Button } from '@/components/ui/primitives';
import { cta, site } from '@/lib/site';

/**
 * Homepage hero.
 *
 * Deep forest-900 background for maximum authority. Discipline tags establish
 * the practice areas immediately. The emissions-pathway chart is inline SVG,
 * zero request overhead, honest labelling, looks like a consulting deliverable.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-forest-900 text-white on-dark" data-surface="dark">
      {/* 3D environment, decorative, behind all content */}
      <div className="pointer-events-none absolute inset-0 z-0" aria-hidden="true">
        <HeroSceneLoader />
      </div>

      <div className="relative z-10 shell pt-(--spacing-section)">

        {/* Discipline tags */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {['ESG', 'Carbon', 'Climate', 'Sustainable Finance'].map((label, i) => (
            <span key={label} className="flex items-center gap-4">
              {i > 0 && <span aria-hidden="true" className="text-white/20">·</span>}
              <span className="font-heading text-xs font-semibold uppercase tracking-[0.16em] text-lime/80">
                {label}
              </span>
            </span>
          ))}
        </div>

        {/* Main grid */}
        <div className="grid gap-14 pb-(--spacing-section) pt-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16">
          <div>
            <h1 className="text-display font-heading font-semibold leading-[0.96] tracking-[-0.03em]">
              Sustainability,
              <br />
              <em className="not-italic text-lime">measured.</em>
              <br />
              Strategy,
              <br />
              implemented.
            </h1>

            <p className="mt-8 max-w-[52ch] text-lead text-muted-invert">
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
                className="border-white/30 text-white hover:border-white hover:bg-white hover:text-forest"
              >
                {cta.solutions.label}
              </Button>
            </div>
          </div>

          <div className="lg:pb-3">
            <PathwayChart />
          </div>
        </div>
      </div>

      {/* Bottom info bar */}
      <div className="relative z-10 border-t border-line-invert">
        <div className="shell flex flex-wrap items-center justify-between gap-x-8 gap-y-3 py-4">
          <span className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-muted-invert">
            <span>Singapore-based</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>Asia-focused</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span>{site.methodology.name}</span>
          </span>
          <Link
            href="/about/"
            className="font-heading text-sm font-semibold text-lime transition-colors hover:text-white"
          >
            About CER →
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Illustrative emissions pathway chart. Inline SVG, no request, no LCP
 * penalty. Explicitly labelled as illustrative so it cannot be read as
 * a real client result or a forward-looking statement.
 */
function PathwayChart() {
  return (
    <figure className="rounded-(--radius-card) border border-line-invert bg-forest-700 p-6 sm:p-8">
      <figcaption className="mb-6 flex items-baseline justify-between gap-4">
        <span className="eyebrow text-lime">Baseline vs pathway</span>
        <span className="text-xs text-muted-invert">Illustrative</span>
      </figcaption>

      <svg
        viewBox="0 0 420 240"
        className="w-full"
        role="img"
        aria-label="Illustrative chart comparing a flat emissions baseline against a declining reduction pathway with interim targets."
      >
        <defs>
          <linearGradient id="pathway-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#34d399" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#34d399" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((row) => (
          <line
            key={row}
            x1="34" x2="410"
            y1={30 + row * 44} y2={30 + row * 44}
            stroke="#23493E" strokeWidth="1"
          />
        ))}

        {/* Flat baseline */}
        <path d="M34 74 L410 74" stroke="#A8BDB2" strokeWidth="2" strokeDasharray="5 5" fill="none" />

        {/* Pathway area fill */}
        <path d="M34 74 L128 96 L222 132 L316 168 L410 196 L410 250 L34 250 Z" fill="url(#pathway-fill)" />

        {/* Pathway line */}
        <path
          d="M34 74 L128 96 L222 132 L316 168 L410 196"
          stroke="#34d399" strokeWidth="2.5" fill="none"
          strokeLinecap="round" strokeLinejoin="round"
        />

        {/* Interim target markers */}
        {[[128, 96], [222, 132], [316, 168]].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4.5" fill="#0d2c25" stroke="#34d399" strokeWidth="2.5" />
        ))}

        {/* Axis labels */}
        <text x="34" y="222" fill="#A8BDB2" fontSize="11" fontFamily="system-ui">Base year</text>
        <text x="196" y="222" fill="#A8BDB2" fontSize="11" fontFamily="system-ui">Interim targets</text>
        <text x="356" y="222" fill="#A8BDB2" fontSize="11" fontFamily="system-ui">Target year</text>
      </svg>

      <p className="mt-6 border-t border-line-invert pt-5 text-sm text-muted-invert">
        A target without a costed pathway is a statement. CER builds the measurement, the levers
        and the sequencing that sit underneath it.
      </p>
    </figure>
  );
}
