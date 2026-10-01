import type { CSSProperties, ReactNode } from 'react';

/**
 * Shared language for the Solutions diagrams.
 *
 * Every service visual is drawn on the same stage: one viewBox, one
 * background treatment, one set of stroke weights and one palette. What
 * differs between cards is the composition, never the styling, so nineteen
 * diagrams read as nineteen ideas rather than nineteen designs.
 *
 * No text is rendered inside any diagram. The geometry carries the meaning,
 * and the service title and description stay as real text in the card body.
 */

export const SV = {
  deep: '#081b16',
  forest: '#0d2c25',
  mid: '#123c32',
  raised: '#1c5545',
  line: '#23493e',
  sage: '#a8bdb2',
  sageDim: '#5d7a6f',
  mint: '#34d399',
  mintDim: '#1b7f5c',
  ivory: '#f7f9f8',
  gold: '#c9a84c',
  champagne: '#e4d6a8',
} as const;

export const VB = { w: 320, h: 144 } as const;

/** Duration and delay for the motion classes defined in globals.css. */
export function sv(dur?: number, delay?: number): CSSProperties {
  return {
    ...(dur === undefined ? {} : { '--sv-dur': `${dur}s` }),
    ...(delay === undefined ? {} : { '--sv-delay': `${delay}s` }),
  } as CSSProperties;
}

export interface VisualProps {
  /** Unique per card, so gradient and filter ids never collide on a page. */
  uid: string;
}

/**
 * The stage. Gradient ground, a faint technical dot grid, and a single soft
 * glow placed to give each composition its focal point.
 */
export function Frame({
  uid,
  glow = [160, 72],
  accent = SV.mint,
  children,
}: {
  uid: string;
  glow?: [number, number] | null;
  accent?: string;
  children: ReactNode;
}) {
  return (
    <svg
      viewBox={`0 0 ${VB.w} ${VB.h}`}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
      className="h-full w-full"
    >
      <defs>
        <linearGradient id={`${uid}-ground`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={SV.forest} />
          <stop offset="0.52" stopColor={SV.mid} />
          <stop offset="1" stopColor={SV.deep} />
        </linearGradient>

        <radialGradient id={`${uid}-glow`}>
          <stop offset="0" stopColor={accent} stopOpacity="0.3" />
          <stop offset="0.55" stopColor={accent} stopOpacity="0.08" />
          <stop offset="1" stopColor={accent} stopOpacity="0" />
        </radialGradient>

        <pattern
          id={`${uid}-grid`}
          width="15"
          height="15"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.75" fill={SV.sage} opacity="0.1" />
        </pattern>
      </defs>

      <rect width={VB.w} height={VB.h} fill={`url(#${uid}-ground)`} />
      <rect width={VB.w} height={VB.h} fill={`url(#${uid}-grid)`} />
      {glow ? (
        <ellipse
          cx={glow[0]}
          cy={glow[1]}
          rx="112"
          ry="80"
          fill={`url(#${uid}-glow)`}
        />
      ) : null}
      {children}
    </svg>
  );
}

/** Translucent surface, the glass layer the technical geometry sits on. */
export function Panel({
  x,
  y,
  w,
  h,
  r = 2,
  tone = SV.sage,
  fill = 0.05,
  stroke = 0.22,
  className,
  style,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  tone?: string;
  fill?: number;
  stroke?: number;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={r}
      fill={tone}
      fillOpacity={fill}
      stroke={tone}
      strokeOpacity={stroke}
      strokeWidth="0.9"
      className={className}
      style={style}
    />
  );
}

/** A point in the system. The halo marks the ones that carry current. */
export function Dot({
  cx,
  cy,
  r = 3,
  tone = SV.mint,
  halo = false,
  dur = 3,
  delay = 0,
  opacity = 1,
}: {
  cx: number;
  cy: number;
  r?: number;
  tone?: string;
  halo?: boolean;
  dur?: number;
  delay?: number;
  opacity?: number;
}) {
  return (
    <>
      {halo ? (
        <circle
          cx={cx}
          cy={cy}
          r={r * 2.6}
          fill={tone}
          className="sv-halo"
          style={sv(dur, delay)}
        />
      ) : null}
      <circle cx={cx} cy={cy} r={r} fill={tone} opacity={opacity} />
    </>
  );
}

/**
 * A pathway with something moving along it. The dim base line shows the
 * route, the bright dash shows the direction of travel.
 */
export function Flow({
  d,
  tone = SV.mint,
  width = 1.1,
  dur = 3,
  delay = 0,
  base = 0.2,
  reverse = false,
  dashed = false,
  className,
}: {
  d: string;
  tone?: string;
  width?: number;
  dur?: number;
  delay?: number;
  base?: number;
  reverse?: boolean;
  dashed?: boolean;
  className?: string;
}) {
  return (
    <g className={className}>
      <path
        d={d}
        fill="none"
        stroke={tone}
        strokeWidth={width}
        strokeOpacity={base}
        strokeLinecap="round"
        strokeDasharray={dashed ? '2.5 3' : undefined}
      />
      <path
        d={d}
        fill="none"
        stroke={tone}
        strokeWidth={width * 1.3}
        strokeLinecap="round"
        pathLength={100}
        className={reverse ? 'sv-flow-rev' : 'sv-flow'}
        style={sv(dur, delay)}
      />
    </g>
  );
}

/** Static structural line. Carries no current. */
export function Rail({
  d,
  tone = SV.sage,
  width = 0.9,
  opacity = 0.3,
  dashed = false,
}: {
  d: string;
  tone?: string;
  width?: number;
  opacity?: number;
  dashed?: boolean;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke={tone}
      strokeWidth={width}
      strokeOpacity={opacity}
      strokeLinecap="round"
      strokeDasharray={dashed ? '2 3' : undefined}
    />
  );
}

/** Small token: a source, a supplier, a requirement, a unit of capital. */
export function Chip({
  x,
  y,
  w = 40,
  h = 14,
  tone = SV.sage,
  lit = false,
  className,
  style,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  tone?: string;
  lit?: boolean;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <g className={className} style={style}>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="1.5"
        fill={tone}
        fillOpacity={lit ? 0.16 : 0.06}
        stroke={tone}
        strokeOpacity={lit ? 0.6 : 0.26}
        strokeWidth="0.9"
      />
      <rect x={x} y={y} width="2" height={h} rx="1" fill={tone} opacity={lit ? 0.9 : 0.4} />
    </g>
  );
}

/** Row of tick marks standing in for a quantity, never for a real figure. */
export function Ticks({
  x,
  y,
  count = 4,
  gap = 5,
  len = 6,
  tone = SV.sage,
  opacity = 0.45,
  vertical = false,
}: {
  x: number;
  y: number;
  count?: number;
  gap?: number;
  len?: number;
  tone?: string;
  opacity?: number;
  vertical?: boolean;
}) {
  return (
    <g stroke={tone} strokeOpacity={opacity} strokeWidth="0.9" strokeLinecap="round">
      {Array.from({ length: count }, (_, i) =>
        vertical ? (
          <line key={i} x1={x} y1={y + i * gap} x2={x + len} y2={y + i * gap} />
        ) : (
          <line key={i} x1={x + i * gap} y1={y} x2={x + i * gap} y2={y + len} />
        ),
      )}
    </g>
  );
}
