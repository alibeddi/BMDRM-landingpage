// The archive, inside the castle: the video library as shelves of video
// cards (status, categories), and one video opened like a dashboard detail.
import { Ridge } from "@layouts/components/origami";
import { Chip, Cursor, LockMark, Thumb, VideoCard } from "../kit";
import { T } from "../timing";

const BAYS = [380, 960, 1540];
const CATEGORIES = ["COURSES", "WEBINARS", "MARKETING"];
const CARD = { w: 86, h: 60, gap: 22 };
const PLANKS = [440, 550, 660, 770, 880];
const PROCESSING = ["0-3-1", "1-0-3", "2-2-0", "1-4-2"];
const PULL = { bay: 1, row: 1, col: 2 };
const PANEL = { x: 1226, y: 292, w: 540, h: 586 };
const BIG = { x: PANEL.x + 25, y: PANEL.y + 25, w: 490, h: 342 };

const cardAt = (bay, row, col) => ({
  x: BAYS[bay] - 205 + col * (CARD.w + CARD.gap),
  y: PLANKS[row] - CARD.h - 4,
});

const Bay = ({ cx, i }) => (
  <g>
    <path className="lb-bay" d={`M${cx - 235} 900V360A420 420 0 0 1 ${cx + 235} 360V900Z`} />
    <path className="lb-bay-arch" d={`M${cx - 235} 360A420 420 0 0 1 ${cx + 235} 360`} />
    {PLANKS.map((y) => (
      <g key={y}>
        <path className="o-wood-l" d={`M${cx - 226} ${y}H${cx + 226}V${y + 6}H${cx - 226}Z`} />
        <path className="o-wood-d" d={`M${cx - 226} ${y + 6}H${cx + 226}V${y + 12}H${cx - 226}Z`} />
      </g>
    ))}
    <Chip x={cx} y={318} label={CATEGORIES[i]} k={`lb-cat-${i}`} size={16} />
  </g>
);

const Pillar = ({ x }) => (
  <g>
    <path className="o-wall-l" d={`M${x} 900V300H${x + 60}V900Z`} />
    <path className="o-wall-d" d={`M${x + 60} 900V300H${x + 110}V900Z`} />
    <path className="o-ledge" d={`M${x - 8} 300H${x + 118}V312H${x - 8}Z`} />
    <path className="o-ledge" d={`M${x - 8} 888H${x + 118}V900H${x - 8}Z`} />
  </g>
);

