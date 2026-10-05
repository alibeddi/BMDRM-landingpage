// Opening and closing frames: the site's blueprint frame, the clients strip
// and the final logo over the castle.
import { T } from "../timing";
import { buildFrame } from "./Transitions";

export function buildFinale(film) {
  const { $, tl, cue } = film;
  buildFrame(film, "frame", 0.2, T.intro + 0.4);
  buildFrame(film, "frame", T.finale + 2.0, T.end + 2);

  // in use at
  const eco = $("cap-eco");
  const ecoAt = T.kingdomAll + 4.3;
  tl.set(eco, { autoAlpha: 1 }, ecoAt);
  tl.from(eco.querySelector(".cap-kicker"), { autoAlpha: 0, y: 14, filter: "blur(6px)", duration: 0.9, ease: "expo.out" }, ecoAt);
  tl.from(eco.querySelectorAll("img"), { autoAlpha: 0, y: 16, duration: 0.9, ease: "expo.out", stagger: 0.15 }, ecoAt + 0.2);
  film.textOut(eco, T.finale - 0.4, 0.45);

  // the logo over the castle
  const logo = $("cap-logo-final");
  const l0 = T.finale + 2.4;
  tl.set(logo, { autoAlpha: 1 }, l0 - 0.05);
  tl.from(logo.querySelector(".logo-mark"), { autoAlpha: 0, scale: 0.6, y: 24, duration: 1.0, ease: "back.out(1.7)" }, l0);
  tl.fromTo(logo.querySelector(".logo-word"), { clipPath: "inset(-10% 67% -10% 33%)" }, { clipPath: "inset(-10% 0% -10% 33%)", duration: 1.0, ease: "power3.inOut", immediateRender: true }, l0 + 0.4);
  cue(l0 + 0.4, "swish", { gain: 0.3, dur: 0.8 });
  tl.from(logo.querySelector(".logo-kicker"), { autoAlpha: 0, y: 16, filter: "blur(6px)", duration: 1, ease: "expo.out" }, l0 + 1.0);
  logo.querySelectorAll(".logo-tag > span").forEach((w, i) => {
    const at = l0 + 1.8 + i * 0.55;
    tl.from(w, { autoAlpha: 0, y: 22, filter: "blur(8px)", duration: 0.9, ease: "expo.out" }, at);
    cue(at, "tick", { gain: 0.45, pitch: 1 + i * 0.12 });
  });
}
