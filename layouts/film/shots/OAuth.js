// Google Drive: the owner authorizes BMDRM (OAuth consent), picks the videos
// to import, and only those pass the controlled gate on the road to BMDRM.
import { Castle, Cloud, LockGate, Pine, Range, Ridge } from "@layouts/components/origami";
import { Chip, Cursor, Gatehouse, LockMark, Stepper, VideoCard } from "../kit";
import { T } from "../timing";

const GATE = { x: 1100, base: 810, s: 1.55 };
const ROAD = "M330 790 C 560 800, 840 812, 1100 806 C 1320 800, 1520 796, 1700 792";
const CARD = { x: 230, y: 140, w: 640, h: 386 };
const THUMB = { w: 180, h: 112, x0: 262, y0: 212, gap: 22 };
const thumbAt = (i) => ({
  x: THUMB.x0 + (i % 3) * (THUMB.w + THUMB.gap),
  y: THUMB.y0 + Math.floor(i / 3) * (THUMB.h + THUMB.gap),
});
const SELECTED = [1, 5];
// the cards are drawn at 1:1 and shown 1.25× around (150, 110)
const UI = { x: 150, y: 110, s: 1.25 };
const UI_T = `translate(${UI.x} ${UI.y}) scale(${UI.s}) translate(${-UI.x} ${-UI.y})`;
const ui = (x, y) => [UI.x + (x - UI.x) * UI.s, UI.y + (y - UI.y) * UI.s];

const Folder = ({ x, y }) => (
  <g>
    <path className="o-gold-d" d={`M${x} ${y + 4}h12l4 4h16v20h-32Z`} />
    <path className="o-gold-l" d={`M${x} ${y + 10}h32v18h-32Z`} />
  </g>
);

export const OAuthArt = () => (
  <g data-shot="oauth" data-k="oauth">
    <g data-k="oa-cam">
      <g className="o-tone-haze">
        <Cloud x={1300} y={160} w={130} drift={-40} dur={30} />
        <Cloud x={700} y={110} w={100} drift={40} dur={26} delay={4} />
        <Range base={700} peaks={[[200, 560, 260, true], [760, 420, 190], [1300, 480, 230], [1860, 560, 280, true]]} />
      </g>
      <Ridge base={1300} level="back" points={[[-100, 700], [400, 676], [900, 694], [1400, 670], [2000, 690]]} />
      <Ridge base={1300} level="front" points={[[-100, 800], [500, 784], [1000, 806], [1500, 790], [2000, 800]]} />

      {/* the Drive outpost */}
      <g data-k="oa-drive">
        <Castle variant="keep" x={300} y={800} scale={0.8} />
        <Chip x={300} y={872} label="GOOGLE DRIVE" size={18} />
      </g>
      {/* the road on to BMDRM */}
      <path data-k="oa-road" className="o-stream-base" d={ROAD} style={{ strokeWidth: 10 }} />
      <path className="o-stream-hi" d={ROAD} />
      <g data-k="oa-bmdrm">
        <Castle variant="fortress" x={1760} y={800} scale={0.55} />
        <LockGate x={1760} y={778} r={15} dialClassName="o-dial-turn" />
        <Chip x={1760} y={872} label="BMDRM" size={18} tone="brand" />
      </g>
      <Pine x={560} base={800} h={60} delay={0.5} />
      <Pine x={584} base={804} h={42} delay={1.6} />
      <Pine x={1460} base={800} h={58} delay={2.2} />

      {/* the controlled gate */}
      <Gatehouse x={GATE.x} base={GATE.base} s={GATE.s} k="oa-gate" />

      {/* the consent card */}
      <g data-k="oa-consent">
        <g transform={UI_T}>
        <rect className="fc-drop fc-drop-soft" x={296} y={198} width={560} height={300} rx={18} />
        <rect className="fc-panel" x={290} y={190} width={560} height={300} rx={18} />
        <Folder x={326} y={222} />
        <path className="fc-step-arrow" d="M372 242h24M390 236l6 6-6 6" />
        <LockMark x={424} y={241} h={34} />
        <text x={326} y={308} className="ui-h">
          Connect Google Drive
        </text>
        <text x={326} y={346} className="ui-p">
          BMDRM will only access the files
        </text>
        <text x={326} y={372} className="ui-p">
          and folders you choose.
        </text>
        <rect x={560} y={414} width={120} height={46} rx={23} className="ui-btn-ghost" />
        <text x={620} y={443} className="ui-btn-text-ghost" textAnchor="middle">
          Cancel
        </text>
        <g data-k="oa-allow">
          <rect x={694} y={414} width={130} height={46} rx={23} className="ui-btn" />
          <text x={759} y={443} className="ui-btn-text" textAnchor="middle">
            Allow
          </text>
        </g>
        </g>
      </g>

      {/* the picker */}
      <g data-k="oa-picker">
        <g transform={UI_T}>
        <rect className="fc-drop fc-drop-soft" x={CARD.x + 6} y={CARD.y + 8} width={CARD.w} height={CARD.h} rx={18} />
        <rect className="fc-panel" x={CARD.x} y={CARD.y} width={CARD.w} height={CARD.h} rx={18} />
        <text x={CARD.x + 32} y={CARD.y + 48} className="ui-h">
          Select videos
        </text>
        <g data-k="oa-count" opacity="0">
          <text x={CARD.x + CARD.w - 32} y={CARD.y + 46} className="ui-count" textAnchor="end">
            2 selected
          </text>
        </g>
        {Array.from({ length: 6 }, (_, i) => {
          const { x, y } = thumbAt(i);
          return (
            <g key={i} data-k={`oa-thumb-${i}`}>
              <VideoCard x={x} y={y} w={THUMB.w} h={THUMB.h} art={i} lines={false} />
              <g data-k={`oa-sel-${i}`} opacity="0">
                <rect x={x - 4} y={y - 4} width={THUMB.w + 8} height={THUMB.h + 8} rx={9} className="ui-sel" />
                <circle cx={x + THUMB.w - 6} cy={y + 6} r={13} className="fc-stamp" />
                <path d={`M${x + THUMB.w - 12} ${y + 6}l4 4 8 -9`} className="fc-check" />
              </g>
            </g>
          );
        })}
        </g>
      </g>
      <g data-k="oa-import">
        <g transform={UI_T}>
        <rect x={CARD.x + CARD.w - 162} y={CARD.y + CARD.h + 18} width={130} height={46} rx={23} className="ui-btn" />
        <text x={CARD.x + CARD.w - 97} y={CARD.y + CARD.h + 47} className="ui-btn-text" textAnchor="middle">
          Import
        </text>
        </g>
      </g>

      {/* the chosen two, on their way */}
      {SELECTED.map((n, i) => (
        <g key={n} data-k={`oa-fly-${i}`} opacity="0">
          <g data-k={`oa-fly-${i}-in`}>
            <VideoCard x={-THUMB.w / 2} y={-THUMB.h / 2} w={THUMB.w} h={THUMB.h} art={n} lines={false} />
          </g>
        </g>
      ))}

      <Stepper x={960} y={1010} steps={["GOOGLE DRIVE", "AUTHORIZE", "SELECT", "BMDRM"]} k="oa-steps" />
      <g data-k="oa-cursor-pos">
        <Cursor k="oa-cursor" />
      </g>
    </g>
  </g>
);

