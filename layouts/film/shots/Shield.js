// The shield: the knight brings the great BMDRM shield, which assembles
// around the video; the video folds its corners in (a blintz fold) and is
// sealed — encrypted, protected, ready to travel.
import { HangingBanner, Place, Ridge } from "@layouts/components/origami";
import { CORNERS, FoldCard, GreatShield, Leader, Seal, flapClass, flapPath } from "../kit";
import { T } from "../timing";

export const SHIELD_CARD = { x: 1000, y: 610, a: 118 };
const { x: CX, y: CY, a: A } = SHIELD_CARD;

const LABELS = [
  [CX + 210, CY - 170, CX + 360, CY - 236, "Encryption", "01"],
  [CX + 236, CY - 60, CX + 420, CY - 96, "DRM", "02"],
  [CX + 232, CY + 50, CX + 440, CY + 44, "Access control", "03"],
  [CX + 190, CY + 150, CX + 410, CY + 184, "Watermarking", "04"],
  [CX + 100, CY + 236, CX + 340, CY + 318, "Protected delivery", "05"],
];

export const ShieldArt = () => (
  <g data-shot="shield" data-k="shield">
    <rect width="1920" height="1080" className="sh-lilac" />
    <rect width="1920" height="1080" className="sh-stripes" />
    <g data-k="sh-cam">
      <Ridge base={1200} level="front" points={[[-100, 900], [400, 884], [960, 906], [1500, 888], [2020, 902]]} />
      <HangingBanner x={170} y={-6} w={88} h={300} delay={0.5} />
      <HangingBanner x={1750} y={-6} w={88} h={300} delay={1.7} />
      <g data-k="sh-knight">
        <g data-k="sh-knight-walk">
          <Place name="knight" x={230} y={894 - 331 * 1.05} scale={1.05} />
        </g>
      </g>
      <GreatShield x={CX} y={CY - 6} w={232} h={262} k="sh-great" />
      <g data-k="sh-card">
        <g data-k="sh-card-bob">
          <FoldCard x={CX} y={CY} a={A} k="sh-fold" />
        </g>
      </g>
      <g data-k="sh-seal">
        <Seal x={CX} y={CY} r={36} />
      </g>
      {LABELS.map(([x1, y1, x2, y2, label, fig], i) => (
        <Leader key={label} x1={x1} y1={y1} x2={x2} y2={y2} label={label} fig={`FIG. ${fig}`} k={`sh-label-${i}`} size={20} />
      ))}
    </g>
  </g>
);

