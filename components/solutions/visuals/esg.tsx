import { Dot, Flow, Frame, Panel, Rail, SV, Ticks, sv, type VisualProps } from './shared';

/**
 * ESG & Sustainability.
 *
 * This family is organisational rather than physical. The subjects are
 * decisions, evidence of what matters, where risk is ranked, who owns a
 * number, and how influence reaches a supplier.
 */

/** Issues narrow into a decision, which acquires governance and then delivery. */
export function EsgStrategy({ uid }: VisualProps) {
  const layers = [
    { x: 68, w: 184, y: 14 },
    { x: 58, w: 204, y: 42 },
    { x: 48, w: 224, y: 70 },
    { x: 38, w: 244, y: 98 },
  ];

  return (
    <Frame uid={uid} glow={[160, 72]}>
      {layers.map((l, i) => (
        <Panel key={l.y} x={l.x} y={l.y} w={l.w} h={20} fill={0.04 + i * 0.015} stroke={0.2 + i * 0.05} />
      ))}

      {/* The issue universe, before anything has been decided about it. */}
      <g>
        {Array.from({ length: 13 }, (_, i) => {
          const x = 78 + i * 14;
          const h = 4 + ((i * 5) % 9);
          return (
            <rect
              key={x}
              x={x}
              y={28 - h}
              width="3"
              height={h}
              rx="0.8"
              fill={SV.sage}
              fillOpacity={i % 4 === 1 ? 0.85 : 0.3}
            />
          );
        })}
      </g>

      {/* One consolidated position. */}
      <rect x="66" y="49" width="188" height="6" rx="1.5" fill={SV.mint} fillOpacity="0.4" />
      <rect x="66" y="49" width="188" height="6" rx="1.5" fill="none" stroke={SV.mint} strokeWidth="1.2" pathLength={100} className="sv-draw" style={sv(5)} />

      {/* Oversight: three points of accountability. */}
      {[92, 160, 228].map((x, i) => (
        <g key={x}>
          <circle cx={x} cy="80" r="6" fill={SV.forest} stroke={SV.mint} strokeOpacity="0.55" strokeWidth="1" />
          <Dot cx={x} cy={80} r={2.4} dur={3.4} delay={i * 0.5} halo />
        </g>
      ))}
      <Rail d="M98 80 L 154 80 M166 80 L 222 80" opacity={0.28} />

      {/* Delivery, running on parallel tracks. */}
      {[104, 109, 114].map((y, i) => (
        <g key={y}>
          <Rail d={`M46 ${y} L 274 ${y}`} opacity={0.2} />
          <Flow d={`M46 ${y} L 274 ${y}`} dur={4} delay={i * 0.6} width={0.9} base={0} />
        </g>
      ))}

      {/* The decision line, running the full height of the architecture. */}
      <path d="M160 14 L 160 122" stroke={SV.gold} strokeOpacity="0.28" strokeWidth="1.4" />
      <path
        d="M160 14 L 160 122"
        stroke={SV.gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        pathLength={100}
        className="sv-draw sv-accent"
        style={sv(5)}
      />
      <Dot cx={160} cy={122} r={3.6} tone={SV.gold} halo dur={3.4} />
    </Frame>
  );
}

/** Five data streams become structured data, a disclosure, then an assured one. */
export function SustainabilityReporting({ uid }: VisualProps) {
  const streams = [24, 44, 64, 84, 104];
  const cols = [100, 122, 144];

  return (
    <Frame uid={uid} glow={[200, 72]}>
      {streams.map((y, i) => (
        <g key={y}>
          <Rail d={`M12 ${y} L 96 ${y}`} opacity={0.22} />
          <Dot cx={14} cy={y} r={2.4} tone={SV.sage} opacity={0.7} />
          <Flow d={`M14 ${y} L 96 ${y}`} dur={3} delay={i * 0.3} width={1} base={0} />
        </g>
      ))}

      {/* Definitions and controls: the grid the data has to land in. */}
      <Panel x={96} y={14} w={70} h={116} />
      {cols.map((x, c) =>
        streams.map((y, r) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y - 9}
            width="20"
            height="18"
            rx="1"
            fill={SV.mint}
            fillOpacity="0.14"
            stroke={SV.mint}
            strokeOpacity="0.22"
            strokeWidth="0.7"
            className="sv-pulse"
            style={sv(5, (c + r) * 0.28)}
          />
        )),
      )}

      <Flow d="M166 72 L 178 72" dur={2.6} delay={1.2} width={1.1} />

      {/* The disclosure itself. */}
      <Panel x={180} y={28} w={58} h={88} fill={0.07} stroke={0.3} />
      <Ticks x={188} y={38} count={8} gap={9} len={42} vertical opacity={0.3} />
      <rect x="188" y="100" width="24" height="4" rx="1" fill={SV.mint} fillOpacity="0.65" />

      <Flow d="M238 72 L 258 72" tone={SV.gold} dur={2.6} delay={1.8} width={1.1} />

      {/* Assurance, closing the loop on what was published. */}
      <circle cx="282" cy="72" r="22" fill="none" stroke={SV.gold} strokeOpacity="0.25" strokeWidth="1.2" />
      <circle
        cx="282"
        cy="72"
        r="22"
        fill="none"
        stroke={SV.gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        pathLength={100}
        className="sv-draw sv-accent"
        style={sv(5.5)}
      />
      <circle cx="282" cy="72" r="12" fill={SV.gold} fillOpacity="0.1" stroke={SV.champagne} strokeOpacity="0.4" strokeWidth="0.8" strokeDasharray="3 4" className="sv-spin" style={sv(20)} />
      <Dot cx={282} cy={72} r={4} tone={SV.gold} halo dur={3.2} />
    </Frame>
  );
}

