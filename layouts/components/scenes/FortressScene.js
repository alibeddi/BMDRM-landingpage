import {
  Ballista,
  Castle,
  Catapult,
  HangingBanner,
  LockGate,
  Moon,
  OrigamiScene,
  Particles,
  Pine,
  Place,
  Range,
  Ridge,
  Sentries,
  Stars,
  Stream,
  Tower,
  Wall,
} from "@layouts/components/origami";

const STARS = [
  [60, 60, 2],
  [170, 120, 1.5],
  [260, 40, 2.4],
  [390, 96, 1.6],
  [520, 30, 2],
  [610, 120, 1.4],
  [860, 50, 2.2],
  [930, 130, 1.5],
  [1040, 70, 2],
  [1300, 40, 1.8],
  [1380, 150, 2.2],
  [1120, 170, 1.4],
  [330, 180, 1.6],
];

const FIREFLIES = [
  [560, 360, 2.4, 0, 9],
  [610, 330, 1.8, 2.5, 8],
  [690, 350, 2.2, 5, 10],
  [760, 340, 2, 1.2, 9],
  [830, 360, 2.6, 3.6, 11],
  [880, 330, 1.8, 6, 8],
  [480, 380, 2, 4.2, 10],
  [960, 390, 2.2, 7, 9],
  [720, 300, 1.6, 8, 12],
  [640, 400, 2, 6.4, 9],
];

// The fortress by night: content streams in through the gate and out to the
// world, under the watch of guards, a ballista crew and a catapult. Windows
// flicker, banners sway, sentries pace the walls, fireflies drift up.
const FortressScene = () => (
  <OrigamiScene
    viewBox="0 0 1440 460"
    tone="night"
    preserveAspectRatio="xMidYMax slice"
    className="fortress-scene"
  >
    <g data-depth="0.8">
      <Stars stars={STARS} />
      <g className="o-float" style={{ "--dur": "9s" }}>
        <Moon x={1190} y={112} r={30} />
      </g>
    </g>

    <g data-depth="0.55">
      <Range
        base={362}
        peaks={[
          [140, 380, 190, true],
          [470, 300, 128],
          [990, 340, 160],
          [1300, 420, 232, true],
        ]}
      />
    </g>

    <g data-depth="0.3">
      <g className="o-part" data-fold="up">
        <Ridge
          base={460}
          level="back"
          points={[
            [0, 356],
            [180, 332],
            [360, 350],
            [560, 330],
            [720, 342],
            [900, 326],
            [1100, 346],
            [1280, 328],
            [1440, 342],
          ]}
        />
      </g>
      <g className="o-part" data-fold="up">
        <Pine x={120} base={352} h={54} />
        <Pine x={148} base={350} h={40} delay={1.5} />
        <Pine x={262} base={344} h={46} delay={0.8} />
        <Pine x={1128} base={348} h={50} delay={2.2} />
        <Pine x={1340} base={334} h={58} delay={3} />
        <Pine x={1366} base={338} h={42} delay={1.1} />
      </g>
    </g>

    <g data-depth="0.12">
      {/* outer curtain walls and flanking towers */}
      <g className="o-part" data-fold="up">
        <Wall x1={440} x2={560} base={374} h={58} />
        <Wall x1={880} x2={1034} base={374} h={58} />
        <Tower
          x={336}
          base={374}
          w={110}
          h={120}
          roof="flat"
          windows={2}
          lit
          delay={2.6}
        />
        <Tower
          x={1030}
          base={374}
          w={50}
          h={132}
          roofH={60}
          windows={2}
          flag
          lit
          delay={3.4}
        />
      </g>
      <g className="o-part" data-fold="up">
        <Castle variant="fortress" x={720} y={374} scale={1.05} lit gate />
      </g>
      {/* the BMDRM lock is the fortress gate, as on the hero */}
      <g className="o-part" data-fold="up">
        <LockGate
          x={720}
          y={334}
          r={34}
          glowClassName="fortress-glow"
          dialClassName="o-dial-turn"
        />
      </g>
      <g className="o-part" data-fold="down">
        <HangingBanner x={500} y={318} w={24} h={52} delay={1} />
        <HangingBanner x={956} y={318} w={24} h={52} delay={2.4} />
      </g>
      <Sentries
        sentries={[
          [586, 286, 22, 0],
          [846, 286, -22, 3],
          [468, 316, 26, 1.5],
          [980, 316, -30, 4.5],
        ]}
      />
      {/* the ballista and its guard on the west tower */}
      <Place name="guard" x={404} y={188} scale={0.2} flip />
      <g className="o-part" data-fold="up">
        <Ballista x={378} y={254} scale={0.55} flip />
      </g>
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={460}
        level="mid"
        points={[
          [0, 404],
          [200, 390],
          [420, 402],
          [620, 384],
          [820, 390],
          [1020, 380],
          [1240, 396],
          [1440, 384],
        ]}
      />
    </g>

    <g className="o-part" data-fold="right">
      <Stream
        id="fortress-in"
        d="M-20 424 C 150 414, 260 438, 420 424 C 560 410, 640 398, 720 376"
        dur={7}
        packets={3}
      />
    </g>
    <g className="o-part" data-fold="right">
      <Stream
        id="fortress-out"
        d="M720 376 C 800 400, 900 414, 1040 416 C 1200 420, 1320 406, 1460 414"
        dur={7}
        packets={3}
        begin={3.5}
      />
    </g>

    {/* gate guards, the catapult and its crew on the east flank */}
    <Place name="guard" x={606} y={290} scale={0.26} />
    <Place name="guard" x={772} y={290} scale={0.26} flip />
    <g className="o-part" data-fold="up">
      <Catapult x={1176} y={398} scale={0.7} />
    </g>
    <Place name="guard" x={1252} y={318} scale={0.24} flip />

    <Particles particles={FIREFLIES} />

    <g className="o-part" data-fold="up">
      <Ridge
        base={460}
        level="front"
        points={[
          [0, 446],
          [260, 436],
          [520, 446],
          [800, 438],
          [1100, 448],
          [1440, 438],
        ]}
      />
    </g>
  </OrigamiScene>
);

export default FortressScene;
