// Through the gate: we come out inside a giant lock gate (the hero's gate,
// seen from within) and BMDRM introduces itself.
import { LockGate } from "@layouts/components/origami";
import { T } from "../timing";

const C = { x: 960, y: 520 };

export const IntroArt = () => (
  <g data-shot="intro" data-k="intro">
    <rect width="1920" height="1080" className="sh-white" />
    <g data-k="in-cam">
      <g data-k="in-gate">
        <LockGate x={C.x} y={C.y} r={470} glowClassName="in-glow" dialClassName="in-dial" lockClassName="fw-hide" />
      </g>
    </g>
  </g>
);

export function buildIntro(film) {
  const { $, show, cue, textOut, tl } = film;
  const t0 = T.intro + 2.15;
  show($("intro"), t0, T.ingest + 0.05);
  film.camera([$("in-cam")], { x: 960, y: 540, z: 1 }, [
    [t0, C.x, C.y, 7],
    [t0 + 1.6, 960, 540, 1, "power3.out"],
    [T.ingest, 960, 540, 1.08, "sine.inOut"],
  ]);
  tl.from($("in-gate"), { autoAlpha: 0, duration: 0.5 }, t0);

  const logo = $("cap-logo-intro");
  tl.set(logo, { autoAlpha: 1 }, t0 + 0.4);
  tl.from(logo.querySelector(".logo-mark"), { autoAlpha: 0, scale: 0.6, y: 20, duration: 0.9, ease: "back.out(1.8)" }, t0 + 0.45);
  tl.fromTo(logo.querySelector(".logo-word"), { clipPath: "inset(-10% 67% -10% 33%)" }, { clipPath: "inset(-10% 0% -10% 33%)", duration: 0.9, ease: "power3.inOut", immediateRender: true }, t0 + 0.9);
  cue(t0 + 0.45, "chime", { gain: 0.7, notes: [74, 81] });
  cue(t0 + 0.9, "swish", { gain: 0.35, dur: 0.7 });
  const kicker = logo.querySelector(".logo-kicker");
  tl.from(kicker, { autoAlpha: 0, y: 16, filter: "blur(6px)", duration: 1, ease: "expo.out" }, t0 + 1.6);
  const words = logo.querySelectorAll(".logo-tag > span");
  words.forEach((w, i) => {
    const at = t0 + 2.3 + i * 0.55;
    tl.from(w, { autoAlpha: 0, y: 22, filter: "blur(8px)", duration: 0.8, ease: "expo.out" }, at);
    cue(at, "tick", { gain: 0.55, pitch: 1 + i * 0.12 });
  });
  textOut(logo, T.ingest - 0.95, 0.5);
}
