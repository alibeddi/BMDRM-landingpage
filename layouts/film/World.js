// The kingdom: one paper diorama that the camera keeps returning to. The
// hero's fortress (same geometry as HeroArt) sits in the middle; around it
// every part has a product role:
//   fortress = secure hosting      lock gate = encryption / DRM
//   gatehouse = access control     roads = secure delivery
//   edge castles = CDN             watchtower = analytics
//   archive hall = video management   pavilion = playback
import {
  Ballista,
  Birds,
  Oak,
  Bridge,
  Castle,
  Cloud,
  Flag,
  House,
  LockGate,
  Pine,
  Place,
  Range,
  Ridge,
  Sentries,
  Tower,
  Wall,
} from "@layouts/components/origami";
import {
  LOCK_BODY,
  LOCK_PLAY,
  LOCK_RING,
  LOCK_SHACKLE,
} from "@layouts/components/origami/heraldry";
import { Road } from "./Road";
import { ArchiveHall, Envelope, Gatehouse, Leader, MiniFilm, Viewer } from "./kit";

export const GATE = { x: 720, y: 386 };
// the framing the parallax layers were drawn for (end of the opening shot)
export const WORLD_REF = { x: 720, y: 282, z: 2 };

// roads (world units)
export const ROADS = {
  // gate → down the slope → gatehouse → bridge → the front edge castle
  deliver:
    "M720 440 C 730 520, 760 600, 860 660 C 960 720, 1100 760, 1250 800 C 1330 820, 1360 826, 1380 826 C 1480 828, 1600 846, 1740 842 C 1800 840, 1860 840, 1940 846 C 2020 852, 2090 838, 2140 822",
  west: "M690 446 C 560 470, 420 468, 240 440 C 80 414, -80 360, -180 336 C -220 328, -240 324, -260 322",
  east: "M760 446 C 900 470, 1020 470, 1160 470 C 1400 468, 1560 420, 1700 360 C 1800 320, 1860 310, 1900 308",
  westVillage: "M-260 322 C -320 326, -380 334, -430 338",
  eastVillage: "M1900 308 C 1960 312, 2020 318, 2080 322",
  frontVillage: "M2150 822 C 2210 840, 2270 860, 2330 872",
  pavilion: "M690 446 C 600 520, 420 620, 300 700 C 160 780, 0 840, -96 878",
  s1: "M-430 338 C -500 332, -560 322, -620 320",
  s2: "M2080 322 C 2160 322, 2240 320, 2300 320",
  s3: "M2150 822 C 2300 840, 2440 872, 2560 892",
  s4: "M300 700 C 60 770, -420 846, -880 872",
};

// edge castles (CDN) and the castles that appear as the kingdom grows
export const EDGES = [
  { k: "edge-w", variant: "keep", x: -260, y: 326, s: 0.66 },
  { k: "edge-e", variant: "keep", x: 1900, y: 312, s: 0.64 },
  { k: "edge-f", variant: "keep", x: 2150, y: 824, s: 0.95 },
];
export const GROWTH = [
  { variant: "keep", x: -620, y: 322, s: 0.56 },
  { variant: "gatehouse", x: 2520, y: 312, s: 0.5 },
  { variant: "watchtower", x: 230, y: 340, s: 0.42 },
  { variant: "keep", x: 1350, y: 316, s: 0.46 },
  { variant: "keep", x: 2300, y: 322, s: 0.54 },
  { variant: "gatehouse", x: -820, y: 330, s: 0.46 },
  { variant: "keep", x: -880, y: 872, s: 0.9 },
  { variant: "gatehouse", x: 2560, y: 896, s: 0.86 },
];

// the pavilion where a viewer watches; its screen is where the player shot
// lands when the camera pulls back to the whole kingdom
export const PAVILION = { x: -260, base: 900, w: 300, h: 168 };
export const PAVILION_SCREEN = {
  x: PAVILION.x - PAVILION.w / 2 + 10,
  y: PAVILION.base - 236 + 10,
  w: PAVILION.w - 20,
  h: PAVILION.h - 20,
};

