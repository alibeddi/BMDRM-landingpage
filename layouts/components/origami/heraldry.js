// BMDRM heraldry: the lock as a charge, pennants and hanging banners.
// Only the lock, chevrons and diamonds are used as devices (no crosses).
import { path } from "./path";

export const LOCK_SHACKLE =
  "M43.42 71.39H41.75C26.68 71.39 14.43 59.13 14.43 44.07V27.33C14.42 12.26 26.68 0 41.75 0H43.42C58.48 0 70.74 12.26 70.74 27.32V44.06C70.74 59.13 58.48 71.38 43.42 71.38V71.39ZM41.75 8.9C31.59 8.9 23.32 17.17 23.32 27.33V44.07C23.32 54.23 31.59 62.5 41.75 62.5H43.42C53.58 62.5 61.85 54.23 61.85 44.07V27.33C61.85 17.17 53.58 8.9 43.42 8.9H41.75Z";
export const LOCK_BODY =
  "M42.53 106.23C29.62 106.14 16.73 94.41 8.41001 83.95C2.93001 76.86 -1.31999 68.43 0.38001 59.45C2.94001 46.33 16.46 32.25 28.8 25.02C40.78 17.86 52.62 21.09 63.03 29.4C78.22 41.58 92.67 59.55 80.8 78.13C73.01 90.65 57.71 105.94 42.72 106.24H42.53V106.23Z";
export const LOCK_PLAY =
  "M32.75 73.72V53.47C32.75 50.42 36.1 48.55 38.69 50.15L55.1 60.27C57.57 61.79 57.57 65.38 55.1 66.9L38.69 77.02C36.09 78.62 32.75 76.75 32.75 73.7V73.72Z";
export const LOCK_RING =
  "M61.88 86.13C61.16 86.13 60.44 85.85 59.89 85.3C58.79 84.2 58.79 82.42 59.89 81.33C69.41 71.8 69.41 56.3 59.89 46.78C55.28 42.17 49.14 39.63 42.62 39.63C36.1 39.63 29.96 42.17 25.34 46.78C15.82 56.31 15.82 71.81 25.34 81.33C26.44 82.43 26.44 84.21 25.34 85.3C24.25 86.4 22.46 86.4 21.37 85.3C15.69 79.63 12.57 72.08 12.57 64.05C12.57 56.02 15.7 48.48 21.37 42.8C27.04 37.13 34.59 34 42.62 34C50.65 34 58.19 37.13 63.86 42.8C75.58 54.51 75.58 73.58 63.86 85.3C63.31 85.85 62.59 86.13 61.87 86.13H61.88Z";
const LOCK_WIDTH = 85;
const LOCK_HEIGHT = 106;

// the BMDRM lock as a heraldic charge; `flip` un-mirrors it on mirrored figures
export const Emblem = ({ x, y, scale, flip }) => (
  <g
    transform={
      flip
        ? path`translate(${x + LOCK_WIDTH * scale} ${y}) scale(${-scale} ${scale})`
        : path`translate(${x} ${y}) scale(${scale})`
    }
  >
    <path className="o-paper-l" d={LOCK_SHACKLE} />
    <path className="o-paper-m" d={LOCK_BODY} />
    <path className="o-violet-d" d={LOCK_PLAY} />
  </g>
);

// swallowtail pennant flying to the right of a pole whose foot is (x, y);
// the cloth waves from the pole edge
export const Flag = ({ x, y, h = 30, w = 24, delay = 0 }) => {
  const top = y - h;
  return (
    <g>
      <path className="o-pole" d={path`M${x} ${y}V${top - 2}`} />
      <g className="o-flag" style={{ "--delay": `${delay}s` }}>
        <path
          className="o-flag-l"
          d={path`M${x} ${top}L${x + w} ${top + 2}L${x + w - 6} ${top + 7}L${x} ${top + 7}Z`}
        />
        <path
          className="o-flag-d"
          d={path`M${x} ${top + 7}L${x + w - 6} ${top + 7}L${x + w} ${top + 12}L${x} ${top + 14}Z`}
        />
      </g>
    </g>
  );
};

