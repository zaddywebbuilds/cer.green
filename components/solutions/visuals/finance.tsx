import { Dot, Flow, Frame, Panel, Rail, SV, Ticks, sv, type VisualProps } from './shared';

/**
 * Sustainable & Green Finance.
 *
 * Capital, exposure and attribution. These read as financial models rather
 * than environmental scenes, because that is the register the people
 * commissioning the work actually think in.
 */

/** A partial arc on a circle, used to show an attributed share of a whole. */
function arcPath(cx: number, cy: number, r: number, fraction: number) {
  const a0 = -Math.PI / 2;
  const a1 = a0 + fraction * Math.PI * 2;
  const large = fraction > 0.5 ? 1 : 0;
  const p = (a: number) => `${(cx + r * Math.cos(a)).toFixed(1)} ${(cy + r * Math.sin(a)).toFixed(1)}`;
  return `M${p(a0)} A ${r} ${r} 0 ${large} 1 ${p(a1)}`;
}

/** Capital tested against eligibility, allocated to assets, measured on outcome. */
export function GreenFinance({ uid }: VisualProps) {
  const pool = [44, 57, 70, 83, 96];
  const slots = [38, 58, 78, 98];

  return (
    <Frame uid={uid} glow={[200, 72]} accent={SV.gold}>
      {/* Capital available to allocate. */}
      <Panel x={10} y={38} w={56} h={76} tone={SV.gold} fill={0.05} stroke={0.3} />
      {pool.map((y, i) => (
        <rect
          key={y}
          x={16}
          y={y}
          width={44}
          height={11}
          rx="1"
          fill={SV.gold}
          fillOpacity={0.5 - i * 0.07}
        />
      ))}

      {/* Eligibility, which is what distinguishes this from ordinary lending. */}
      <Rail d="M82 24 L 82 122 M94 24 L 94 122" tone={SV.gold} opacity={0.45} width={1.1} />
      {slots.map((y, i) => (
        <rect
          key={y}
          x={82}
          y={y - 5}
          width="12"
          height="10"
          rx="1"
          fill={SV.gold}
          fillOpacity="0.22"
          className="sv-pulse"
          style={sv(4, i * 0.4)}
        />
      ))}

      {[0, 1, 2].map((i) => (
        <Flow
          key={i}
          d={`M66 ${[57, 76, 95][i]} C 74 ${[57, 76, 95][i]}, 76 ${slots[i]}, 82 ${slots[i]}`}
          tone={SV.gold}
          dur={3}
          delay={i * 0.35}
          width={1}
          base={0.2}
        />
      ))}
      {/* Capital that does not meet the criteria does not pass. */}
      <Rail d="M66 110 C 74 110, 76 118, 70 126" tone={SV.sage} opacity={0.3} dashed />

      {[0, 1, 2].map((i) => (
        <Flow
          key={`o-${i}`}
          d={`M94 ${slots[i]} C 118 ${slots[i]}, 124 104, ${[152, 212, 272][i]} 104`}
          tone={SV.gold}
          dur={3.4}
          delay={0.6 + i * 0.4}
          width={1}
          base={0.16}
        />
      ))}

      <Rail d="M130 104 L 304 104" opacity={0.3} />

      {/* Eligible assets: the things the money actually buys. */}
      <g stroke={SV.mint} strokeOpacity="0.8" strokeWidth="1.3" strokeLinecap="round" fill="none">
        <path d="M152 104 L 152 62" />
        <g className="sv-spin" style={sv(9)}>
          <path d="M152 60 L 152 44 M152 60 L 166 68 M152 60 L 138 68" />
        </g>
      </g>
      <circle cx="152" cy="60" r="2.6" fill={SV.mint} />

      <g fill={SV.mint} fillOpacity="0.22" stroke={SV.mint} strokeOpacity="0.7" strokeWidth="1">
        {[194, 208, 222].map((x) => (
          <path key={x} d={`M${x} 100 L ${x + 6} 88 L ${x + 14} 88 L ${x + 8} 100 Z`} />
        ))}
      </g>
      <Rail d="M202 100 L 202 104 M216 100 L 216 104 M230 100 L 230 104" tone={SV.mint} opacity={0.5} />

      <path
        d="M256 104 L 256 78 L 268 78 L 268 64 L 280 64 L 280 54 L 292 54 L 292 104 Z"
        fill={SV.mint}
        fillOpacity="0.16"
        stroke={SV.mint}
        strokeOpacity="0.7"
        strokeWidth="1"
      />

      {/* Outcome, reported against what the capital was meant to achieve. */}
      {[138, 196, 254].map((x, i) => (
        <g key={x}>
          <rect x={x} y={116} width="42" height="6" rx="2" fill={SV.sage} fillOpacity="0.16" />
          <rect
            x={x}
            y={116}
            width={[30, 36, 24][i]}
            height="6"
            rx="2"
            fill={SV.gold}
            className="sv-accent"
          />
        </g>
      ))}
    </Frame>
  );
}