// labels for the whole-kingdom shot: [anchor x, y, label x, y, text, align]
export const KINGDOM_LABELS = [
  [720, 196, 620, 120, "Secure hosting", "right"],
  [700, 392, 330, 300, "Encryption · DRM", "right"],
  [1190, 372, 1250, 150, "Video management", "left"],
  [1660, 252, 1780, 170, "Analytics", "left"],
  [-260, 252, -380, 140, "CDN", "right"],
  [1380, 742, 1500, 620, "Access control", "left"],
  [1060, 762, 880, 920, "Secure delivery", "right"],
  [PAVILION.x, PAVILION.base - 236, -40, 560, "Playback", "left"],
];
export const KINGDOM_Z = 0.62;

// the lock of the gate, split so its shackle can lift
const GateLock = () => {
  const s = 0.56;
  return (
    <g data-k="w-lock">
      <g transform={`translate(${GATE.x - 42.5 * s} ${GATE.y - 53 * s}) scale(${s})`}>
        <g data-k="w-shackle">
          <path d={LOCK_SHACKLE} fill="url(#o-lock-shackle)" />
        </g>
        <path d={LOCK_BODY} fill="url(#o-lock-body)" />
        <path d={LOCK_RING} fill="#fff" />
        <path d={LOCK_PLAY} fill="#fff" />
      </g>
    </g>
  );
};

const Pavilion = () => {
  const { x, base, w, h } = PAVILION;
  const top = base - 236;
  return (
    <g data-k="w-pavilion">
      <ellipse className="o-shadow" cx={x} cy={base} rx={w * 0.62} ry={6} />
      <path className="o-wood-l" d={`M${x - w / 2 - 14} ${base}V${top - 16}h8V${base}Z`} />
      <path className="o-wood-d" d={`M${x - w / 2 - 6} ${base}V${top - 16}h6V${base}Z`} />
      <path className="o-wood-l" d={`M${x + w / 2} ${base}V${top - 16}h8V${base}Z`} />
      <path className="o-wood-d" d={`M${x + w / 2 + 8} ${base}V${top - 16}h6V${base}Z`} />
      <path className="o-gold-d" d={`M${x - w / 2 - 22} ${top - 6}H${x + w / 2 + 22}V${top}H${x - w / 2 - 22}Z`} />
      <circle className="o-gold-m" cx={x - w / 2 - 22} cy={top - 3} r={6} />
      <circle className="o-gold-m" cx={x + w / 2 + 22} cy={top - 3} r={6} />
      <path className="o-violet-m" d={`M${x - w / 2} ${top}H${x}V${top + h + 26}L${x - w / 2} ${top + h + 12}Z`} />
      <path className="o-violet-d" d={`M${x} ${top}H${x + w / 2}V${top + h + 12}L${x} ${top + h + 26}Z`} />
      <rect className="fc-card" x={PAVILION_SCREEN.x - 2} y={PAVILION_SCREEN.y - 2} width={PAVILION_SCREEN.w + 4} height={PAVILION_SCREEN.h + 4} rx={6} />
      <MiniFilm {...PAVILION_SCREEN} k="w-pav-film" />
      <path className="o-flag-l" d={`M${x - 10} ${top - 16}V${top - 52}L${x + 20} ${top - 46}L${x - 10} ${top - 38}Z`} />
      <path className="o-pole" d={`M${x - 10} ${top - 6}V${top - 54}`} />
    </g>
  );
};


// abstract charts the scout reads from the watchtower (no numbers)
const wave = (n, f) => Array.from({ length: n }, (_, i) => f(i));
const chartLine = (x, y, w, h, seed, rise) =>
  wave(14, (i) => {
    const v = 0.45 + 0.22 * Math.sin(i * 0.9 + seed) + 0.12 * Math.sin(i * 2.3 + seed * 2) + rise * (i / 13);
    return [x + (i / 13) * w, y + h - Math.min(0.95, Math.max(0.05, v)) * h];
  });
