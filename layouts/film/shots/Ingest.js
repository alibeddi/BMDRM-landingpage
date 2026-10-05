// Content enters the kingdom: roads from the storage you already use
// converge on one gate, where the gatekeeper stamps every video in.
// The sources climb a diagonal from the foreground to the far hills; every
// road leaves its castle to the right and runs below the castles further up,
// so no road or travelling video ever crosses a label. Labels sit on top.
import { Castle, Cloud, LockGate, Pine, Place, Range, Ridge } from "@layouts/components/origami";
import { Chip, VideoCard } from "../kit";
import { ride } from "../Road";
import { T } from "../timing";

const GATE = { x: 1480, base: 856, s: 1.25 };

// [castle, x, base, scale, label, how far the castle reaches above its base, road]
const SOURCES = [
  ["keep", 200, 960, 0.85, "S3-compatible", 208, "M249 955 C 640 965, 1060 940, 1260 905 C 1360 888, 1430 874, 1478 866"],
  ["gatehouse", 360, 790, 0.74, "FTP · FTPS · SFTP", 190, "M407 788 C 640 800, 900 840, 1120 868 C 1260 884, 1390 872, 1478 866"],
  ["keep", 540, 650, 0.64, "Dropbox", 208, "M577 646 C 780 668, 960 770, 1100 830 C 1200 868, 1370 870, 1478 866"],
  ["watchtower", 740, 545, 0.56, "OneDrive", 157, "M757 543 C 920 566, 1060 680, 1120 770 C 1170 840, 1360 866, 1478 866"],
  ["keep", 940, 470, 0.5, "Google Drive", 208, "M969 467 C 1060 520, 1140 640, 1180 740 C 1215 820, 1360 862, 1478 866"],
];
const DRIVE = SOURCES[4];
// the next shot opens on its Drive outpost at this screen position and size
const OAUTH_DRIVE = { screenX: 903, screenBase: 844, screenScale: 1.52 };

export const IngestArt = () => (
  <g data-shot="ingest" data-k="ingest">
    <g data-k="ig-cam">
      <g className="o-tone-haze">
        <Cloud x={160} y={250} w={120} drift={40} dur={30} />
        <Cloud x={1500} y={300} w={150} drift={-50} dur={36} delay={5} />
        <Range base={600} peaks={[[140, 560, 290, true], [700, 420, 220], [1240, 480, 260], [1780, 560, 300, true], [2260, 440, 220]]} />
      </g>
      <Ridge base={1300} level="back" slant={0.2} points={[[-100, 560], [300, 520], [700, 520], [940, 462], [1150, 520], [1500, 600], [2020, 560]]} />
      {SOURCES.slice(2).map(([variant, x, base, s, label], i) => (
        <g key={label} data-k={`ig-src-${i + 2}`}>
          <Castle variant={variant} x={x} y={base} scale={s} />
        </g>
      ))}
      <Ridge base={1300} level="front" slant={0.2} points={[[-100, 720], [300, 740], [620, 712], [900, 760], [1200, 800], [1480, 858], [1800, 840], [2020, 850]]} />
      {SOURCES.slice(0, 2).map(([variant, x, base, s, label], i) => (
        <g key={label} data-k={`ig-src-${i}`}>
          <Castle variant={variant} x={x} y={base} scale={s} />
        </g>
      ))}
      <Pine x={70} base={772} h={70} delay={1} />
      <Pine x={96} base={778} h={48} delay={2.2} />
      <Pine x={1770} base={862} h={72} delay={0.6} />
      <Pine x={1800} base={868} h={50} delay={1.7} />
      <Pine x={640} base={1010} h={82} delay={2.6} />
      <Pine x={1060} base={1030} h={74} delay={0.3} />

      {/* the BMDRM fortress and its gate */}
      <g data-k="ig-fort">
        <Castle variant="fortress" x={GATE.x} y={GATE.base} scale={GATE.s} />
        <LockGate x={GATE.x} y={GATE.base - 42} r={34} glowClassName="ig-glow" dialClassName="o-dial-turn" />
      </g>
      <g data-k="ig-guard">
        <Place name="guard" x={1506} y={GATE.base - 331 * 0.5} scale={0.5} flip />
      </g>

      {SOURCES.map(([, , , , label, , d], i) => (
        <g key={label} data-k={`ig-road-${i}`}>
          <path data-k={`ig-road-${i}-base`} className="o-stream-base" d={d} pathLength="1" style={{ strokeWidth: 12 }} />
          <path className="o-stream-hi" d={d} />
          <path className="o-stream-pulse" d={d} pathLength="100" style={{ "--dur": "2.6s" }} />
        </g>
      ))}
      {SOURCES.map(([, , , , label], i) =>
        [0, 1].map((n) => (
          <g key={`${label}-${n}`} data-k={`ig-card-${i}-${n}`} opacity="0">
            <VideoCard x={-38} y={-27} w={76} h={54} art={i + n * 2} lines={false} />
          </g>
        )),
      )}
      <g data-k="ig-stamp" opacity="0">
        <circle cx={GATE.x} cy={GATE.base - 112} r="20" className="fc-stamp" />
        <path d={`M${GATE.x - 8} ${GATE.base - 112}l6 6 10 -12`} className="fc-check" />
      </g>

      {/* labels last: always on top of roads and travelling videos */}
      <g data-k="ig-chips">
        {SOURCES.map(([, x, base, s, label, reach], i) => (
          <Chip key={label} x={x} y={base - reach * s - 30} label={label.toUpperCase()} k={`ig-chip-${i}`} size={18} />
        ))}
      </g>
    </g>
  </g>
);

