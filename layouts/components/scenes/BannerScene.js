import {
  Birds,
  Bridge,
  Castle,
  Cloud,
  House,
  Oak,
  OrigamiScene,
  Pine,
  Place,
  Range,
  Ridge,
  Stream,
} from "@layouts/components/origami";

// A peaceful kingdom under the About title: village, bridge and river, the
// castle on its hill, and the messenger bringing a sealed charter home.
const Kingdom = () => (
  <OrigamiScene
    viewBox="0 0 1200 260"
    preserveAspectRatio="xMidYMax slice"
    className="banner-scene banner-scene-kingdom"
  >
    <g data-depth="0.6">
      <Cloud x={140} y={40} w={120} drift={30} dur={40} />
      <Cloud x={760} y={24} w={96} drift={-24} dur={32} delay={9} />
      <Cloud x={1010} y={70} w={70} drift={18} dur={26} delay={4} />
      <Birds
        birds={[
          [420, 60, 1],
          [440, 70, 0.8, 1.3],
          [404, 74, 0.7, 2.2],
        ]}
      />
      <Range
        base={196}
        peaks={[
          [90, 300, 132, true],
          [360, 220, 84],
          [880, 260, 104],
          [1120, 320, 150, true],
        ]}
      />
      <g className="o-tone-haze">
        <Castle variant="keep" x={930} y={188} scale={0.42} />
      </g>
    </g>

    <g data-depth="0.25">
      <g className="o-part" data-fold="up">
        <Ridge
          base={260}
          level="back"
          points={[
            [0, 196],
            [180, 180],
            [380, 194],
            [600, 164],
            [820, 190],
            [1000, 176],
            [1200, 192],
          ]}
        />
      </g>
      <g className="o-part" data-fold="up">
        <Castle variant="fortress" x={600} y={184} scale={0.5} gate />
      </g>
      <g className="o-part" data-fold="up">
        <Pine x={470} base={192} h={40} />
        <Pine x={490} base={194} h={30} delay={1.4} />
        <Oak x={728} base={190} h={34} delay={0.7} />
        <Pine x={1060} base={188} h={44} delay={2.1} />
      </g>
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={260}
        level="mid"
        points={[
          [0, 214],
          [240, 204],
          [480, 218],
          [720, 206],
          [960, 220],
          [1200, 206],
        ]}
      />
    </g>
    <g className="o-part" data-fold="up">
      <House x={236} base={212} />
      <House x={276} base={214} w={28} h={20} />
      <House x={312} base={212} w={30} h={24} />
      <Oak x={200} base={214} h={32} delay={1.8} />
      <Oak x={892} base={214} h={30} delay={2.6} />
      <House x={930} base={216} w={30} h={22} />
    </g>
    <g className="o-part" data-fold="right">
      <Stream d="M-10 248 C 160 240, 300 252, 420 236 C 500 226, 540 214, 600 196" />
    </g>
    <g className="o-part" data-fold="up">
      <Bridge x={372} base={246} w={84} h={18} />
    </g>

    {/* the messenger, walking to the castle as the page scrolls */}
    <g data-advance="-50">
      <Place name="messenger" x={690} y={164} scale={0.22} flip />
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={261}
        level="front"
        points={[
          [0, 248],
          [300, 240],
          [600, 250],
          [900, 242],
          [1200, 250],
        ]}
      />
    </g>
  </OrigamiScene>
);

// Quiet hills under the title of regular pages (policies and the like).
const Hills = () => (
  <OrigamiScene
    viewBox="0 0 1200 150"
    preserveAspectRatio="xMidYMax slice"
    className="banner-scene banner-scene-hills"
  >
    <g data-depth="0.5">
      <Cloud x={260} y={20} w={90} drift={24} dur={34} />
      <Cloud x={880} y={34} w={70} drift={-18} dur={28} delay={6} />
      <Range
        base={112}
        peaks={[
          [120, 260, 90, true],
          [520, 200, 60],
          [1060, 280, 100, true],
        ]}
      />
      <g className="o-tone-haze">
        <Castle variant="fortress" x={760} y={110} scale={0.3} />
      </g>
    </g>
    <g className="o-part" data-fold="up">
      <Ridge
        base={150}
        level="back"
        points={[
          [0, 118],
          [260, 104],
          [520, 120],
          [800, 108],
          [1000, 122],
          [1200, 110],
        ]}
      />
    </g>
    <g className="o-part" data-fold="up">
      <Pine x={300} base={112} h={32} />
      <Pine x={318} base={114} h={24} delay={1.2} />
      <Oak x={960} base={120} h={26} delay={2} />
    </g>
    <g className="o-part" data-fold="up">
      <Ridge
        base={151}
        level="front"
        points={[
          [0, 138],
          [300, 130],
          [600, 140],
          [900, 132],
          [1200, 140],
        ]}
      />
    </g>
  </OrigamiScene>
);

const BannerScene = ({ variant = "hills" }) =>
  variant === "kingdom" ? <Kingdom /> : <Hills />;

export default BannerScene;
