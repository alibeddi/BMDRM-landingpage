// Paper castles built from towers, curtain walls and gates. Everything is
// seen straight on and lit from the left, like the figures. Colours follow
// the scene tone; lit windows glow at night.
import { path } from "./path";
import { Flag } from "./heraldry";

const FOLD = 0.58;

// arched window slit
const Slit = ({ cx, y, w, lit, delay }) => {
  const h = w * 2.4;
  return (
    <path
      className={lit ? "o-win o-win-lit" : "o-win"}
      style={lit ? { "--delay": `${delay}s` } : undefined}
      d={path`M${cx - w / 2} ${y + h}V${y + w / 2}A${w / 2} ${w / 2} 0 0 1 ${cx + w / 2} ${y + w / 2}V${y + h}Z`}
    />
  );
};

// merlons along a parapet, lit or shaded by which side of the fold they sit
const Merlons = ({ x, w, top, h = 7, fold = x + w * FOLD }) => {
  const count = Math.max(2, Math.round(w / 13));
  const mw = w / (count * 2 - 1);
  return Array.from({ length: count }, (_, i) => {
    const mx = x + i * mw * 2;
    return (
      <path
        key={i}
        className={mx + mw / 2 < fold ? "o-wall-l" : "o-wall-d"}
        d={path`M${mx} ${top}V${top - h}H${mx + mw}V${top}Z`}
      />
    );
  });
};

// stacked data slits with blinking lights: the tower as a server rack
const DataSlits = ({ x, w, top, rows, delay }) =>
  Array.from({ length: rows }, (_, i) => {
    const y = top + 16 + i * 9;
    return (
      <g key={i}>
        <path
          className="o-data"
          d={path`M${x + w * 0.16} ${y}h${w * 0.46}v3.6h${-w * 0.46}Z`}
        />
        <circle
          className="o-led"
          style={{ "--delay": `${delay + i * 0.8}s` }}
          cx={x + w * 0.74}
          cy={y + 1.8}
          r="1.6"
        />
      </g>
    );
  });

// tower standing on `base`: cone roof (with a flag) or a crenellated top;
// `data` swaps the window slits for rows of server lights
export const Tower = ({
  x,
  base,
  w,
  h,
  roof = "cone",
  roofH = w * 0.95,
  windows = 1,
  data = 0,
  flag = false,
  lit = false,
  delay = 0,
}) => {
  const top = base - h;
  const fold = x + w * FOLD;
  const cx = x + w / 2;
  const slit = Math.min(7, Math.max(3, w * 0.13));
  return (
    <g>
      <path
        className="o-wall-l"
        d={path`M${x} ${base}V${top}H${fold}V${base}Z`}
      />
      <path
        className="o-wall-d"
        d={path`M${fold} ${base}V${top}H${x + w}V${base}Z`}
      />
      {roof === "cone" ? (
        <>
          <path
            className="o-roof-l"
            d={path`M${x - 3} ${top + 2}L${cx} ${top - roofH}V${top + 2}Z`}
          />
          <path
            className="o-roof-d"
            d={path`M${cx} ${top - roofH}L${x + w + 3} ${top + 2}H${cx}Z`}
          />
          {flag && (
            <Flag
              x={cx}
              y={top - roofH + 1}
              h={Math.max(16, w * 0.5)}
              w={Math.max(12, w * 0.42)}
              delay={delay}
            />
          )}
        </>
      ) : (
        <>
          <path
            className="o-wall-l"
            d={path`M${x - 2} ${top + 9}V${top}H${fold}V${top + 9}Z`}
          />
          <path
            className="o-wall-d"
            d={path`M${fold} ${top + 9}V${top}H${x + w + 2}V${top + 9}Z`}
          />
          <path
            className="o-ledge"
            d={path`M${x - 2} ${top + 9}H${x + w + 2}V${top + 11}H${x - 2}Z`}
          />
          <Merlons x={x - 2} w={w + 4} top={top} fold={fold} />
          {flag && (
            <Flag
              x={cx}
              y={top - 6}
              h={Math.max(18, w * 0.5)}
              w={Math.max(12, w * 0.42)}
              delay={delay}
            />
          )}
        </>
      )}
      <DataSlits x={x} w={w} top={top} rows={data} delay={delay} />
      {Array.from({ length: windows }, (_, i) => (
        <Slit
          key={i}
          cx={x + w * 0.4}
          y={top + 14 + i * slit * 4.2}
          w={slit}
          lit={lit}
          delay={delay + i * 1.3}
        />
      ))}
    </g>
  );
};

// curtain wall with a walkway and merlons
export const Wall = ({ x1, x2, base, h }) => {
  const top = base - h;
  return (
    <g>
      <path
        className="o-wall-m"
        d={path`M${x1} ${base}V${top}H${x2}V${base}Z`}
      />
      <path
        className="o-wall-d"
        d={path`M${x1} ${top}H${x2}V${top + 4}H${x1}Z`}
      />
      <Merlons x={x1} w={x2 - x1} top={top} h={6} fold={x2 + 1} />
    </g>
  );
};

