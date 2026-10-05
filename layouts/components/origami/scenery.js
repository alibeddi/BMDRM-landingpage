// Paper landscape: folded mountains and hills, trees, clouds, birds and
// cottages. Colours come from the scene's tone (see styles/origami.scss), so
// the same pieces work by day, at night and in the hazy distance.
import { path } from "./path";

const pts = (points) => points.map(([x, y]) => `${x} ${y}`).join(" ");

// a folded mountain: lit left face, shaded right face, optional paper cap
const Peak = ({ x, base, w, h, cap = false, level = "far" }) => {
  const top = base - h;
  const fold = x + w * 0.08;
  const capH = h * 0.26;
  const capL = x - (w / 2) * 0.26;
  const capR = x + (w / 2) * 0.26;
  return (
    <g>
      <path
        className={`o-${level}-l`}
        d={path`M${x - w / 2} ${base}L${x} ${top}L${fold} ${base}Z`}
      />
      <path
        className={`o-${level}-d`}
        d={path`M${x} ${top}L${x + w / 2} ${base}L${fold} ${base}Z`}
      />
      {cap && (
        <>
          <path
            className="o-snow-l"
            d={path`M${capL} ${top + capH}L${x} ${top}L${x + w * 0.02} ${top + capH * 1.2}L${x - w * 0.05} ${top + capH * 0.8}Z`}
          />
          <path
            className="o-snow-d"
            d={path`M${x} ${top}L${capR} ${top + capH}L${x + w * 0.06} ${top + capH * 0.85}L${x + w * 0.02} ${top + capH * 1.2}Z`}
          />
        </>
      )}
    </g>
  );
};

// a range of peaks: [x, width, height, cap?]
export const Range = ({ peaks, base, level = "far" }) => (
  <g>
    {peaks.map(([x, w, h, cap]) => (
      <Peak key={x} x={x} base={base} w={w} h={h} cap={cap} level={level} />
    ))}
  </g>
);

// a faceted hill from its ridge line down to `base`: creases run from each
// ridge point down and to the right, and facets falling away to the right
// are folded into shadow
export const Ridge = ({ points, base, level = "back", slant = 0.5 }) => {
  const [first] = points;
  const last = points[points.length - 1];
  const foot = ([x, y]) => [Math.min(x + (base - y) * slant, last[0]), base];
  const shadows = points
    .slice(1)
    .map((p, i) => [points[i], p])
    .filter(([a, b]) => b[1] > a[1])
    .map(([a, b]) => `M${pts([a, b, foot(b), foot(a)])}Z`)
    .join("");
  return (
    <g>
      <path
        className={`o-${level}-l`}
        d={path`M${first[0]} ${base}L${pts(points)}L${last[0]} ${base}Z`}
      />
      <path className={`o-${level}-d`} d={shadows} />
    </g>
  );
};

// folded fir: stacked tiers, each creased down the middle; sways gently
export const Pine = ({ x, base, h = 60, delay = 0 }) => {
  const w = h * 0.52;
  const trunk = h * 0.14;
  const tiers = [
    [0, 1],
    [0.3, 0.78],
    [0.56, 0.54],
  ];
  return (
    <g className="o-tree" style={{ "--delay": `${delay}s` }}>
      <path
        className="o-trunk"
        d={path`M${x - 2} ${base}V${base - trunk - 2}H${x + 2}V${base}Z`}
      />
      {tiers.map(([lift, size]) => {
        const b = base - trunk - lift * (h - trunk);
        const t = b - (h - trunk) * 0.52 * size - 6;
        const half = (w / 2) * size;
        return (
          <g key={lift}>
            <path
              className="o-leaf-l"
              d={path`M${x - half} ${b}L${x} ${t}L${x} ${b + 2}Z`}
            />
            <path
              className="o-leaf-d"
              d={path`M${x} ${t}L${x + half} ${b}L${x} ${b + 2}Z`}
            />
          </g>
        );
      })}
    </g>
  );
};

// round-topped tree folded from an octagon
export const Oak = ({ x, base, h = 50, delay = 0 }) => {
  const r = h * 0.36;
  const cy = base - h + r;
  const k = r * 0.42;
  return (
    <g className="o-tree" style={{ "--delay": `${delay}s` }}>
      <path
        className="o-trunk"
        d={path`M${x - 2.5} ${base}V${cy}H${x + 2.5}V${base}Z`}
      />
      <path
        className="o-leaf-l"
        d={path`M${x} ${cy - r}L${x - k} ${cy - r}L${x - r} ${cy - k}L${x - r} ${cy + k}L${x - k} ${cy + r}L${x} ${cy + r}Z`}
      />
      <path
        className="o-leaf-d"
        d={path`M${x} ${cy - r}L${x + k} ${cy - r}L${x + r} ${cy - k}L${x + r} ${cy + k}L${x + k} ${cy + r}L${x} ${cy + r}Z`}
      />
      <path
        className="o-leaf-hi"
        d={path`M${x} ${cy - r}L${x - k} ${cy - r}L${x - r} ${cy - k}L${x} ${cy - k * 0.2}Z`}
      />
    </g>
  );
};

