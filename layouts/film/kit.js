// Film kit: paper props built on the origami system (same papers, same
// light from the top left). Animated parts carry data-k so a shot's build
// can find them; elements GSAP moves never carry a transform attribute of
// their own (the transform lives on an inner group).
import { Tower, Wall } from "@layouts/components/origami";
import {
  LOCK_BODY,
  LOCK_PLAY,
  LOCK_RING,
  LOCK_SHACKLE,
} from "@layouts/components/origami/heraldry";
import { path } from "@layouts/components/origami/path";

const r1 = (n) => Math.round(n * 10) / 10;
const LOCK_W = 85;
const LOCK_H = 106;

// rough text widths for chips (Plus Jakarta Sans)
const capsWidth = (text, size) => text.length * size * 0.7;

// the BMDRM lock in full colour, centred on (x, y), `h` tall
export const LockMark = ({ x = 0, y = 0, h = 106, k }) => {
  const s = h / LOCK_H;
  return (
    <g data-k={k}>
      <g transform={path`translate(${x - (LOCK_W * s) / 2} ${y - h / 2}) scale(${s})`}>
        <path d={LOCK_SHACKLE} fill="url(#o-lock-shackle)" />
        <path d={LOCK_BODY} fill="url(#o-lock-body)" />
        <path d={LOCK_RING} fill="#fff" />
        <path d={LOCK_PLAY} fill="#fff" />
      </g>
    </g>
  );
};

// the lock as a white silhouette (for seals and shields)
export const LockGlyph = ({ x = 0, y = 0, h = 40, play = "fc-coral-d" }) => {
  const s = h / LOCK_H;
  return (
    <g transform={path`translate(${x - (LOCK_W * s) / 2} ${y - h / 2}) scale(${s})`}>
      <path d={LOCK_SHACKLE} className="o-paper-l" />
      <path d={LOCK_BODY} className="o-paper-l" />
      <path d={LOCK_PLAY} className={play} />
    </g>
  );
};

// ---------------------------------------------------------------------------
// Video cards
// ---------------------------------------------------------------------------
const THUMBS = [
  ["#e6dcff", "#8c57ff", "#4d0097", "#f6d58a"],
  ["#f1ecff", "#b7a2f2", "#6c2aca", "#fe7c7e"],
  ["#fbefd5", "#e3b04f", "#b98428", "#fffdf8"],
  ["#ffe4df", "#fe7c7e", "#d9555e", "#fffdf8"],
  ["#231a45", "#6c2aca", "#3a0a73", "#f6d58a"],
  ["#ece5ff", "#6c2aca", "#3a0a73", "#fe7c7e"],
];

// a tiny origami landscape: the "picture" inside every video card
export const Thumb = ({ x, y, w, h, art = 0, rx = 3 }) => {
  const [sky, l, d, sun] = THUMBS[art % THUMBS.length];
  const b = y + h;
  return (
    <g>
      <rect x={x} y={y} width={w} height={h} rx={rx} fill={sky} />
      <circle cx={x + w * 0.74} cy={y + h * 0.32} r={h * 0.12} fill={sun} />
      <path d={path`M${x} ${b}L${x + w * 0.3} ${y + h * 0.36}L${x + w * 0.36} ${b}Z`} fill={l} />
      <path d={path`M${x + w * 0.3} ${y + h * 0.36}L${x + w * 0.62} ${b}L${x + w * 0.36} ${b}Z`} fill={d} />
      <path d={path`M${x + w * 0.42} ${b}L${x + w * 0.7} ${y + h * 0.5}L${x + w * 0.74} ${b}Z`} fill={l} opacity="0.85" />
      <path d={path`M${x + w * 0.7} ${y + h * 0.5}L${x + w} ${b}L${x + w * 0.74} ${b}Z`} fill={d} opacity="0.85" />
    </g>
  );
};

