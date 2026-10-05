import {
  Birds,
  Cloud,
  LockGate,
  Moon,
  OrigamiScene,
  Pine,
  Place,
  Range,
  Ridge,
  Tower,
  Wall,
} from "@layouts/components/origami";

// "Who we are", told in paper: BMDRM is the keep whose gate is the lock. A
// creator's messenger brings a sealed video and a guard welcomes it in (here
// to help). Portrait, to fill the about photo frame.
const WhoWeAreScene = () => (
  <OrigamiScene viewBox="0 0 320 400" className="who-scene">
    <rect width="320" height="400" className="who-sky" />

    <g data-depth="0.6">
      <g className="o-float" style={{ "--dur": "7s" }}>
        <Moon x={262} y={62} r={16} sun />
      </g>
      <Cloud x={20} y={50} w={82} drift={14} dur={24} />
      <Cloud x={176} y={108} w={62} drift={-12} dur={20} delay={4} />
      <Birds
        birds={[
          [110, 96, 0.8],
          [124, 104, 0.6, 1.1],
        ]}
      />
      <Range
        base={264}
        peaks={[
          [40, 200, 112],
          [262, 230, 146, true],
        ]}
      />
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={400}
        level="back"
        points={[
          [0, 274],
          [80, 254],
          [170, 264],
          [260, 248],
          [320, 260],
        ]}
      />
      <Pine x={14} base={286} h={42} delay={0.6} />
      <Pine x={304} base={282} h={46} delay={1.8} />
    </g>

    {/* the BMDRM keep: a server tower, flanking turrets, the lock as gate */}
    <g className="o-part" data-fold="up">
      <Wall x1={70} x2={250} base={306} h={56} />
      <Tower x={82} base={306} w={32} h={112} roofH={38} flag delay={1.2} />
      <Tower x={206} base={306} w={32} h={112} roofH={38} flag delay={2.1} />
      <Tower
        x={118}
        base={306}
        w={84}
        h={176}
        roofH={66}
        windows={0}
        data={4}
        flag
        delay={0.4}
      />
    </g>
    <g className="o-part" data-fold="up">
      <LockGate x={160} y={262} r={30} dialClassName="who-dial" />
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={400}
        level="mid"
        points={[
          [0, 320],
          [110, 306],
          [210, 314],
          [320, 304],
        ]}
      />
    </g>

    {/* the messenger brings the sealed video; the guard welcomes it in */}
    <Place name="messenger" x={18} y={206} scale={0.34} />
    <Place name="guard" x={224} y={212} scale={0.32} flip />

    <g className="o-part" data-fold="up">
      <Ridge
        base={401}
        level="front"
        points={[
          [0, 380],
          [90, 368],
          [200, 378],
          [320, 366],
        ]}
      />
    </g>
  </OrigamiScene>
);

export default WhoWeAreScene;
