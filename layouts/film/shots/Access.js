// Token-gated access. A viewer comes to the gate with a royal seal (the
// access token); the gatekeeper verifies it and the portcullis rises. Then a
// mouse without a pass tries the same gate and is politely turned away.
import { Cloud, Mouse, Place, Range, Ridge, Tower, Wall } from "@layouts/components/origami";
import { Chip, Gatehouse, Seal, ShieldPane, Stepper } from "../kit";
import { T } from "../timing";

const BASE = 860;
const GATE = { x: 960, base: BASE, s: 2.4 };
const VIEWER = { s: 0.72, x: 626 };
const SEAL_UP = { x: 700, y: 430 };

export const AccessArt = () => (
  <g data-shot="access" data-k="access">
    <g data-k="ac-cam">
      <g className="o-tone-haze">
        <Cloud x={200} y={200} w={150} drift={50} dur={32} />
        <Cloud x={1500} y={150} w={120} drift={-40} dur={28} delay={6} />
        <Range base={700} peaks={[[140, 560, 300, true], [700, 420, 200], [1300, 460, 230], [1860, 560, 300, true]]} />
      </g>
      <Ridge base={1300} level="back" points={[[-100, 690], [500, 670], [1000, 690], [1500, 668], [2020, 690]]} />
      {/* the outer wall either side of the gate */}
      <Wall x1={-40} x2={850} base={BASE} h={170} />
      <Wall x1={1070} x2={1960} base={BASE} h={170} />
      <Tower x={80} base={BASE} w={110} h={300} roofH={110} windows={3} flag delay={0.6} />
      <Tower x={1730} base={BASE} w={110} h={300} roofH={110} windows={3} flag delay={1.8} />
      <Gatehouse x={GATE.x} base={GATE.base} s={GATE.s} k="ac-gate" />
      <Ridge base={1300} level="front" points={[[-100, BASE + 2], [600, BASE - 6], [1000, BASE + 4], [1500, BASE - 4], [2020, BASE + 2]]} />

      <g data-k="ac-guard">
        <g data-k="ac-guard-lift">
          <Place name="guard" x={1112} y={BASE - 331 * 0.62} scale={0.62} flip />
        </g>
      </g>
      <g data-k="ac-viewer">
        <g data-k="ac-viewer-walk">
          <Place name="messenger" x={VIEWER.x} y={BASE - 331 * VIEWER.s} scale={VIEWER.s} />
        </g>
      </g>

      {/* the royal seal and its verification ring */}
      <g data-k="ac-pass">
        <g data-k="ac-ring" opacity="0">
          <circle cx={SEAL_UP.x} cy={SEAL_UP.y} r={96} className="ac-ring" />
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2 - Math.PI / 2;
            return <circle key={i} data-k={`ac-notch-${i}`} cx={(SEAL_UP.x + Math.cos(a) * 96).toFixed(1)} cy={(SEAL_UP.y + Math.sin(a) * 96).toFixed(1)} r={6} className="ac-notch" />;
          })}
          <circle data-k="ac-ring-done" cx={SEAL_UP.x} cy={SEAL_UP.y} r={96} className="ac-ring-done" pathLength="1" />
        </g>
        <g data-k="ac-seal">
          <Seal x={SEAL_UP.x} y={SEAL_UP.y} r={64} />
        </g>
        <g data-k="ac-check" opacity="0">
          <circle cx={SEAL_UP.x + 70} cy={SEAL_UP.y - 66} r={24} className="fc-stamp" />
          <path d={`M${SEAL_UP.x + 59} ${SEAL_UP.y - 66}l8 8 14 -16`} className="fc-check fc-check-lg" />
        </g>
      </g>

      {/* the mouse without a pass */}
      <g data-k="ac-mouse" opacity="0">
        <g data-k="ac-mouse-flip">
          <Mouse x={0} y={0} scale={3.2} />
        </g>
      </g>
      <g data-k="ac-pane">
        <ShieldPane x={GATE.x} y={BASE - 120} w={104} h={120} />
      </g>
      <Chip x={690} y={BASE - 120} label="NO VALID PASS" k="ac-nopass" tone="coral" size={18} />

      <Stepper x={960} y={1006} steps={["VIEWER", "ACCESS REQUEST", "VERIFICATION", "AUTHORIZED", "PLAYBACK"]} k="ac-steps" gap={40} />
    </g>
  </g>
);