/** Physical and transition exposure resolved into a distribution with a tail. */
export function ClimateRisk({ uid }: VisualProps) {
  const cols = [96, 114, 132, 150, 168];
  const rows = [28, 50, 72, 94];
  const heat = [
    [0.12, 0.2, 0.46, 0.3, 0.16],
    [0.24, 0.52, 0.7, 0.44, 0.22],
    [0.16, 0.38, 0.58, 0.68, 0.34],
    [0.1, 0.18, 0.3, 0.42, 0.6],
  ];

  return (
    <Frame uid={uid} glow={[140, 72]}>
      {/* Physical hazard. */}
      <Panel x={10} y={16} w={66} h={40} fill={0.03} stroke={0.16} />
      <g stroke={SV.sage} strokeOpacity="0.7" strokeWidth="1.2" strokeLinecap="round" fill="none">
        <path d="M18 42 C 26 36, 34 48, 42 42 C 50 36, 58 48, 68 42" />
        <path d="M18 50 C 26 44, 34 56, 42 50 C 50 44, 58 56, 68 50" />
        <path d="M30 30 A 10 10 0 0 1 50 30" />
        <path d="M40 18 L 40 22 M28 22 L 31 25 M52 22 L 49 25" />
      </g>

      {/* Transition exposure. */}
      <Panel x={10} y={88} w={66} h={40} fill={0.03} stroke={0.16} />
      <path d="M16 122 L 32 116 L 46 106 L 60 100 L 70 94" fill="none" stroke={SV.sage} strokeOpacity="0.3" strokeWidth="1.2" />
      <path
        d="M16 122 L 32 116 L 46 106 L 60 100 L 70 94"
        fill="none"
        stroke={SV.mint}
        strokeWidth="1.5"
        strokeLinecap="round"
        pathLength={100}
        className="sv-draw"
        style={sv(5)}
      />
      <Dot cx={70} cy={94} r={2.6} halo dur={3.4} />

      <Flow d="M76 42 C 86 44, 88 56, 94 60" dur={3} width={1} base={0.18} />
      <Flow d="M76 104 C 86 102, 88 92, 94 86" dur={3} delay={0.8} width={1} base={0.18} />

      {/* Where the exposure actually sits, by sector and geography. */}
      <Panel x={90} y={22} w={104} h={94} fill={0.02} stroke={0.14} />
      {rows.map((y, r) =>
        cols.map((x, c) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="16"
            height="19"
            rx="1"
            fill={heat[r]![c]! > 0.5 ? SV.gold : SV.mint}
            fillOpacity={heat[r]![c]!}
            className={heat[r]![c]! > 0.45 ? 'sv-pulse' : undefined}
            style={heat[r]![c]! > 0.45 ? sv(5, (r + c) * 0.3) : undefined}
          />
        )),
      )}

      <Flow d="M194 72 L 206 66" dur={2.8} delay={1.4} width={1.1} />

      {/* Financial impact, and the part of it that governs the decision. */}
      <Rail d="M200 118 L 306 118" opacity={0.3} />
      <path
        d="M268 92 C 282 100, 294 106, 304 110 L 304 118 L 268 118 Z"
        fill={SV.gold}
        fillOpacity="0.28"
        className="sv-breathe"
        style={sv(5)}
      />
      <path d="M202 48 C 238 52, 252 84, 304 110" fill="none" stroke={SV.sage} strokeOpacity="0.25" strokeWidth="1.2" />
      <path
        d="M202 48 C 238 52, 252 84, 304 110"
        fill="none"
        stroke={SV.mint}
        strokeWidth="1.6"
        strokeLinecap="round"
        pathLength={100}
        className="sv-draw"
        style={sv(5.5)}
      />
      <path d="M268 36 L 268 118" stroke={SV.gold} strokeWidth="1.2" strokeDasharray="4 4" strokeLinecap="round" className="sv-accent" />
      <Dot cx={268} cy={92} r={3} tone={SV.gold} halo dur={3.4} />
    </Frame>
  );
}