// paper video card; (x, y) is its top-left corner
export const VideoCard = ({ x = 0, y = 0, w = 120, h = 84, art = 0, k, play = true, lines = true }) => {
  const th = lines ? h * 0.64 : h - 10;
  const cx = x + w / 2;
  const cy = y + 5 + th / 2;
  const pr = Math.min(w, th) * 0.16;
  return (
    <g data-k={k}>
      <rect className="fc-drop" x={x + 2} y={y + 3} width={w} height={h} rx={6} />
      <rect className="fc-card" x={x} y={y} width={w} height={h} rx={6} />
      <Thumb x={x + 5} y={y + 5} w={w - 10} h={th} art={art} />
      {play && (
        <>
          <circle cx={cx} cy={cy} r={pr} className="fc-play-disc" />
          <path
            d={path`M${cx - pr * 0.32} ${cy - pr * 0.45}L${cx + pr * 0.5} ${cy}L${cx - pr * 0.32} ${cy + pr * 0.45}Z`}
            className="fc-play"
          />
        </>
      )}
      {lines && (
        <>
          <rect x={x + 7} y={y + th + 11} width={w * 0.56} height={h * 0.07} rx={2} className="fc-line" />
          <rect x={x + 7} y={y + th + 11 + h * 0.12} width={w * 0.34} height={h * 0.06} rx={2} className="fc-line-soft" />
        </>
      )}
    </g>
  );
};

// ---------------------------------------------------------------------------
// The blintz fold: a square video card whose four corners fold into the
// centre, turning it into a sealed envelope. Flaps are reshaped per frame by
// foldFlap() (the corner travels across its hinge: front paper before the
// crease, violet back after).
// ---------------------------------------------------------------------------
export const CORNERS = [
  [-1, -1],
  [1, -1],
  [1, 1],
  [-1, 1],
];
const FLAP_BACK = ["fc-flap-0", "fc-flap-1", "fc-flap-2", "fc-flap-3"];

export const flapPath = (a, i, p) => {
  const [sx, sy] = CORNERS[i];
  const px = sx * a * (1 - p);
  const py = sy * a * (1 - p);
  return `M${r1(sx * a)} 0L0 ${r1(sy * a)}L${r1(px)} ${r1(py)}Z`;
};

export const flapClass = (i, p) => (p > 0.5 ? FLAP_BACK[i] : "fc-flap-front");

export const FoldCard = ({ x, y, a = 120, k }) => (
  <g data-k={k}>
    <g transform={path`translate(${x} ${y})`}>
      <rect data-k={`${k}-drop`} className="fc-drop" x={-a + 4} y={-a + 6} width={a * 2} height={a * 2} rx={4} />
      <path data-k={`${k}-drop2`} className="fc-drop" d={path`M${-a + 4} 8L4 ${-a + 8}L${a + 4} 8L4 ${a + 8}Z`} opacity="0" />
      <path className="fc-card" d={path`M${-a} 0L0 ${-a}L${a} 0L0 ${a}Z`} />
      <path className="fc-diamond-line" d={path`M${-a * 0.92} 0L0 ${-a * 0.92}L${a * 0.92} 0L0 ${a * 0.92}Z`} />
      <circle r={a * 0.26} className="fc-play-disc" />
      <path d={path`M${-a * 0.08} ${-a * 0.12}L${a * 0.13} 0L${-a * 0.08} ${a * 0.12}Z`} className="fc-play" />
      <text y={a * 0.5} className="fc-file-text fc-file-text-lg" textAnchor="middle">
        MP4
      </text>
      {CORNERS.map((_, i) => (
        <path key={i} data-k={`${k}-flap-${i}`} className="fc-flap-front" d={flapPath(a, i, 0)} />
      ))}
    </g>
  </g>
);

// the sealed envelope (what the FoldCard becomes), centred on (x, y)
export const Envelope = ({ x = 0, y = 0, a = 12, seal = true, k }) => (
  <g data-k={k}>
    <g transform={path`translate(${x} ${y})`}>
      <path className="fc-flap-3" d={path`M${-a} 0L0 ${-a}L${a} 0L0 ${a}Z`} />
      {CORNERS.map((_, i) => (
        <path key={i} className={FLAP_BACK[i]} d={flapPath(a, i, 1)} />
      ))}
      {seal && <circle r={a * 0.3} className="o-coral-m" />}
      {seal && <circle r={a * 0.14} className="o-paper-l" />}
    </g>
  </g>
);