// folded paper cloud: a lit top and a shaded underside; drifts sideways
export const Cloud = ({ x, y, w = 120, drift = 24, dur = 30, delay = 0 }) => {
  const s = w / 120;
  const p = (px, py) => path`${x + px * s} ${y + py * s}`;
  return (
    <g
      className="o-cloud"
      style={{
        "--drift": `${drift}px`,
        "--dur": `${dur}s`,
        "--delay": `${delay}s`,
      }}
    >
      <path
        className="o-cloud-l"
        d={path`M${p(0, 30)}L${p(14, 18)}L${p(34, 18)}L${p(46, 4)}L${p(68, 0)}L${p(84, 12)}L${p(100, 12)}L${p(120, 30)}Z`}
      />
      <path
        className="o-cloud-d"
        d={path`M${p(0, 30)}L${p(120, 30)}L${p(108, 38)}L${p(12, 38)}Z`}
      />
      <path
        className="o-cloud-crease"
        d={path`M${p(46, 4)}L${p(56, 30)}M${p(84, 12)}L${p(88, 30)}`}
      />
    </g>
  );
};

// small paper birds: two folded wings that flap, gliding along
export const Birds = ({ birds }) => (
  <g>
    {birds.map(([x, y, s = 1, delay = 0]) => (
      <g
        key={`${x}-${y}`}
        className="o-bird"
        style={{ "--delay": `${delay}s` }}
      >
        <g transform={`translate(${x} ${y}) scale(${s})`}>
          <g className="o-wing">
            <path className="o-bird-l" d="M0 0 -11 -5 -3 -0.5Z" />
            <path className="o-bird-d" d="M0 0 10 -8 3 -0.5Z" />
          </g>
          <path className="o-bird-body" d="M-5 0.5 6 -1 3 1.8Z" />
        </g>
      </g>
    ))}
  </g>
);

// cottage with a folded roof; `lit` windows glow at night
export const House = ({ x, base, w = 34, h = 24, lit = false }) => {
  const top = base - h;
  const ridge = top - w * 0.5;
  const mid = x + w / 2;
  return (
    <g>
      <path
        className="o-wall-l"
        d={path`M${x} ${base}V${top}H${mid}V${base}Z`}
      />
      <path
        className="o-wall-d"
        d={path`M${mid} ${base}V${top}H${x + w}V${base}Z`}
      />
      <path
        className="o-roof-l"
        d={path`M${x - 3} ${top + 1}L${mid} ${ridge}V${top + 1}Z`}
      />
      <path
        className="o-roof-d"
        d={path`M${mid} ${ridge}L${x + w + 3} ${top + 1}H${mid}Z`}
      />
      <path
        className={lit ? "o-win o-win-lit" : "o-win"}
        d={path`M${x + w * 0.2} ${top + h * 0.3}h${w * 0.18}v${h * 0.3}h${-w * 0.18}Z`}
      />
      <path
        className="o-door"
        d={path`M${x + w * 0.58} ${base}v${-h * 0.55}h${w * 0.2}v${h * 0.55}Z`}
      />
    </g>
  );
};

// arched stone bridge over a stream
export const Bridge = ({ x, base, w = 90, h = 22 }) => {
  const r = w * 0.3;
  const cx = x + w / 2;
  return (
    <g>
      <path
        className="o-wall-l"
        d={path`M${x} ${base}V${base - h}H${x + w}V${base}H${cx + r}A${r} ${r * 0.8} 0 0 0 ${cx - r} ${base}Z`}
      />
      <path
        className="o-wall-d"
        d={path`M${x} ${base - h}H${x + w}V${base - h + 4}H${x}Z`}
      />
      {Array.from({ length: Math.floor(w / 12) }, (_, i) => (
        <path
          key={i}
          className="o-wall-d"
          d={path`M${x + 3 + i * 12} ${base - h}v-5h6v5Z`}
        />
      ))}
    </g>
  );
};

// a folded paper moon, or a gold sun
export const Moon = ({ x, y, r = 26, sun = false }) => (
  <g>
    <circle
      className={sun ? "o-sun-glow" : "o-moon-glow"}
      cx={x}
      cy={y}
      r={r * 1.9}
    />
    <path
      className={sun ? "o-gold-l" : "o-moon-l"}
      d={path`M${x} ${y - r}A${r} ${r} 0 0 0 ${x} ${y + r}Z`}
    />
    <path
      className={sun ? "o-gold-m" : "o-moon-d"}
      d={path`M${x} ${y - r}A${r} ${r} 0 0 1 ${x} ${y + r}Z`}
    />
  </g>
);

// twinkling stars: [x, y, size]
export const Stars = ({ stars }) => (
  <g>
    {stars.map(([x, y, s = 2], i) => (
      <path
        key={`${x}-${y}`}
        className="o-star"
        style={{ "--delay": `${(i * 0.7) % 4}s` }}
        d={path`M${x} ${y - s}L${x + s * 0.6} ${y}L${x} ${y + s}L${x - s * 0.6} ${y}Z`}
      />
    ))}
  </g>
);

// a little paper mouse facing right; (x, y) is the middle of its feet
export const Mouse = ({ x = 0, y = 0, scale = 1 }) => (
  <g transform={path`translate(${x} ${y}) scale(${scale})`}>
    <ellipse className="o-shadow" cx="1" cy="0.6" rx="17" ry="2" />
    <path className="o-mouse-tail" d="M-14 -2C-22 -3-25 -11-32 -9" />
    <path className="o-steel-l" d="M-15 0-7 -11 6 -12 2 0Z" />
    <path className="o-steel-m" d="M2 0 6 -12 14 -6 17 0Z" />
    <path className="o-steel-l" d="M12 -8 25 -2 15 0Z" />
    <path className="o-steel-m" d="M8 -11 11 -18 15 -10Z" />
    <path className="o-coral-l" d="M9.6 -11 11 -15.4 13.4 -10.6Z" />
    <circle className="o-ink" cx="16.5" cy="-5.5" r="1.1" />
    <circle className="o-coral-m" cx="25" cy="-2" r="1.5" />
  </g>
);
