import { Chip, Dot, Flow, Frame, Panel, Rail, SV, Ticks, sv, type VisualProps } from './shared';

/**
 * Carbon & Climate.
 *
 * One family, six different problems: calculating a figure, classifying
 * sources into an inventory, drawing the line around what you are
 * accountable for, taking an assertion to a verifier, planning a descent,
 * and following a product rather than an organisation.
 */

/** Activity data converges into a calculation model and leaves as one figure. */
export function CarbonAccounting({ uid }: VisualProps) {
  const sources = [27, 51, 75, 99];
  return (
    <Frame uid={uid} glow={[160, 72]}>
      {sources.map((cy, i) => (
        <Chip key={cy} x={14} y={cy - 7} w={44} h={14} lit={i === 1} />
      ))}

      {sources.map((cy, i) => (
        <Flow
          key={cy}
          d={`M58 ${cy} C 98 ${cy}, 110 72, 131 72`}
          dur={2.8}
          delay={i * 0.45}
          width={1}
        />
      ))}

      {/* Calculation model: an outer measurement ring turning slowly over a
          fixed inner frame, with the resolved value at the core. */}
      <circle
        cx="160"
        cy="72"
        r="28"
        fill="none"
        stroke={SV.mint}
        strokeOpacity="0.4"
        strokeWidth="1"
        strokeDasharray="4 6"
        className="sv-spin"
        style={sv(22)}
      />
      <circle cx="160" cy="72" r="19" fill={SV.mint} fillOpacity="0.05" stroke={SV.mint} strokeOpacity="0.35" strokeWidth="0.9" />
      <circle cx="160" cy="72" r="19" fill="none" stroke={SV.mint} strokeWidth="1.2" pathLength={100} className="sv-draw" style={sv(5)} />
      <Dot cx={160} cy={72} r={5.5} halo dur={3.4} />

      <Flow d="M189 72 L 236 72" dur={2.6} delay={0.9} width={1.2} />

      {/* Result: a measured quantity, capped by the verified total. */}
      <Panel x={240} y={32} w={66} h={80} />
      <Ticks x={246} y={56} count={5} gap={11} len={4} vertical opacity={0.3} />
      {[98, 84, 70, 56].map((y, i) => (
        <rect
          key={y}
          x={256}
          y={y}
          width={36}
          height={11}
          rx="1"
          fill={SV.mint}
          fillOpacity={0.18 + i * 0.12}
          className="sv-grow"
          style={sv(4, i * 0.3)}
        />
      ))}
      <rect x="256" y="42" width="36" height="7" rx="1" fill={SV.gold} className="sv-accent" />
    </Frame>
  );
}

/** Scattered sources are classified onto rails, then consolidated into a stack. */
export function GhgInventory({ uid }: VisualProps) {
  const sources: Array<[number, number, number]> = [
    [22, 26, 0],
    [50, 36, 1],
    [18, 60, 2],
    [56, 66, 0],
    [26, 94, 1],
    [52, 112, 2],
  ];
  const rails = [40, 72, 104];

  return (
    <Frame uid={uid} glow={[200, 76]}>
      {/* Emission sources, deliberately irregular: they arrive as found. */}
      {sources.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x - 4}
            y={y - 4}
            width="8"
            height="8"
            rx="1"
            fill={SV.sage}
            fillOpacity="0.1"
            stroke={SV.sage}
            strokeOpacity="0.45"
            strokeWidth="0.9"
            className="sv-drift"
            style={sv(4 + (i % 3), i * 0.4)}
          />
        </g>
      ))}

      {sources.map(([x, y, rail], i) => (
        <Flow
          key={`f-${x}-${y}`}
          d={`M${x + 6} ${y} C ${x + 34} ${y}, 74 ${rails[rail]}, 94 ${rails[rail]}`}
          dur={3.2}
          delay={i * 0.35}
          width={0.9}
          base={0.16}
        />
      ))}

      {/* Classification: three categories the sources sort onto. */}
      {rails.map((y, i) => (
        <g key={y}>
          <Rail d={`M94 ${y - 7} L 94 ${y + 7}`} tone={SV.mint} opacity={0.5} width={1.2} />
          <Rail d={`M94 ${y} L 192 ${y}`} opacity={0.26} />
          <Ticks x={108} y={y - 4} count={5} gap={16} len={8} opacity={0.22} />
          <Flow d={`M94 ${y} L 192 ${y}`} dur={2.8} delay={i * 0.5} width={1} base={0} />
        </g>
      ))}

      {/* Consolidated inventory: one reportable total, built in layers. */}
      <Panel x={222} y={30} w={74} h={92} />
      {[104, 88, 72, 56].map((y, i) => (
        <rect
          key={y}
          x={230}
          y={y}
          width={58}
          height={12}
          rx="1"
          fill={SV.mint}
          fillOpacity={0.14 + i * 0.09}
          stroke={SV.mint}
          strokeOpacity="0.25"
          strokeWidth="0.7"
        />
      ))}
      <rect x="230" y="40" width="58" height="12" rx="1" fill={SV.gold} fillOpacity="0.9" className="sv-accent" />
      {rails.map((y, i) => (
        <Flow key={`c-${y}`} d={`M192 ${y} L 222 ${[104, 88, 72][i]! + 6}`} dur={3} delay={0.8 + i * 0.3} width={0.9} base={0.14} />
      ))}
    </Frame>
  );
}