// a wax seal with the lock pressed into it
export const Seal = ({ x = 0, y = 0, r = 40, k }) => (
  <g data-k={k}>
    <g transform={path`translate(${x} ${y})`}>
      {Array.from({ length: 14 }, (_, i) => {
        const a = (i / 14) * Math.PI * 2;
        return <circle key={i} cx={r1(Math.cos(a) * r * 0.9)} cy={r1(Math.sin(a) * r * 0.9)} r={r * 0.2} className="o-coral-m" />;
      })}
      <circle r={r * 0.92} className="o-coral-m" />
      <path d={path`M0 ${-r * 0.92}A${r * 0.92} ${r * 0.92} 0 0 1 0 ${r * 0.92}Z`} className="o-coral-d" />
      <circle r={r * 0.68} className="fc-seal-ring" />
      <LockGlyph h={r * 0.82} />
    </g>
  </g>
);

// ---------------------------------------------------------------------------
// Labels
// ---------------------------------------------------------------------------
// a small paper chip with an uppercase label; (x, y) is its centre
export const Chip = ({ x, y, label, k, tone = "paper", size = 13, dot }) => {
  const w = capsWidth(label, size) + 26 + (dot ? 14 : 0);
  const h = size + 16;
  return (
    <g data-k={k}>
      <g transform={path`translate(${x - w / 2} ${y - h / 2})`}>
        <rect className={`fc-chip fc-chip-${tone}`} width={w} height={h} rx={h / 2} />
        {dot && <circle cx={17} cy={h / 2} r={3.6} className={`fc-dot-${dot}`} />}
        <text x={w / 2 + (dot ? 7 : 0)} y={h / 2 + size * 0.36} className={`fc-chip-text fc-chip-text-${tone}`} style={{ fontSize: size }} textAnchor="middle">
          {label}
        </text>
      </g>
    </g>
  );
};

// a blueprint caption: dashed leader from an anchor to an uppercase label,
// like the "FIG. 01" captions on the site. align: which side the text sits.
export const Leader = ({ x1, y1, x2, y2, label: text, fig, k, align = "left", size = 15 }) => {
  const right = align === "right";
  const label = text.toUpperCase();
  const w = capsWidth(label, size);
  return (
    <g data-k={k}>
      <path className="fc-leader" d={path`M${x1} ${y1}L${x2} ${y2}`} pathLength="1" />
      <circle cx={x1} cy={y1} r={4} className="fc-leader-node" />
      <rect
        className="fc-leader-back"
        x={right ? x2 - w - 10 : x2 - 6}
        y={y2 + 3}
        width={w + 16}
        height={size + 13}
        rx={4}
      />
      <path className="fc-leader-rule" d={path`M${x2} ${y2}H${right ? x2 - w - 8 : x2 + w + 8}`} />
      {fig && (
        <text x={x2} y={y2 - 10} className="fc-fig" textAnchor={right ? "end" : "start"}>
          {fig}
        </text>
      )}
      <text x={x2} y={y2 + size + 6} className="fc-leader-text" style={{ fontSize: size }} textAnchor={right ? "end" : "start"}>
        {label}
      </text>
    </g>
  );
};

// step chips joined by arrows (a flow the scene walks through)
export const Stepper = ({ x, y, steps, k, gap = 54, size = 17 }) => {
  const widths = steps.map((s) => capsWidth(s, size) + 34);
  const total = widths.reduce((a, b) => a + b, 0) + gap * (steps.length - 1);
  let cx = x - total / 2;
  return (
    <g data-k={k}>
      {steps.map((label, i) => {
        const w = widths[i];
        const left = cx;
        cx += w + gap;
        const h = size + 20;
        return (
          <g key={label}>
            {i > 0 && (
              <path className="fc-step-arrow" d={path`M${left - gap + 10} ${y}H${left - 12}M${left - 18} ${y - 5}L${left - 12} ${y}L${left - 18} ${y + 5}`} />
            )}
            <g data-k={`${k}-${i}`}>
              <rect className="fc-step" x={left} y={y - h / 2} width={w} height={h} rx={h / 2} />
              <rect data-k={`${k}-${i}-on`} className="fc-step-on" x={left} y={y - h / 2} width={w} height={h} rx={h / 2} />
              <text x={left + w / 2} y={y + size * 0.36} className="fc-step-text" style={{ fontSize: size }} textAnchor="middle">
                {label}
              </text>
              <text data-k={`${k}-${i}-ont`} x={left + w / 2} y={y + size * 0.36} className="fc-step-text fc-step-text-on" style={{ fontSize: size }} textAnchor="middle">
                {label}
              </text>
            </g>
          </g>
        );
      })}
    </g>
  );
};

