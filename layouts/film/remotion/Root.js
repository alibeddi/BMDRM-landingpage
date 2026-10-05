import { Composition, Folder } from "remotion";
import { DURATION } from "../timing";
import { FilmScore } from "./FilmScore";
import { FilmVideo } from "./FilmVideo";

// 30 fps: the film's motion is eased paper folds and camera moves, not fast
// action, and every cut lands on a bar of the 100 bpm score (2.4 s = 72
// frames), so 30 keeps cuts frame-exact at half the render cost of 60.
export const FPS = 30;

export const RemotionRoot = () => (
  <>
    <Composition
      id="BMDRM-Film"
      component={FilmVideo}
      durationInFrames={Math.round(DURATION * FPS)}
      fps={FPS}
      width={1920}
      height={1080}
    />
    <Folder name="Tools">
      <Composition id="BMDRM-Film-Score" component={FilmScore} durationInFrames={1} fps={FPS} width={1920} height={1080} />
    </Folder>
  </>
);