export function buildIngest(film) {
  const { $, $$, tl, show, unfold, pop, cue, textIn, textOut } = film;
  const t0 = T.ingest;
  const end = T.oauth;
  show($("ingest"), t0 - 0.05, end + 0.15);

  // a slow push, then a dive onto the Drive outpost that lands exactly where
  // the next shot opens (a match cut on the castle)
  const [, dx, dBase, dScale] = DRIVE;
  const z = OAUTH_DRIVE.screenScale / dScale;
  film.camera([$("ig-cam")], { x: 960, y: 540, z: 1 }, [
    [t0, 960, 545, 1.0],
    [end - 1.1, 985, 552, 1.04, "sine.inOut"],
    [end - 0.14, dx - (OAUTH_DRIVE.screenX - 960) / z, dBase - (OAUTH_DRIVE.screenBase - 540) / z, z, "power2.in"],
  ]);

  unfold($$('[data-k^="ig-src-"] > g > *'), t0 + 0.45, { stagger: 0.035, duration: 0.8 });
  cue(t0 + 0.45, "fold", { gain: 0.5 });
  cue(t0 + 0.8, "fold", { gain: 0.4 });
  pop($$('[data-k^="ig-chip-"]'), t0 + 1.0, { stagger: 0.1 });
  cue(t0 + 1.0, "ui", { gain: 0.3 });
  textIn($("cap-ingest"), t0 + 0.6);
  textOut($("cap-ingest"), end - 1.0);

  SOURCES.forEach((_, i) => {
    const base = $(`ig-road-${i}-base`);
    const at = t0 + 0.9 + i * 0.15;
    tl.fromTo(base, { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.1, ease: "power2.inOut", immediateRender: true }, at);
    tl.from($(`ig-road-${i}`).querySelectorAll(".o-stream-hi, .o-stream-pulse"), { autoAlpha: 0, duration: 0.5 }, at + 0.8);
  });
  cue(t0 + 0.9, "data", { gain: 0.4, dur: 1.4 });

  // two videos from every source travel in; each arrival is stamped
  const arrivals = [];
  SOURCES.forEach((_, i) => {
    const els = [0, 1].map((n) => $(`ig-card-${i}-${n}`));
    const times = ride(film, $(`ig-road-${i}-base`), els, {
      run: t0 + 1.9 + i * 0.32,
      period: 2.6,
      once: true,
      gap: 1.7,
      ease: (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2),
    });
    arrivals.push(...times);
  });
  const stamp = $("ig-stamp");
  arrivals
    .filter((t) => t < end - 0.6)
    .sort((a, b) => a - b)
    .forEach((t) => {
      tl.fromTo(stamp, { opacity: 0, scale: 1.6, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)", immediateRender: false }, t - 0.05);
      tl.to(stamp, { opacity: 0, duration: 0.3 }, t + 0.35);
      cue(t - 0.05, "stamp", { gain: 0.32 });
    });

  // clear the labels before the dive so the cut lands on the castle alone
  tl.to($("ig-chips"), { autoAlpha: 0, duration: 0.35 }, end - 0.85);
  cue(end - 0.95, "whoosh", { gain: 0.8, dur: 0.9, rise: true });
}
