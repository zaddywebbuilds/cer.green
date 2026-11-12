import Image from 'next/image';

import { PartnerIcon } from '@/components/ui/PartnerIcon';
import type { Partner } from '@/types/content';

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

/** How far the middle cards bow away from the centre, in pixels. */
const ARC_DEPTH = 44;

/**
 * Partner organisations drawn as an ecosystem around CER.
 *
 * The ring needs real horizontal width to read as one, so it is drawn at the
 * large breakpoint and the same organisations fall back to a tile grid below
 * that, rather than being squeezed into a column where the orbit would be lost.
 *
 * Each card bows outward by sin() of its position in the column, so the tether
 * dots trace an arc instead of a straight edge. No partner logo appears here:
 * those need the partner's written approval and a licensed asset, so each card
 * carries a neutral mark for its field plus the organisation's name in type.
 */
export function CollaborationOrbit({ partners }: { partners: Partner[] }) {
  const split = Math.ceil(partners.length / 2);
  const left = partners.slice(0, split);
  const right = partners.slice(split);

  return (
    <>
      {/* Held to the width the ring needs, so the cards stay on their orbit
          instead of being flung to the edges of a wide shell. */}
      <div className="relative mx-auto mt-12 hidden max-w-[940px] lg:block">
        {/* Ambient orbits, sized to run through the tether dots */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <span className="absolute size-[400px] rounded-full border border-lime-ink/10" />
          <span className="absolute size-[520px] rounded-full border border-lime-ink/[0.06]" />
        </div>

        <div className="relative grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-5">
          <ul className="flex flex-col items-end gap-3">
            {left.map((partner, i) => (
              <OrbitNode
                key={partner.name}
                partner={partner}
                side="left"
                offset={arcOffset(i, left.length)}
              />
            ))}
          </ul>

          <OrbitCore />

          <ul className="flex flex-col items-start gap-3">
            {right.map((partner, i) => (
              <OrbitNode
                key={partner.name}
                partner={partner}
                side="right"
                offset={arcOffset(i, right.length)}
              />
            ))}
          </ul>
        </div>
      </div>

      {/* Same organisations, where the ring will not fit */}
      <ul className="mt-8 flex flex-wrap justify-center gap-3 lg:hidden">
        {partners.map((partner) => (
          <li
            key={partner.name}
            className="flex w-[calc(50%-0.375rem)] sm:w-[calc(33.333%-0.5rem)]"
          >
            <div className="group flex h-full w-full flex-col items-center gap-3.5 rounded-(--radius-lg) border border-line bg-white px-4 py-6 text-center transition duration-200 hover:-translate-y-0.5 hover:border-lime-ink/35 hover:shadow-[0_8px_20px_-12px_rgba(6,95,70,0.35)]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-sage/55 text-forest transition-colors duration-200 group-hover:bg-sage">
                <PartnerIcon name={partner.name} />
              </span>
              <span className="font-heading text-[0.85rem] font-semibold leading-snug text-ink-700">
                {partner.name}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}

/** Pushes the middle of a column outward so the tether dots follow a curve. */
function arcOffset(index: number, total: number): number {
  if (total < 2) return 0;
  return Math.round(Math.sin((index / (total - 1)) * Math.PI) * ARC_DEPTH);
}

function OrbitNode({
  partner,
  side,
  offset,
}: {
  partner: Partner;
  side: 'left' | 'right';
  offset: number;
}) {
  const card = (
    <span className="flex w-[215px] items-center gap-3 rounded-(--radius-lg) border border-line bg-white px-4 py-3 transition duration-200 group-hover/node:border-lime-ink/35 group-hover/node:shadow-[0_8px_20px_-12px_rgba(6,95,70,0.35)]">
      <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-sage/55 text-forest transition-colors duration-200 group-hover/node:bg-sage">
        <PartnerIcon name={partner.name} className="h-[18px] w-[18px]" />
      </span>
      <span className="font-heading text-[0.78rem] font-semibold leading-snug text-ink-700">
        {partner.name}
      </span>
    </span>
  );

  const rule = <span className="h-px w-7 bg-line" />;
  const dot = <span className="size-2 rounded-full bg-lime-ink/60" />;
  const tether = (
    <span aria-hidden="true" className="flex shrink-0 items-center">
      {side === 'left' ? (
        <>
          {rule}
          {dot}
        </>
      ) : (
        <>
          {dot}
          {rule}
        </>
      )}
    </span>
  );

  return (
    <li
      className="group/node flex items-center"
      style={side === 'left' ? { marginRight: offset } : { marginLeft: offset }}
    >
      {side === 'left' ? (
        <>
          {card}
          {tether}
        </>
      ) : (
        <>
          {tether}
          {card}
        </>
      )}
    </li>
  );
}

function OrbitCore() {
  return (
    <div className="relative flex size-[300px] shrink-0 items-center justify-center">
      <svg
        viewBox="0 0 300 300"
        fill="none"
        aria-hidden="true"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <radialGradient id="cer-orbit-glow" cx="50%" cy="46%" r="52%">
            <stop offset="0%" stopColor="var(--color-lime)" stopOpacity="0.22" />
            <stop offset="58%" stopColor="var(--color-sage)" stopOpacity="0.14" />
            <stop offset="100%" stopColor="var(--color-sage)" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="cer-orbit-rim" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--color-forest)" stopOpacity="0.45" />
            <stop offset="100%" stopColor="var(--color-lime-ink)" stopOpacity="0.10" />
          </linearGradient>
        </defs>

        <circle cx="150" cy="150" r="150" fill="url(#cer-orbit-glow)" />
        <circle cx="150" cy="150" r="118" stroke="url(#cer-orbit-rim)" strokeWidth="1.25" />
        <ellipse
          cx="150"
          cy="150"
          rx="118"
          ry="41"
          stroke="var(--color-forest)"
          strokeOpacity="0.16"
          strokeWidth="1"
        />
        <ellipse
          cx="150"
          cy="150"
          rx="118"
          ry="82"
          stroke="var(--color-forest)"
          strokeOpacity="0.10"
          strokeWidth="1"
        />
        <ellipse
          cx="150"
          cy="150"
          rx="46"
          ry="118"
          stroke="var(--color-forest)"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
      </svg>

      <div className="relative flex flex-col items-center text-center">
        <Image
          src={`${BASE_PATH}/brand/cer-logo.webp`}
          alt="CER"
          width={640}
          height={257}
          className="h-9 w-auto"
          unoptimized
        />
        <p className="mt-3 font-heading text-[0.95rem] font-semibold leading-tight text-forest">
          Strategic
          <br />
          Collaborations
        </p>
        <span aria-hidden="true" className="mt-3 h-px w-10 bg-lime-ink/40" />
      </div>
    </div>
  );
}