// hanging banner: a gold rod, a folded cloth with the lock and a chevron,
// cut into a point at the bottom. (x, y) is the rod centre.
export const HangingBanner = ({ x, y, w = 60, h = 150, delay = 0 }) => {
  const l = x - w / 2;
  const r = x + w / 2;
  const tip = y + h;
  const hem = tip - w * 0.36;
  const scale = (w * 0.56) / LOCK_WIDTH;
  return (
    <g>
      <path
        className="o-gold-d"
        d={path`M${l - 8} ${y - 2}H${r + 8}V${y + 4}H${l - 8}Z`}
      />
      <circle className="o-gold-m" cx={l - 8} cy={y + 1} r="4" />
      <circle className="o-gold-m" cx={r + 8} cy={y + 1} r="4" />
      <g className="o-hang" style={{ "--delay": `${delay}s` }}>
        <path
          className="o-violet-m"
          d={path`M${l} ${y + 4}H${x}V${tip}L${l} ${hem}Z`}
        />
        <path
          className="o-violet-d"
          d={path`M${x} ${y + 4}H${r}V${hem}L${x} ${tip}Z`}
        />
        <path
          className="o-gold-l"
          d={path`M${l} ${hem - 22}L${x} ${hem - 38}V${hem - 28}L${l} ${hem - 12}Z`}
        />
        <path
          className="o-gold-d"
          d={path`M${x} ${hem - 38}L${r} ${hem - 22}V${hem - 12}L${x} ${hem - 28}Z`}
        />
        <Emblem x={x - (LOCK_WIDTH * scale) / 2} y={y + 18} scale={scale} />
        <path className="o-crease" d={path`M${x} ${y + 4}V${tip}`} />
      </g>
    </g>
  );
};

// The BMDRM lock as a gate: a ring of folded arch stones lit from the top
// left, a violet keystone, a dial that turns (dialClassName) and the lock in
// full colour at the centre (lockClassName). (x, y) is the centre, r the
// radius of the paper disc behind the lock.
export const LockGate = ({
  x,
  y,
  r = 55,
  glowClassName,
  dialClassName,
  lockClassName,
}) => {
  const k = r / 55;
  const scale = 0.56 * k;
  const point = (radius, a) =>
    `${(x + radius * Math.cos(a)).toFixed(1)} ${(y + radius * Math.sin(a)).toFixed(1)}`;
  const stone = (a0, a1, r1, r2) =>
    `M${point(r2, a0)}A${r2} ${r2} 0 0 1 ${point(r2, a1)}L${point(r1, a1)}A${r1} ${r1} 0 0 0 ${point(r1, a0)}Z`;
  const fold = 0.707 * r;
  return (
    <g>
      {glowClassName && (
        <circle
          cx={x}
          cy={y}
          r={(r * 1.78).toFixed(1)}
          className={glowClassName}
        />
      )}
      <circle
        cx={x + 3 * k}
        cy={y + 4 * k}
        r={(r + 25 * k).toFixed(1)}
        className="o-gate-shadow"
      />
      {Array.from({ length: 12 }, (_, i) => {
        const a0 = ((i * 30 - 89) * Math.PI) / 180;
        const a1 = (((i + 1) * 30 - 91) * Math.PI) / 180;
        const mid = (a0 + a1) / 2;
        const key = i === 0 || i === 11;
        const lit = -Math.cos(mid) - Math.sin(mid) > -0.3;
        const tone = key ? "o-keystone" : lit ? "o-stone-lit" : "o-stone-shade";
        return (
          <g key={i}>
            <path className={tone} d={stone(a0, a1, r + 15 * k, r + 24 * k)} />
            <path
              className={`${tone}-in`}
              d={stone(a0, a1, r + 7 * k, r + 15 * k)}
            />
          </g>
        );
      })}
      <g className={dialClassName}>
        <circle
          cx={x}
          cy={y}
          r={(r + 3.5 * k).toFixed(1)}
          className="o-dial"
          style={{ strokeWidth: (5 * k).toFixed(1) }}
        />
        {Array.from({ length: 8 }, (_, i) => {
          const a = ((i * 45 - 90) * Math.PI) / 180;
          return (
            <circle
              key={i}
              cx={(x + (r + 3.5 * k) * Math.cos(a)).toFixed(1)}
              cy={(y + (r + 3.5 * k) * Math.sin(a)).toFixed(1)}
              r={(1.8 * k).toFixed(1)}
              className="o-dial-notch"
            />
          );
        })}
      </g>
      <circle cx={x} cy={y} r={r} className="o-gate-disc" />
      <path
        className="o-gate-fold"
        d={`M${(x + fold).toFixed(1)} ${(y - fold).toFixed(1)}A${r} ${r} 0 0 1 ${(x - fold).toFixed(1)} ${(y + fold).toFixed(1)}Z`}
      />
      <g className={lockClassName}>
        <g
          transform={`translate(${(x - (LOCK_WIDTH / 2) * scale).toFixed(1)} ${(y - (LOCK_HEIGHT / 2) * scale).toFixed(1)}) scale(${scale.toFixed(3)})`}
        >
          <path d={LOCK_SHACKLE} fill="url(#o-lock-shackle)" />
          <path d={LOCK_BODY} fill="url(#o-lock-body)" />
          <path d={LOCK_RING} fill="#fff" />
          <path d={LOCK_PLAY} fill="#fff" />
        </g>
      </g>
    </g>
  );
};