/** Lending and investment, and the share of each counterparty's emissions it carries. */
export function FinancedEmissions({ uid }: VisualProps) {
  const counterparties: Array<[number, number, number]> = [
    [20, 4, 0.34],
    [47, 5.5, 0.52],
    [72, 7, 0.68],
    [97, 5, 0.42],
    [122, 3.5, 0.26],
  ];

  return (
    <Frame uid={uid} glow={[180, 72]} accent={SV.gold}>
      {/* The institution. Its own operations are not the issue. */}
      <path d="M50 72 L 41 87.6 L 23 87.6 L 14 72 L 23 56.4 L 41 56.4 Z" fill={SV.mint} fillOpacity="0.14" stroke={SV.mint} strokeOpacity="0.65" strokeWidth="1.2" />
      <Dot cx={32} cy={72} r={4} halo dur={3.6} />

      {counterparties.map(([y], i) => (
        <Flow key={y} d={`M50 72 C 76 72, 84 ${y}, 104 ${y}`} dur={3.2} delay={i * 0.3} width={0.9} base={0.18} />
      ))}

      {/* Counterparties, sized by exposure. The gold arc is the attributed share. */}
      {counterparties.map(([y, r, frac], i) => (
        <g key={`c-${y}`}>
          <g className="sv-detail">
            {[0, 1, 2].map((p) => (
              <circle
                key={p}
                cx={112 + (p - 1) * 4}
                cy={y - r - 5}
                r="1.6"
                fill={SV.sage}
                className="sv-rise"
                style={sv(3.2, i * 0.3 + p * 0.5)}
              />
            ))}
          </g>
          <circle cx={112} cy={y} r={r} fill={SV.sage} fillOpacity="0.16" stroke={SV.sage} strokeOpacity="0.4" strokeWidth="0.9" />
          <path
            d={arcPath(112, y, r + 2.6, frac)}
            fill="none"
            stroke={SV.gold}
            strokeWidth="2.2"
            strokeLinecap="round"
            className="sv-accent"
          />
        </g>
      ))}

      {/* Only the attributed portion reaches the portfolio total. */}
      {counterparties.map(([y], i) => (
        <Flow
          key={`a-${y}`}
          d={`M122 ${y} C 158 ${y}, 170 76, 212 76`}
          tone={SV.gold}
          dur={3.4}
          delay={0.7 + i * 0.3}
          width={1}
          base={0.16}
        />
      ))}

      <Panel x={214} y={26} w={64} h={96} tone={SV.gold} fill={0.04} stroke={0.26} />
      {[106, 92, 78, 64, 50].map((y, i) => (
        <rect
          key={y}
          x={222}
          y={y}
          width={48}
          height={12}
          rx="1"
          fill={SV.gold}
          fillOpacity={0.24 + i * 0.13}
          className="sv-grow"
          style={sv(4.5, i * 0.25)}
        />
      ))}
      <Ticks x={284} y={52} count={5} gap={14} len={5} tone={SV.gold} opacity={0.4} vertical />

      {/* Data quality, disclosed with the result rather than behind it. */}
      {[214, 228, 242, 256, 270].map((x, i) => (
        <rect
          key={x}
          x={x}
          y={128}
          width="11"
          height="5"
          rx="1.5"
          fill={SV.mint}
          fillOpacity={i < 2 ? 0.75 : 0.18}
        />
      ))}
    </Frame>
  );
}