/** Issues tested against business impact and stakeholder weight. Some converge. */
export function MaterialityAssessment({ uid }: VisualProps) {
  const outside: Array<[number, number, number]> = [
    [42, 102, 2.4],
    [64, 78, 2],
    [90, 114, 2.6],
    [106, 62, 2.2],
    [132, 96, 2],
    [152, 120, 2.4],
    [74, 46, 1.8],
    [120, 34, 2],
    [168, 88, 2.2],
    [46, 126, 1.8],
  ];
  const inside: Array<[number, number, number]> = [
    [212, 40, 4.2],
    [240, 30, 3.4],
    [254, 54, 4.6],
    [224, 60, 3.8],
    [266, 38, 3],
  ];

  return (
    <Frame uid={uid} glow={null}>
      <defs>
        <radialGradient id={`${uid}-zone`}>
          <stop offset="0" stopColor={SV.gold} stopOpacity="0.3" />
          <stop offset="0.6" stopColor={SV.mint} stopOpacity="0.12" />
          <stop offset="1" stopColor={SV.mint} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Depth, so the field reads as a landscape rather than a chart. */}
      <g stroke={SV.sage} strokeOpacity="0.12" strokeWidth="0.7">
        {[88, 100, 112, 124].map((y, i) => (
          <line key={y} x1={20 + i * 6} y1={y} x2={300 - i * 6} y2={y} />
        ))}
      </g>

      {/* Axes implied, never labelled: impact rising, significance widening. */}
      <path d="M16 132 L 300 132" stroke={SV.sage} strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />
      <path d="M16 132 L 16 16" stroke={SV.sage} strokeOpacity="0.3" strokeWidth="1" strokeLinecap="round" />

      {/* The zone where an issue becomes material. */}
      <ellipse cx="240" cy="44" rx="70" ry="48" fill={`url(#${uid}-zone)`} className="sv-breathe" style={sv(6)} />
      <path
        d="M158 14 C 172 56, 194 86, 282 100"
        fill="none"
        stroke={SV.gold}
        strokeOpacity="0.55"
        strokeWidth="1.2"
        strokeDasharray="4 4"
        strokeLinecap="round"
        className="sv-accent"
      />

      {outside.map(([x, y, r], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill={SV.sage}
          fillOpacity="0.4"
          className="sv-drift"
          style={sv(5 + (i % 3), i * 0.4)}
        />
      ))}

      {inside.map(([x, y, r], i) => (
        <g key={`${x}-${y}`} className="sv-drift" style={sv(5 + (i % 2), i * 0.5)}>
          <Dot cx={x} cy={y} r={r} tone={i === 2 ? SV.gold : SV.mint} halo dur={4} delay={i * 0.45} />
        </g>
      ))}
    </Frame>
  );
}

