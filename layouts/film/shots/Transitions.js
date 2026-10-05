// Transitions that tell the story in paper: tiles of folded paper flipping
// across the frame, a sheet folding over like a page, a bloom of light from
// a seal, and the site's blueprint frame.
import { W } from "../engine";

const COLS = 16;
const ROWS = 9;
const CELL = W / COLS;
const TONES = ["o-lilac-l", "o-lilac-m", "o-lilac-d", "o-lilac-m", "o-lilac-l", "fc-paper-tile"];

export const FacetWipe = ({ k }) => (
  <g data-k={k} className="tr-facets" style={{ visibility: "hidden" }}>
    {Array.from({ length: COLS * ROWS }, (_, i) => {
      const c = i % COLS;
      const r = Math.floor(i / COLS);
      const x = c * CELL;
      const y = r * CELL;
      const a = TONES[(c * 3 + r * 5) % TONES.length];
      const b = TONES[(c * 5 + r * 3 + 2) % TONES.length];
      const accent = (c * 7 + r * 11) % 23 === 0;
      return (
        <g key={i}>
          <path data-c={c} data-r={r} className={`tr-tri ${accent ? "o-violet-l" : a}`} d={`M${x - 0.5} ${y - 0.5}H${x + CELL + 0.5}L${x - 0.5} ${y + CELL + 0.5}Z`} />
          <path data-c={c} data-r={r} className={`tr-tri ${b}`} d={`M${x + CELL + 0.5} ${y - 0.5}V${y + CELL + 0.5}H${x - 0.5}Z`} />
        </g>
      );
    })}
  </g>
);

// tiles flip in from the left until the frame is covered at `at`, then flip
// away in the same direction
export const buildFacetWipe = (film, k, at) => {
  const { tl, $, cue } = film;
  const root = $(k);
  const tris = [...root.querySelectorAll(".tr-tri")];
  const delay = (el) => (Number(el.dataset.c) + Number(el.dataset.r) * 0.6) * 0.032;
  const span = (COLS - 1 + (ROWS - 1) * 0.6) * 0.032;
  const inAt = at - span - 0.36;
  tl.set(root, { visibility: "visible" }, inAt);
  tl.fromTo(tris, { scale: 0, rotation: -30, transformOrigin: "50% 50%" }, { scale: 1, rotation: 0, duration: 0.36, ease: "power2.out", stagger: (i, el) => delay(el), immediateRender: true }, inAt);
  tl.to(tris, { scale: 0, rotation: 30, transformOrigin: "50% 50%", duration: 0.36, ease: "power2.in", stagger: (i, el) => delay(el) }, at + 0.06);
  tl.set(root, { visibility: "hidden" }, at + span + 0.5);
  cue(inAt, "flutter", { gain: 0.7, dur: span + 0.4 });
  cue(at + 0.06, "flutter", { gain: 0.5, dur: span + 0.4 });
};

// a sheet of paper folding over the frame from the right
export const FoldWipe = ({ k }) => (
  <g data-k={k} style={{ visibility: "hidden" }}>
    <g data-k={`${k}-sheet`}>
      <path className="tr-shadow" d="M-60 -80H0L-330 1160H-390Z" />
      <path className="tr-sheet" d="M0 -80H2600V1160H-330Z" />
      <g className="tr-rules">
        <path d="M54 -80V1160M1866 -80V1160" />
        <path d="M-200 54H2600M-200 1026H2600" />
      </g>
      <path className="tr-crease" d="M0 -80H110L-220 1160H-330Z" />
      <path className="tr-crease-hi" d="M110 -80H122L-208 1160H-220Z" />
    </g>
  </g>
);

export const buildFoldWipe = (film, k, at) => {
  const { tl, $, cue } = film;
  const root = $(k);
  const sheet = $(`${k}-sheet`);
  tl.set(root, { visibility: "visible" }, at - 0.75);
  tl.fromTo(sheet, { x: 2300 }, { x: 0, duration: 0.75, ease: "power2.in", immediateRender: true }, at - 0.75);
  tl.to(sheet, { x: -2700, duration: 0.85, ease: "power2.out" }, at + 0.05);
  tl.set(root, { visibility: "hidden" }, at + 0.95);
  cue(at - 0.7, "swish", { gain: 0.85, dur: 1.5 });
};

// light blooming out of a seal; covers a match cut
export const Bloom = ({ k }) => (
  <g data-k={k} style={{ visibility: "hidden" }}>
    <circle data-k={`${k}-c`} cx="0" cy="0" r="100" className="tr-bloom" />
  </g>
);

export const buildBloom = (film, k, at, { x, y }) => {
  const { tl, $, cue } = film;
  const root = $(k);
  const c = $(`${k}-c`);
  tl.set(c, { attr: { cx: x, cy: y } }, 0);
  tl.set(root, { visibility: "visible" }, at - 0.5);
  tl.fromTo(c, { scale: 0, opacity: 0.4, transformOrigin: "50% 50%" }, { scale: 26, opacity: 1, duration: 0.5, ease: "power2.in", immediateRender: true }, at - 0.5);
  tl.to(c, { opacity: 0, duration: 0.35, ease: "power2.out" }, at + 0.02);
  tl.set(root, { visibility: "hidden" }, at + 0.7);
  cue(at - 0.5, "bloom", { gain: 0.8 });
};

// the landing page's blueprint frame: solid rules, dashed rules and nodes
export const BlueprintFrame = ({ k }) => (
  <g data-k={k} className="tr-frame" style={{ visibility: "hidden" }}>
    <path data-k={`${k}-solid`} className="tr-frame-solid" d="M36 0V1080M1884 0V1080" />
    <path data-k={`${k}-dash`} className="tr-frame-dash" d="M84 0V1080M1836 0V1080M0 50H1920M0 1030H1920" />
    {[
      [84, 50],
      [1836, 50],
      [84, 1030],
      [1836, 1030],
    ].map(([x, y]) => (
      <rect key={`${x}-${y}`} x={x - 4} y={y - 4} width="8" height="8" className="tr-frame-node" />
    ))}
  </g>
);

export const buildFrame = (film, k, from, to) => {
  const { tl, $ } = film;
  const root = $(k);
  tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.2, immediateRender: false }, from);
  tl.to(root, { autoAlpha: 0, duration: 0.8 }, to - 0.8);
};