// ---------------------------------------------------------------------------
// People and pointers
// ---------------------------------------------------------------------------
// a tiny viewer holding a glowing screen; (x, y) is the middle of the feet
export const Viewer = ({ x, y, s = 1, flip = false, tone = 0, k }) => {
  const f = flip ? -1 : 1;
  const body = ["o-violet-m", "o-coral-m", "o-violet-l", "o-gold-m"][tone % 4];
  const bodyD = ["o-violet-d", "o-coral-d", "o-violet-m", "o-gold-d"][tone % 4];
  return (
    <g data-k={k}>
      <g transform={`translate(${r1(x)} ${r1(y)}) scale(${r1(s * f * 100) / 100} ${s})`}>
        <ellipse className="o-shadow" cx="0" cy="0" rx="9" ry="1.6" />
        <path className={body} d="M-6 0-4.4 -15H0V0Z" />
        <path className={bodyD} d="M0 0V-15H4.4L6 0Z" />
        <path className="o-steel-l" d="M-3.6 -15.4 0 -24.6V-15.4Z" />
        <path className="o-steel-m" d="M0 -24.6 3.6 -15.4H0Z" />
        <circle className="o-ink" cx="1.3" cy="-18.6" r="1.6" />
        <rect className="fc-screen" x="4.4" y="-15" width="8" height="5.6" rx="1" />
        <path className="fc-screen-play" d="M7.6 -13.6v2.8l2.2 -1.4z" />
      </g>
    </g>
  );
};

// the pointer that clicks through the product moments
export const Cursor = ({ k }) => (
  <g data-k={k}>
    <g data-k={`${k}-ring`} className="fc-click">
      <circle r="16" />
    </g>
    <path className="fc-cursor" d="M0 0V24L6.4 18 11 28.4 14.8 26.7 10.4 16.6H18.8Z" />
  </g>
);

// ---------------------------------------------------------------------------
// Architecture
// ---------------------------------------------------------------------------
// a gatehouse whose portcullis (data-k `${k}-bars`) can be raised; (x, base)
// is the middle of its foot
export const Gatehouse = ({ x, base, s = 1, k, flags = true }) => {
  const r = 17;
  const spring = -60 + r;
  const bars = [-0.62, -0.2, 0.2, 0.62];
  return (
    <g data-k={k}>
      <g transform={path`translate(${x} ${base}) scale(${s})`}>
        <Wall x1={-30} x2={30} base={0} h={92} />
        <Tower x={-64} base={0} w={36} h={118} roofH={46} windows={2} flag={flags} delay={0.3} />
        <Tower x={28} base={0} w={36} h={118} roofH={46} windows={2} flag={flags} delay={1.4} />
        <path className="o-door" d={path`M${-r} 0V${spring}A${r} ${r} 0 0 1 ${r} ${spring}V0Z`} />
        <g data-k={`${k}-glow`} className="fc-gate-glow" opacity="0">
          <path d={path`M${-r} 0V${spring}A${r} ${r} 0 0 1 ${r} ${spring}V0Z`} />
        </g>
        <g data-k={`${k}-bars`}>
          {bars.map((b) => {
            const bx = b * r;
            const topY = spring - Math.sqrt(r * r - (b * r) ** 2);
            return <path key={b} className="o-bar" d={path`M${bx - 1.2} ${topY}V-5L${bx} -2L${bx + 1.2} -5V${topY}Z`} />;
          })}
          <path className="o-bar" d={path`M${-r + 1} -36H${r - 1}V-34H${-r + 1}Z`} />
          <path className="o-bar" d={path`M${-r + 1} -18H${r - 1}V-16H${-r + 1}Z`} />
        </g>
      </g>
    </g>
  );
};

