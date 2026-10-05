import {
  Ballista,
  Birds,
  Cloud,
  LockGate,
  Mouse,
  Pine,
  Place,
  Range,
  Ridge,
  Sentries,
  Tower,
  Wall,
} from "@layouts/components/origami";

// Home hero: BMDRM as a paper fortress whose gate is the lock. A video file
// hovers over the gate and drops in; the dial turns and the lock folds as
// it's sealed, while the knight and a guard hold the gate and the tower
// crews keep watch; now and then a mouse scurries past. One 14s CSS cycle
// drives the story (styles/home.scss);
// idle loops come from styles/origami.scss. Decorative only.
// The viewBox frames the fortress; the sky, mountains and ground run on past
// it (overflow visible) so wide screens see a continuous landscape.

const GATE = { x: 720, y: 386 };

const HeroArt = () => {
  return (
    <svg
      className="hero-art o-tone-day"
      viewBox="360 170 720 350"
      preserveAspectRatio="xMidYMax meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      {/* sky and a single row of mountains */}
      <g data-depth="0.5">
        <g className="art-in o-tone-haze" style={{ "--d": 0.05 }}>
          <Cloud x={200} y={206} w={100} drift={140} dur={24} />
          <Cloud x={430} y={194} w={78} drift={-120} dur={20} delay={6} />
          <Cloud x={900} y={214} w={92} drift={-130} dur={22} delay={11} />
          <Cloud x={1150} y={196} w={110} drift={150} dur={28} delay={3} />
          <Birds
            birds={[
              [986, 250, 0.9],
              [1004, 258, 0.7, 1.2],
              [972, 262, 0.75, 2.1],
            ]}
          />
          <Range
            base={452}
            peaks={[
              [-80, 360, 150, true],
              [240, 320, 118],
              [560, 280, 104],
              [900, 300, 124],
              [1220, 320, 122],
              [1540, 360, 150, true],
            ]}
          />
        </g>
      </g>

      {/* the fortress: walls with a chevron frieze, server towers, the lock gate */}
      <g data-depth="0.15">
        <g className="art-in" style={{ "--d": 0.3 }}>
          <Wall x1={520} x2={606} base={452} h={76} />
          <Wall x1={834} x2={920} base={452} h={76} />
          <path
            className="hero-frieze"
            d="M526 398 l6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 M840 398 l6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5 6 -5 6 5"
          />
          <Tower
            x={446}
            base={452}
            w={76}
            h={150}
            roof="flat"
            windows={2}
            delay={0.5}
          />
          <Tower
            x={918}
            base={452}
            w={68}
            h={160}
            roof="flat"
            windows={2}
            delay={1.3}
          />
          <Tower
            x={602}
            base={452}
            w={60}
            h={188}
            roofH={58}
            windows={0}
            data={4}
            flag
            delay={0.2}
          />
          <Tower
            x={778}
            base={452}
            w={60}
            h={188}
            roofH={58}
            windows={0}
            data={4}
            flag
            delay={1.1}
          />
          <Tower x={660} base={452} w={120} h={150} roof="flat" windows={0} />
          <Sentries
            sentries={[
              [546, 376, 22, 0],
              [896, 376, -22, 2.5],
            ]}
          />
        </g>

        {/* the gate: the BMDRM lock in a ring of folded arch stones */}
        <g className="art-in art-pop" style={{ "--d": 0.5 }}>
          <LockGate
            x={GATE.x}
            y={GATE.y}
            r={55}
            glowClassName="art-glow hero-glow"
            dialClassName="hero-ring"
            lockClassName="hero-lock"
          />
        </g>

        {/* a ballista and its guard on the west tower, the archer on the east */}
        <g className="o-unfold" style={{ "--o-delay": "1.2s" }}>
          <Place name="guard" x={490} y={246} scale={0.17} flip />
        </g>
        <g className="art-in" style={{ "--d": 0.9 }}>
          <Ballista x={470} y={302} scale={0.5} flip />
        </g>
        <g className="o-unfold" style={{ "--o-delay": "1.4s" }}>
          <Place name="archer" x={917} y={199} scale={0.28} />
        </g>
      </g>

      {/* one ground for the whole kingdom, with a few firs */}
      <g className="art-in" style={{ "--d": 0.2 }}>
        <Ridge
          base={522}
          level="front"
          points={[
            [-700, 520],
            [-300, 500],
            [100, 472],
            [460, 456],
            [720, 452],
            [980, 456],
            [1340, 472],
            [1740, 500],
            [2140, 520],
          ]}
        />
        <Pine x={414} base={470} h={52} delay={1} />
        <Pine x={436} base={472} h={36} delay={2.4} />
        <Pine x={1022} base={470} h={54} delay={2} />
        <Pine x={1044} base={472} h={38} delay={0.6} />
        <Pine x={180} base={484} h={60} delay={1.6} />
        <Pine x={1262} base={484} h={58} delay={0.3} />
      </g>

      {/* the video to protect hovers over the gate and drops into the lock */}
      <g className="art-in" style={{ "--d": 0.7 }}>
        <g className="hero-drop">
          <path className="hero-thread" d="M720 254 V300" />
          <path
            d="M696 220 a5 5 0 0 1 5 -5 H734 L746 227 V249 a5 5 0 0 1 -5 5 H701 a5 5 0 0 1 -5 -5 Z"
            className="art-paper art-soft-stroke"
          />
          <path d="M734 215 V227 H746 Z" className="hero-file-fold" />
          <path d="M706 229 v12 l10 -6 z" className="art-play-ink" />
          <text x="722" y="248" className="art-file-text">
            MP4
          </text>
        </g>
      </g>

      {/* the knight and a guard keep the gate */}
      <g className="o-unfold" style={{ "--o-delay": "1.1s" }}>
        <Place name="knight" x={536} y={304} scale={0.5} />
      </g>
      <g className="o-unfold" style={{ "--o-delay": "1.3s" }}>
        <Place name="guard" x={802} y={331} scale={0.42} flip />
      </g>

      {/* now and then a mouse scurries past the gate, stops to sniff, and
          slips away behind the firs */}
      <g className="hero-mouse">
        <g className="o-scurry">
          <Mouse x={440} y={492} scale={0.85} />
        </g>
      </g>
    </svg>
  );
};

export default HeroArt;