/** ESG risks slotted into the register the business already runs on. */
export function EsgRiskManagement({ uid }: VisualProps) {
  const colX = [92, 132, 172];
  const rowY = [44, 64, 84, 104];
  const landings: Array<[number, number]> = [
    [110, 52],
    [150, 72],
    [190, 92],
  ];

  return (
    <Frame uid={uid} glow={[160, 80]}>
      {/* The existing enterprise risk register: uniform, already in use. */}
      <Panel x={84} y={34} w={132} h={90} fill={0.03} stroke={0.16} />
      {colX.map((x) =>
        rowY.map((y) => (
          <rect
            key={`${x}-${y}`}
            x={x}
            y={y}
            width="36"
            height="16"
            rx="1"
            fill={SV.sage}
            fillOpacity="0.08"
            stroke={SV.sage}
            strokeOpacity="0.25"
            strokeWidth="0.7"
          />
        )),
      )}

      {/* Climate and ESG exposures arriving into it, not alongside it. */}
      {landings.map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <Rail d={`M${x} 12 L ${x} ${y - 9}`} tone={SV.gold} opacity={0.3} dashed />
          <rect
            x={x - 19}
            y={y - 9}
            width="38"
            height="18"
            rx="1"
            fill={SV.gold}
            fillOpacity="0.1"
            stroke={SV.gold}
            strokeOpacity="0.6"
            strokeWidth="1"
          />
          <g className="sv-slot" style={sv(5, i * 0.6)}>
            <path
              d={`M${x} ${y - 5.5} L ${x + 5.5} ${y} L ${x} ${y + 5.5} L ${x - 5.5} ${y} Z`}
              fill={SV.gold}
              fillOpacity="0.85"
            />
          </g>
        </g>
      ))}

      {/* Everything ranked together, which is the point of integrating. */}
      <Rail d="M222 36 L 222 124" opacity={0.25} />
      {[36, 52, 68, 84, 100, 116].map((y, i) => {
        const esg = i === 0 || i === 2;
        return (
          <g key={y}>
            <rect
              x={236}
              y={y}
              width={56 - i * 6}
              height="11"
              rx="1"
              fill={esg ? SV.gold : SV.sage}
              fillOpacity={esg ? 0.55 : 0.2}
            />
            {esg ? (
              <path
                d={`M230 ${y + 5.5} L 233 ${y + 2} L 236 ${y + 5.5} L 233 ${y + 9} Z`}
                fill={SV.gold}
                className="sv-accent"
              />
            ) : null}
          </g>
        );
      })}
      <Flow d="M216 72 L 232 72" tone={SV.gold} dur={2.8} delay={1.6} width={1.1} />
    </Frame>
  );
}

/** Metric streams held against a threshold, then governed by definition and owner. */
export function EsgDataKpis({ uid }: VisualProps) {
  const lines = [
    'M16 44 L 46 38 L 76 48 L 106 34 L 136 40 L 166 28 L 194 32',
    'M16 70 L 46 64 L 76 72 L 106 60 L 136 66 L 166 58 L 194 54',
    'M16 96 L 46 102 L 76 88 L 106 94 L 136 82 L 166 88 L 194 78',
    'M16 120 L 46 114 L 76 122 L 106 110 L 136 116 L 166 106 L 194 110',
  ];
  const ends = [32, 54, 78, 110];

  return (
    <Frame uid={uid} glow={[120, 72]}>
      <g stroke={SV.sage} strokeOpacity="0.1" strokeWidth="0.7">
        {[32, 56, 80, 104, 128].map((y) => (
          <line key={y} x1="16" y1={y} x2="194" y2={y} />
        ))}
      </g>

      {lines.map((d, i) => (
        <g key={d}>
          <path d={d} fill="none" stroke={SV.sage} strokeOpacity="0.22" strokeWidth="1.1" strokeLinejoin="round" />
          <path
            d={d}
            fill="none"
            stroke={SV.mint}
            strokeWidth="1.4"
            strokeLinejoin="round"
            strokeLinecap="round"
            pathLength={100}
            className="sv-flow"
            style={sv(4, i * 0.5)}
          />
          <Dot cx={194} cy={ends[i]!} r={2.8} dur={3.4} delay={i * 0.4} halo />
        </g>
      ))}

      {/* The threshold a metric is actually managed against. */}
      <path d="M16 48 L 194 48" stroke={SV.gold} strokeWidth="1.3" strokeDasharray="5 4" strokeLinecap="round" className="sv-accent" />

      {/* Definition, owner, tolerance: what makes a number assurable. */}
      <Panel x={210} y={18} w={96} h={108} />
      <Ticks x={220} y={30} count={4} gap={9} len={40} vertical opacity={0.3} />
      <rect x="220" y="68" width="34" height="3.5" rx="1" fill={SV.mint} fillOpacity="0.6" />
      <circle cx="264" cy="70" r="7" fill={SV.forest} stroke={SV.mint} strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="264" cy="67.5" r="2.4" fill={SV.mint} fillOpacity="0.8" />
      <path d="M259.5 74.5 A 5 5 0 0 1 268.5 74.5" fill="none" stroke={SV.mint} strokeOpacity="0.8" strokeWidth="1.1" />
      <path d="M220 100 A 18 18 0 0 1 256 100" fill="none" stroke={SV.sage} strokeOpacity="0.35" strokeWidth="1.4" strokeLinecap="round" />
      <path
        d="M220 100 A 18 18 0 0 1 256 100"
        fill="none"
        stroke={SV.gold}
        strokeWidth="1.8"
        strokeLinecap="round"
        pathLength={100}
        className="sv-draw sv-accent"
        style={sv(5)}
      />
      <Dot cx={238} cy={100} r={2.6} tone={SV.gold} />
      {[274, 282, 290, 298].map((x, i) => (
        <rect key={x} x={x} y={96} width="4" height={i < 3 ? 14 : 8} rx="1" fill={SV.mint} fillOpacity={i < 3 ? 0.5 : 0.18} />
      ))}
    </Frame>
  );
}