const pts = (list) => list.map(([px, py], i) => `${i ? "L" : "M"}${px.toFixed(1)} ${py.toFixed(1)}`).join("");

const ChartPanel = ({ i, x, y, w = 240, h = 160, title, children }) => (
  <g data-k={`w-cp-${i}`}>
    <rect className="fc-drop fc-drop-soft" x={x + 3} y={y + 5} width={w} height={h} rx={9} />
    <rect className="fc-panel" x={x} y={y} width={w} height={h} rx={9} />
    <text x={x + 14} y={y + 24} className="fw-panel-title">
      {title}
    </text>
    <circle cx={x + w - 16} cy={y + 20} r={3} className="fc-live" />
    {children}
  </g>
);

const TowerCharts = () => {
  const viewers = chartLine(2016, 306, 208, 92, 0.4, 0.25);
  const bandwidth = chartLine(2016, 496, 208, 92, 2.1, 0.1);
  const area = (list, base) => `${pts(list)}L${list[list.length - 1][0].toFixed(1)} ${base}L${list[0][0].toFixed(1)} ${base}Z`;
  return (
    <g data-k="w-charts">
      <path data-k="w-sight-0" className="fw-sight" d="M1700 196 L2000 330" pathLength="1" />
      <path data-k="w-sight-1" className="fw-sight" d="M1700 196 L2000 522" pathLength="1" />
      <ChartPanel i={0} x={2000} y={260} title="VIEWERS">
        <path data-k="w-chart-line-area" className="fw-area" d={area(viewers, 400)} />
        <path data-k="w-chart-line-path" className="fw-line" d={pts(viewers)} pathLength="1" />
      </ChartPanel>
      <ChartPanel i={1} x={2270} y={260} title="PLAYBACK">
        <g data-k="w-chart-bars">
          {wave(12, (i) => {
            const v = 0.35 + 0.3 * Math.abs(Math.sin(i * 0.8 + 0.6)) + 0.25 * (i % 3 === 0 ? 1 : 0.4);
            const bh = Math.round(v * 880) / 10;
            return <rect key={i} className={i === 8 ? "fw-bar fw-bar-hi" : "fw-bar"} x={2288 + i * 17.4} y={402 - bh} width={10} height={bh} rx={2} />;
          })}
        </g>
      </ChartPanel>
      <ChartPanel i={2} x={2000} y={450} title="BANDWIDTH">
        <path data-k="w-chart-bw-area" className="fw-area fw-area-gold" d={area(bandwidth, 590)} />
        <path data-k="w-chart-bw-path" className="fw-line fw-line-gold" d={pts(bandwidth)} pathLength="1" />
      </ChartPanel>
      <ChartPanel i={3} x={2270} y={450} title="ACTIVITY">
        <g data-k="w-chart-heat">
          {wave(40, (i) => {
            const col = i % 10;
            const row = Math.floor(i / 10);
            const v = (Math.sin(col * 1.3 + row * 2.1) + Math.sin(col * 0.4 - row) + 2) / 4;
            const tone = v > 0.72 ? 3 : v > 0.5 ? 2 : v > 0.3 ? 1 : 0;
            return <rect key={i} className={`fw-heat fw-heat-${tone}`} x={2286 + col * 21} y={482 + row * 25} width={17} height={21} rx={3} />;
          })}
        </g>
      </ChartPanel>
    </g>
  );
};

const KingdomLabels = () => (
  <g data-k="w-labels">
    {KINGDOM_LABELS.map(([ax, ay, lx, ly, text, align], i) => {
      const s = 1 / KINGDOM_Z;
      return (
        <g key={text} data-k={`w-label-${i}`}>
          <g transform={`translate(${ax} ${ay}) scale(${s.toFixed(4)})`}>
            <Leader
              x1={0}
              y1={0}
              x2={(lx - ax) / s}
              y2={(ly - ay) / s}
              label={text}
              align={align}
              k={`w-leader-${i}`}
              size={19}
            />
          </g>
        </g>
      );
    })}
  </g>
);