// an archive hall: the library wing, a long hall with tall arched windows
// that show the shelves inside. (x, base) is its left foot.
export const ArchiveHall = ({ x, base, w = 260, h = 92, k }) => {
  const winW = 26;
  const n = 4;
  const gap = (w - n * winW) / (n + 1);
  return (
    <g data-k={k}>
      <path className="o-wall-l" d={path`M${x} ${base}V${base - h}H${x + w * 0.62}V${base}Z`} />
      <path className="o-wall-d" d={path`M${x + w * 0.62} ${base}V${base - h}H${x + w}V${base}Z`} />
      <path className="o-roof-l" d={path`M${x - 8} ${base - h + 2}L${x + 30} ${base - h - 44}H${x + w * 0.62}V${base - h + 2}Z`} />
      <path className="o-roof-d" d={path`M${x + w * 0.62} ${base - h - 44}H${x + w - 30}L${x + w + 8} ${base - h + 2}H${x + w * 0.62}Z`} />
      <path className="o-ledge" d={path`M${x - 4} ${base - h}H${x + w + 4}V${base - h + 4}H${x - 4}Z`} />
      {Array.from({ length: n }, (_, i) => {
        const wx = x + gap + i * (winW + gap);
        const top = base - h + 18;
        const bottom = base - 14;
        return (
          <g key={i}>
            <path className="fc-glass" d={path`M${wx} ${bottom}V${top + winW / 2}A${winW / 2} ${winW / 2} 0 0 1 ${wx + winW} ${top + winW / 2}V${bottom}Z`} />
            {[0, 1, 2, 3].map((row) => (
              <g key={row}>
                <path className="fc-glass-shelf" d={path`M${wx + 2} ${top + 18 + row * 12}H${wx + winW - 2}`} />
                <rect className="fc-glass-book" x={wx + 4} y={top + 11 + row * 12} width={5} height={6} />
                <rect className="fc-glass-book2" x={wx + 11} y={top + 11 + row * 12} width={5} height={6} />
                <rect className="fc-glass-book" x={wx + 18} y={top + 11 + row * 12} width={4} height={6} />
              </g>
            ))}
          </g>
        );
      })}
    </g>
  );
};

// ---------------------------------------------------------------------------
// The video itself: a small origami film (sky, sun, peaks, a castle, a bird)
// used inside the player and on the pavilion screen. (x, y) top-left.
// ---------------------------------------------------------------------------
export const MiniFilm = ({ x, y, w, h, k }) => {
  const P = (px, py) => `${r1(x + px * w)} ${r1(y + py * h)}`;
  return (
    <g data-k={k}>
      <rect x={x} y={y} width={w} height={h} className="mf-sky" />
      <g data-k={k && `${k}-sun`}>
        <circle cx={x + w * 0.72} cy={y + h * 0.3} r={h * 0.11} className="mf-sun" />
      </g>
      <g data-k={k && `${k}-far`}>
        <path d={`M${P(-0.05, 0.86)}L${P(0.18, 0.42)}L${P(0.22, 0.86)}Z`} className="mf-far-l" />
        <path d={`M${P(0.18, 0.42)}L${P(0.46, 0.86)}L${P(0.22, 0.86)}Z`} className="mf-far-d" />
        <path d={`M${P(0.5, 0.86)}L${P(0.82, 0.36)}L${P(0.86, 0.86)}Z`} className="mf-far-l" />
        <path d={`M${P(0.82, 0.36)}L${P(1.08, 0.86)}L${P(0.86, 0.86)}Z`} className="mf-far-d" />
      </g>
      <g data-k={k && `${k}-castle`}>
        <path d={`M${P(0.4, 0.86)}V${y + h * 0.58}H${x + w * 0.47}V${y + h * 0.86}Z`} className="mf-wall-l" />
        <path d={`M${P(0.47, 0.86)}V${y + h * 0.58}H${x + w * 0.52}V${y + h * 0.86}Z`} className="mf-wall-d" />
        <path d={`M${P(0.395, 0.585)}L${P(0.457, 0.44)}V${y + h * 0.585}Z`} className="mf-roof-l" />
        <path d={`M${P(0.457, 0.44)}L${P(0.525, 0.585)}H${x + w * 0.457}Z`} className="mf-roof-d" />
        <path d={`M${P(0.3, 0.86)}V${y + h * 0.68}H${x + w * 0.62}V${y + h * 0.86}Z`} className="mf-wall-m" />
        <path d={`M${P(0.44, 0.86)}V${y + h * 0.77}A${w * 0.017} ${w * 0.017} 0 0 1 ${x + w * 0.474} ${y + h * 0.77}V${y + h * 0.86}Z`} className="mf-door" />
      </g>
      <path d={`M${P(0, 0.84)}L${P(0.35, 0.8)}L${P(0.7, 0.83)}L${P(1, 0.79)}V${y + h}H${x}Z`} className="mf-ground-l" />
      <path d={`M${P(0.35, 0.8)}L${P(0.7, 0.83)}L${P(1, 0.79)}V${y + h}H${x + w * 0.55}Z`} className="mf-ground-d" />
      <g data-k={k && `${k}-cloud`}>
        <path d={`M${P(0.08, 0.26)}L${P(0.13, 0.2)}L${P(0.2, 0.2)}L${P(0.24, 0.14)}L${P(0.3, 0.17)}L${P(0.36, 0.26)}Z`} className="mf-cloud" />
      </g>
      <g data-k={k && `${k}-bird`}>
        <path d={`M${P(0.6, 0.2)}L${P(0.62, 0.215)}L${P(0.64, 0.19)}L${P(0.62, 0.225)}Z`} className="mf-bird" />
      </g>
    </g>
  );
};