export const LibraryArt = () => (
  <g data-shot="library" data-k="library">
    <rect width="1920" height="1080" className="sh-lilac" />
    <g data-k="lb-cam">
      <path className="lb-wall-top" d="M0 0H1920V250H0Z" />
      {BAYS.map((cx, i) => (
        <Bay key={cx} cx={cx} i={i} />
      ))}
      <Pillar x={615} />
      <Pillar x={1195} />
      <Pillar x={40} />
      <Pillar x={1770} />
      <Ridge base={1200} level="front" points={[[-100, 902], [600, 896], [1300, 906], [2020, 898]]} />

      {BAYS.map((cx, bay) =>
        PLANKS.map((_, row) =>
          [0, 1, 2, 3].map((col) => {
            const { x, y } = cardAt(bay, row, col);
            const id = `${bay}-${row}-${col}`;
            const busy = PROCESSING.includes(id);
            const pulled = bay === PULL.bay && row === PULL.row && col === PULL.col;
            return (
              <g key={id} data-k={`lb-card-${id}`} data-row={row} className="lb-card">
                <VideoCard x={x} y={y} w={CARD.w} h={CARD.h} art={(bay * 7 + row * 3 + col) % 6} lines={false} play={false} />
                {!pulled && <circle cx={x + CARD.w - 10} cy={y + 10} r={5} className="lb-dot" />}
                {busy && (
                  <g data-k={`lb-busy-${id}`}>
                    <circle cx={x + CARD.w - 10} cy={y + 10} r={6} className="lb-dot-busy" />
                    <g className="lb-spin" style={{ transformOrigin: `${x + CARD.w - 10}px ${y + 10}px` }}>
                      <path d={`M${x + CARD.w - 10} ${y + 2}a8 8 0 0 1 8 8`} className="lb-spin-arc" />
                    </g>
                  </g>
                )}
              </g>
            );
          }),
        ),
      )}
      <g data-k="lb-transcode" opacity="0">
        <Chip x={BAYS[0]} y={960} label="TRANSCODING" dot="gold" size={16} />
      </g>

      {/* the opened video */}
      <g data-k="lb-panel">
        <rect className="fc-drop fc-drop-soft" x={PANEL.x + 8} y={PANEL.y + 12} width={PANEL.w} height={PANEL.h} rx={18} />
        <rect className="fc-panel" x={PANEL.x} y={PANEL.y} width={PANEL.w} height={PANEL.h} rx={18} />
        <Thumb x={BIG.x} y={BIG.y} w={BIG.w} h={BIG.h} art={(1 * 7 + 1 * 3 + 2) % 6} rx={10} />
        <circle cx={BIG.x + BIG.w / 2} cy={BIG.y + BIG.h / 2} r={36} className="fc-play-disc" />
        <path d={`M${BIG.x + BIG.w / 2 - 11} ${BIG.y + BIG.h / 2 - 16}L${BIG.x + BIG.w / 2 + 17} ${BIG.y + BIG.h / 2}L${BIG.x + BIG.w / 2 - 11} ${BIG.y + BIG.h / 2 + 16}Z`} className="fc-play" />
        <text x={BIG.x} y={BIG.y + BIG.h + 46} className="ui-h">
          Course intro.mp4
        </text>
        <g data-k="lb-chips">
          <Chip x={BIG.x + 52} y={BIG.y + BIG.h + 84} label="READY" dot="brand" size={12} />
          <g>
            <Chip x={BIG.x + 190} y={BIG.y + BIG.h + 84} label="PROTECTED" size={12} tone="brand" />
          </g>
        </g>
        <g data-k="lb-share">
          <rect x={BIG.x} y={BIG.y + BIG.h + 118} width={230} height={46} rx={23} className="ui-btn" />
          <LockMark x={BIG.x + 30} y={BIG.y + BIG.h + 141} h={22} />
          <text x={BIG.x + 128} y={BIG.y + BIG.h + 147} className="ui-btn-text" textAnchor="middle">
            Share secure link
          </text>
        </g>
        <g data-k="lb-spark">
          <text x={BIG.x + 300} y={BIG.y + BIG.h + 132} className="fw-panel-title lb-spark-title">
            VIEWS
          </text>
          <path data-k="lb-spark-line" className="fw-line" pathLength="1" d={`M${BIG.x + 300} ${BIG.y + BIG.h + 166}l20 -6 20 4 20 -12 20 2 20 -14 20 6 20 -16 20 -4`} />
        </g>
      </g>
      <g data-k="lb-pull" opacity="0">
        <g data-k="lb-pull-in">
          <VideoCard x={-CARD.w / 2} y={-CARD.h / 2} w={CARD.w} h={CARD.h} art={(1 * 7 + 1 * 3 + 2) % 6} lines={false} play={false} />
        </g>
      </g>
      <g data-k="lb-copied" opacity="0">
        <Chip x={BIG.x + 150} y={BIG.y + BIG.h + 216} label="SECURE LINK COPIED" dot="brand" size={16} />
      </g>
      <g data-k="lb-cursor-pos">
        <Cursor k="lb-cursor" />
      </g>
    </g>
    <rect data-k="lb-glass" width="1920" height="1080" className="lb-glass" />
  </g>
);

