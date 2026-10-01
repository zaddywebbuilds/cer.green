import { Dot, Flow, Frame, Panel, Rail, SV, Ticks, sv, type VisualProps } from './shared';

/**
 * Compliance & Standards.
 *
 * The most structural of the four families: right angles, brackets and
 * gates. Each diagram moves from an external requirement to the evidence
 * that satisfies it, which is the shape of all four engagements.
 */

/** A standard fans into clauses, each answered by a control, each leaving evidence. */
export function IsoAdvisory({ uid }: VisualProps) {
  const clauses = [48, 70, 92, 114];

  return (
    <Frame uid={uid} glow={[150, 80]}>
      {/* The standard, as published. */}
      <Panel x={20} y={12} w={130} h={18} fill={0.09} stroke={0.35} />
      <Ticks x={28} y={17} count={9} gap={13} len={8} opacity={0.35} />
      <Rail d="M85 30 L 85 40 L 30 40 L 30 114" tone={SV.mint} opacity={0.45} width={1.1} />

      {/* Requirements, read off it. */}
      {clauses.map((y, i) => (
        <g key={y}>
          <Rail d={`M30 ${y} L 94 ${y}`} opacity={0.3} />
          <Dot cx={30} cy={y} r={2.2} tone={SV.mint} opacity={0.8} />
          <Ticks x={40} y={y - 4} count={4} gap={13} len={8} opacity={0.25} />
          <Flow d={`M30 ${y} L 94 ${y}`} dur={3} delay={i * 0.4} width={0.9} base={0} />
        </g>
      ))}

      {/* Controls, mapped onto what the business already does. */}
      {clauses.map((y, i) => (
        <g key={`c-${y}`}>
          <Flow d={`M94 ${y} L 134 ${y}`} dur={3} delay={0.5 + i * 0.4} width={0.9} base={0.16} />
          <rect
            x={134}
            y={y - 8}
            width={54}
            height={16}
            rx="1.5"
            fill={SV.mint}
            fillOpacity="0.12"
            stroke={SV.mint}
            strokeOpacity="0.45"
            strokeWidth="0.9"
            className="sv-pulse"
            style={sv(5, i * 0.5)}
          />
          <rect x={138} y={y - 3} width="8" height="6" rx="1" fill={SV.mint} fillOpacity="0.75" />
        </g>
      ))}

      {/* Records, which is what an auditor actually asks to see. */}
      {clauses.map((y, i) => (
        <Flow key={`e-${y}`} d={`M188 ${y} C 204 ${y}, 206 92, 216 92`} dur={3.2} delay={1 + i * 0.3} width={0.9} base={0.14} />
      ))}
      <Panel x={220} y={72} w={62} h={42} fill={0.03} stroke={0.14} />
      <Panel x={216} y={68} w={62} h={42} fill={0.04} stroke={0.2} />
      <Panel x={212} y={64} w={62} h={42} fill={0.08} stroke={0.35} />
      <Ticks x={220} y={74} count={4} gap={8} len={44} vertical opacity={0.3} />

      {/* Readiness, accumulating. */}
      <Rail d="M296 20 L 296 128" opacity={0.25} width={6} />
      <rect
        x="293"
        y="44"
        width="6"
        height="84"
        rx="3"
        fill={SV.gold}
        className="sv-grow sv-accent"
        style={sv(5)}
      />
    </Frame>
  );
}

