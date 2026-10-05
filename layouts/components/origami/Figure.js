import { FIGURES } from "./characters";

// a single figure as its own <svg>; `flip` mirrors it to face left
export const OrigamiFigure = ({
  name,
  flip = false,
  className = "",
  ...props
}) => {
  const { Figure, width, viewBox } = FIGURES[name];
  return (
    <svg
      className={`origami origami-${name} ${className}`}
      viewBox={viewBox}
      fill="none"
      aria-hidden="true"
      focusable="false"
      data-origami
      data-scene
      {...props}
    >
      <Figure
        flip={flip}
        transform={flip ? `translate(${width} 0) scale(-1 1)` : undefined}
      />
    </svg>
  );
};

// a decorative scene as one inline <svg>: its .o-part pieces unfold when it
// scrolls into view (GSAPWrapper) and its loops pause off screen
// (SceneObserver). `tone` picks the paper colours: day, haze or night.
export const OrigamiScene = ({
  viewBox,
  tone = "day",
  className = "",
  children,
  ...props
}) => (
  <svg
    className={`origami-scene o-tone-${tone} ${className}`}
    viewBox={viewBox}
    fill="none"
    aria-hidden="true"
    focusable="false"
    data-origami
    data-scene
    {...props}
  >
    {children}
  </svg>
);
