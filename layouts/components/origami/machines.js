// Defensive machines in folded kraft paper. They guard rather than attack:
// the catapult slowly winds back and eases home, the ballista sweeps the
// horizon. Moving parts are drawn around their own pivot at (0, 0).

const round = (n) => Math.round(n * 10) / 10;

const pose = (x, y, scale, flip) =>
  flip
    ? `translate(${round(x)} ${y}) scale(${-scale} ${scale})`
    : `translate(${round(x)} ${y}) scale(${scale})`;

// hexagonal winch with three lugs, turning around its hub
const Winch = ({ r = 12, className = "o-winch" }) => {
  const h = round(r * 0.866);
  return (
    <g className={className}>
      <path
        className="o-wood-l"
        d={`M${-r} 0L${-r / 2} ${-h}H${r / 2}L${r} 0Z`}
      />
      <path className="o-wood-d" d={`M${-r} 0H${r}L${r / 2} ${h}H${-r / 2}Z`} />
      {[0, 120, 240].map((a) => (
        <circle
          key={a}
          className="o-gold-d"
          cx={round(Math.cos((a * Math.PI) / 180) * r * 0.72)}
          cy={round(Math.sin((a * Math.PI) / 180) * r * 0.72)}
          r={round(r * 0.16)}
        />
      ))}
      <circle className="o-gold-m" r={round(r * 0.3)} />
    </g>
  );
};

// solid paper wheel (no spokes): a lit rim, a hub ring and a gold boss
const Wheel = ({ cx, cy, r }) => (
  <g>
    <circle className="o-wood-d" cx={cx} cy={cy} r={r} />
    <path
      className="o-wood-l"
      d={`M${cx - r} ${cy}A${r} ${r} 0 0 1 ${cx + r} ${cy}Z`}
    />
    <circle className="o-wood-m" cx={cx} cy={cy} r={round(r * 0.62)} />
    <circle className="o-gold-m" cx={cx} cy={cy} r={round(r * 0.26)} />
    <circle className="o-gold-d" cx={cx} cy={cy} r={round(r * 0.1)} />
  </g>
);

// catapult facing right; (x, y) is the middle of its base line on the ground
export const Catapult = ({ x, y, scale = 1, flip = false }) => (
  <g transform={pose(x - 100 * scale * (flip ? -1 : 1), y, scale, flip)}>
    <ellipse className="o-shadow" cx="100" cy="0" rx="98" ry="5" />
    {/* winch on its stand, and the rope that draws the arm down */}
    <g transform="translate(28 -58)">
      <path className="o-wood-d" d="M-5 4H5L7 12H-7Z" />
      <Winch className="o-winch o-winch-pull" />
      <g className="o-rope-pull">
        <path className="o-rope" d="M0 0H68.4" />
      </g>
    </g>
    {/* rounded chassis */}
    <path
      className="o-wood-l"
      d="M10 -46H190A6 6 0 0 1 196 -40H4A6 6 0 0 1 10 -46Z"
    />
    <path
      className="o-wood-d"
      d="M4 -40H196A6 6 0 0 1 190 -34H10A6 6 0 0 1 4 -40Z"
    />
    {/* A-frame with a padded stop */}
    <path className="o-wood-l" d="M116 -46 125 -46 137 -112 131 -112Z" />
    <path className="o-wood-d" d="M150 -46 159 -46 143 -112 137 -112Z" />
    <path
      className="o-coral-m"
      d="M124 -122H137V-114H124A4 4 0 0 1 124 -122Z"
    />
    <path className="o-coral-d" d="M137 -122H150A4 4 0 0 1 150 -114H137Z" />
    {/* tapered throwing arm with a basket and a sealed package */}
    <g transform="translate(64 -50)">
      <g className="o-pull">
        <path className="o-wood-l" d="M-3.4 -3.7 86.3 -81.9 88 -80 0 0Z" />
        <path className="o-wood-d" d="M0 0 88 -80 89.7 -78.2 3.4 3.7Z" />
        <path
          className="o-wood-d"
          d="M80 -88.9 96 -71.1 100.4 -75.1 84.4 -92.9Z"
        />
        <path className="o-paper-l" d="M98.4 -98 106 -94 98.4 -90 90.8 -94Z" />
        <path
          className="o-violet-m"
          d="M90.8 -94 98.4 -90 98.4 -81 90.8 -85Z"
        />
        <path className="o-violet-d" d="M98.4 -90 106 -94 106 -85 98.4 -81Z" />
        <circle className="o-coral-m" cx="102.2" cy="-87.5" r="1.8" />
        <circle className="o-gold-m" r="6" />
        <circle className="o-gold-d" r="2.4" />
      </g>
    </g>
    <Wheel cx={40} cy={-17} r={17} />
    <Wheel cx={160} cy={-17} r={17} />
  </g>
);

// ballista facing right: a stout base and pivot post carrying the engine
// (kraft stock, violet limbs swept back in a chevron, gold tips, string and a
// steel-tipped bolt), which sweeps the horizon. (x, y) is the middle of its
// base on the ground.
export const Ballista = ({ x, y, scale = 1, flip = false }) => (
  <g transform={pose(x, y, scale, flip)}>
    <ellipse className="o-shadow" cx="0" cy="0" rx="40" ry="3.5" />
    <path className="o-wood-l" d="M-34 0-26 -14H0V0Z" />
    <path className="o-wood-d" d="M0 0V-14H26L34 0Z" />
    <path className="o-wood-m" d="M-29 -18H29V-14H-29Z" />
    <path className="o-wood-l" d="M-5 -18H0V-38H-5Z" />
    <path className="o-wood-d" d="M0 -18H5V-38H0Z" />
    <g transform="translate(0 -40) rotate(-8)">
      <g className="o-aim">
        <path
          className="o-bowstring o-bowstring-bold"
          d="M38 -38-4 -3M38 38-4 3"
        />
        <path className="o-wood-l" d="M-46 -5H64V0H-46Z" />
        <path className="o-wood-d" d="M-46 0H64V5H-46Z" />
        <path className="o-wood-d" d="M-52 -8H-44V8H-52Z" />
        <path className="o-violet-l" d="M52 -5 60 -1 41 -40 35 -36Z" />
        <path className="o-violet-d" d="M52 5 60 1 41 40 35 36Z" />
        <circle className="o-gold-m" cx="38" cy="-38" r="3.5" />
        <circle className="o-gold-m" cx="38" cy="38" r="3.5" />
        <path className="o-steel-l" d="M48 -9H58V9H48Z" />
        <path className="o-steel-d" d="M58 -9H64V9H58Z" />
        <path className="o-shaft o-shaft-bold" d="M-8 -8.5H84" />
        <path className="o-steel-l" d="M84 -13 98 -8.5H84Z" />
        <path className="o-steel-d" d="M84 -8.5H98L84 -4Z" />
        <path className="o-coral-m" d="M-8 -8.5-16 -14-12 -8.5-16 -3Z" />
        <circle className="o-gold-m" r="4.5" />
      </g>
    </g>
  </g>
);
