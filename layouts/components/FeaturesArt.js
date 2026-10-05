import { Castle, Pine, Place } from "@layouts/components/origami";

// Line art for the dark features section (motion lives in styles/home.scss).

const START = 48;
const STEP = 16;
const COUNT = 72; // leaves the right-hand hill free for the knight
const MID = 100;
const PHASES = 5;
const PLAY_DURATION = "18s";

// deterministic, audio-like bar heights
const HEIGHTS = Array.from({ length: COUNT }, (_, i) => {
  const wave =
    Math.abs(Math.sin(i * 0.33) * Math.sin(i * 0.12 + 1)) * 0.8 +
    Math.abs(Math.sin(i * 1.7)) * 0.2;
  return Math.round(10 + wave * 78);
});

// bars sharing a phase animate together; all are centred on `mid`, so
// scaling the group scales every bar around its own centre
const Waveform = ({
  className,
  heights = HEIGHTS,
  start = START,
  step = STEP,
  mid = MID,
}) =>
  Array.from({ length: PHASES }, (_, phase) => (
    <g key={phase} className={`${className} wave-phase-${phase}`}>
      {heights.map((height, i) =>
        i % PHASES === phase ? (
          <line
            key={i}
            x1={start + i * step}
            x2={start + i * step}
            y1={mid - height / 2}
            y2={mid + height / 2}
          />
        ) : null,
      )}
    </g>
  ));

const TICKS = Array.from({ length: COUNT }, (_, i) => START + i * STEP);
// one label every ten ticks
const LABELS = [
  "00:00",
  "01:40",
  "03:20",
  "05:00",
  "06:40",
  "08:20",
  "10:00",
  "11:40",
  "13:20",
].slice(0, Math.floor((COUNT - 1) / 10) + 1);
const END = START + (COUNT - 1) * STEP;

// the rider's road along the front hill, under the playhead
const RIDE =
  "M48 268 L119 267 L190 267 L261 269 L332 270 L403 271 L474 270 L545 268 L616 264 L687 260 L758 256 L829 253 L900 252 L971 253 L1042 256 L1113 259 L1184 263";

// A playing video over a night landscape: small castles on the hills, and a
// rider carrying the stream along under the playhead to the sentinel.
// data-still: the frame shown (paused) with reduced motion.
export const FeaturesTimeline = () => (
  <svg
    className="features-timeline timeline-art o-tone-night"
    viewBox="0 0 1440 300"
    preserveAspectRatio="xMidYMax slice"
    fill="none"
    aria-hidden="true"
    focusable="false"
    data-scene
    data-still="12"
  >
    <defs>
      <clipPath id="timeline-played">
        <rect x={START - 4} y="0" width="0" height="300">
          <animate
            attributeName="width"
            from="0"
            to={END - START + 8}
            dur={PLAY_DURATION}
            repeatCount="indefinite"
          />
        </rect>
      </clipPath>
    </defs>

    {/* hills */}
    <path
      d="M0 300 V236 C 140 220, 250 244, 380 232 C 520 219, 600 196, 740 200 C 880 204, 980 232, 1120 226 C 1250 221, 1350 206, 1440 212 V300 Z"
      className="timeline-hill"
    />
    <path
      d="M0 300 V270 C 180 258, 320 276, 520 268 C 700 261, 820 246, 980 252 C 1140 258, 1300 272, 1440 262 V300 Z"
      className="timeline-hill-front"
    />

    {/* castles and firs along the front hill */}
    <Castle variant="keep" x={330} y={271} scale={0.26} lit />
    <Castle variant="gatehouse" x={760} y={257} scale={0.28} lit gate />
    <Castle variant="fortress" x={1090} y={259} scale={0.19} lit />
    <Pine x={206} base={268} h={34} />
    <Pine x={222} base={268} h={24} delay={1.4} />
    <Pine x={574} base={267} h={30} delay={0.6} />
    <Pine x={600} base={266} h={22} delay={2.1} />
    <Pine x={912} base={252} h={32} delay={1.8} />
    <Pine x={1262} base={266} h={28} delay={0.9} />

    {/* the rider keeps pace with the playhead */}
    <g className="timeline-rider">
      <animateMotion dur={PLAY_DURATION} repeatCount="indefinite" path={RIDE} />
      <g className="o-gait">
        <Place name="rider" x={-24.7} y={-39.7} scale={0.12} />
      </g>
    </g>

    {/* waveform: dim everywhere, bright where already played */}
    <Waveform className="timeline-wave" />
    <g clipPath="url(#timeline-played)">
      <Waveform className="timeline-wave is-played" />
    </g>

    {/* ruler */}
    <line x1={START} x2={END} y1="182" y2="182" className="timeline-rule" />
    {TICKS.map((x, i) => (
      <line
        key={x}
        x1={x}
        x2={x}
        y1="182"
        y2={i % 10 === 0 ? 194 : 187}
        className="timeline-rule"
      />
    ))}
    {LABELS.map((label, i) => (
      <text
        key={label}
        x={START + i * 10 * STEP}
        y="210"
        className="timeline-label"
      >
        {label}
      </text>
    ))}

    {/* playhead */}
    <g className="timeline-playhead">
      <animateTransform
        attributeName="transform"
        type="translate"
        from="0 0"
        to={`${END - START} 0`}
        dur={PLAY_DURATION}
        repeatCount="indefinite"
      />
      <line x1={START} x2={START} y1="42" y2="190" />
      <rect x={START - 5} y="32" width="10" height="10" />
    </g>
  </svg>
);