/** Suppliers screened against criteria, with the data pathway running back. */
export function SustainableProcurement({ uid }: VisualProps) {
  const suppliers: Array<[number, number, number, boolean]> = [
    [24, 28, 4, true],
    [50, 20, 3, true],
    [18, 54, 5.5, true],
    [52, 50, 3.5, false],
    [26, 82, 4.5, true],
    [56, 78, 3, true],
    [30, 110, 5, true],
  ];

  return (
    <Frame uid={uid} glow={[180, 66]}>
      {/* The supply base, segmented by spend and risk rather than treated alike. */}
      {suppliers.map(([x, y, r, pass], i) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={r}
          fill={pass ? SV.mint : SV.sage}
          fillOpacity={pass ? 0.3 : 0.18}
          stroke={pass ? SV.mint : SV.sage}
          strokeOpacity={pass ? 0.65 : 0.35}
          strokeWidth="0.9"
          className="sv-drift"
          style={sv(5 + (i % 3), i * 0.35)}
        />
      ))}

      {suppliers.map(([x, y, r, pass], i) =>
        pass ? (
          <Flow
            key={`p-${x}-${y}`}
            d={`M${x + r} ${y} C ${x + 40} ${y}, 90 66, 106 66`}
            dur={3.2}
            delay={i * 0.3}
            width={0.9}
            base={0.15}
          />
        ) : (
          <Rail key={`d-${x}-${y}`} d={`M${x + r} ${y} C ${x + 34} ${y}, 84 44, 96 30`} tone={SV.sage} opacity={0.3} dashed />
        ),
      )}

      {/* Prequalification: requirements applied before the relationship starts. */}
      <Rail d="M106 16 L 106 120 M118 16 L 118 120" tone={SV.mint} opacity={0.4} width={1.1} />
      {[32, 56, 80, 104].map((y, i) => (
        <rect
          key={y}
          x={106}
          y={y - 5}
          width="12"
          height="10"
          rx="1"
          fill={SV.mint}
          fillOpacity="0.2"
          className="sv-pulse"
          style={sv(4, i * 0.45)}
        />
      ))}

      <Flow d="M118 66 L 166 66" dur={2.8} delay={1} width={1.1} />

      {/* Operations, and onward distribution. */}
      <path d="M190 46 L 207 56 L 207 76 L 190 86 L 173 76 L 173 56 Z" fill={SV.mint} fillOpacity="0.12" stroke={SV.mint} strokeOpacity="0.6" strokeWidth="1.1" />
      <Dot cx={190} cy={66} r={4} halo dur={3.4} />
      <Flow d="M207 66 L 256 66" dur={2.8} delay={1.6} width={1.1} />
      <g className="sv-detail">
        <circle cx="266" cy="66" r="8" fill={SV.forest} stroke={SV.mint} strokeOpacity="0.55" strokeWidth="1" />
        <Rail d="M274 66 L 292 48 M274 66 L 296 66 M274 66 L 292 84" tone={SV.mint} opacity={0.4} />
        {[[292, 48], [296, 66], [292, 84]].map(([x, y]) => (
          <Dot key={y} cx={x!} cy={y!} r={2.4} tone={SV.mint} opacity={0.7} />
        ))}
      </g>

      {/* Supplier data returning through the same relationship. */}
      <Flow
        d="M190 86 C 178 126, 100 136, 38 124"
        tone={SV.gold}
        dur={4}
        width={1}
        base={0.22}
        dashed
        reverse
        className="sv-accent"
      />
    </Frame>
  );
}
