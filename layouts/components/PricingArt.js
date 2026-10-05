import { Castle, Cloud, Place } from "@layouts/components/origami";

// Pricing hero: three plan cards fan out in front of a paper gatehouse, a
// cursor picks the featured one, and a guard keeps watch over the plans.
// Motion is CSS only (styles/pricing.scss, styles/origami.scss).

const CARD_W = 180;
const CARD_H = 236;

// final centre, rotation, and the offset they fan out from (the stack)
const CARDS = [
  {
    id: "left",
    cx: 176,
    cy: 262,
    r: -10,
    sx: 104,
    sy: -12,
    d: 0.35,
    float: "0.4s",
  },
  {
    id: "right",
    cx: 384,
    cy: 262,
    r: 10,
    sx: -104,
    sy: -12,
    d: 0.45,
    float: "1.6s",
  },
  { id: "main", cx: 280, cy: 234, r: 0, sx: 0, sy: 26, d: 0.25, main: true },
];

const PlanCard = ({ main }) => (
  <>
    <rect
      width={CARD_W}
      height={CARD_H}
      rx="12"
      className="pa-paper pa-stroke"
    />
    <path
      d={`M0 12 a12 12 0 0 1 12 -12 H${CARD_W - 12} a12 12 0 0 1 12 12 V56 H0 Z`}
      className={main ? "pa-top-main" : "pa-top"}
    />
    <line x1="0" y1="56" x2={CARD_W} y2="56" className="pa-rule" />
    <rect x="16" y="20" width="58" height="8" rx="4" className="pa-ink" />
    <rect x="16" y="35" width="36" height="6" rx="3" className="pa-soft" />
    {main && (
      <g>
        <rect
          x="126"
          y="18"
          width="38"
          height="20"
          rx="10"
          className="pa-chip"
        />
        <path
          d="M141 27 v-2 a4 4 0 0 1 8 0 v2 M139 27 h12 v7 h-12 z"
          className="pa-chip-lock"
        />
      </g>
    )}
    <text x="16" y="104" className="pa-dollar">
      $
    </text>
    <rect
      x="37"
      y="81"
      width={main ? 58 : 44}
      height="23"
      rx="4"
      className="pa-digits"
    />
    <rect
      x={main ? 102 : 88}
      y="96"
      width="30"
      height="7"
      rx="3.5"
      className="pa-soft"
    />
    {[122, 142, 162].map((y, i) => (
      <g key={y}>
        <rect x="16" y={y} width="6" height="6" className="pa-bullet" />
        <rect
          x="30"
          y={y}
          width={[104, 84, 112][i]}
          height="6"
          rx="3"
          className="pa-soft"
        />
      </g>
    ))}
    <rect
      x="16"
      y="190"
      width={CARD_W - 32}
      height="30"
      rx="3"
      className={main ? "pa-btn pa-btn-main" : "pa-btn"}
    />
    <path
      d="M83 205 h14 M92 200 l5 5 -5 5"
      className={main ? "pa-arrow-main" : "pa-arrow"}
    />
  </>
);

const Chip = ({ x, y, width, label, delay, float }) => (
  <g className="pa-in" style={{ "--d": delay }}>
    <g className="pa-float" style={{ "--f": float }}>
      <rect
        x={x}
        y={y}
        width={width}
        height="28"
        rx="6"
        className="pa-paper pa-soft-stroke"
      />
      <text x={x + 12} y={y + 18.5} className="pa-chip-text">
        {label}
      </text>
      <path
        d={`M${x + width - 24} ${y + 14.5} l3.5 3.5 l7 -7`}
        className="pa-check"
      />
    </g>
  </g>
);

const PricingArt = () => {
  return (
    <svg
      className="pricing-art o-tone-day"
      viewBox="0 0 560 480"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* ground and orbit */}
      <g className="pa-in" style={{ "--d": 0.1 }}>
        <path
          d="M52 338 C 52 256, 150 226, 280 228 C 420 230, 508 262, 508 338 C 508 410, 414 446, 280 446 C 146 446, 52 414, 52 338 Z"
          className="pa-ground"
        />
        <circle cx="280" cy="250" r="232" className="pa-orbit-line" />
      </g>
      <g className="pa-orbit">
        <circle cx="280" cy="250" r="204" className="pa-orbit-dash" />
        <rect x="468.2" y="176.7" width="7" height="7" className="pa-node" />
        <rect x="84.8" y="316.3" width="7" height="7" className="pa-node" />
        <circle cx="244" cy="49" r="3.5" className="pa-dot" />
      </g>

      {/* the gatehouse the plans stand guard in front of */}
      <g className="pa-in" style={{ "--d": 0.15 }}>
        <Cloud x={24} y={40} w={96} drift={18} dur={28} />
        <Cloud x={430} y={96} w={74} drift={-16} dur={24} delay={5} />
        <Castle variant="gatehouse" x={280} y={200} scale={0.9} />
      </g>

      {/* blueprint marks */}
      <g className="pa-in pa-marks" style={{ "--d": 0.2 }}>
        <circle cx="58" cy="92" r="4.5" />
        <circle cx="506" cy="430" r="4.5" />
        <circle cx="490" cy="77" r="4" />
        <rect x="36" y="200" width="6" height="6" />
        <rect x="520" y="300" width="6" height="6" />
      </g>

      {/* plan cards: placement (attribute) → fan-in (CSS) → float (CSS) */}
      {CARDS.map((card) => (
        <g
          key={card.id}
          transform={`translate(${card.cx - CARD_W / 2} ${card.cy - CARD_H / 2})`}
        >
          <g
            className="pa-card"
            style={{
              "--r": `${card.r}deg`,
              "--sx": `${card.sx}px`,
              "--sy": `${card.sy}px`,
              "--d": card.d,
            }}
          >
            <g
              className={card.main ? undefined : "pa-float"}
              style={{ "--f": card.float }}
            >
              <PlanCard main={card.main} />
            </g>
          </g>
        </g>
      ))}

      <Chip
        x={26}
        y={150}
        width={104}
        label="Storage"
        delay={1.05}
        float="0.9s"
      />
      <Chip
        x={36}
        y={400}
        width={118}
        label="Bandwidth"
        delay={1.2}
        float="2.1s"
      />

      {/* a guard beside the plans */}
      <g className="o-unfold" style={{ "--o-delay": "1.2s" }}>
        <Place name="guard" x={450} y={322} scale={0.4} flip />
      </g>

      {/* cursor picking the featured plan */}
      {/* the featured card's button is centred at (280, 321) */}
      <circle cx="286" cy="326" r="12" className="pa-ripple" />
      <g className="pa-cursor">
        <path
          d="M0 0 L0 18 L4.8 13.6 L8 21 L11.4 19.6 L8.3 12.4 L14.6 12.4 Z"
          className="pa-pointer"
        />
      </g>
    </svg>
  );
};

export default PricingArt;