/** Production, embedded emissions, and a border that prices them on entry. */
export function CbamReadiness({ uid }: VisualProps) {
  return (
    <Frame uid={uid} glow={[216, 72]} accent={SV.gold}>
      {/* The production installation, where embedded emissions arise. */}
      <g fill={SV.mint} fillOpacity="0.14" stroke={SV.mint} strokeOpacity="0.55" strokeWidth="1">
        <rect x="14" y="68" width="48" height="34" rx="2" />
        <rect x="22" y="44" width="8" height="24" rx="1" />
        <rect x="40" y="38" width="8" height="30" rx="1" />
      </g>
      <g className="sv-detail">
        {[[26, 36], [44, 30], [26, 26], [44, 20]].map(([x, y], i) => (
          <circle
            key={`${x}-${y}`}
            cx={x}
            cy={y}
            r={2.2}
            fill={SV.sage}
            className="sv-rise"
            style={sv(3.4, i * 0.65)}
          />
        ))}
      </g>
      <rect x="14" y="108" width="48" height="13" rx="1.5" fill={SV.gold} fillOpacity="0.14" stroke={SV.gold} strokeOpacity="0.5" strokeWidth="0.9" />
      <Ticks x={20} y={111} count={5} gap={8} len={7} tone={SV.gold} opacity={0.65} />

      {/* Covered goods, moving toward an export market. */}
      <Rail d="M64 86 L 202 86" opacity={0.28} />
      {[86, 126, 166].map((x, i) => (
        <g key={x} className="sv-drift" style={sv(4, i * 0.5)}>
          <rect x={x} y={72} width="24" height="13" rx="1" fill={SV.sage} fillOpacity="0.16" stroke={SV.sage} strokeOpacity="0.45" strokeWidth="0.8" />
          <Rail d={`M${x + 6} 72 L ${x + 6} 85 M${x + 12} 72 L ${x + 12} 85 M${x + 18} 72 L ${x + 18} 85`} opacity={0.3} />
        </g>
      ))}
      <Flow d="M64 86 L 202 86" dur={3.4} width={1.2} base={0} />

      {/* The carbon border: a priced threshold, not a customs post. */}
      <rect x="204" y="16" width="14" height="112" rx="2" fill={SV.gold} fillOpacity="0.14" stroke={SV.gold} strokeOpacity="0.6" strokeWidth="1.1" />
      {[26, 46, 66, 86, 106].map((y, i) => (
        <rect
          key={y}
          x={204}
          y={y}
          width="14"
          height="6"
          rx="1"
          fill={SV.gold}
          className="sv-pulse"
          style={sv(4, i * 0.3)}
        />
      ))}

      {/* The price attaching to the embedded emissions of what crosses. */}
      <g>
        <circle cx="248" cy="44" r="17" fill={SV.forest} stroke={SV.gold} strokeOpacity="0.4" strokeWidth="1" />
        <path d="M236 50 A 15 15 0 0 1 260 50" fill="none" stroke={SV.champagne} strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M236 50 A 15 15 0 0 1 260 50"
          fill="none"
          stroke={SV.gold}
          strokeWidth="2.4"
          strokeLinecap="round"
          pathLength={100}
          className="sv-draw sv-accent"
          style={sv(4.5)}
        />
        <Rail d="M248 46 L 255 38" tone={SV.gold} opacity={0.9} width={1.3} />
        <Dot cx={248} cy={46} r={2.2} tone={SV.gold} />
      </g>

      <Flow d="M218 86 L 262 86" tone={SV.gold} dur={2.8} delay={1.4} width={1.2} />
      <Panel x={264} y={70} w={42} h={32} tone={SV.gold} fill={0.08} stroke={0.4} />
      <Ticks x={270} y={76} count={3} gap={8} len={30} tone={SV.gold} vertical opacity={0.4} />
    </Frame>
  );
}

/** A published figure traced backwards, through method and control, to its evidence. */
export function AssuranceReadiness({ uid }: VisualProps) {
  const trace =
    'M268 40 L 234 40 L 234 48 L 214 48 L 214 68 L 188 68 L 188 76 L 168 76 L 168 96 L 142 96 L 142 104 L 122 104 L 122 114 L 76 114';

  return (
    <Frame uid={uid} glow={[250, 32]} accent={SV.gold}>
      {/* The reported figure, which is where an assurance provider starts. */}
      <Panel x={224} y={12} w={80} h={28} fill={0.1} stroke={0.45} />
      <rect x="232" y="20" width="40" height="5" rx="1.5" fill={SV.mint} fillOpacity="0.75" />
      <Ticks x={232} y={30} count={7} gap={7} len={5} opacity={0.4} />

      {/* Each layer the figure has to survive on the way back. */}
      {([[178, 48], [132, 76], [86, 104]] as Array<[number, number]>).map(([x, y], i) => (
        <g key={y}>
          <Panel x={x} y={y} w={72} h={20} fill={0.06 - i * 0.012} stroke={0.3 - i * 0.05} />
          <Ticks x={x + 7} y={y + 7} count={5} gap={10} len={7} opacity={0.3} />
          <Dot cx={x + 64} cy={y + 10} r={2} tone={SV.mint} opacity={0.6} />
        </g>
      ))}

      <path d={trace} fill="none" stroke={SV.sage} strokeOpacity="0.18" strokeWidth="1.1" strokeLinejoin="round" />
      <path
        d={trace}
        fill="none"
        stroke={SV.gold}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
        pathLength={100}
        className="sv-flow-rev sv-accent"
        style={sv(4.5)}
      />

      {/* Source records, retained. If they were never kept, nothing recreates them. */}
      <Panel x={22} y={104} w={56} h={24} fill={0.03} stroke={0.14} />
      <Panel x={18} y={100} w={56} h={24} fill={0.05} stroke={0.22} />
      <Panel x={14} y={96} w={56} h={24} fill={0.09} stroke={0.4} />
      <Ticks x={21} y={102} count={3} gap={7} len={38} vertical opacity={0.35} />
      <g>
        <circle cx="64" cy="86" r="11" fill={SV.forest} stroke={SV.gold} strokeOpacity="0.5" strokeWidth="1" />
        <circle
          cx="64"
          cy="86"
          r="11"
          fill="none"
          stroke={SV.gold}
          strokeWidth="1.6"
          pathLength={100}
          className="sv-draw sv-accent"
          style={sv(4.5)}
        />
        <Dot cx={64} cy={86} r={3.4} tone={SV.gold} halo dur={3.2} />
      </g>
    </Frame>
  );
}