export const WorldArt = () => (
  <g data-shot="world" data-k="world">
    {/* sky: clouds and birds drift far away */}
    <g data-k="w-sky" data-p="0.12">
      <g className="o-tone-haze">
        <Cloud x={-260} y={10} w={180} drift={60} dur={40} />
        <Cloud x={230} y={130} w={110} drift={-50} dur={30} delay={8} />
        <Cloud x={430} y={-60} w={140} drift={70} dur={36} delay={4} />
        <Cloud x={980} y={150} w={120} drift={-60} dur={34} delay={12} />
        <Cloud x={1250} y={-10} w={170} drift={80} dur={44} delay={2} />
        <Cloud x={1700} y={110} w={130} drift={-50} dur={30} delay={6} />
      </g>
      <Birds
        birds={[
          [986, 210, 1],
          [1006, 220, 0.8, 1.2],
          [970, 226, 0.85, 2.1],
          [300, 120, 0.9, 0.6],
          [318, 128, 0.7, 1.8],
        ]}
      />
    </g>

    {/* the far range, in haze */}
    <g data-k="w-far" data-p="0.35">
      <g data-k="w-range">
        <Range
          base={470}
          peaks={[
            [-900, 560, 380, true],
            [-380, 480, 300],
            [100, 460, 330, true],
            [500, 400, 250],
            [1000, 420, 270],
            [1420, 500, 360, true],
            [1900, 540, 380, true],
            [2420, 480, 300],
          ]}
        />
      </g>
    </g>

    <g data-k="w-main" data-p="1">
      {/* back hills, with the edge castles and their villages */}
      <g data-k="w-back">
        <Ridge
          base={760}
          level="back"
          slant={0.2}
          points={[
            [-1900, 364],
            [-1400, 330],
            [-1000, 310],
            [-600, 330],
            [-200, 318],
            [200, 376],
            [500, 412],
            [940, 412],
            [1260, 362],
            [1500, 330],
            [1900, 300],
            [2300, 322],
            [2700, 300],
            [3200, 334],
            [3800, 320],
          ]}
        />
        <Pine x={-260} base={310} h={40} delay={1} />
        <Pine x={-236} base={312} h={30} delay={2.2} />
        <Pine x={1700} base={316} h={38} delay={0.4} />
        <Pine x={2560} base={308} h={36} delay={1.6} />
        <Pine x={-1280} base={326} h={36} delay={2.6} />
      </g>

      <g data-k="w-backroads">
        <Road d={ROADS.west} k="r-west" packets={3} a={7} width={6} />
        <Road d={ROADS.east} k="r-east" packets={3} a={7} width={6} />
        <Road d={ROADS.westVillage} k="r-wv" packets={1} a={5} width={4} />
        <Road d={ROADS.eastVillage} k="r-ev" packets={1} a={5} width={4} />
        <Road d={ROADS.s1} k="r-s1" packets={2} a={5} width={4} />
        <Road d={ROADS.s2} k="r-s2" packets={2} a={5} width={4} />
      </g>

      {GROWTH.slice(0, 6).map((c, i) => (
        <g key={i} data-k={`w-grow-${i}`} className={i === 5 || i === 1 ? "o-tone-haze" : undefined}>
          <Castle variant={c.variant} x={c.x} y={c.y} scale={c.s} />
        </g>
      ))}
      {EDGES.slice(0, 2).map((c) => (
        <g key={c.k} data-k={c.k}>
          <Castle variant={c.variant} x={c.x} y={c.y} scale={c.s} />
        </g>
      ))}
      <g data-k="w-village-back">
        <House x={-500} base={340} w={30} h={20} />
        <House x={-454} base={344} w={24} h={16} />
        <House x={2070} base={326} w={30} h={20} />
        <House x={2116} base={330} w={24} h={16} />
        <Viewer x={-410} y={346} s={1.4} flip />
        <Viewer x={2060} y={330} s={1.4} tone={1} />
        <Viewer x={2160} y={334} s={1.4} tone={2} flip />
      </g>

      {/* the ground the fortress stands on */}
      <Ridge
        base={1100}
        level="front"
        slant={0.25}
        points={[
          [-1900, 480],
          [-1200, 470],
          [-700, 474],
          [-300, 478],
          [100, 470],
          [460, 456],
          [720, 452],
          [980, 456],
          [1340, 462],
          [1700, 456],
          [2100, 466],
          [2700, 474],
          [3800, 480],
        ]}
      />

      {/* the watchtower on its hill (analytics) */}
      <g data-k="w-tower">
        <Ridge
          base={480}
          level="back"
          points={[
            [1450, 480],
            [1560, 430],
            [1660, 412],
            [1760, 424],
            [1880, 480],
          ]}
        />
        <Castle variant="watchtower" x={1660} y={418} scale={1.1} />
        <Flag x={1688} y={252} h={30} w={24} delay={0.8} />
        <Pine x={1560} base={444} h={46} delay={1.4} />
        <Pine x={1790} base={446} h={40} delay={0.2} />
      </g>
      <g data-k="w-scout">
        <Place name="scout" x={1630} y={155} scale={0.3} />
      </g>

      {/* the archive hall (video management) */}
      <ArchiveHall x={1060} base={458} w={260} h={92} k="w-archive" />

      {/* the fortress: HeroArt, piece for piece */}
      <g data-k="w-fortress">
        <g data-k="w-walls">
          <Wall x1={520} x2={606} base={452} h={76} />
          <Wall x1={834} x2={920} base={452} h={76} />
          <path
            className="fw-frieze"
            d="M526 398 l6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 M840 398 l6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5"
          />
        </g>
        <g data-k="w-t1">
          <Tower x={446} base={452} w={76} h={150} roof="flat" windows={2} delay={0.5} />
        </g>
        <g data-k="w-t2">
          <Tower x={918} base={452} w={68} h={160} roof="flat" windows={2} delay={1.3} />
        </g>
        <g data-k="w-t3">
          <Tower x={602} base={452} w={60} h={188} roofH={58} windows={0} data={4} flag delay={0.2} />
        </g>
        <g data-k="w-t4">
          <Tower x={778} base={452} w={60} h={188} roofH={58} windows={0} data={4} flag delay={1.1} />
        </g>
        <g data-k="w-t5">
          <Tower x={660} base={452} w={120} h={150} roof="flat" windows={0} />
        </g>
        <g data-k="w-sentries">
          <Sentries
            sentries={[
              [546, 376, 22, 0],
              [896, 376, -22, 2.5],
            ]}
          />
        </g>
        <g data-k="w-gate">
          <LockGate
            x={GATE.x}
            y={GATE.y}
            r={55}
            glowClassName="fw-glow"
            dialClassName="o-dial-turn"
            lockClassName="fw-hide"
          />
          <GateLock />
        </g>
        <g data-k="w-gate-flash" opacity="0">
          <circle cx={GATE.x} cy={GATE.y} r={70} className="fw-flash" />
        </g>
        <g data-k="w-guard-top">
          <Place name="guard" x={490} y={246} scale={0.17} flip />
        </g>
        <g data-k="w-ballista">
          <Ballista x={470} y={302} scale={0.5} flip />
        </g>
        <g data-k="w-archer">
          <Place name="archer" x={917} y={199} scale={0.28} />
        </g>
      </g>

      {/* a village around the fortress */}
      <g data-k="w-village">
        <House x={130} base={506} w={38} h={26} />
        <House x={178} base={512} w={30} h={20} />
        <House x={1190} base={520} w={34} h={24} />
        <House x={1236} base={524} w={28} h={18} />
        <House x={-170} base={500} w={34} h={22} />
        <Oak x={262} base={514} h={44} delay={1.2} />
        <Oak x={1300} base={528} h={40} delay={0.4} />
        <Oak x={-100} base={506} h={42} delay={2.2} />
        <Pine x={1000} base={540} h={44} delay={1.8} />
        <Pine x={1024} base={544} h={32} delay={0.7} />
        <Pine x={380} base={548} h={46} delay={2.9} />
      </g>

      {/* pines around the fortress */}
      <g data-k="w-pines">
        <Pine x={414} base={470} h={52} delay={1} />
        <Pine x={436} base={472} h={36} delay={2.4} />
        <Pine x={1350} base={474} h={50} delay={2} />
        <Pine x={1372} base={476} h={36} delay={0.6} />
        <Pine x={180} base={484} h={60} delay={1.6} />
        <Pine x={-190} base={480} h={48} delay={0.3} />
      </g>

      {/* the MP4 hovering over the gate, as on the hero */}
      <g data-k="w-file">
        <path className="fw-thread" d="M720 254 V300" />
        <g transform="translate(696 215)">
          <path d="M0 5a5 5 0 0 1 5 -5H38L50 12V34a5 5 0 0 1 -5 5H5a5 5 0 0 1 -5 -5Z" className="fc-card fc-card-stroke" />
          <path d="M38 0V12H50Z" className="fc-fold" />
          <path d="M10 14v12l10 -6z" className="fc-play" />
          <text x="26" y="33" className="fc-file-text">
            MP4
          </text>
        </g>
      </g>

      {/* the knight and the guard keep the gate */}
      <g data-k="w-knight">
        <Place name="knight" x={536} y={304} scale={0.5} />
      </g>
      <g data-k="w-guard">
        <Place name="guard" x={802} y={331} scale={0.42} flip />
      </g>

      {/* front hills: the road, the river, the gatehouse, the front edge castle */}
      <Ridge
        base={2400}
        level="back"
        slant={0.08}
        points={[
          [-1900, 760],
          [-1300, 730],
          [-700, 770],
          [-200, 744],
          [300, 790],
          [700, 860],
          [1100, 820],
          [1500, 800],
          [1900, 830],
          [2400, 800],
          [2900, 826],
          [3800, 810],
        ]}
      />
      <path
        data-k="w-river"
        className="fw-river"
        d="M1820 470 C 1800 560, 1860 640, 1800 720 C 1760 780, 1800 860, 1770 980 C 1740 1100, 1820 1240, 1780 1500"
      />
      <Road d={ROADS.pavilion} k="r-pav" packets={2} a={8} width={7} />
      <Road d={ROADS.deliver} k="r-deliver" packets={3} a={9} width={9} />
      <g data-k="w-bridge">
        <Bridge x={1740} base={858} w={120} h={22} />
      </g>
      <Gatehouse x={1380} base={834} s={1} k="w-gatehouse" />
      <g data-k="w-gh-pulse" opacity="0">
        <circle cx={1380} cy={800} r={60} className="fw-pulse" />
      </g>
      <g data-k="w-br-pulse" opacity="0">
        <circle cx={1800} cy={836} r={60} className="fw-pulse" />
      </g>
      <Road d={ROADS.frontVillage} k="r-fv" packets={1} a={7} width={5} />
      <Road d={ROADS.s3} k="r-s3" packets={2} a={7} width={5} />
      <Road d={ROADS.s4} k="r-s4" packets={2} a={7} width={5} />
      <g data-k="edge-f">
        <Castle variant="keep" x={EDGES[2].x} y={EDGES[2].y} scale={EDGES[2].s} />
      </g>
      <g data-k="w-village-front">
        <House x={2300} base={880} w={40} h={26} />
        <House x={2360} base={892} w={32} h={22} />
        <Viewer x={2290} y={890} s={2} tone={0} />
        <Viewer x={2420} y={902} s={2} tone={2} flip />
      </g>
      {GROWTH.slice(6).map((c, i) => (
        <g key={i} data-k={`w-grow-${i + 6}`}>
          <Castle variant={c.variant} x={c.x} y={c.y} scale={c.s} />
        </g>
      ))}
      <g data-k="w-grow-viewers">
        <Viewer x={-790} y={882} s={2} tone={1} />
        <Viewer x={-740} y={886} s={2} tone={3} flip />
        <Viewer x={2650} y={906} s={2} tone={0} flip />
        <Viewer x={-700} y={330} s={1.4} tone={2} />
        <Viewer x={2390} y={326} s={1.4} tone={1} flip />
        <Viewer x={300} y={350} s={1.3} tone={0} />
      </g>

      <Pavilion />
      <g data-k="w-audience">
        <Viewer x={PAVILION.x - 236} y={904} s={2.2} tone={0} />
        <Viewer x={PAVILION.x - 190} y={910} s={2.2} tone={1} />
        <Viewer x={PAVILION.x - 278} y={912} s={2.2} tone={2} />
      </g>

      {/* the rider carrying the sealed video */}
      <g data-k="w-rider" opacity="0">
        <g data-k="w-rider-body">
          <Place name="rider" x={0} y={0} scale={0.36} />
          <g transform="translate(150 40)">
            <circle r="22" className="fw-env-glow" />
            <Envelope a={15} />
          </g>
        </g>
      </g>

      <g data-k="w-roadside">
        <House x={1060} base={812} w={40} h={26} />
        <House x={1112} base={818} w={30} h={20} />
        <Oak x={1190} base={830} h={48} delay={1.1} />
        <Pine x={1560} base={872} h={56} delay={0.3} />
        <Pine x={1586} base={876} h={40} delay={1.5} />
        <House x={1960} base={884} w={36} h={24} />
        <Oak x={2030} base={890} h={46} delay={2.4} />
        <Pine x={1250} base={890} h={60} delay={2.8} />
        <Oak x={640} base={900} h={50} delay={0.9} />
        <House x={520} base={890} w={38} h={24} />
      </g>

      <g data-k="w-front">
        <Pine x={980} base={940} h={70} delay={0.8} />
        <Pine x={1010} base={946} h={50} delay={2.1} />
        <Pine x={1640} base={930} h={64} delay={1.2} />
        <Pine x={2120} base={960} h={72} delay={0.5} />
        <Pine x={2150} base={966} h={52} delay={1.9} />
        <Pine x={420} base={960} h={68} delay={2.6} />
        <Pine x={-420} base={950} h={70} delay={0.9} />
        <Pine x={-390} base={956} h={50} delay={2.3} />
        <Pine x={2750} base={940} h={66} delay={1.1} />
      </g>

      <TowerCharts />
      {/* the nearest paper: a light front plane and big firs that frame the
          wide shots (below the frame in every close shot) */}
      <g data-k="w-near">
        <Ridge
          base={2400}
          level="front"
          slant={0.12}
          points={[
            [-1900, 1190],
            [-900, 1150],
            [0, 1196],
            [700, 1160],
            [1400, 1204],
            [2100, 1156],
            [2900, 1196],
            [3800, 1170],
          ]}
        />
        <Pine x={-470} base={1262} h={230} delay={0.4} />
        <Pine x={-380} base={1272} h={170} delay={1.6} />
        <Pine x={-540} base={1280} h={150} delay={2.4} />
        <Pine x={2240} base={1258} h={236} delay={1.1} />
        <Pine x={2330} base={1270} h={176} delay={2.0} />
        <Pine x={2170} base={1280} h={140} delay={0.2} />
        <Oak x={980} base={1236} h={120} delay={1.3} />
        <Pine x={1040} base={1246} h={130} delay={2.7} />
      </g>

      <KingdomLabels />
    </g>
  </g>
);

