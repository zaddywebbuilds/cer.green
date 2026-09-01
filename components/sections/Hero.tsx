import { Button } from '@/components/ui/primitives';
import { cta, site } from '@/lib/site';

/**
 * Homepage hero.
 *
 * The visual is a rendered emissions-pathway chart rather than a photograph:
 * it is inline SVG, so it costs no request and cannot become the LCP
 * bottleneck; it is honest, because it is explicitly labelled illustrative;
 * and it looks like a consulting deliverable rather than stock imagery.
 */
export function Hero() {
  return (
    <section className="bg-forest text-white on-dark" data-surface="dark">
      <div className="shell grid gap-14 py-(--spacing-section) lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-center lg:gap-20">
        <div>
          <p className="eyebrow text-lime">Singapore-based. Asia-focused.</p>

          <h1 className="mt-6 text-display">
            Turning sustainability requirements into measurable business action.
          </h1>

          <p className="mt-7 max-w-[58ch] text-lead text-muted-invert">
            CER provides ESG, carbon, climate and sustainability advisory services alongside
            professional training for organisations operating across Asia.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href={cta.consulting.href} variant="invert">
              {cta.consulting.label}
            </Button>
            <Button
              href={cta.solutions.href}
              variant="secondary"
              className="border-white/40 text-white hover:border-white hover:bg-white hover:text-forest"
            >
              {cta.solutions.label}
            </Button>
          </div>

          <p className="mt-8 text-sm text-muted-invert">
            {site.methodology.name} — advisory through CER Solutions, capability through CER
            Academy.
          </p>
        </div>

        <PathwayChart />
      </div>
    </section>
  );
}

/**
 * Illustrative emissions pathway. Deliberately unlabelled on the value axis --
 * it shows the shape of a baseline against a reduction pathway, and it is
 * captioned as illustrative so it can never be read as a client result.
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
            <stop offset="0%" stopColor="#C4DE6B" stopOpacity="0.28" />
            <stop offset="100%" stopColor="#C4DE6B" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((row) => (
          <line
            key={row}
            x1="34"
            x2="410"
            y1={30 + row * 44}
            y2={30 + row * 44}
            stroke="#23493E"
            strokeWidth="1"
          />
        ))}

        {/* Baseline: flat, continuing at current intensity */}
        <path
          d="M34 74 L410 74"
          stroke="#A8BDB2"
          strokeWidth="2"
          strokeDasharray="5 5"
          fill="none"
        />

        {/* Reduction pathway */}
        <path d="M34 74 L128 96 L222 132 L316 168 L410 196 L410 250 L34 250 Z" fill="url(#pathway-fill)" />
        <path
          d="M34 74 L128 96 L222 132 L316 168 L410 196"
          stroke="#C4DE6B"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Interim target markers */}
        {[
          [128, 96],
          [222, 132],
          [316, 168],
        ].map(([x, y]) => (
          <circle key={x} cx={x} cy={y} r="4.5" fill="#123C32" stroke="#C4DE6B" strokeWidth="2.5" />
        ))}

        {/* Axis labels */}
        <text x="34" y="222" fill="#A8BDB2" fontSize="11" fontFamily="system-ui">
          Base year
        </text>
        <text x="196" y="222" fill="#A8BDB2" fontSize="11" fontFamily="system-ui">
          Interim targets
        </text>
        <text x="356" y="222" fill="#A8BDB2" fontSize="11" fontFamily="system-ui">
          Target year
        </text>
      </svg>

      <p className="mt-6 border-t border-line-invert pt-5 text-sm text-muted-invert">
        A target without a costed pathway is a statement. CER builds the measurement, the levers
        and the sequencing that sit underneath it.
      </p>
    </figure>
  );
}