export function buildAccess(film) {
  const { $, tl, show, cue, every, textIn, textOut, pop, fold } = film;
  const t0 = T.access;
  const t1 = T.denied;
  const end = T.road;
  show($("access"), t0 - 0.15, end + 0.1);
  tl.from($("access"), { autoAlpha: 0, duration: 0.3 }, t0 - 0.15);
  film.camera([$("ac-cam")], { x: 960, y: 540, z: 1 }, [
    [t0 - 0.15, 960, 540, 1.0],
    [t1, 960, 540, 1.035, "sine.inOut"],
    [end, 940, 560, 1.06, "sine.inOut"],
  ]);

  const lit = (i) => [$(`ac-steps-${i}-on`), $(`ac-steps-${i}-ont`)];
  tl.set([0, 1, 2, 3, 4].flatMap(lit), { autoAlpha: 0 }, 0);
  const step = (i, at, tone) => {
    tl.fromTo(lit(i), { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.3, immediateRender: false }, at);
    cue(at, "ui", { gain: 0.35, pitch: tone || 1 + i * 0.08 });
  };
  tl.from($("ac-steps"), { autoAlpha: 0, y: 20, duration: 0.8, ease: "expo.out" }, t0 + 0.2);

  textIn($("cap-access"), t0 + 0.4);
  textOut($("cap-access"), t1 - 0.5);

  // the viewer walks up to the gate
  const walk = $("ac-viewer-walk");
  const w0 = t0 + 0.1;
  const w1 = t0 + 1.9;
  tl.from($("ac-viewer"), { x: -820, duration: w1 - w0, ease: "power1.out" }, w0);
  step(0, t0 + 0.6);
  // and later walks in through the open gate
  const g0 = t0 + 4.9;
  const g1 = t0 + 6.4;
  tl.to($("ac-viewer"), { x: GATE.x - VIEWER.x - 120 * VIEWER.s, duration: g1 - g0, ease: "power1.inOut" }, g0);
  tl.to($("ac-viewer"), { autoAlpha: 0, duration: 0.5 }, g1 - 0.4);
  every((t) => {
    const moving = (t > w0 && t < w1) || (t > g0 && t < g1);
    const from = t < g0 ? w0 : g0;
    const k = moving ? -Math.abs(Math.sin((t - from) * Math.PI * 1.9)) * 4 : 0;
    walk.setAttribute("transform", `translate(0 ${k.toFixed(2)})`);
  });
  for (let t = w0 + 0.1; t < w1; t += 0.53) cue(t, "step", { gain: 0.2 });
  for (let t = g0 + 0.1; t < g1 - 0.3; t += 0.53) cue(t, "step", { gain: 0.16 });

  // the request: the seal rises from the charter and is verified
  const r0 = t0 + 2.1;
  const sealFrom = { x: VIEWER.x + 190 * VIEWER.s, y: BASE - 331 * VIEWER.s + 190 * VIEWER.s };
  tl.fromTo($("ac-seal"), { x: sealFrom.x - SEAL_UP.x, y: sealFrom.y - SEAL_UP.y, scale: 0.14, autoAlpha: 0, transformOrigin: "50% 50%" }, { x: 0, y: 0, scale: 1, autoAlpha: 1, duration: 0.8, ease: "power3.out", immediateRender: true }, r0);
  cue(r0, "rise", { gain: 0.6 });
  step(1, r0 + 0.1);
  tl.to($("ac-ring"), { opacity: 1, duration: 0.3 }, r0 + 0.6);
  step(2, r0 + 0.7);
  for (let i = 0; i < 12; i += 1) {
    const at = r0 + 0.7 + i * 0.075;
    tl.to($(`ac-notch-${i}`), { attr: { class: "ac-notch ac-notch-on" }, duration: 0.01 }, at);
    cue(at, "tick", { gain: 0.25, pitch: 1.4 + i * 0.03 });
  }
  const ok = r0 + 1.65;
  tl.fromTo($("ac-ring-done"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.35, ease: "power2.out", immediateRender: true }, ok - 0.2);
  tl.set($("ac-check"), { opacity: 1 }, ok);
  pop($("ac-check"), ok, { scale: 0.3 });
  step(3, ok);
  cue(ok, "chime", { gain: 0.6, notes: [79, 86] });

  // the seal unlocks the gate
  tl.to($("ac-seal"), { x: GATE.x - SEAL_UP.x, y: BASE - 90 - SEAL_UP.y, scale: 0.4, duration: 0.6, ease: "power2.inOut" }, ok + 0.4);
  tl.to([$("ac-ring"), $("ac-check")], { opacity: 0, duration: 0.3 }, ok + 0.3);
  tl.to($("ac-seal"), { autoAlpha: 0, scale: 0.1, duration: 0.3 }, ok + 1.0);
  tl.to($("ac-gate-bars"), { scaleY: 0.16, transformOrigin: "50% 0%", duration: 0.9, ease: "power2.inOut" }, ok + 0.9);
  tl.to($("ac-gate-glow"), { opacity: 0.85, duration: 0.5 }, ok + 1.1);
  cue(ok + 0.9, "gate", { gain: 0.8 });
  step(4, g1 - 0.2);

  // the portcullis comes down behind the viewer
  tl.to($("ac-gate-bars"), { scaleY: 1, duration: 0.8, ease: "power2.inOut" }, t1 - 0.4);
  tl.to($("ac-gate-glow"), { opacity: 0, duration: 0.4 }, t1 - 0.4);
  cue(t1 - 0.4, "gate", { gain: 0.5, close: true });
  // the steps reset for the next visitor
  tl.to([0, 1, 2, 3, 4].flatMap(lit), { autoAlpha: 0, duration: 0.4 }, t1 + 0.1);

  // ---- the mouse ----------------------------------------------------------
  textIn($("cap-denied"), t1 + 0.3);
  textOut($("cap-denied"), end - 0.75);
  const mouse = $("ac-mouse");
  const flip = $("ac-mouse-flip");
  const m = [t1 + 0.4, t1 + 1.4, t1 + 2.6, t1 + 3.7];
  every((t) => {
    let x;
    let dir = 1;
    if (t < m[0]) x = -120;
    else if (t < m[1]) x = -120 + (760 - -120) * ((t - m[0]) / (m[1] - m[0])) ** 0.8;
    else if (t < m[2]) x = 760 + Math.sin((t - m[1]) * 9) * 3;
    else {
      dir = -1;
      x = 760 - 920 * Math.min(1, (t - m[2]) / (m[3] - m[2])) ** 1.4;
    }
    const hop = t > m[0] && t < m[3] && !(t > m[1] && t < m[2]) ? -Math.abs(Math.sin(t * 22)) * 3 : 0;
    mouse.setAttribute("opacity", t > m[0] - 0.05 && t < m[3] + 0.2 ? "1" : "0");
    mouse.setAttribute("transform", `translate(${x.toFixed(1)} ${(BASE + 2 + hop).toFixed(1)})`);
    flip.setAttribute("transform", `scale(${dir} 1)`);
  });
  for (let t = m[0]; t < m[1]; t += 0.12) cue(t, "patter", { gain: 0.14 });
  for (let t = m[2] + 0.1; t < m[3]; t += 0.12) cue(t, "patter", { gain: 0.12 });
  step(1, m[1] + 0.2);
  step(2, m[1] + 0.5, 0.8);
  // no pass: the pane unfolds over the gate
  tl.set($("ac-pane"), { autoAlpha: 0 }, 0);
  tl.set($("ac-pane"), { autoAlpha: 1 }, m[1] + 0.7);
  tl.from($("ac-pane"), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.6, ease: "back.out(1.6)" }, m[1] + 0.7);
  cue(m[1] + 0.75, "deny", { gain: 0.7 });
  tl.set($("ac-nopass"), { autoAlpha: 0 }, 0);
  tl.set($("ac-nopass"), { autoAlpha: 1 }, m[1] + 0.8);
  pop($("ac-nopass"), m[1] + 0.8);
  tl.to($("ac-guard-lift"), { y: -8, duration: 0.3, yoyo: true, repeat: 1, ease: "power2.out" }, m[1] + 0.75);
  tl.to($("ac-nopass"), { autoAlpha: 0, duration: 0.3 }, m[2] + 0.4);
  fold($("ac-pane"), end - 0.9, { dir: "up", duration: 0.45 });
}