export function buildShield(film) {
  const { $, tl, show, cue, every, textIn, textOut } = film;
  const t0 = T.shield;
  const end = T.layers;
  show($("shield"), t0 - 0.05, end + 0.05);
  film.camera([$("sh-cam")], { x: 960, y: 540, z: 1 }, [
    [t0, 960, 560, 1.04],
    [end - 0.7, 980, 560, 1.0, "sine.inOut"],
    [end, CX, CY, 1.25, "power2.in"],
  ]);

  textIn($("cap-shield"), t0 + 0.4);
  textOut($("cap-shield"), end - 1.0);

  // the video drifts in from the right and floats
  tl.from($("sh-card"), { x: 620, autoAlpha: 0, duration: 1.3, ease: "power3.out" }, t0 + 0.1);
  cue(t0 + 0.1, "whoosh", { gain: 0.45, dur: 1.1 });
  const bob = $("sh-card-bob");
  every((t) => {
    const k = Math.sin((t - t0) * 1.7) * 5;
    bob.setAttribute("transform", `translate(0 ${k.toFixed(2)})`);
  });

  // the knight walks in
  const walk = $("sh-knight-walk");
  const w0 = t0 + 0.4;
  const w1 = t0 + 2.0;
  tl.from($("sh-knight"), { x: -460, duration: w1 - w0, ease: "power1.out" }, w0);
  every((t) => {
    const moving = t > w0 && t < w1;
    const k = moving ? -Math.abs(Math.sin((t - w0) * Math.PI * 1.9)) * 6 : 0;
    walk.setAttribute("transform", `translate(0 ${k.toFixed(2)})`);
  });
  for (let t = w0 + 0.1; t < w1; t += 0.53) cue(t, "step", { gain: 0.25 });

  // the great shield assembles, facet by facet, from the knight's side
  const s0 = t0 + 1.8;
  const offsets = [
    [-420, -160, -50],
    [-520, 60, 40],
    [-300, -300, 70],
    [-460, 220, -60],
    [-200, -260, 90],
    [-260, 300, -80],
  ];
  offsets.forEach(([x, y, r], i) => {
    const f = $(`sh-great-f${i}`);
    tl.from(f, { x, y, rotation: r, scale: 0.2, autoAlpha: 0, transformOrigin: "50% 50%", duration: 0.75, ease: "power3.out" }, s0 + i * 0.1);
    cue(s0 + i * 0.1 + 0.55, "fold", { gain: 0.42, pitch: 0.9 + i * 0.06 });
  });
  tl.fromTo([$("sh-great-rim"), $("sh-great-rim2")], { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.8, ease: "power2.inOut", stagger: 0.12, immediateRender: true }, s0 + 0.7);
  tl.fromTo($("sh-great-glow"), { opacity: 0, scale: 0.9, transformOrigin: "50% 50%" }, { opacity: 0.85, scale: 1.04, duration: 0.5, ease: "power2.out", immediateRender: false }, s0 + 1.35);
  tl.to($("sh-great-glow"), { opacity: 0.35, scale: 1, duration: 1.2, ease: "power1.out" }, s0 + 1.85);
  cue(s0 + 1.3, "shield", { gain: 0.9 });

  // the blintz fold: the four corners meet in the middle
  const f0 = s0 + 1.75;
  const flaps = CORNERS.map((_, i) => ({ el: $(`sh-fold-flap-${i}`), p: 0 }));
  flaps.forEach((flap, i) => {
    tl.fromTo(flap, { p: 0 }, { p: 1, duration: 0.6, ease: "power2.inOut", immediateRender: false }, f0 + i * 0.16);
    cue(f0 + i * 0.16 + 0.25, "fold", { gain: 0.55, pitch: 1.1 + i * 0.05 });
  });
  tl.to($("sh-fold-drop"), { opacity: 0, duration: 0.5 }, f0 + 0.2);
  tl.to($("sh-fold-drop2"), { opacity: 1, duration: 0.5 }, f0 + 0.5);
  every(() => {
    flaps.forEach((flap, i) => {
      flap.el.setAttribute("d", flapPath(A, i, flap.p));
      flap.el.setAttribute("class", flapClass(i, flap.p));
    });
  });

  // sealed
  const sealAt = f0 + 0.95;
  tl.set($("sh-seal"), { autoAlpha: 0 }, 0);
  tl.fromTo($("sh-seal"), { autoAlpha: 0, scale: 1.8, transformOrigin: "50% 50%" }, { autoAlpha: 1, scale: 1, duration: 0.35, ease: "back.out(1.6)", immediateRender: false }, sealAt);
  cue(sealAt + 0.2, "stamp", { gain: 0.9 });
  cue(sealAt + 0.2, "impact", { gain: 0.5 });
  const sealRide = $("sh-seal").firstChild;
  every((t) => {
    // the seal rides the floating envelope
    const k = Math.sin((t - t0) * 1.7) * 5;
    sealRide.setAttribute("transform", `translate(0 ${k.toFixed(2)})`);
  });

  // what the shield stands for
  LABELS.forEach((_, i) => {
    const g = $(`sh-label-${i}`);
    const at = sealAt + 0.45 + i * 0.22;
    tl.from(g, { autoAlpha: 0, duration: 0.3 }, at);
    tl.fromTo(g.querySelector(".fc-leader"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.5, ease: "power2.out", immediateRender: true }, at);
    tl.from(g.querySelectorAll("text, .fc-leader-rule, .fc-leader-back"), { autoAlpha: 0, x: -10, duration: 0.6, ease: "expo.out" }, at + 0.2);
    cue(at, "tick", { gain: 0.4, pitch: 1 + i * 0.07 });
  });
}