export function buildLibrary(film) {
  const { $, $$, tl, show, unfold, pop, cue, every, textIn, textOut } = film;
  const t0 = T.library;
  const end = T.tower;
  show($("library"), t0 - 0.03, end + 0.05);
  film.camera([$("lb-cam")], { x: 960, y: 540, z: 1 }, [
    [t0, 960, 520, 1.5],
    [t0 + 1.6, 960, 540, 1.0, "power3.out"],
    [end - 0.8, 960, 540, 1.02, "sine.inOut"],
    [end, 1060, 520, 1.2, "power2.in"],
  ]);
  const glass = $("lb-glass");
  tl.fromTo(glass, { opacity: 1 }, { opacity: 0, duration: 0.5, ease: "power1.out", immediateRender: true }, t0);
  tl.to(glass, { opacity: 1, duration: 0.45, ease: "power1.in" }, end - 0.45);

  // the shelves fill, row by row
  const cards = $$(".lb-card");
  tl.from(cards, { autoAlpha: 0, y: -26, duration: 0.5, ease: "back.out(1.4)", stagger: { each: 0.011, from: "start" } }, t0 + 0.25);
  cue(t0 + 0.3, "shuffle", { gain: 0.5, dur: 0.9 });
  CATEGORIES.forEach((_, i) => pop($(`lb-cat-${i}`), t0 + 0.6 + i * 0.12));
  cue(t0 + 0.6, "ui", { gain: 0.3 });
  textIn($("cap-library"), t0 + 0.5);
  textOut($("cap-library"), end - 0.8);

  // some videos are still being transcoded, then turn ready
  tl.set($("lb-transcode"), { opacity: 1 }, t0 + 1.2);
  pop($("lb-transcode"), t0 + 1.2);
  tl.to($("lb-transcode"), { opacity: 0, duration: 0.4 }, t0 + 4.6);
  PROCESSING.forEach((id, i) => {
    tl.to($(`lb-busy-${id}`), { opacity: 0, duration: 0.3 }, t0 + 3.4 + i * 0.25);
    cue(t0 + 3.4 + i * 0.25, "pulse", { gain: 0.25, pitch: 1.5 + i * 0.1 });
  });

  // a cursor opens one video
  const cursor = $("lb-cursor-pos");
  const { x: px, y: py } = cardAt(PULL.bay, PULL.row, PULL.col);
  const target = { x: px + CARD.w / 2, y: py + CARD.h / 2 };
  const shareBtn = { x: 1251 + 160, y: 292 + 25 + 342 + 141 };
  const path = [
    [t0 + 1.4, 760, 980],
    [t0 + 2.3, target.x + 4, target.y + 6],
    [t0 + 2.9, target.x + 4, target.y + 6],
    [t0 + 3.6, 1180, 760],
    [t0 + 4.3, shareBtn.x, shareBtn.y],
    [t0 + 5.6, shareBtn.x, shareBtn.y],
    [t0 + 6.4, 1500, 1000],
  ];
  tl.set(cursor, { autoAlpha: 0 }, 0);
  tl.to(cursor, { autoAlpha: 1, duration: 0.3 }, path[0][0] - 0.2);
  tl.to(cursor, { autoAlpha: 0, duration: 0.3 }, path[path.length - 1][0] - 0.3);
  every((t) => {
    let x = path[0][1];
    let y = path[0][2];
    for (let i = 1; i < path.length; i += 1) {
      const [ta, xa, ya] = path[i - 1];
      const [tb, xb, yb] = path[i];
      if (t > tb) {
        x = xb;
        y = yb;
      } else if (t >= ta) {
        const k = (t - ta) / (tb - ta);
        const e = k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2;
        x = xa + (xb - xa) * e;
        y = ya + (yb - ya) * e;
        break;
      }
    }
    cursor.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  });
  const ring = $("lb-cursor-ring");
  tl.set(ring, { opacity: 0 }, 0);
  const click = (at) => {
    tl.fromTo(ring, { scale: 0.2, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 1.4, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, at);
    cue(at, "click", { gain: 0.65 });
  };
  click(t0 + 2.4);

  // the card lifts off the shelf and opens into the detail panel
  const pull = $("lb-pull");
  const pullIn = $("lb-pull-in");
  const lift = t0 + 2.55;
  const scale = BIG.w / CARD.w;
  tl.set($(`lb-card-${PULL.bay}-${PULL.row}-${PULL.col}`), { opacity: 0.25 }, lift);
  tl.set(pull, { opacity: 1, x: target.x, y: target.y }, lift);
  tl.to(pull, { x: BIG.x + BIG.w / 2, y: BIG.y + BIG.h / 2, duration: 0.8, ease: "power3.inOut" }, lift);
  tl.to(pullIn, { scale, transformOrigin: "50% 50%", duration: 0.8, ease: "power3.inOut" }, lift);
  tl.to(pull, { opacity: 0, duration: 0.2 }, lift + 0.85);
  cue(lift, "whoosh", { gain: 0.4, dur: 0.8 });
  tl.set($("lb-panel"), { autoAlpha: 0 }, 0);
  tl.set($("lb-panel"), { autoAlpha: 1 }, lift + 0.55);
  unfold($("lb-panel"), lift + 0.55, { dir: "down", duration: 0.7 });
  cue(lift + 0.6, "fold", { gain: 0.5 });
  pop($$('[data-k="lb-chips"] > g'), lift + 1.1, { stagger: 0.12 });
  tl.fromTo($("lb-spark-line"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1, ease: "power2.inOut", immediateRender: true }, lift + 1.2);
  cue(lift + 1.1, "ui", { gain: 0.3 });

  // share a secure link
  click(t0 + 4.4);
  tl.to($("lb-share"), { scale: 0.95, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1 }, t0 + 4.35);
  tl.set($("lb-copied"), { opacity: 1 }, t0 + 4.5);
  pop($("lb-copied"), t0 + 4.5);
  cue(t0 + 4.55, "chime", { gain: 0.35, notes: [86] });
  cue(end - 0.5, "whoosh", { gain: 0.7, dur: 1.2 });
}
