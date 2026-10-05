import {
  Birds,
  Cloud,
  House,
  LockGate,
  Moon,
  Oak,
  OrigamiScene,
  Pine,
  Place,
  Range,
  Ridge,
  Stream,
  Tower,
  Wall,
} from "@layouts/components/origami";

// Poster for the About video, in the video's own proportions: "you focus on
// your content, we handle the security". The messenger strolls in from the
// village with a sealed video while the fortress takes care of it: the knight
// and a guard at the lock gate, the archer on the tower, and the protected
// stream leaving for the world. The card's play button sits in the open sky.
const AboutVideoScene = () => (
  <OrigamiScene
    viewBox="0 0 1077 604"
    preserveAspectRatio="xMidYMid slice"
    className="video-card-art"
  >
    <defs>
      <linearGradient id="about-poster-sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#e6ddfd" />
        <stop offset="1" stopColor="#f8f6ff" />
      </linearGradient>
    </defs>
    <rect width="1077" height="604" fill="url(#about-poster-sky)" />

    <g data-depth="0.6">
      <g className="o-float" style={{ "--dur": "8s" }}>
        <Moon x={884} y={112} r={34} sun />
      </g>
      <Cloud x={96} y={70} w={150} drift={26} dur={36} />
      <Cloud x={560} y={112} w={110} drift={-20} dur={30} delay={7} />
      <Cloud x={960} y={200} w={86} drift={16} dur={26} delay={3} />
      <Birds
        birds={[
          [380, 150, 1.2],
          [404, 162, 0.9, 1.1],
          [360, 168, 0.8, 2.2],
        ]}
      />
      <Range
        base={440}
        peaks={[
          [110, 380, 196, true],
          [420, 300, 128],
          [700, 320, 156],
          [1000, 400, 220, true],
        ]}
      />
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={604}
        level="back"
        points={[
          [0, 432],
          [180, 404],
          [380, 420],
          [560, 396],
          [760, 412],
          [920, 392],
          [1077, 408],
        ]}
      />
    </g>

    {/* the village where the content is made */}
    <g className="o-part" data-fold="up">
      <House x={96} base={446} w={46} h={32} />
      <House x={150} base={448} w={38} h={26} />
      <House x={194} base={446} w={42} h={30} />
      <Oak x={70} base={448} h={44} delay={1.2} />
      <Oak x={262} base={446} h={40} delay={2.4} />
    </g>

    {/* the fortress that keeps it safe */}
    <g className="o-part" data-fold="up">
      <Wall x1={604} x2={690} base={452} h={70} />
      <Wall x1={830} x2={916} base={452} h={70} />
      <Tower
        x={572}
        base={452}
        w={40}
        h={104}
        roof="flat"
        windows={2}
        delay={0.8}
      />
      <Tower
        x={908}
        base={452}
        w={44}
        h={118}
        roof="flat"
        windows={2}
        delay={1.6}
      />
      <Tower
        x={690}
        base={452}
        w={38}
        h={144}
        roofH={46}
        windows={0}
        data={3}
        flag
        delay={0.2}
      />
      <Tower
        x={792}
        base={452}
        w={38}
        h={144}
        roofH={46}
        windows={0}
        data={3}
        flag
        delay={1.1}
      />
      <Tower x={726} base={452} w={68} h={112} roof="flat" windows={0} />
      <Pine x={1000} base={440} h={60} delay={0.6} />
      <Pine x={1024} base={444} h={44} delay={2} />
    </g>
    <g className="o-part" data-fold="up">
      <LockGate x={760} y={414} r={32} dialClassName="poster-dial" />
    </g>
    <Place name="archer" x={897} y={248} scale={0.26} />

    <g className="o-part" data-fold="up">
      <Ridge
        base={604}
        level="mid"
        points={[
          [0, 470],
          [240, 456],
          [480, 468],
          [720, 452],
          [900, 462],
          [1077, 450],
        ]}
      />
    </g>

    {/* the road in, and the protected stream out */}
    <g className="o-part" data-fold="right">
      <Stream
        id="poster-road"
        d="M-20 548 C 160 540, 320 512, 480 498 C 600 488, 700 472, 760 452"
        dur={6}
        packets={2}
      />
    </g>
    <g className="o-part" data-fold="right">
      <Stream
        id="poster-out"
        d="M790 452 C 870 480, 960 500, 1100 512"
        dur={4}
        packets={2}
        begin={2}
      />
    </g>

    <Place name="knight" x={612} y={306} scale={0.46} />
    <Place name="guard" x={812} y={326} scale={0.4} flip />
    <g data-advance="40">
      <Place name="messenger" x={300} y={352} scale={0.5} />
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={605}
        level="front"
        points={[
          [0, 584],
          [260, 570],
          [540, 582],
          [820, 568],
          [1077, 580],
        ]}
      />
    </g>
  </OrigamiScene>
);

export default AboutVideoScene;