/** Oversight, delegated authority, and a control that stands between a claim and the public. */
export function GovernanceControls({ uid }: VisualProps) {
  const cols = [96, 160, 224];

  return (
    <Frame uid={uid} glow={[160, 40]}>
      {/* The board, and the committees it oversees through. */}
      <circle cx="160" cy="28" r="17" fill={SV.mid} fillOpacity="0.6" stroke={SV.mint} strokeOpacity="0.7" strokeWidth="1.2" />
      {[0, 120, 240].map((deg, i) => (
        <path
          key={deg}
          d={`M160 28 m ${23 * Math.cos(((deg - 50) * Math.PI) / 180)} ${23 * Math.sin(((deg - 50) * Math.PI) / 180)} A 23 23 0 0 1 ${160 + 23 * Math.cos(((deg + 50) * Math.PI) / 180)} ${28 + 23 * Math.sin(((deg + 50) * Math.PI) / 180)}`}
          fill="none"
          stroke={SV.mint}
          strokeOpacity="0.5"
          strokeWidth="2"
          strokeLinecap="round"
          className="sv-pulse"
          style={sv(4.5, i * 0.6)}
        />
      ))}
      <Dot cx={160} cy={28} r={4} halo dur={3.6} />

      {/* Delegation, which is what turns oversight into something enforceable. */}
      <Rail d="M160 45 L 160 56 M96 56 L 224 56" tone={SV.mint} opacity={0.4} width={1.1} />
      {cols.map((x, i) => (
        <g key={x}>
          <Rail d={`M${x} 56 L ${x} 74`} tone={SV.mint} opacity={0.35} />
          <Flow d={`M${x} 56 L ${x} 74`} dur={3} delay={i * 0.4} width={1} base={0} />
          {/* A control sits on the line, not beside it. */}
          <rect x={x - 11} y={63} width="22" height="7" rx="1.5" fill={SV.mid} stroke={SV.mint} strokeOpacity="0.6" strokeWidth="0.9" />
          <rect x={x - 7} y={65} width="14" height="3" rx="1" fill={SV.mint} fillOpacity="0.7" className="sv-pulse" style={sv(4, i * 0.5)} />
          {/* Named management ownership. */}
          <rect x={x - 16} y={74} width="32" height="18" rx="1.5" fill={SV.sage} fillOpacity="0.09" stroke={SV.sage} strokeOpacity="0.4" strokeWidth="0.9" />
          <circle cx={x - 7} cy={83} r="3.2" fill={SV.mint} fillOpacity="0.55" />
          <Ticks x={x} y={80} count={3} gap={3.5} len={11} vertical opacity={0.35} />
        </g>
      ))}

      {/* Approval, which is the gate a public statement has to pass. */}
      {cols.map((x) => <Rail key={`d-${x}`} d={`M${x} 92 L ${x} 100`} opacity={0.25} dashed />)}
      <rect x="104" y="100" width="112" height="8" rx="1.5" fill={SV.gold} fillOpacity="0.14" stroke={SV.gold} strokeOpacity="0.55" strokeWidth="1" />
      <rect x="150" y="100" width="20" height="8" rx="1.5" fill={SV.forest} />
      <Flow d="M160 100 L 160 112" tone={SV.gold} dur={2.6} delay={1.2} width={1.3} />

      {/* What the organisation says publicly, once it can stand behind it. */}
      <Panel x={100} y={112} w={120} h={20} tone={SV.gold} fill={0.08} stroke={0.45} />
      <Ticks x={110} y={117} count={8} gap={12} len={9} tone={SV.gold} opacity={0.5} />
      <Dot cx={212} cy={122} r={3} tone={SV.gold} halo dur={3.2} />
    </Frame>
  );
}
