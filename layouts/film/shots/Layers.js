// Layered defences, seen in elevation: the sealed video in its chamber,
// behind the guards' wall, the gate wall and the outer wall, with the road
// leaving at the foot. The camera pulls back from the seal and each layer
// lights up as it comes into view.
import { Cloud, Pine, Place, Range, Ridge, Sentries, Tower, Wall } from "@layouts/components/origami";
import { Envelope, Gatehouse, Leader } from "../kit";
import { T } from "../timing";

export const LAYER_ENVELOPE = { x: 960, y: 462, a: 15 };
export const OUTER_GATE = { x: 960, base: 826, s: 1.5 };
// the gatehouse of the next shot, which this one cuts to
const ACCESS_GATE_S = 2.4;
const ROAD = "M960 826 C 990 900, 1160 960, 1360 990 C 1520 1012, 1700 1030, 1990 1040";

const LABELS = [
  [1024, 430, 1580, 330, "Watermarking"],
  [1200, 560, 1600, 456, "Access control"],
  [1360, 640, 1620, 584, "DRM"],
  [1568, 716, 1660, 704, "Encryption"],
  [1500, 1012, 1620, 916, "Secure delivery"],
];

export const LayersArt = () => (
  <g data-shot="layers" data-k="layers">
    <g data-k="ly-cam">
      <g className="o-tone-haze">
        <Cloud x={260} y={250} w={140} drift={40} dur={30} />
        <Cloud x={1480} y={200} w={110} drift={-40} dur={26} delay={3} />
        <Range base={640} peaks={[[160, 520, 260, true], [620, 380, 170], [1320, 420, 200], [1820, 520, 270, true]]} />
      </g>
      <Ridge base={1300} level="back" points={[[-100, 600], [400, 580], [960, 560], [1500, 584], [2020, 600]]} />

      {/* the protected chamber */}
      <g data-k="ly-l0">
        <Tower x={900} base={560} w={120} h={200} roofH={100} windows={0} flag delay={0.4} />
        <path className="o-door" d="M928 506V452A32 32 0 0 1 992 452V506Z" />
        <g data-k="ly-chamber-glow" opacity="0.35">
          <circle cx={960} cy={466} r={30} className="ly-glow-disc" />
        </g>
        <Envelope x={LAYER_ENVELOPE.x} y={LAYER_ENVELOPE.y} a={LAYER_ENVELOPE.a} />
      </g>
      {/* the guards' wall */}
      <g data-k="ly-l1">
        <Wall x1={760} x2={1160} base={640} h={84} />
        <Tower x={720} base={640} w={48} h={136} roof="flat" windows={1} />
        <Tower x={1152} base={640} w={48} h={136} roof="flat" windows={1} />
        <Sentries sentries={[[820, 556, 20, 0], [1110, 556, -18, 2]]} />
        <Place name="guard" x={1004} y={556 - 331 * 0.2} scale={0.2} flip />
        <rect data-k="ly-band-1" x={760} y={553} width={400} height={6} rx={3} className="ly-band" opacity="0" />
      </g>
      {/* the gate wall */}
      <g data-k="ly-l2">
        <Wall x1={600} x2={1320} base={720} h={96} />
        <Tower x={560} base={720} w={56} h={160} roofH={54} windows={2} flag delay={1.2} />
        <Tower x={1304} base={720} w={56} h={160} roofH={54} windows={2} flag delay={2.1} />
        <Gatehouse x={960} base={724} s={1.15} k="ly-gate2" flags={false} />
        <rect data-k="ly-band-2" x={600} y={621} width={720} height={6} rx={3} className="ly-band" opacity="0" />
      </g>
      <Ridge base={1300} level="front" points={[[-100, 830], [500, 816], [960, 826], [1500, 814], [2020, 830]]} />
      {/* the outer wall */}
      <g data-k="ly-l3">
        <Wall x1={400} x2={1520} base={820} h={110} />
        <Tower x={352} base={820} w={70} h={190} roofH={70} windows={2} flag delay={0.7} />
        <Tower x={1498} base={820} w={70} h={190} roofH={70} windows={2} flag delay={1.6} />
        <Gatehouse x={OUTER_GATE.x} base={OUTER_GATE.base} s={OUTER_GATE.s} k="ly-gate1" />
        <Place name="archer" x={366} y={630 - 331 * 0.22} scale={0.22} />
        <rect data-k="ly-band-3" x={400} y={707} width={1120} height={6} rx={3} className="ly-band" opacity="0" />
      </g>
      {/* the road out */}
      <g data-k="ly-l4">
        <path data-k="ly-road" className="o-stream-base" d={ROAD} style={{ strokeWidth: 12 }} pathLength="1" />
        <path className="o-stream-hi" d={ROAD} />
        <path className="o-stream-pulse" d={ROAD} pathLength="100" style={{ "--dur": "2.4s" }} />
        {[0, 1, 2].map((i) => (
          <g key={i} data-k={`ly-pkt-${i}`} opacity="0">
            <Envelope a={12} />
          </g>
        ))}
      </g>
      <Pine x={240} base={850} h={70} delay={1} />
      <Pine x={268} base={856} h={50} delay={2} />
      <Pine x={1700} base={846} h={66} delay={0.4} />
      {LABELS.map(([x1, y1, x2, y2, label], i) => (
        <Leader key={label} x1={x1} y1={y1} x2={x2} y2={y2} label={label} k={`ly-label-${i}`} size={19} />
      ))}
    </g>
  </g>
);

