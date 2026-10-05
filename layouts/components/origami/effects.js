// Streaming made visible: paper ribbons carrying sealed packages, and small
// paper particles drifting up.
import { path } from "./path";

// a paper ribbon along `d`; light pulses run along it (CSS) and, when `id`
// is given, sealed packages ride it (SMIL, hidden with reduced motion)
export const Stream = ({ d, id, packets = 2, dur = 6, begin = 0 }) => (
  <g>
    <path id={id} className="o-stream-base" d={d} />
    <path className="o-stream-hi" d={d} />
    <path
      className="o-stream-pulse"
      d={d}
      pathLength="100"
      style={{ "--dur": `${dur / 2}s` }}
    />
    {id && (
      <g className="o-packets">
        {Array.from({ length: packets }, (_, n) => {
          const start = `${(begin + (n * dur) / packets).toFixed(2)}s`;
          return (
            <g key={n} opacity="0">
              <set attributeName="opacity" to="1" begin={start} />
              <animateMotion
                dur={`${dur}s`}
                begin={start}
                repeatCount="indefinite"
              >
                <mpath href={`#${id}`} />
              </animateMotion>
              <path className="o-packet-l" d="M0 -6 6 0 0 0 -6 0Z" />
              <path className="o-packet-d" d="M-6 0 6 0 0 6Z" />
              <circle className="o-packet-seal" r="1.6" />
            </g>
          );
        })}
      </g>
    )}
  </g>
);

// paper flecks rising and turning: [x, y, size, delay, duration]
export const Particles = ({ particles }) => (
  <g>
    {particles.map(([x, y, s = 3, delay = 0, dur = 8]) => (
      <path
        key={`${x}-${y}`}
        className="o-particle"
        style={{ "--delay": `${delay}s`, "--dur": `${dur}s` }}
        d={path`M${x} ${y - s}L${x + s * 0.7} ${y}L${x} ${y + s}L${x - s * 0.7} ${y}Z`}
      />
    ))}
  </g>
);
