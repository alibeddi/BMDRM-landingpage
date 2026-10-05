// A road through the kingdom: the site's paper stream, drawn in on cue, with
// travellers riding it (positioned per frame from the film clock, so the
// renderer can draw any frame exactly).
import { Envelope } from "./kit";

export const Road = ({ d, k, packets = 0, a = 9, width }) => (
  <g data-k={k}>
    <path data-k={`${k}-base`} className="o-stream-base fr-base" d={d} pathLength="1" style={width ? { strokeWidth: width } : undefined} />
    <g data-k={`${k}-deco`}>
      <path className="o-stream-hi" d={d} />
      <path className="o-stream-pulse" d={d} pathLength="100" style={{ "--dur": "3s" }} />
    </g>
    {Array.from({ length: packets }, (_, i) => (
      <g key={i} data-k={`${k}-p${i}`} opacity="0">
        <Envelope a={a} />
      </g>
    ))}
  </g>
);

// Move `els` along `pathEl`. Looping (default): they leave one after another
// from `run`, one trip per `period`, until `stop`. With `once`, traveller i
// leaves at run + i * gap and stops at the end of the road (onArrive gets
// the arrival times, for stamps and sounds).
export const ride = (film, pathEl, els, { run, period = 4, stop = Infinity, reverse = false, once = false, gap = 0.6, ease }) => {
  const length = pathEl.getTotalLength();
  const n = els.length;
  film.every((t) => {
    els.forEach((el, i) => {
      let p;
      if (once) {
        const start = run + i * gap;
        if (t < start || t > start + period + 0.05) {
          el.setAttribute("opacity", "0");
          return;
        }
        p = (t - start) / period;
        if (ease) p = ease(Math.min(1, p));
      } else {
        const trip = (t - run) / period - i / n;
        if (t < run || t > stop || trip < 0) {
          el.setAttribute("opacity", "0");
          return;
        }
        p = trip % 1;
      }
      if (reverse) p = 1 - p;
      const pt = pathEl.getPointAtLength(Math.min(1, p) * length);
      const fade = Math.min(1, p * 8, (1 - p) * 8);
      el.setAttribute("opacity", Math.max(0, fade).toFixed(3));
      el.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    });
  });
  return once ? els.map((_, i) => run + i * gap + period) : [];
};

// draw the road in at `at`, then start its envelopes moving at `run`
export const buildRoad = (film, k, { at, draw = 1, run, period = 4, stop = Infinity, reverse = false }) => {
  const { tl, $ } = film;
  const root = $(k);
  if (!root) return;
  const base = $(`${k}-base`);
  const deco = $(`${k}-deco`);
  tl.fromTo(base, { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: draw, ease: "power2.inOut", immediateRender: true }, at);
  tl.from(deco, { autoAlpha: 0, duration: 0.6 }, at + draw * 0.7);
  if (run == null) return;
  const packets = [...root.querySelectorAll(`[data-k^="${k}-p"]`)];
  ride(film, base, packets, { run, period, stop, reverse });
};