// arched gate with a portcullis of pointed bars (it lifts now and then)
const Gate = ({ cx, base, w, h, open = false }) => {
  const r = w / 2;
  const spring = base - h + r;
  const bars = [-0.62, -0.2, 0.2, 0.62];
  return (
    <g>
      <path
        className="o-door"
        d={path`M${cx - r} ${base}V${spring}A${r} ${r} 0 0 1 ${cx + r} ${spring}V${base}Z`}
      />
      <g className={open ? "o-portcullis" : undefined}>
        {bars.map((k) => {
          const bx = cx + k * r;
          const topY = spring - Math.sqrt(r * r - (k * r) ** 2);
          return (
            <path
              key={k}
              className="o-bar"
              d={path`M${bx - 1.2} ${topY}V${base - 5}L${bx} ${base - 2}L${bx + 1.2} ${base - 5}V${topY}Z`}
            />
          );
        })}
      </g>
    </g>
  );
};

// small figures pacing the wall walk, in silhouette
export const Sentries = ({ sentries }) => (
  <g>
    {sentries.map(([x, y, range = 18, delay = 0]) => (
      <g
        key={x}
        className="o-pace"
        style={{ "--range": `${range}px`, "--delay": `${delay}s` }}
      >
        <path
          className="o-sentry"
          d={path`M${x - 2.5} ${y}V${y - 7}L${x - 3} ${y - 9}H${x + 3}L${x + 2.5} ${y - 7}V${y}Z`}
        />
        <circle className="o-sentry" cx={x} cy={y - 11} r="2" />
        <path className="o-sentry-spear" d={path`M${x + 4} ${y}V${y - 16}`} />
      </g>
    ))}
  </g>
);

// composed castles, drawn around (0, 0) = the middle of the base line
const FORTRESS = ({ lit, gate }) => (
  <>
    <Tower
      x={-34}
      base={0}
      w={68}
      h={176}
      roofH={72}
      windows={3}
      flag
      lit={lit}
      delay={0.4}
    />
    <Wall x1={-158} x2={158} base={0} h={84} />
    <Tower x={-96} base={0} w={28} h={112} roofH={36} lit={lit} delay={2.2} />
    <Tower x={68} base={0} w={28} h={112} roofH={36} lit={lit} delay={3.1} />
    <Tower
      x={-168}
      base={0}
      w={44}
      h={128}
      roofH={52}
      windows={2}
      flag
      lit={lit}
      delay={1.1}
    />
    <Tower
      x={124}
      base={0}
      w={44}
      h={128}
      roofH={52}
      windows={2}
      flag
      lit={lit}
      delay={1.8}
    />
    <Tower x={-32} base={0} w={64} h={104} roof="flat" windows={0} />
    <Gate cx={0} base={0} w={30} h={54} open={gate} />
  </>
);

const KEEP = ({ lit }) => (
  <>
    <Tower
      x={-26}
      base={0}
      w={52}
      h={126}
      roofH={56}
      windows={2}
      flag
      lit={lit}
      delay={0.6}
    />
    <Wall x1={-72} x2={60} base={0} h={52} />
    <Tower x={-80} base={0} w={24} h={76} roofH={30} lit={lit} delay={1.5} />
    <Tower
      x={26}
      base={0}
      w={32}
      h={84}
      roof="flat"
      windows={1}
      lit={lit}
      delay={2.4}
    />
    <Gate cx={-44} base={0} w={16} h={26} />
  </>
);

const GATEHOUSE = ({ lit, gate }) => (
  <>
    <Wall x1={-30} x2={30} base={0} h={92} />
    <Tower
      x={-64}
      base={0}
      w={36}
      h={118}
      roofH={46}
      windows={2}
      flag
      lit={lit}
      delay={0.3}
    />
    <Tower
      x={28}
      base={0}
      w={36}
      h={118}
      roofH={46}
      windows={2}
      flag
      lit={lit}
      delay={1.4}
    />
    <Gate cx={0} base={0} w={34} h={60} open={gate} />
  </>
);

const WATCHTOWER = ({ lit }) => (
  <>
    <Tower x={-30} base={0} w={60} h={150} roof="flat" windows={2} lit={lit} />
    <Gate cx={-2} base={0} w={20} h={32} />
  </>
);

const CASTLES = {
  fortress: FORTRESS,
  keep: KEEP,
  gatehouse: GATEHOUSE,
  watchtower: WATCHTOWER,
};

// a castle at (x, y) (middle of its base); `gate` animates the portcullis,
// `lit` lights the windows (night scenes)
export const Castle = ({
  variant = "fortress",
  x = 0,
  y = 0,
  scale = 1,
  lit = false,
  gate = false,
}) => {
  const Body = CASTLES[variant];
  return (
    <g transform={path`translate(${x} ${y}) scale(${scale})`}>
      <Body lit={lit} gate={gate} />
    </g>
  );
};
