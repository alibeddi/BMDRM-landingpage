// Playback. An authorized viewer watches in a player that takes on the
// brand (accent, shape, logo), with a watermark on protected playback, while
// an attempt to capture the picture is turned away.
import { HangingBanner, Place, Ridge } from "@layouts/components/origami";
import { Chip, Cursor, Leader, Player, ShieldPane } from "../kit";
import { T } from "../timing";

const P = { x: 600, y: 300, w: 920 };
const BAR = 54;
const FILM_W = P.w - 16;
const FILM_H = Math.round(FILM_W / 1.8919);
P.h = FILM_H + 8 + BAR;
// the picture inside the player, where the next shot lands
export const PLAYER_FILM = { x: P.x + 8, y: P.y + 8, w: FILM_W, h: FILM_H };

const SWATCHES = [
  ["#6c2aca", "#8c57ff"],
  ["#fe7c7e", "#ffa89e"],
  ["#16112b", "#57536a"],
];
const SW = { x: 1572, y: 420 };

export const PlayerArt = () => (
  <g data-shot="player" data-k="player">
    <g data-k="pl-cam">
      <Ridge base={1200} level="front" points={[[-100, 930], [500, 916], [1100, 934], [1600, 920], [2020, 930]]} />
      <HangingBanner x={300} y={-6} w={70} h={230} delay={0.8} />
      <g data-k="pl-viewer">
        <Place name="messenger" x={250} y={926 - 331 * 0.9} scale={0.9} />
      </g>
      <g data-k="pl-player" style={{ "--pl-accent": SWATCHES[0][0], "--pl-accent-2": SWATCHES[0][1] }}>
        <Player x={P.x} y={P.y} w={P.w} h={P.h} k="pl" />
      </g>
      <g data-k="pl-theme">
        <rect className="fc-drop fc-drop-soft" x={SW.x + 4} y={SW.y + 6} width={196} height={238} rx={14} />
        <rect className="fc-panel" x={SW.x} y={SW.y} width={196} height={238} rx={14} />
        <text x={SW.x + 18} y={SW.y + 32} className="fw-panel-title">
          PLAYER THEME
        </text>
        {SWATCHES.map(([a, b], i) => (
          <g key={a} data-k={`pl-sw-${i}`}>
            <circle cx={SW.x + 42 + i * 56} cy={SW.y + 80} r={20} fill={a} />
            <path d={`M${SW.x + 42 + i * 56} ${SW.y + 60}A20 20 0 0 0 ${SW.x + 42 + i * 56} ${SW.y + 100}Z`} fill={b} />
          </g>
        ))}
        <circle data-k="pl-sw-ring" cx={SW.x + 42} cy={SW.y + 80} r={26} className="pl-sw-ring" />
        <text x={SW.x + 18} y={SW.y + 140} className="fw-panel-title">
          CORNERS
        </text>
        <rect x={SW.x + 18} y={SW.y + 156} width={70} height={46} rx={4} className="pl-shape" />
        <rect x={SW.x + 104} y={SW.y + 156} width={70} height={46} rx={18} className="pl-shape" />
        <rect data-k="pl-shape-ring" x={SW.x + 14} y={SW.y + 152} width={78} height={54} rx={7} className="pl-sw-ring" opacity="0" />
      </g>
      <Leader x1={P.x + P.w - 90} y1={P.y + P.h - BAR - 40} x2={P.x + P.w + 60} y2={P.y + P.h + 34} label="Watermarking" k="pl-wm-label" size={19} />

      {/* the capture attempt */}
      <g data-k="pl-capture" opacity="0">
        <g data-k="pl-capture-in">
          <rect x={-200} y={-120} width={400} height={240} className="pl-cap-fill" />
          <g data-k="pl-cap-blocked" opacity="0">
            <rect x={-200} y={-120} width={400} height={240} className="pl-cap-block" />
            <rect x={-200} y={-120} width={400} height={240} className="o-diamond pl-cap-pattern" />
          </g>
          <path className="pl-cap" d="M-200 -80V-120H-160M160 -120H200V-80M200 80V120H160M-160 120H-200V80" />
          <circle cx={-170} cy={-96} r={7} className="pl-rec" />
          <text x={-156} y={-90} className="pl-rec-text">
            REC
          </text>
        </g>
      </g>
      <g data-k="pl-pane">
        <ShieldPane x={P.x + P.w / 2} y={P.y + FILM_H / 2 + 8} w={120} h={138} />
      </g>
      <Chip x={P.x + P.w / 2} y={P.y + FILM_H + 120} label="CAPTURE BLOCKED" k="pl-blocked" tone="coral" size={18} />
      <g data-k="pl-cursor-pos">
        <Cursor k="pl-cursor" />
      </g>
    </g>
  </g>
);