/**
 * The organisational boundary, and what sits outside it. Scope 1 inside,
 * Scope 2 crossing the line, Scope 3 occupying the far larger field around it.
 */
export function Scope123({ uid }: VisualProps) {
  return (
    <Frame uid={uid} glow={[160, 72]}>
      {/* The value chain: visibly wider than anything the company controls. */}
      <rect
        x="8"
        y="14"
        width="304"
        height="116"
        rx="6"
        fill="none"
        stroke={SV.sage}
        strokeOpacity="0.2"
        strokeWidth="0.9"
        strokeDasharray="2 4"
      />

      {/* Upstream, outside the boundary. */}
      <g>
        {([[20, 36], [16, 72], [26, 106]] as Array<[number, number]>).map(([x, y], i) => (
          <Dot key={y} cx={x} cy={y} r={3.2} tone={SV.sage} opacity={0.75} dur={4} delay={i * 0.5} />
        ))}
      </g>
      <Flow d="M24 36 C 62 32, 88 48, 114 60" tone={SV.sage} dur={3.6} width={0.9} base={0.14} dashed />
      <Flow d="M20 72 C 58 72, 86 72, 114 72" tone={SV.sage} dur={3.6} delay={0.4} width={0.9} base={0.14} dashed />
      <Flow d="M30 106 C 66 110, 90 94, 114 84" tone={SV.sage} dur={3.6} delay={0.8} width={0.9} base={0.14} dashed />

      {/* Downstream, also outside it. */}
      <Flow d="M210 60 C 236 48, 264 32, 296 38" tone={SV.sage} dur={3.6} delay={1.2} width={0.9} base={0.14} dashed />
      <Flow d="M210 72 C 238 72, 266 72, 300 72" tone={SV.sage} dur={3.6} delay={1.6} width={0.9} base={0.14} dashed />
      <Flow d="M210 84 C 236 96, 262 112, 294 106" tone={SV.sage} dur={3.6} delay={2} width={0.9} base={0.14} dashed />
      <g>
        {([[300, 38], [304, 72], [298, 106]] as Array<[number, number]>).map(([x, y], i) => (
          <Dot key={y} cx={x} cy={y} r={3.2} tone={SV.sage} opacity={0.75} dur={4} delay={i * 0.5 + 1} />
        ))}
      </g>

      {/* Purchased energy, crossing the boundary from outside. */}
      <g>
        <path d="M96 20 L 102 42 M112 20 L 106 42 M97 28 L 111 28 M99 35 L 109 35" stroke={SV.champagne} strokeOpacity="0.6" strokeWidth="1" strokeLinecap="round" fill="none" />
        <Flow d="M104 42 C 112 50, 122 44, 132 44" tone={SV.champagne} dur={2.4} width={1.1} base={0.22} />
      </g>

      {/* The organisational boundary: solid, because this part is controlled. */}
      <rect x="114" y="44" width="96" height="56" rx="3" fill={SV.mid} fillOpacity="0.5" stroke={SV.mint} strokeOpacity="0.85" strokeWidth="1.4" />

      {/* Direct operations inside it. */}
      <g fill={SV.mint} fillOpacity="0.5">
        <rect x="126" y="70" width="20" height="20" rx="1" />
        <rect x="130" y="60" width="4" height="10" rx="1" />
        <rect x="138" y="63" width="4" height="7" rx="1" />
        <rect x="156" y="74" width="26" height="16" rx="1" />
        <rect x="188" y="78" width="10" height="12" rx="1" />
      </g>
      <Dot cx={136} cy={56} r={2} tone={SV.mint} halo dur={3} />
      <Dot cx={169} cy={70} r={1.8} tone={SV.mint} halo dur={3} delay={0.6} />
    </Frame>
  );
}