export function buildOAuth(film) {
  const { $, $$, tl, show, unfold, fold, pop, cue, textIn, textOut, every } = film;
  const t0 = T.oauth;
  const end = T.shield;
  // opens on the Drive outpost exactly where the previous shot's dive lands,
  // holds through the dissolve, then pulls back
  show($("oauth"), t0 - 0.14, end + 0.1);
  tl.from($("oauth"), { autoAlpha: 0, duration: 0.24, ease: "power1.out" }, t0 - 0.14);
  film.camera([$("oa-cam")], { x: 960, y: 540, z: 1 }, [
    [t0 - 0.14, 330, 640, 1.9],
    [t0 + 0.12, 330, 640, 1.9, "none"],
    [t0 + 1.15, 960, 540, 1, "power3.inOut"],
    [end, 960, 540, 1.03, "sine.inOut"],
  ]);

  // steps
  const lit = (i) => [$(`oa-steps-${i}-on`), $(`oa-steps-${i}-ont`)];
  tl.set([0, 1, 2, 3].flatMap(lit), { autoAlpha: 0 }, 0);
  const step = (i, at) => {
    tl.fromTo(lit(i), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35, immediateRender: false }, at);
    cue(at, "ui", { gain: 0.35, pitch: 1 + i * 0.1 });
  };
  tl.from($("oa-steps"), { autoAlpha: 0, y: 20, duration: 0.8, ease: "expo.out" }, t0 + 0.6);
  step(0, t0 + 0.9);

  textIn($("cap-oauth"), t0 + 0.7);
  textOut($("cap-oauth"), end - 0.9);

  // consent
  unfold($("oa-consent"), t0 + 1.0, { dir: "down", duration: 0.8 });
  cue(t0 + 1.0, "fold", { gain: 0.6 });
  const cursor = $("oa-cursor-pos");
  // cursor path: [time, x, y]
  const path = [
    [t0 + 1.4, 1060, 760],
    [t0 + 2.2, ...ui(760, 440)],
    [t0 + 3.4, ...ui(760, 440)],
    [t0 + 4.0, ...ui(600, 330)],
    [t0 + 4.6, ...ui(560, 276)],
    [t0 + 5.2, ...ui(760, 402)],
    [t0 + 5.9, ...ui(744, 567)],
    [t0 + 7.5, 1000, 860],
  ];
  tl.set(cursor, { autoAlpha: 0 }, 0);
  tl.to(cursor, { autoAlpha: 1, duration: 0.3 }, path[0][0] - 0.3);
  tl.to(cursor, { autoAlpha: 0, duration: 0.3 }, path[path.length - 1][0] - 0.2);
  every((t) => {
    let x = path[0][1];
    let y = path[0][2];
    for (let i = 1; i < path.length; i += 1) {
      const [ta, xa, ya] = path[i - 1];
      const [tb, xb, yb] = path[i];
      if (t >= ta && t <= tb) {
        const k = (t - ta) / (tb - ta);
        const e = k < 0.5 ? 4 * k * k * k : 1 - (-2 * k + 2) ** 3 / 2;
        x = xa + (xb - xa) * e;
        y = ya + (yb - ya) * e;
        break;
      }
      if (t > tb) {
        x = xb;
        y = yb;
      }
    }
    cursor.setAttribute("transform", `translate(${x.toFixed(1)} ${y.toFixed(1)})`);
  });
  const click = (at) => {
    tl.fromTo($("oa-cursor-ring"), { scale: 0.2, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 1.4, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, at);
    cue(at, "click", { gain: 0.7 });
  };
  tl.set($("oa-cursor-ring"), { opacity: 0 }, 0);

  // Allow
  click(t0 + 2.35);
  tl.to($("oa-allow"), { scale: 0.94, transformOrigin: "50% 50%", duration: 0.1, yoyo: true, repeat: 1 }, t0 + 2.3);
  step(1, t0 + 2.45);
  fold($("oa-consent"), t0 + 2.75, { dir: "up", duration: 0.45 });
  cue(t0 + 2.75, "fold", { gain: 0.4, pitch: 1.2 });
  tl.to($("oa-gate-bars"), { scaleY: 0.16, transformOrigin: "50% 0%", duration: 1.0, ease: "power2.inOut" }, t0 + 2.8);
  tl.to($("oa-gate-glow"), { opacity: 0.8, duration: 0.6 }, t0 + 3.2);
  cue(t0 + 2.8, "gate", { gain: 0.7 });

  // pick two
  unfold($("oa-picker"), t0 + 3.2, { dir: "down", duration: 0.8 });
  unfold($$('[data-k^="oa-thumb-"]'), t0 + 3.5, { dir: "up", stagger: 0.06, duration: 0.6 });
  cue(t0 + 3.2, "fold", { gain: 0.55 });
  const pick = (n, at) => {
    click(at);
    pop($(`oa-sel-${n}`), at + 0.05, { scale: 0.7 });
    tl.set($(`oa-sel-${n}`), { opacity: 1 }, at + 0.05);
  };
  pick(1, t0 + 4.6);
  step(2, t0 + 4.65);
  tl.set($("oa-count"), { opacity: 1 }, t0 + 4.65);
  pop($("oa-count"), t0 + 4.65);
  pick(5, t0 + 5.2);
  unfold($("oa-import"), t0 + 3.9, { dir: "up", duration: 0.5 });
  click(t0 + 5.9);

  // the unselected stay home; the chosen two fly to the gate and down the road
  tl.to($$('[data-k^="oa-thumb-"]').filter((_, i) => !SELECTED.includes(i)), { opacity: 0.35, duration: 0.4 }, t0 + 6.0);
  SELECTED.forEach((n, i) => {
    const el = $(`oa-fly-${i}`);
    const inner = $(`oa-fly-${i}-in`);
    const { x, y } = thumbAt(n);
    const [fx, fy] = ui(x + THUMB.w / 2, y + THUMB.h / 2);
    const start = t0 + 6.1 + i * 0.25;
    tl.set(el, { opacity: 1, x: fx, y: fy }, start);
    tl.fromTo(inner, { scale: UI.s, transformOrigin: "50% 50%" }, { scale: 0.5, duration: 0.7, ease: "power2.inOut", immediateRender: false }, start);
    tl.to(el, { x: GATE.x - 30, y: 774, duration: 0.9, ease: "power2.inOut" }, start);
    tl.to(el, { x: 1690, y: 772, duration: 1.4, ease: "power1.inOut" }, start + 0.9);
    tl.to(el, { opacity: 0, duration: 0.3 }, start + 2.2);
    cue(start, "whoosh", { gain: 0.35, dur: 0.8 });
    cue(start + 2.2, "pop", { gain: 0.4 });
  });
  fold($("oa-picker"), t0 + 6.9, { dir: "up", duration: 0.5 });
  fold($("oa-import"), t0 + 6.9, { dir: "up", duration: 0.4 });
  step(3, t0 + 8.5);
  tl.to($("oa-gate-bars"), { scaleY: 1, duration: 0.8, ease: "power2.inOut" }, t0 + 8.6);
  tl.to($("oa-gate-glow"), { opacity: 0, duration: 0.5 }, t0 + 8.6);
}