export function buildLayers(film) {
  const { $, tl, show, cue, textIn, textOut } = film;
  const t0 = T.layers;
  const end = T.access;
  const e = LAYER_ENVELOPE;
  const z0 = (118 * 1.25) / e.a;
  show($("layers"), t0 - 0.02, end + 0.15);
  const zOut = ACCESS_GATE_S / OUTER_GATE.s;
  film.camera([$("ly-cam")], { x: 960, y: 540, z: 1 }, [
    [t0, e.x, e.y, z0],
    [t0 + 4.1, 960, 640, 1.0, "power2.inOut"],
    [end - 1.1, 960, 650, 1.02, "sine.inOut"],
    [end, 960, OUTER_GATE.base - (860 - 540) / zOut, zOut, "power2.in"],
  ]);

  textIn($("cap-layers"), t0 + 1.2);
  textOut($("cap-layers"), end - 0.9);

  // each layer lights as it comes into view
  const at = [t0 + 0.6, t0 + 1.6, t0 + 2.25, t0 + 2.95, t0 + 3.6];
  tl.to($("ly-chamber-glow"), { opacity: 1, duration: 0.4 }, at[0]);
  tl.fromTo($("ly-chamber-glow"), { scale: 0.7, transformOrigin: "50% 50%" }, { scale: 1.25, duration: 1.4, ease: "sine.inOut", repeat: 3, yoyo: true, immediateRender: false }, at[0]);
  [1, 2, 3].forEach((n) => {
    const band = $(`ly-band-${n}`);
    tl.fromTo(band, { opacity: 0, scaleX: 0, transformOrigin: "50% 50%" }, { opacity: 1, scaleX: 1, duration: 0.6, ease: "power2.out", immediateRender: false }, at[n]);
    tl.to(band, { opacity: 0.45, duration: 0.8 }, at[n] + 0.8);
  });
  tl.to($("ly-gate2-glow"), { opacity: 0.7, duration: 0.5 }, at[2]);
  tl.to($("ly-gate1-glow"), { opacity: 0.7, duration: 0.5 }, at[3]);
  tl.fromTo($("ly-road"), { strokeDasharray: "1 1", strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 1.0, ease: "power2.inOut", immediateRender: true }, at[4] - 0.4);
  at.forEach((t, i) => cue(t, "layer", { gain: 0.55, pitch: 1 + i * 0.12 }));

  // envelopes leave by the road
  const road = $("ly-road");
  const length = road.getTotalLength();
  const pkts = [0, 1, 2].map((i) => $(`ly-pkt-${i}`));
  film.every((t) => {
    pkts.forEach((el, i) => {
      const trip = (t - at[4] - 0.4) / 2.6 - i / 3;
      if (trip < 0 || t > end) {
        el.setAttribute("opacity", "0");
        return;
      }
      const p = trip % 1;
      const pt = road.getPointAtLength(p * length);
      el.setAttribute("opacity", Math.min(1, p * 8, (1 - p) * 8).toFixed(3));
      el.setAttribute("transform", `translate(${pt.x.toFixed(1)} ${pt.y.toFixed(1)})`);
    });
  });

  LABELS.forEach((_, i) => {
    const g = $(`ly-label-${i}`);
    const t = t0 + 3.3 + i * 0.22;
    tl.from(g, { autoAlpha: 0, duration: 0.3 }, t);
    tl.fromTo(g.querySelector(".fc-leader"), { strokeDashoffset: 1 }, { strokeDashoffset: 0, autoRound: false, duration: 0.55, ease: "power2.out", immediateRender: true }, t);
    tl.from(g.querySelectorAll("text, .fc-leader-rule, .fc-leader-back"), { autoAlpha: 0, x: -10, duration: 0.6, ease: "expo.out" }, t + 0.2);
  });
  tl.to(LABELS.map((_, i) => $(`ly-label-${i}`)), { autoAlpha: 0, duration: 0.4 }, end - 1.0);
  cue(end - 1.0, "whoosh", { gain: 0.5, dur: 1.0 });
}