/** A documented assertion passes a clause by clause check, then a verifier seals it. */
export function Iso14064({ uid }: VisualProps) {
  const checks = [30, 51, 72, 93, 114];
  return (
    <Frame uid={uid} glow={[248, 72]} accent={SV.gold}>
      {/* The GHG report: layered because the standard prescribes its content. */}
      <Panel x={26} y={34} w={66} h={74} fill={0.03} stroke={0.14} />
      <Panel x={21} y={30} w={66} h={74} fill={0.04} stroke={0.18} />
      <Panel x={16} y={26} w={66} h={74} fill={0.07} stroke={0.3} />
      <Ticks x={24} y={38} count={7} gap={8} len={44} vertical opacity={0.28} />
      <rect x="24" y="86" width="26" height="4" rx="1" fill={SV.mint} fillOpacity="0.6" />

      <Flow d="M82 64 C 108 64, 118 72, 134 72" dur={2.8} width={1.1} />

      {/* Conformance checkpoints, resolved in sequence. */}
      <Rail d="M142 24 L 142 120" opacity={0.3} />
      {checks.map((y, i) => (
        <g key={y}>
          <rect x="137" y={y - 4.5} width="9" height="9" rx="1.5" fill={SV.mid} stroke={SV.mint} strokeOpacity="0.5" strokeWidth="0.9" />
          <rect x="139" y={y - 2.5} width="5" height="5" rx="0.8" fill={SV.mint} className="sv-pulse" style={sv(4, i * 0.5)} />
        </g>
      ))}

      <Flow d="M147 72 L 214 72" tone={SV.gold} dur={3} delay={1.4} width={1.1} />

      {/* Verification seal, drawn by an independent body. */}
      <path
        d="M277 72 L 262.5 97 L 233.5 97 L 219 72 L 233.5 47 L 262.5 47 Z"
        fill={SV.gold}
        fillOpacity="0.07"
        stroke={SV.gold}
        strokeOpacity="0.35"
        strokeWidth="1"
      />
      <path
        d="M277 72 L 262.5 97 L 233.5 97 L 219 72 L 233.5 47 L 262.5 47 Z"
        fill="none"
        stroke={SV.gold}
        strokeWidth="1.5"
        pathLength={100}
        className="sv-draw sv-accent"
        style={sv(5)}
      />
      <circle cx="248" cy="72" r="13" fill="none" stroke={SV.champagne} strokeOpacity="0.45" strokeWidth="0.9" strokeDasharray="3 4" className="sv-spin" style={sv(18)} />
      <Dot cx={248} cy={72} r={5} tone={SV.gold} halo dur={3.2} />
    </Frame>
  );
}

/** A baseline brought down by sequenced levers, toward a target with residual above it. */
export function Decarbonisation({ uid }: VisualProps) {
  const steps = 'M22 30 L 70 30 L 70 48 L 124 48 L 124 66 L 178 66 L 178 82 L 232 82 L 232 94 L 292 94';
  const levers = [70, 124, 178, 232];

  return (
    <Frame uid={uid} glow={[150, 60]}>
      <Rail d="M22 118 L 296 118" opacity={0.22} />

      {/* Cumulative emissions under the pathway. */}
      <path
        d={`${steps} L 292 118 L 22 118 Z`}
        fill={SV.mint}
        fillOpacity="0.09"
      />
      <path d={steps} fill="none" stroke={SV.mint} strokeOpacity="0.25" strokeWidth="1.4" strokeLinejoin="round" />
      <path
        d={steps}
        fill="none"
        stroke={SV.mint}
        strokeWidth="1.8"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={100}
        className="sv-draw"
        style={sv(6)}
      />

      {/* Each descent is a lever, not a wish. */}
      {levers.map((x, i) => (
        <g key={x}>
          <Rail d={`M${x} ${[30, 48, 66, 82][i]! + 18} L ${x} 126`} opacity={0.2} dashed />
          <Dot cx={x} cy={[48, 66, 82, 94][i]!} r={2.6} dur={3} delay={i * 0.4} halo />
          <circle cx={x} cy="133" r="6" fill={SV.mid} stroke={SV.sage} strokeOpacity="0.4" strokeWidth="0.8" />
          <g stroke={SV.sage} strokeOpacity="0.7" strokeWidth="0.9" strokeLinecap="round" fill="none">
            {i === 0 ? <path d={`M${x - 3} 135 A 3.4 3.4 0 0 1 ${x + 3} 135 M${x} 135 L ${x + 2} 131`} /> : null}
            {i === 1 ? <path d={`M${x} 129 L ${x} 137 M${x - 3} 131 L ${x + 3} 135 M${x + 3} 131 L ${x - 3} 135`} /> : null}
            {i === 2 ? <path d={`M${x - 3} 130 L ${x + 3} 130 L ${x + 3} 136 L ${x - 3} 136 Z M${x - 3} 133 L ${x + 3} 133`} /> : null}
            {i === 3 ? <path d={`M${x + 1} 129 L ${x - 3} 134 L ${x} 134 L ${x - 1} 138 L ${x + 3} 132 L ${x} 132 Z`} /> : null}
          </g>
        </g>
      ))}

      {/* Residual emissions, standing above the target rather than hidden. */}
      <rect x="248" y="94" width="30" height="16" rx="1" fill={SV.sage} fillOpacity="0.14" stroke={SV.sage} strokeOpacity="0.35" strokeWidth="0.8" />
      <path d="M232 110 L 300 110" stroke={SV.gold} strokeWidth="1.6" strokeDasharray="5 4" strokeLinecap="round" className="sv-accent" />
      <Dot cx={300} cy={110} r={4} tone={SV.gold} halo dur={3} />
    </Frame>
  );
}

