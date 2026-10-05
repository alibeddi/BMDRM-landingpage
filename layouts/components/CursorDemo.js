// A cursor walking through a dashboard screenshot, the way a product video
// would: it glides between stops, hovers (a ring around the element), clicks
// (a ripple) and reveals small tooltips. Pure CSS, generated per screenshot
// from the scripts below; positions are % of the screenshot. Decorative: it
// pauses off screen ([data-scene]) and disappears with reduced motion.

// stop: [x, y, hold seconds, { click, ring: [left, top, width, height], tip }]
const SCRIPTS = {
  "/images/screenshots/dashboard.png": {
    id: "dashboard",
    stops: [
      [57.5, 5.3, 0.6],
      [28, 22.4, 1.2, { ring: [19, 16.3, 25.7, 12] }],
      [55, 22.4, 1.1, { ring: [45.8, 16.3, 25.7, 12] }],
      [31, 75.4, 1.8, { click: true, tip: "Windows · 199,576 sessions" }],
      [79.9, 72.4, 1.8, { click: true, tip: "Tunisia · 306,678 sessions" }],
      [5.6, 37.3, 1, { click: true, ring: [1.2, 34.6, 14, 5.2] }],
    ],
  },
  "/images/screenshots/bandwidths.png": {
    id: "bandwidths",
    stops: [
      [57.5, 5.3, 0.6],
      [45.2, 30, 1.8, { ring: [44.3, 23.4, 1.8, 21.2], tip: "11:00 · 4.5 GB" }],
      [
        87.2,
        26,
        1.8,
        { ring: [86.4, 21.8, 1.7, 22.7], tip: "Busiest day · 77 GB" },
      ],
      [
        45.2,
        76,
        1.8,
        { ring: [44.3, 70.3, 1.8, 20.4], tip: "12:00 · 688 sessions" },
      ],
      [89.2, 74, 1.8, { ring: [88.4, 67.6, 1.7, 23.1], tip: "11.8k sessions" }],
    ],
  },
  "/images/screenshots/videos.png": {
    id: "videos",
    stops: [
      [57.5, 5.3, 0.6],
      [
        65.4,
        13.6,
        1.4,
        {
          click: true,
          ring: [58.8, 11.3, 13.3, 4.7],
          tip: "Search by id, title or tag",
        },
      ],
      [
        88.8,
        13.7,
        1.3,
        {
          click: true,
          ring: [84.1, 11.4, 13.3, 4.6],
          tip: "Upload, encrypted on arrival",
        },
      ],
      [27.3, 74.1, 1.1, { ring: [20.9, 67.9, 12.7, 12.6] }],
      [86.6, 74.5, 1.8, { click: true, tip: "Secure link copied" }],
    ],
  },
};

const TRAVEL_SPEED = 45; // % of the screenshot per second
const pct = (t, total) => `${((t / total) * 100).toFixed(2)}%`;

// arrival and departure time at every stop, returning to the first at the end
const timeline = (stops) => {
  let t = 0;
  const times = stops.map(([x, y, hold], i) => {
    if (i > 0) {
      const [px, py] = stops[i - 1];
      t += Math.min(
        1.4,
        Math.max(0.6, Math.hypot(x - px, y - py) / TRAVEL_SPEED),
      );
    }
    const arrive = t;
    t += hold;
    return { arrive, leave: t };
  });
  const [lx, ly] = stops[stops.length - 1];
  const [fx, fy] = stops[0];
  t += Math.min(
    1.4,
    Math.max(0.6, Math.hypot(fx - lx, fy - ly) / TRAVEL_SPEED),
  );
  return { times, total: t };
};

// the stylesheet for one script: the cursor's path plus a visibility window
// for every ring, ripple and tooltip, all on the same loop
const buildCss = ({ id, stops }) => {
  const { times, total } = timeline(stops);
  const move = stops
    .map(([x, y], i) => {
      const at = `translate(${x}%, ${y}%)`;
      return `${pct(times[i].arrive, total)},${pct(times[i].leave, total)}{transform:${at}}`;
    })
    .join("");
  const [fx, fy] = stops[0];
  const rules = [
    `@keyframes cd-${id}-move{${move}100%{transform:translate(${fx}%, ${fy}%)}}`,
    `.cd-${id} .cd-track{animation:cd-${id}-move ${total.toFixed(2)}s cubic-bezier(.45,0,.2,1) infinite}`,
  ];
  const press = [];
  stops.forEach(([, , , extra = {}], i) => {
    const { arrive, leave } = times[i];
    if (extra.ring || extra.tip) {
      const show = pct(arrive, total);
      const hide = pct(leave, total);
      rules.push(
        `@keyframes cd-${id}-on-${i}{0%,${pct(Math.max(0, arrive - 0.01), total)}{opacity:0;transform:translateY(4px)}${show},${hide}{opacity:1;transform:none}${pct(leave + 0.25, total)},100%{opacity:0;transform:none}}`,
        `.cd-${id} .cd-on-${i}{animation:cd-${id}-on-${i} ${total.toFixed(2)}s ease infinite}`,
      );
    }
    if (extra.click) {
      const at = arrive + 0.3;
      rules.push(
        `@keyframes cd-${id}-click-${i}{0%,${pct(at, total)}{opacity:0;transform:translate(-50%,-50%) scale(.2)}${pct(at + 0.05, total)}{opacity:.9}${pct(at + 0.6, total)},100%{opacity:0;transform:translate(-50%,-50%) scale(1.6)}}`,
        `.cd-${id} .cd-click-${i}{animation:cd-${id}-click-${i} ${total.toFixed(2)}s ease-out infinite}`,
      );
      press.push(
        `${pct(at - 0.08, total)},${pct(at + 0.2, total)}{transform:none}${pct(at + 0.06, total)}{transform:scale(.82)}`,
      );
    }
  });
  if (press.length) {
    rules.push(
      `@keyframes cd-${id}-press{0%,100%{transform:none}${press.join("")}}`,
      `.cd-${id} .cd-pointer{animation:cd-${id}-press ${total.toFixed(2)}s linear infinite}`,
    );
  }
  return `@media (prefers-reduced-motion: no-preference){${rules.join("")}}`;
};

const CursorDemo = ({ image }) => {
  const script = SCRIPTS[image];
  if (!script) return null;
  const { id, stops } = script;
  return (
    <div className={`cursor-demo cd-${id}`} aria-hidden="true" data-scene>
      <style dangerouslySetInnerHTML={{ __html: buildCss(script) }} />
      {stops.map(([x, y, , extra = {}], i) => (
        <span key={i}>
          {extra.ring && (
            <span
              className={`cd-ring cd-on-${i}`}
              style={{
                left: `${extra.ring[0]}%`,
                top: `${extra.ring[1]}%`,
                width: `${extra.ring[2]}%`,
                height: `${extra.ring[3]}%`,
              }}
            />
          )}
          {extra.click && (
            <span
              className={`cd-click cd-click-${i}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            />
          )}
          {extra.tip && (
            <span
              className={`cd-tip cd-on-${i} ${x > 70 ? "is-left" : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <span className="cd-tip-bubble">{extra.tip}</span>
            </span>
          )}
        </span>
      ))}
      <div className="cd-track">
        <svg className="cd-pointer" viewBox="0 0 18 24" fill="none">
          <path
            d="M1.5 1.5v18.2l4.6-4.4 3.1 7.1 3.3-1.4-3.1-7h6.4Z"
            fill="#fff"
            stroke="#16112b"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
};

export default CursorDemo;