// Phones: the same timeline recomposed for a narrow screen (fewer bars, three
// labels, two castles), so the rider crosses the whole width instead of a
// cropped middle.
const COUNT_M = 23;
const START_M = 24;
const STEP_M = 16;
const MID_M = 62;
const END_M = START_M + (COUNT_M - 1) * STEP_M;
const HEIGHTS_M = HEIGHTS.slice(0, COUNT_M).map((h) => Math.round(h * 0.72));
const RIDE_M =
  "M24 213 L56 212 L88 213 L120 214 L152 215 L184 216 L216 215 L248 212 L280 210 L312 210 L344 211 L376 211";

export const FeaturesTimelineMobile = () => (
  <svg
    className="features-timeline-m timeline-art o-tone-night"
    viewBox="0 0 400 250"
    fill="none"
    aria-hidden="true"
    focusable="false"
    data-scene
    data-still="12"
  >
    <defs>
      <clipPath id="timeline-played-m">
        <rect x={START_M - 4} y="0" width="0" height="250">
          <animate
            attributeName="width"
            from="0"
            to={END_M - START_M + 8}
            dur={PLAY_DURATION}
            repeatCount="indefinite"
          />
        </rect>
      </clipPath>
    </defs>

    <path
      d="M0 250 V190 C 70 180, 130 196, 200 188 C 270 180, 330 194, 400 184 V250 Z"
      className="timeline-hill"
    />
    <path
      d="M0 250 V214 C 90 206, 160 220, 240 212 C 310 205, 360 214, 400 208 V250 Z"
      className="timeline-hill-front"
    />

    <Castle variant="keep" x={96} y={213} scale={0.2} lit />
    <Castle variant="fortress" x={300} y={210} scale={0.14} lit />
    <Pine x={40} base={212} h={24} />
    <Pine x={54} base={212} h={18} delay={1.4} />
    <Pine x={206} base={215} h={22} delay={0.6} />
    <Pine x={362} base={211} h={22} delay={2.1} />

    <g className="timeline-rider">
      <animateMotion
        dur={PLAY_DURATION}
        repeatCount="indefinite"
        path={RIDE_M}
      />
      <g className="o-gait">
        <Place name="rider" x={-20.6} y={-33.1} scale={0.1} />
      </g>
    </g>

    <Waveform
      className="timeline-wave"
      heights={HEIGHTS_M}
      start={START_M}
      step={STEP_M}
      mid={MID_M}
    />
    <g clipPath="url(#timeline-played-m)">
      <Waveform
        className="timeline-wave is-played"
        heights={HEIGHTS_M}
        start={START_M}
        step={STEP_M}
        mid={MID_M}
      />
    </g>

    <line x1={START_M} x2={END_M} y1="116" y2="116" className="timeline-rule" />
    {HEIGHTS_M.map((_, i) => (
      <line
        key={i}
        x1={START_M + i * STEP_M}
        x2={START_M + i * STEP_M}
        y1="116"
        y2={i % 10 === 0 ? 126 : 120}
        className="timeline-rule"
      />
    ))}
    {LABELS.slice(0, 3).map((label, i) => (
      <text
        key={label}
        x={START_M + i * 10 * STEP_M}
        y="142"
        className="timeline-label"
      >
        {label}
      </text>
    ))}

    <g className="timeline-playhead">
      <animateTransform
        attributeName="transform"
        type="translate"
        from="0 0"
        to={`${END_M - START_M} 0`}
        dur={PLAY_DURATION}
        repeatCount="indefinite"
      />
      <line x1={START_M} x2={START_M} y1="18" y2="124" />
      <rect x={START_M - 4} y="10" width="8" height="8" />
    </g>
  </svg>
);

export const FeaturesArcs = () => (
  <svg
    className="features-arcs"
    viewBox="0 0 1440 380"
    preserveAspectRatio="xMidYMin slice"
    fill="none"
    aria-hidden="true"
    focusable="false"
  >
    <circle cx="170" cy="-110" r="300" className="arc-line" />
    <circle cx="600" cy="-170" r="330" className="arc-line" />
    <circle cx="1080" cy="-70" r="370" className="arc-thick" />
    <g className="arc-spin">
      <circle cx="1310" cy="-30" r="250" className="arc-dash" />
    </g>
    <path d="M96 112 V236" className="arc-line" />
    <rect x="92" y="236" width="8" height="8" className="arc-node" />
    <path d="M136 150 V196" className="arc-line" />
    <path d="M1250 170 V330" className="arc-line" />
    <rect x="1246" y="330" width="8" height="8" className="arc-node" />
    <path d="M1360 215 V282" className="arc-line" />
  </svg>
);
