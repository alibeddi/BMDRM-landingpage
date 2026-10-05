// Film engine: one paused GSAP timeline that the player (or the renderer)
// seeks frame by frame. Cameras and procedural motion are applied after each
// seek, so any frame can be drawn in any order — the MP4 renderer relies on
// that. Shots register sound cues on the same clock (see score.js).
import { gsap } from "gsap/dist/gsap";

export const W = 1920;
export const H = 1080;

const HINGE = {
  up: "50% 100%",
  down: "50% 0%",
  left: "100% 50%",
  right: "0% 50%",
};
const sideways = (dir) => dir === "left" || dir === "right";
const list = (t) =>
  t == null ? [] : Array.isArray(t) || t instanceof NodeList ? [...t] : [t];

export const clamp01 = (v) => Math.min(1, Math.max(0, v));
// progress of `t` through [a, b], eased
export const span = (t, a, b, ease = (k) => k) => ease(clamp01((t - a) / (b - a)));
export const easeInOut = (k) => (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2);

export function createEngine(root) {
  const tl = gsap.timeline({ paused: true, defaults: { ease: "power2.out" } });
  const cams = [];
  const updaters = [];
  const cues = [];

  const $ = (k, scope = root) => scope.querySelector(`[data-k="${k}"]`);
  const $$ = (sel, scope = root) => [...scope.querySelectorAll(sel)];

  const film = {
    tl,
    root,
    $,
    $$,
    cues,

    // a shot (or any element) is visible from `from` until `to`
    show(el, from, to) {
      list(el).forEach((node) => {
        tl.set(node, { autoAlpha: 1 }, from);
        if (to != null) tl.set(node, { autoAlpha: 0 }, to);
      });
    },

    cue(t, name, opts = {}) {
      cues.push({ t, name, ...opts });
    },

    // paper pieces unfold from their hinge (data-fold or `dir`)
    unfold(targets, at, opts = {}) {
      const els = list(targets);
      if (!els.length) return;
      const {
        stagger = Math.min(0.08, 1.4 / els.length),
        duration = 0.9,
        dir,
        ease = "back.out(1.6)",
      } = opts;
      const fold = (el) => dir || el.dataset.fold || "up";
      tl.from(
        els,
        {
          autoAlpha: 0,
          scaleX: (i, el) => (sideways(fold(el)) ? 0 : 1),
          scaleY: (i, el) => (sideways(fold(el)) ? 1 : 0),
          transformOrigin: (i, el) => HINGE[fold(el)] || "50% 50%",
          duration,
          ease,
          stagger,
        },
        at,
      );
    },

    // and fold back up
    fold(targets, at, opts = {}) {
      const els = list(targets);
      if (!els.length) return;
      const { stagger = 0.05, duration = 0.5, dir, ease = "power2.in" } = opts;
      const fold = (el) => dir || el.dataset.fold || "up";
      tl.to(
        els,
        {
          autoAlpha: 0,
          scaleX: (i, el) => (sideways(fold(el)) ? 0 : 1),
          scaleY: (i, el) => (sideways(fold(el)) ? 1 : 0),
          transformOrigin: (i, el) => HINGE[fold(el)] || "50% 50%",
          duration,
          ease,
          stagger,
        },
        at,
      );
    },

    // a pop for small things: seals, chips, checkmarks
    pop(targets, at, opts = {}) {
      const els = list(targets);
      if (!els.length) return;
      tl.from(
        els,
        {
          autoAlpha: 0,
          scale: opts.scale ?? 0.4,
          transformOrigin: opts.origin || "50% 50%",
          duration: opts.duration ?? 0.6,
          ease: opts.ease || "back.out(2.2)",
          stagger: opts.stagger ?? 0.08,
        },
        at,
      );
    },

    fadeOut(targets, at, duration = 0.4) {
      const els = list(targets);
      if (els.length) tl.to(els, { autoAlpha: 0, duration, ease: "power1.in" }, at);
    },

    // A camera over a set of layers. Each layer may carry data-p (parallax:
    // 1 moves with the world, smaller is further away). `ref` is the framing
    // the layers were drawn for. Keys are [time, x, y, zoom, ease]; zoom is
    // interpolated in log space so dives and pull-backs feel even.
    camera(layers, ref, keys) {
      const els = list(layers);
      const state = { x: keys[0][1], y: keys[0][2], lz: Math.log(keys[0][3]) };
      const parallax = els.map((el) => parseFloat(el.dataset.p || "1"));
      const cam = {
        state,
        apply() {
          const z = Math.exp(state.lz);
          els.forEach((el, i) => {
            const p = parallax[i];
            const zl = ref.z * (z / ref.z) ** p;
            const xl = ref.x + (state.x - ref.x) * p;
            const yl = ref.y + (state.y - ref.y) * p;
            el.setAttribute(
              "transform",
              `translate(${(W / 2 - xl * zl).toFixed(2)} ${(H / 2 - yl * zl).toFixed(2)}) scale(${zl.toFixed(5)})`,
            );
          });
        },
      };
      for (let i = 1; i < keys.length; i += 1) {
        const [t0, x0, y0, z0] = keys[i - 1];
        const [t1, x1, y1, z1, ease = "sine.inOut"] = keys[i];
        tl.fromTo(
          state,
          { x: x0, y: y0, lz: Math.log(z0) },
          {
            x: x1,
            y: y1,
            lz: Math.log(z1),
            duration: Math.max(0.001, t1 - t0),
            ease,
            immediateRender: false,
          },
          t0,
        );
      }
      cams.push(cam);
      return cam;
    },

    // procedural motion, recomputed from the clock on every frame
    every(fn) {
      updaters.push(fn);
    },

    // captions (HTML): kicker rises out of a blur, title words rise from
    // their baseline mask, exactly like the landing page hero
    textIn(el, at) {
      if (!el) return;
      tl.set(el, { autoAlpha: 1 }, at);
      const kicker = el.querySelector(".cap-kicker");
      const words = el.querySelectorAll(".cap-w > *");
      const lines = el.querySelectorAll(".cap-line");
      if (kicker)
        tl.from(
          kicker,
          { autoAlpha: 0, y: 18, filter: "blur(6px)", duration: 1, ease: "expo.out" },
          at,
        );
      if (words.length)
        tl.from(
          words,
          { yPercent: 108, duration: 1.05, ease: "expo.out", stagger: 0.055 },
          at + 0.12,
        );
      if (lines.length)
        tl.from(
          lines,
          {
            autoAlpha: 0,
            y: 16,
            filter: "blur(6px)",
            duration: 0.9,
            ease: "expo.out",
            stagger: 0.12,
          },
          at + 0.35,
        );
    },

    textOut(el, at, duration = 0.55) {
      if (!el) return;
      tl.to(
        el,
        { autoAlpha: 0, y: -14, filter: "blur(6px)", duration, ease: "power2.in" },
        at,
      );
    },

    // render frame `t` (GSAP skips a seek to the time it is already at, so
    // frame 0 is drawn a hair after zero, where the opening sets apply)
    seek(t) {
      tl.seek(Math.max(t, 0.0001), true);
      updaters.forEach((fn) => fn(t));
      cams.forEach((cam) => cam.apply());
    },
  };

  return film;
}