// an elegant player around a MiniFilm. Themeable parts: -accent (fills),
// -frame (outline). (x, y) top-left of the whole player.
export const Player = ({ x, y, w, h, k }) => {
  const bar = 54;
  const vh = h - bar;
  return (
    <g data-k={k}>
      <rect className="fc-drop fc-drop-soft" x={x + 6} y={y + 10} width={w} height={h} rx={14} />
      <rect data-k={`${k}-frame`} className="pl-frame" x={x} y={y} width={w} height={h} rx={14} />
      <clipPath id={`${k}-clip`}>
        <rect x={x + 8} y={y + 8} width={w - 16} height={vh - 8} rx={8} />
      </clipPath>
      <g clipPath={`url(#${k}-clip)`}>
        <MiniFilm x={x + 8} y={y + 8} w={w - 16} h={vh - 8} k={`${k}-film`} />
        <g data-k={`${k}-wm`} opacity="0">
          {Array.from({ length: 5 }, (_, row) =>
            Array.from({ length: 4 }, (_, col) => (
              <text
                key={`${row}-${col}`}
                x={x + 40 + col * (w / 3.6) + (row % 2) * 80}
                y={y + 70 + row * (vh / 4.6)}
                className="pl-wm"
                transform={`rotate(-18 ${x + 40 + col * (w / 3.6) + (row % 2) * 80} ${y + 70 + row * (vh / 4.6)})`}
              >
                viewer 7F3A · session
              </text>
            )),
          )}
        </g>
      </g>
      {/* brand slot, top right of the picture */}
      <g data-k={`${k}-brand`}>
        <rect x={x + w - 128} y={y + 22} width={104} height={30} rx={15} className="pl-brand" />
        <LockMark x={x + w - 106} y={y + 37} h={18} />
        <text x={x + w - 92} y={y + 42} className="pl-brand-text">
          BMDRM
        </text>
      </g>
      <g data-k={`${k}-brand2`} opacity="0">
        <rect x={x + w - 148} y={y + 22} width={124} height={30} rx={15} className="pl-brand" />
        <rect data-k={`${k}-brand2-dot`} x={x + w - 136} y={y + 30} width={14} height={14} rx={4} className="pl-accent" />
        <text x={x + w - 114} y={y + 42} className="pl-brand-text">
          YOUR LOGO
        </text>
      </g>
      {/* controls */}
      <g transform={path`translate(${x} ${y + vh})`}>
        <circle data-k={`${k}-btn`} cx={34} cy={bar / 2} r={15} className="pl-accent" />
        <path d={path`M29 ${bar / 2 - 7}V${bar / 2 + 7}L41 ${bar / 2}Z`} className="pl-btn-icon" />
        <rect x={64} y={bar / 2 - 3} width={w - 220} height={6} rx={3} className="pl-track" />
        <rect data-k={`${k}-progress`} x={64} y={bar / 2 - 3} width={w - 220} height={6} rx={3} className="pl-accent" />
        <circle data-k={`${k}-knob`} cx={64} cy={bar / 2} r={7} className="pl-knob" />
        <path className="pl-icon" d={path`M${w - 132} ${bar / 2 - 5}h5l6 -5v20l-6 -5h-5Z`} />
        <path className="pl-icon-line" d={path`M${w - 112} ${bar / 2 - 5}q4 5 0 10`} />
        <circle className="pl-icon-line" cx={w - 84} cy={bar / 2} r={7} />
        <circle className="pl-icon" cx={w - 84} cy={bar / 2} r={2.5} />
        <path className="pl-icon-line" d={path`M${w - 56} ${bar / 2 - 4}v-4h4M${w - 44} ${bar / 2 - 8}h4v4M${w - 40} ${bar / 2 + 4}v4h-4M${w - 52} ${bar / 2 + 8}h-4v-4`} />
      </g>
    </g>
  );
};

