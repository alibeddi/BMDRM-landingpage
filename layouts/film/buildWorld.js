// Timeline for every shot set in the kingdom.
import { T } from "./timing";
import { EDGES, GROWTH, KINGDOM_LABELS, KINGDOM_Z, PAVILION_SCREEN, WORLD_REF } from "./World";
import { PLAYER_FILM } from "./shots/Player";
import { buildRoad } from "./Road";
import { easeInOut, span } from "./engine";

const RIDE = { from: T.road + 0.3, to: T.road + 6.9, s: 0.36, start: 0.1 };
const FOLLOW_END = T.road + 5;
const ARCHIVE_WINDOW = { x: 1161.4, y: 412 };

export function buildWorld(film) {
  const { tl, $, $$, show, unfold, pop, cue, every, textIn, textOut } = film;
  const world = $("world");
  const layers = ["w-sky", "w-far", "w-main"].map((k) => $(k));
  const deliver = $("r-deliver-base");
  const length = deliver.getTotalLength();
  const rideP = (t) => RIDE.start + (1 - RIDE.start) * easeInOut(span(t, RIDE.from, RIDE.to));
  const riderAt = (t) => deliver.getPointAtLength(rideP(t) * length);
  const follow = (t) => {
    const pt = riderAt(t);
    return { x: pt.x + 210, y: pt.y - 40, z: 2.2 };
  };
  const f0 = follow(T.road);
  const f1 = follow(FOLLOW_END);

  // where the pavilion screen must sit to cover the player's picture exactly
  const pz = PLAYER_FILM.w / PAVILION_SCREEN.w;
  const pav = {
    x: PAVILION_SCREEN.x - (PLAYER_FILM.x - 960) / pz,
    y: PAVILION_SCREEN.y - (PLAYER_FILM.y - 540) / pz,
    z: pz,
  };

  // ---- visibility ---------------------------------------------------------
  show(world, 0, T.intro + 2.5);
  show(world, T.road - 0.15, T.library + 0.12);
  show(world, T.tower - 0.02, T.player + 0.12);
  show(world, T.kingdomAll - 0.02);

  // ---- camera -------------------------------------------------------------
  const cam = film.camera(layers, WORLD_REF, [
    [0, 720, 262, 1.3],
    [T.intro, WORLD_REF.x, WORLD_REF.y, WORLD_REF.z, "sine.inOut"],
    [T.intro + 0.9, 720, 300, 2.3, "sine.inOut"],
    [T.intro + 2.4, 720.8, 391.6, 44, "power3.in"],
    [T.road - 0.2, 720.8, 391.6, 44, "none"],
    [T.road - 0.18, f0.x, f0.y, f0.z, "none"],
    [FOLLOW_END, f1.x, f1.y, f1.z, "none"],
    [T.cdn + 1.2, 990, 520, 0.72, "sine.inOut"],
    [T.scale + 3.4, 950, 540, 0.62, "sine.inOut"],
    [T.scale + 4.0, ARCHIVE_WINDOW.x, ARCHIVE_WINDOW.y, 1.25, "sine.inOut"],
    [T.library, ARCHIVE_WINDOW.x, ARCHIVE_WINDOW.y, 96, "power3.in"],
    [T.tower - 0.05, ARCHIVE_WINDOW.x, ARCHIVE_WINDOW.y, 96, "none"],
    [T.tower + 0.9, ARCHIVE_WINDOW.x, ARCHIVE_WINDOW.y, 1.7, "power3.out"],
    [T.tower + 1.8, 2045, 372, 1.67, "sine.inOut"],
    [T.player, 2060, 368, 1.72, "none"],
    [T.kingdomAll - 0.05, pav.x, pav.y, pav.z, "none"],
    [T.kingdomAll + 2.6, 950, 520, KINGDOM_Z, "power2.inOut"],
    [T.finale, 950, 520, KINGDOM_Z * 1.015, "none"],
    [T.finale + 2.8, 720, 300, 1.9, "sine.inOut"],
    [T.end, 720, 246, 1.3, "sine.out"],
  ]);

  // the camera rides with the messenger along the road
  every((t) => {
    if (t >= T.road - 0.18 && t <= FOLLOW_END) {
      const f = follow(t);
      cam.state.x = f.x;
      cam.state.y = f.y;
      cam.state.lz = Math.log(f.z);
    }
  });

  // ---- S1: the kingdom unfolds --------------------------------------------
  // the landscape is there from the first frame (no empty opening frame);
  // the mountains settle while the castle unfolds onto it
  const peaks = $$('[data-k="w-range"] > g > g');
  tl.from(peaks, { y: 34, duration: 1.8, ease: "power2.out", stagger: 0.05 }, 0);
  tl.from($("w-sky"), { x: -40, duration: 3, ease: "power2.out" }, 0);
  unfold($$('[data-k="w-walls"]'), 0.3, { duration: 0.9 });
  unfold(["w-t1", "w-t2", "w-t5", "w-t3", "w-t4"].map((k) => $(k)), 0.4, { stagger: 0.1 });
  pop($("w-gate"), 0.95, { scale: 0.7, duration: 0.9 });
  unfold($("w-pines"), 0.6, { duration: 0.9 });
  unfold([$("w-archive"), $("w-tower")], 0.75, { stagger: 0.15 });
  // figures (and their shadows) appear as they unfold
  const appear = (k, at) => {
    tl.set($(k), { autoAlpha: 0 }, 0);
    tl.set($(k), { autoAlpha: 1 }, at);
  };
  appear("w-scout", 1.3);
  appear("w-guard-top", 1.4);
  appear("w-archer", 1.4);
  appear("w-knight", 1.6);
  appear("w-guard", 1.8);
  appear("w-sentries", 1.5);
  unfold($("w-village"), 0.7, { duration: 1 });
  unfold($("w-roadside"), 0.9, { duration: 1 });
  unfold($$('[data-k="w-scout"] .o-part'), 1.3);
  unfold($$('[data-k="w-ballista"]'), 1.4, { dir: "up" });
  unfold($$('[data-k="w-guard-top"] .o-part, [data-k="w-archer"] .o-part'), 1.4);
  unfold($$('[data-k="w-knight"] .o-part'), 1.6);
  unfold($$('[data-k="w-guard"] .o-part'), 1.8);
  unfold([$("w-pavilion"), $("w-audience"), $("w-gatehouse"), $("w-bridge")], 1.0, { stagger: 0.1 });
  unfold($("w-front"), 0.9, { duration: 0.9 });
  tl.from($("w-file"), { autoAlpha: 0, y: -16, duration: 1, ease: "expo.out" }, 2.4);
  cue(0.3, "fold", { gain: 0.6 });
  cue(0.45, "fold", { gain: 0.5, pitch: 1.1 });
  cue(0.75, "fold", { gain: 0.45 });
  cue(1.0, "pop", { gain: 0.5 });
  cue(1.6, "fold", { gain: 0.6 });
  cue(1.8, "fold", { gain: 0.5 });

  textIn($("cap-value"), 2.1);
  textOut($("cap-value"), 4.9);
  textIn($("cap-protect"), 5.5);
  textOut($("cap-protect"), T.intro - 0.4);

  // hidden until their shots
  [...EDGES.map((e) => $(e.k))].forEach((el) => tl.set(el, { autoAlpha: 0 }, 0));
  GROWTH.forEach((_, i) => tl.set($(`w-grow-${i}`), { autoAlpha: 0 }, 0));
  tl.set([$("w-village-back"), $("w-village-front"), $("w-grow-viewers"), $("w-labels")], { autoAlpha: 0 }, 0);

  // ---- S2: the file drops into the lock, the lock opens, we dive in ------
  const t2 = T.intro;
  tl.to($("w-file"), { y: 96, scale: 0.35, transformOrigin: "50% 50%", autoAlpha: 0, duration: 0.6, ease: "power2.in" }, t2 + 0.1);
  cue(t2 + 0.62, "click", { gain: 0.9 });
  cue(t2 + 0.62, "impact", { gain: 0.35 });
  tl.to($("w-shackle"), { y: -18, duration: 0.45, ease: "back.out(2.2)" }, t2 + 0.66);
  tl.fromTo($("w-gate-flash"), { autoAlpha: 1, scale: 0.92, transformOrigin: "50% 50%" }, { autoAlpha: 0, scale: 1.7, duration: 0.85, ease: "power2.out", immediateRender: false }, t2 + 0.7);
  tl.set($("w-gate-flash"), { autoAlpha: 0 }, 0);
  cue(t2 + 0.8, "unlock", { gain: 0.8 });
  cue(t2 + 1.0, "whoosh", { gain: 0.9, dur: 1.4, rise: true });

  // ---- S9: the road -------------------------------------------------------
  buildRoad(film, "r-deliver", { at: T.road - 0.1, draw: 5.6, run: T.cdn + 0.4, period: 4.2 });
  const rider = $("w-rider");
  const riderBody = $("w-rider-body");
  every((t) => {
    if (t < RIDE.from - 0.1 || t > RIDE.to + 0.8) {
      rider.setAttribute("opacity", "0");
      return;
    }
    const pt = riderAt(t);
    const moving = t > RIDE.from && t < RIDE.to;
    const bob = moving ? -Math.abs(Math.sin((t - RIDE.from) * Math.PI * 2.1)) * 3.2 : 0;
    const fade = Math.min(1, (t - RIDE.from + 0.1) / 0.5, (RIDE.to + 0.8 - t) / 0.5);
    rider.setAttribute("opacity", Math.max(0, fade).toFixed(3));
    riderBody.setAttribute(
      "transform",
      `translate(${(pt.x - 206 * RIDE.s).toFixed(1)} ${(pt.y - 331 * RIDE.s + bob).toFixed(1)})`,
    );
  });
  // gallop: soft hoof ticks while riding
  for (let t = RIDE.from + 0.2; t < RIDE.to - 0.3; t += 0.24) cue(t, "hoof", { gain: 0.16 });

  // nodes light up as the rider passes them
  const passTime = (x) => {
    for (let t = RIDE.from; t < RIDE.to; t += 0.02) if (riderAt(t).x >= x) return t;
    return RIDE.to;
  };
  const gh = passTime(1300);
  tl.to($("w-gatehouse-bars"), { scaleY: 0.16, transformOrigin: "50% 0%", duration: 0.7, ease: "power2.inOut" }, gh - 0.9);
  tl.to($("w-gatehouse-glow"), { opacity: 0.85, duration: 0.4 }, gh - 0.5);
  cue(gh - 0.9, "gate", { gain: 0.5 });
  tl.fromTo($("w-gh-pulse"), { autoAlpha: 0.9, scale: 0.3, transformOrigin: "50% 50%" }, { autoAlpha: 0, scale: 1.6, duration: 1.1, ease: "power2.out", immediateRender: false }, gh);
  cue(gh, "pulse", { gain: 0.5 });
  const br = passTime(1780);
  tl.fromTo($("w-br-pulse"), { autoAlpha: 0.9, scale: 0.3, transformOrigin: "50% 50%" }, { autoAlpha: 0, scale: 1.6, duration: 1.1, ease: "power2.out", immediateRender: false }, br);
  cue(br, "pulse", { gain: 0.5, pitch: 1.25 });

  // the caption waits until the camera has left the village behind, over a
  // soft paper scrim so it reads against the hills
  textIn($("cap-road"), T.road + 2.9);
  textOut($("cap-road"), T.cdn - 1.25);
  const scrim = $("cap-scrim");
  tl.fromTo(scrim, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.6, immediateRender: false }, T.road + 2.6);
  tl.to(scrim, { autoAlpha: 0, duration: 0.6 }, T.cdn - 1.1);
  tl.set(scrim, { autoAlpha: 0 }, 0);

  // ---- S10: edge castles serve their viewers ------------------------------
  unfold($$('[data-k="edge-f"] > g > *'), T.road + 5.4, { duration: 0.9, stagger: 0.06 });
  cue(T.road + 5.4, "fold", { gain: 0.5 });
  tl.set($("edge-f"), { autoAlpha: 1 }, T.road + 5.4);
  [$("edge-w"), $("edge-e")].forEach((el, i) => {
    tl.set(el, { autoAlpha: 1 }, T.cdn + 0.5 + i * 0.25);
    unfold(el.querySelectorAll(":scope > g > *"), T.cdn + 0.5 + i * 0.25, { duration: 0.9, stagger: 0.06 });
    cue(T.cdn + 0.5 + i * 0.25, "fold", { gain: 0.5 });
  });
  buildRoad(film, "r-west", { at: T.cdn + 0.9, draw: 1.3, run: T.cdn + 2.0, period: 3.4 });
  buildRoad(film, "r-east", { at: T.cdn + 1.0, draw: 1.3, run: T.cdn + 2.1, period: 3.4 });
  buildRoad(film, "r-wv", { at: T.cdn + 2.2, draw: 0.6, run: T.cdn + 2.8, period: 1.6 });
  buildRoad(film, "r-ev", { at: T.cdn + 2.3, draw: 0.6, run: T.cdn + 2.9, period: 1.6 });
  buildRoad(film, "r-fv", { at: T.cdn + 1.4, draw: 0.7, run: T.cdn + 2.1, period: 1.8 });
  cue(T.cdn + 0.9, "data", { gain: 0.5, dur: 1.4 });
  tl.set([$("w-village-back"), $("w-village-front")], { autoAlpha: 1 }, T.cdn + 2.2);
  pop($$('[data-k="w-village-back"] > g, [data-k="w-village-front"] > g'), T.cdn + 2.2, { stagger: 0.06 });
  cue(T.cdn + 2.3, "ui", { gain: 0.4 });
  textIn($("cap-cdn"), T.cdn + 0.6);
  textOut($("cap-cdn"), T.scale - 0.5);

  // ---- S11: the kingdom grows ---------------------------------------------
  GROWTH.forEach((_, i) => {
    const el = $(`w-grow-${i}`);
    const at = T.scale + 0.3 + i * 0.2;
    tl.set(el, { autoAlpha: 1 }, at);
    unfold(el.querySelectorAll(":scope > g > *"), at, { duration: 0.8, stagger: 0.05 });
    cue(at, "fold", { gain: 0.32, pitch: 0.9 + i * 0.05 });
  });
  buildRoad(film, "r-pav", { at: T.scale + 0.4, draw: 1.1, run: T.scale + 1.4, period: 2.6 });
  buildRoad(film, "r-s1", { at: T.scale + 0.8, draw: 0.9, run: T.scale + 1.6, period: 2.4 });
  buildRoad(film, "r-s2", { at: T.scale + 1.0, draw: 0.9, run: T.scale + 1.8, period: 2.4 });
  buildRoad(film, "r-s3", { at: T.scale + 1.6, draw: 0.9, run: T.scale + 2.4, period: 2.4 });
  buildRoad(film, "r-s4", { at: T.scale + 1.4, draw: 0.9, run: T.scale + 2.2, period: 2.4 });
  tl.set($("w-grow-viewers"), { autoAlpha: 1 }, T.scale + 2.0);
  pop($$('[data-k="w-grow-viewers"] > g'), T.scale + 2.0, { stagger: 0.08 });
  textIn($("cap-scale"), T.scale + 0.4);
  textOut($("cap-scale"), T.scale + 3.4);
  cue(T.scale + 4.0, "whoosh", { gain: 0.8, dur: 0.9, rise: true });

  // ---- S13: the watchtower ------------------------------------------------
  const charts = $$('[data-k^="w-cp-"]');
  tl.set($("w-charts"), { autoAlpha: 1 }, T.tower + 1.2);
  charts.forEach((el, i) => {
    const at = T.tower + 1.3 + i * 0.3;
    unfold(el, at, { dir: "down", duration: 0.8 });
    cue(at, "fold", { gain: 0.45, pitch: 1 + i * 0.08 });
  });
  const sights = $$('[data-k^="w-sight-"]');
  tl.fromTo(sights, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.8, stagger: 0.3, ease: "power2.out", immediateRender: true }, T.tower + 1.2);
  const line = $("w-chart-line-path");
  tl.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.6, ease: "power2.inOut", immediateRender: true }, T.tower + 1.7);
  tl.from($("w-chart-line-area"), { autoAlpha: 0, duration: 1 }, T.tower + 2.3);
  tl.from($$('[data-k="w-chart-bars"] rect.fw-bar'), { scaleY: 0, transformOrigin: "50% 100%", duration: 0.7, stagger: 0.04, ease: "back.out(1.6)" }, T.tower + 2.0);
  tl.fromTo($("w-chart-bw-path"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.4, ease: "power2.inOut", immediateRender: true }, T.tower + 2.3);
  tl.from($("w-chart-bw-area"), { autoAlpha: 0, duration: 1 }, T.tower + 2.8);
  tl.from($$('[data-k="w-chart-heat"] rect.fw-heat'), { autoAlpha: 0, scale: 0.3, transformOrigin: "50% 50%", duration: 0.4, stagger: { each: 0.02, from: "random" } }, T.tower + 2.6);
  cue(T.tower + 1.8, "data", { gain: 0.45, dur: 2 });
  tl.set($("w-charts"), { autoAlpha: 0 }, T.player + 0.12);
  tl.set($("w-charts"), { autoAlpha: 0 }, 0);
  textIn($("cap-tower"), T.tower + 0.9);
  textOut($("cap-tower"), T.player - 0.6);

  // ---- S16: the whole kingdom ---------------------------------------------
  tl.set($("w-labels"), { autoAlpha: 1 }, T.kingdomAll + 2.4);
  KINGDOM_LABELS.forEach((_, i) => {
    const at = T.kingdomAll + 2.5 + i * 0.2;
    const g = $(`w-label-${i}`);
    tl.from(g, { autoAlpha: 0, duration: 0.4 }, at);
    tl.fromTo(g.querySelector(".fc-leader"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.6, ease: "power2.out", immediateRender: true }, at);
    tl.from(g.querySelectorAll("text, .fc-leader-rule, .fc-leader-back"), { autoAlpha: 0, y: 8, duration: 0.6, ease: "expo.out" }, at + 0.25);
    cue(at, "tick", { gain: 0.4, pitch: 1 + i * 0.06 });
  });
  textIn($("cap-system"), T.kingdomAll + 2.6);
  textOut($("cap-system"), T.finale - 0.3);
  tl.to($("w-labels"), { autoAlpha: 0, duration: 0.5 }, T.finale);
}
