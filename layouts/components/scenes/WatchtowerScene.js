import {
  Birds,
  Castle,
  Cloud,
  Flag,
  OrigamiScene,
  Pine,
  Place,
  Ridge,
} from "@layouts/components/origami";

// The watch over "What we do": the archer on the battlements of a
// watchtower, the knight at its door, on a folded paper mound.
const WatchtowerScene = () => (
  <OrigamiScene viewBox="0 0 380 320" className="watchtower-scene">
    <g data-depth="0.5">
      <Cloud x={40} y={40} w={92} drift={18} dur={26} />
      <Birds
        birds={[
          [120, 96, 0.9],
          [138, 104, 0.7, 1.2],
        ]}
      />
    </g>
    <g className="o-part" data-fold="up">
      <Ridge
        base={320}
        level="back"
        points={[
          [4, 320],
          [50, 284],
          [140, 268],
          [230, 278],
          [310, 260],
          [376, 320],
        ]}
      />
    </g>
    <g className="o-part" data-fold="up">
      <Castle variant="watchtower" x={268} y={276} scale={0.94} />
      <Flag x={292} y={130} h={34} w={26} delay={1.2} />
      <Pine x={350} base={272} h={52} delay={0.8} />
      <Pine x={366} base={276} h={36} delay={2} />
    </g>
    <Place name="archer" x={232} y={36} scale={0.3} flip />
    <Place name="knight" x={78} y={96} scale={0.56} flip />
    <g className="o-part" data-fold="up">
      <Ridge
        base={321}
        level="front"
        points={[
          [0, 321],
          [40, 302],
          [150, 292],
          [260, 302],
          [340, 294],
          [380, 321],
        ]}
      />
    </g>
  </OrigamiScene>
);

export default WatchtowerScene;