/** A product going round rather than an organisation sitting still. */
export function LifeCycleAssessment({ uid }: VisualProps) {
  const r = 46;
  const cx = 160;
  const cy = 70;
  const stations: Array<[number, number]> = [
    [160, 24],
    [203.7, 55.8],
    [187, 107.2],
    [133, 107.2],
    [116.3, 55.8],
  ];

  return (
    <Frame uid={uid} glow={[160, 70]}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={SV.sage} strokeOpacity="0.22" strokeWidth="1" />

      {/* End of life returning to materials: the loop that makes it a cycle. */}
      <path
        d={`M${stations[4]![0]} ${stations[4]![1]} A ${r} ${r} 0 0 1 ${stations[0]![0]} ${stations[0]![1]}`}
        fill="none"
        stroke={SV.gold}
        strokeWidth="1.6"
        strokeLinecap="round"
        className="sv-accent"
      />

      <Flow d={`M160 24 A ${r} ${r} 0 1 1 159.6 24`} dur={6} width={1.4} base={0} />

      {/* Impact assessed across categories, read from the centre. */}
      <g className="sv-detail">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg, i) => {
          const rad = (deg * Math.PI) / 180;
          const inner = 11;
          const outer = 15 + ((i * 7) % 12);
          return (
            <line
              key={deg}
              x1={cx + Math.cos(rad) * inner}
              y1={cy + Math.sin(rad) * inner}
              x2={cx + Math.cos(rad) * outer}
              y2={cy + Math.sin(rad) * outer}
              stroke={SV.mint}
              strokeWidth="2"
              strokeLinecap="round"
              className="sv-pulse"
              style={sv(4, i * 0.22)}
            />
          );
        })}
      </g>
      <circle cx={cx} cy={cy} r="8" fill={SV.mid} stroke={SV.mint} strokeOpacity="0.5" strokeWidth="0.9" />

      {/* Five stages, each a different operation on the product. */}
      {stations.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="9" fill={SV.forest} stroke={i === 4 ? SV.gold : SV.mint} strokeOpacity="0.7" strokeWidth="1.1" />
          <g stroke={i === 4 ? SV.gold : SV.mint} strokeWidth="1.1" strokeLinecap="round" fill="none" opacity="0.95">
            {i === 0 ? <path d={`M${x - 3.5} ${y + 2.5} L ${x} ${y - 3} L ${x + 3.5} ${y + 2.5} Z`} /> : null}
            {i === 1 ? <path d={`M${x - 3} ${y - 3} L ${x + 3} ${y - 3} L ${x + 3} ${y + 3} L ${x - 3} ${y + 3} Z M${x - 3} ${y} L ${x + 3} ${y}`} /> : null}
            {i === 2 ? <path d={`M${x - 4} ${y} L ${x + 2} ${y} M${x - 1} ${y - 3} L ${x + 3} ${y} L ${x - 1} ${y + 3}`} /> : null}
            {i === 3 ? <path d={`M${x - 3.5} ${y} L ${x - 1} ${y} M${x + 1} ${y} L ${x + 3.5} ${y} M${x} ${y - 3.5} L ${x} ${y + 3.5}`} /> : null}
            {i === 4 ? <path d={`M${x - 3} ${y + 3} L ${x + 3} ${y - 3} M${x + 3} ${y - 3} L ${x} ${y - 3} M${x + 3} ${y - 3} L ${x + 3} ${y}`} /> : null}
          </g>
        </g>
      ))}
    </Frame>
  );
}
