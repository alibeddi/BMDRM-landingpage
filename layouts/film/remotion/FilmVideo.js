// The BMDRM film as a video. It is the /film stage and timeline, unchanged:
// each Remotion frame seeks the GSAP timeline to frame / fps and pins the CSS
// idle loops to the same instant, so every frame is exact and repeatable.
// The score (public/film/bmdrm-film-score.wav) comes from npm run film:score.
import { OrigamiDefs } from "@layouts/components/origami";
import { Audio } from "@remotion/media";
import { useLayoutEffect, useRef } from "react";
import { AbsoluteFill, continueRender, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { Stage, syncCss } from "../FilmStage";
import { useFilmStage } from "./useFilmStage";
import "./video.scss";

export const SCORE_FILE = "film/bmdrm-film-score.wav";

export const FilmFrame = ({ stageRef, children }) => (
  <AbsoluteFill className="film film-capture" data-ready="">
    <OrigamiDefs />
    <div className="film-stage" ref={stageRef}>
      <Stage />
    </div>
    {children}
  </AbsoluteFill>
);

export const FilmVideo = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const { stageRef, film, handle } = useFilmStage("Building the BMDRM film");
  const started = useRef(false);

  useLayoutEffect(() => {
    if (!film) return;
    const t = frame / fps;
    film.seek(t);
    syncCss(stageRef.current, t);
    if (!started.current) {
      started.current = true;
      continueRender(handle);
    }
  }, [film, frame, fps, handle, stageRef]);

  return (
    <FilmFrame stageRef={stageRef}>
      <Audio src={staticFile(SCORE_FILE)} />
    </FilmFrame>
  );
};
