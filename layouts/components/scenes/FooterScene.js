import {
  Birds,
  Castle,
  Cloud,
  House,
  Oak,
  OrigamiScene,
  Pine,
  Place,
  Range,
  Ridge,
} from "@layouts/components/origami";

// The kingdom at rest, closing every page: a fortress on the horizon, a
// village under the keep, the archer and the guard on the last hills. The
// paper foreground runs into the BMDRM wordmark below it.
const FooterScene = () => (
  <OrigamiScene
    viewBox="0 0 1440 220"
    preserveAspectRatio="xMidYMax slice"
    className="footer-scene"
  >
    <g data-depth="0.5">
      <Cloud x={250} y={30} w={120} drift={28} dur={36} />
      <Cloud x={820} y={16} w={90} drift={-22} dur={30} delay={8} />
      <Cloud x={1250} y={46} w={70} drift={18} dur={26} delay={3} />
      <Birds
        birds={[
          [640, 50, 1],
          [660, 60, 0.8, 1.1],
          [626, 64, 0.7, 2.3],
        ]}
      />
      <Range
        base={182}
        peaks={[
          [150, 300, 118, true],
          [560, 260, 86],
          [960, 280, 104],
          [1320, 340, 140, true],
        ]}
      />
      <g className="o-tone-haze">
        <Castle variant="fortress" x={470} y={178} scale={0.44} />
      </g>
    </g>

    <g className="o-part" data-fold="up">
      <Ridge
        base={220}
        level="back"
        points={[
          [0, 170],
          [220, 156],
          [420, 172],
          [640, 160],
          [860, 176],
          [1080, 158],
          [1280, 172],
          [1440, 160],
        ]}
      />
    </g>
    <g className="o-part" data-fold="up">
      <Castle variant="keep" x={1010} y={190} scale={0.52} />
      <Oak x={912} base={192} h={34} delay={1} />
      <Pine x={700} base={186} h={40} delay={2} />
      <Pine x={718} base={188} h={30} delay={0.4} />
    </g>
    <g className="o-part" data-fold="up">
      <Ridge
        base={220}
        level="mid"
        points={[
          [0, 192],
          [300, 180],
          [560, 194],
          [820, 184],
          [1100, 196],
          [1440, 182],
        ]}
      />
    </g>
    <g className="o-part" data-fold="up">
      <House x={1110} base={196} />
      <House x={1150} base={198} w={28} h={20} />
      <House x={1186} base={196} w={30} h={22} />
      <Oak x={1234} base={196} h={30} delay={2.6} />
      <Pine x={340} base={192} h={36} delay={1.6} />
    </g>

    <Place name="archer" x={112} y={62} scale={0.42} />
    <Place name="guard" x={1296} y={62} scale={0.42} flip />

    <g className="o-part" data-fold="up">
      <Ridge
        base={221}
        level="front"
        points={[
          [0, 206],
          [260, 198],
          [520, 208],
          [780, 200],
          [1040, 208],
          [1300, 198],
          [1440, 204],
        ]}
      />
    </g>
  </OrigamiScene>
);

export default FooterScene;