// ---------------------------------------------------------------------------
// Protection
// ---------------------------------------------------------------------------
const SHIELD = { tl: [-1, -0.9], tc: [0, -0.95], tr: [1, -0.9], rm: [0.98, 0.16], bot: [0, 1.05], lm: [-0.98, 0.16], c: [0, 0.02] };
export const SHIELD_FACETS = [
  ["tl", "tc", "c", "fc-sh-0"],
  ["lm", "tl", "c", "fc-sh-1"],
  ["tc", "tr", "c", "fc-sh-2"],
  ["bot", "lm", "c", "fc-sh-3"],
  ["tr", "rm", "c", "fc-sh-4"],
  ["rm", "bot", "c", "fc-sh-5"],
];
export const shieldOutline = (w, h) => {
  const p = (key) => `${r1(SHIELD[key][0] * w)} ${r1(SHIELD[key][1] * h)}`;
  return `M${p("tl")}Q${r1(0)} ${r1(-1.0 * h)} ${p("tr")}L${p("rm")}Q${r1(0.9 * w)} ${r1(0.7 * h)} ${p("bot")}Q${r1(-0.9 * w)} ${r1(0.7 * h)} ${p("lm")}Z`;
};

// the great shield, built from six folded facets; (x, y) its centre,
// w and h half its width and height
export const GreatShield = ({ x, y, w = 220, h = 250, k }) => {
  const p = (key) => `${r1(SHIELD[key][0] * w)} ${r1(SHIELD[key][1] * h)}`;
  return (
    <g data-k={k}>
      <g transform={path`translate(${x} ${y})`}>
        <g data-k={`${k}-glow`} opacity="0">
          <path className="fc-shield-glow" d={shieldOutline(w * 1.22, h * 1.2)} />
        </g>
        {SHIELD_FACETS.map(([a, b, c, cls], i) => (
          <g key={i} data-k={`${k}-f${i}`}>
            <path className={cls} d={`M${p(a)}L${p(b)}L${p(c)}Z`} />
          </g>
        ))}
        <path data-k={`${k}-rim`} className="fc-shield-rim" d={shieldOutline(w, h)} pathLength="1" />
        <path data-k={`${k}-rim2`} className="fc-shield-rim2" d={shieldOutline(w * 0.9, h * 0.9)} pathLength="1" />
      </g>
    </g>
  );
};

// a translucent protective pane, shaped like a heater shield
export const ShieldPane = ({ x, y, w = 80, h = 92, k }) => (
  <g data-k={k}>
    <g transform={path`translate(${x} ${y})`}>
      <path className="fc-pane-glow" d={shieldOutline(w * 1.25, h * 1.22)} />
      <path className="fc-pane" d={shieldOutline(w, h)} />
      <path className="fc-pane-hi" d={path`M${-w} ${-0.9 * h}Q0 ${-h} ${w} ${-0.9 * h}L0 ${0.02 * h}Z`} />
      <path className="fc-pane-rim" d={shieldOutline(w, h)} />
      <LockMark y={-h * 0.08} h={h * 0.7} />
    </g>
  </g>
);