export function buildPlayer(film) {
  const { $, $$, tl, show, unfold, fold, pop, cue, every, textIn, textOut } = film;
  const t0 = T.player;
  const t1 = T.capture;
  const end = T.kingdomAll;
  show($("player"), t0 - 0.1, end + 0.4);
  tl.to($("player"), { autoAlpha: 0, duration: 0.4, ease: "power1.in" }, end + 0.02);
  film.camera([$("pl-cam")], { x: 960, y: 540, z: 1 }, [
    [t0, 960, 560, 1.06],
    [t0 + 1.4, 960, 540, 1.0, "power3.out"],
    [end, 960, 540, 1.0, "none"],
  ]);

  unfold($("pl-player"), t0 + 0.3, { dir: "down", duration: 0.9 });
  cue(t0 + 0.3, "fold", { gain: 0.6 });
  unfold($$('[data-k="pl-viewer"] .o-part'), t0 + 0.5);
  unfold($("pl-theme"), t0 + 1.4, { dir: "down", duration: 0.7 });
  cue(t0 + 1.4, "fold", { gain: 0.4, pitch: 1.2 });
  textIn($("cap-player"), t0 + 0.6);
  textOut($("cap-player"), t0 + 4.9);

  // the picture plays: clouds drift, the bird glides, the bar fills
  const cloud = $("pl-film-cloud");
  const bird = $("pl-film-bird");
  const sun = $("pl-film-sun");
  const progress = $("pl-progress");
  const knob = $("pl-knob");
  const trackW = P.w - 220;
  const pcloud = $("w-pav-film-cloud");
  const pbird = $("w-pav-film-bird");
  every((t) => {
    const k = Math.max(0, t - t0);
    const cx = (k * 9) % 200;
    cloud.setAttribute("transform", `translate(${cx.toFixed(1)} 0)`);
    bird.setAttribute("transform", `translate(${(-k * 14).toFixed(1)} ${(Math.sin(k * 2) * 6).toFixed(1)})`);
    sun.setAttribute("opacity", (0.85 + Math.sin(k * 1.3) * 0.15).toFixed(3));
    const p = Math.min(1, 0.08 + k / 22);
    progress.setAttribute("width", (trackW * p).toFixed(1));
    knob.setAttribute("cx", (64 + trackW * p).toFixed(1));
    // the pavilion screen in the kingdom plays the same picture
    if (pcloud) pcloud.setAttribute("transform", `translate(${((cx * 280) / FILM_W).toFixed(2)} 0)`);
    if (pbird) pbird.setAttribute("transform", `translate(${((-k * 14 * 280) / FILM_W).toFixed(2)} ${((Math.sin(k * 2) * 6 * 280) / FILM_W).toFixed(2)})`);
  });

  // the theme follows the brand
  const cursor = $("pl-cursor-pos");
  const swatch = (i) => ({ x: SW.x + 42 + i * 56, y: SW.y + 80 });
  const path = [
    [t0 + 1.8, 1500, 980],
    [t0 + 2.4, swatch(1).x + 4, swatch(1).y + 6],
    [t0 + 3.2, swatch(1).x + 4, swatch(1).y + 6],
    [t0 + 3.6, swatch(2).x + 4, swatch(2).y + 6],
    [t0 + 4.1, swatch(2).x + 4, swatch(2).y + 6],
    [t0 + 4.5, SW.x + 140, SW.y + 182],
    [t0 + 4.9, SW.x + 140, SW.y + 182],
    [t0 + 5.3, swatch(0).x + 4, swatch(0).y + 6],
    [t0 + 5.8, swatch(0).x + 4, swatch(0).y + 6],
    [t0 + 6.4, 1820, 1000],
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
  const ring = $("pl-cursor-ring");
  tl.set(ring, { opacity: 0 }, 0);
  const click = (at) => {
    tl.fromTo(ring, { scale: 0.2, opacity: 0.9, transformOrigin: "50% 50%" }, { scale: 1.4, opacity: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, at);
    cue(at, "click", { gain: 0.6 });
  };
  const player = $("pl-player");
  const frame = $("pl-frame");
  const swRing = $("pl-sw-ring");
  const theme = (i, at) => {
    click(at);
    tl.to(player, { "--pl-accent": SWATCHES[i][0], "--pl-accent-2": SWATCHES[i][1], duration: 0.5, ease: "power2.out" }, at + 0.05);
    tl.to(swRing, { attr: { cx: swatch(i).x }, duration: 0.35, ease: "power2.out" }, at + 0.05);
    cue(at + 0.08, "pulse", { gain: 0.3, pitch: 1.2 + i * 0.15 });
  };
  theme(1, t0 + 2.5);
  tl.to($("pl-brand"), { opacity: 0, duration: 0.3 }, t0 + 2.7);
  tl.to($("pl-brand2"), { opacity: 1, duration: 0.3 }, t0 + 2.8);
  theme(2, t0 + 3.7);
  click(t0 + 4.6);
  tl.to($("pl-shape-ring"), { opacity: 1, duration: 0.2 }, t0 + 4.65);
  tl.to(frame, { attr: { rx: 30 }, duration: 0.5, ease: "power2.out" }, t0 + 4.65);
  theme(0, t0 + 5.4);
  tl.to($("pl-brand2"), { opacity: 0, duration: 0.3 }, t0 + 5.6);
  tl.to($("pl-brand"), { opacity: 1, duration: 0.3 }, t0 + 5.7);
  tl.to($("pl-shape-ring"), { opacity: 0, duration: 0.3 }, t0 + 5.6);
  tl.to(frame, { attr: { rx: 14 }, duration: 0.5, ease: "power2.out" }, t0 + 5.6);

  // watermark
  const wm = $("pl-wm");
  tl.to(wm, { opacity: 1, duration: 1.0, ease: "power1.inOut" }, t0 + 5.3);
  const label = $("pl-wm-label");
  tl.from(label, { autoAlpha: 0, duration: 0.3 }, t0 + 5.6);
  tl.fromTo(label.querySelector(".fc-leader"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.5, ease: "power2.out", immediateRender: true }, t0 + 5.6);
  cue(t0 + 5.4, "shimmer", { gain: 0.45 });
  textIn($("cap-watermark"), t0 + 5.4);
  textOut($("cap-watermark"), t1 - 0.5);
  tl.to(label, { autoAlpha: 0, duration: 0.4 }, t1 + 0.2);
  fold($("pl-theme"), t1 + 0.1, { dir: "up", duration: 0.45 });

  // a capture attempt is turned away
  textIn($("cap-capture"), t1 + 0.3);
  textOut($("cap-capture"), end - 0.6);
  const cap = $("pl-capture");
  const capIn = $("pl-capture-in");
  const c0 = t1 + 0.5;
  const centre = { x: P.x + P.w / 2, y: P.y + 8 + FILM_H / 2 };
  tl.set(cap, { opacity: 1 }, c0);
  tl.fromTo(capIn, { x: centre.x - 760, y: centre.y + 260, scale: 0.7, rotation: -8, transformOrigin: "50% 50%" }, { x: centre.x - 40, y: centre.y + 10, scale: 1, rotation: -3, duration: 1.0, ease: "power3.out", immediateRender: true }, c0);
  cue(c0, "whoosh", { gain: 0.45, dur: 1.0 });
  cue(c0 + 0.9, "click", { gain: 0.5, pitch: 0.7 });
  tl.set($("pl-pane"), { autoAlpha: 0 }, 0);
  tl.set($("pl-pane"), { autoAlpha: 1 }, c0 + 1.1);
  tl.from($("pl-pane"), { scale: 0.2, transformOrigin: "50% 50%", duration: 0.5, ease: "back.out(1.8)" }, c0 + 1.1);
  cue(c0 + 1.1, "deny", { gain: 0.65 });
  tl.to($("pl-cap-blocked"), { opacity: 1, duration: 0.25 }, c0 + 1.2);
  tl.set($("pl-blocked"), { autoAlpha: 0 }, 0);
  tl.set($("pl-blocked"), { autoAlpha: 1 }, c0 + 1.3);
  pop($("pl-blocked"), c0 + 1.3);
  tl.to(cap, { opacity: 0.25, duration: 0.06, yoyo: true, repeat: 5 }, c0 + 1.6);
  tl.to(capIn, { scale: 0.6, rotation: 6, x: centre.x - 700, y: centre.y + 320, duration: 0.7, ease: "power2.in" }, c0 + 2.3);
  tl.to(cap, { opacity: 0, duration: 0.3 }, c0 + 2.7);
  tl.to($("pl-blocked"), { autoAlpha: 0, duration: 0.3 }, c0 + 2.8);
  fold($("pl-pane"), end - 1.2, { dir: "up", duration: 0.45 });
  tl.to(wm, { opacity: 0.6, duration: 0.6 }, end - 1.0);
}

