// A one-frame helper composition used by scripts/film-score.mjs: it builds
// the film (whose shots register the sound cues), renders the score with Web
// Audio — the same synthesis /film plays live — and emits the WAV as a
// Remotion artifact, which the script writes to public/film/. The artifact
// is base64 text: Remotion's binary artifacts pass through a UTF-8 decode,
// which audio bytes do not survive.
import { useEffect, useLayoutEffect, useState } from "react";
import { Artifact, cancelRender, continueRender } from "remotion";
import { renderScore, scoreEvents } from "../score";
import { FilmFrame } from "./FilmVideo";
import { useFilmStage } from "./useFilmStage";

export const SCORE_ARTIFACT = "bmdrm-film-score.wav.b64";

const toBase64 = (bytes) => {
  let bin = "";
  for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return btoa(bin);
};

export const FilmScore = () => {
  const { stageRef, film, handle } = useFilmStage("Rendering the BMDRM score", 600000);
  const [wav, setWav] = useState(null);

  useLayoutEffect(() => {
    if (!film) return;
    film.seek(0);
    renderScore(scoreEvents(film.cues))
      .then((buffer) => setWav(toBase64(new Uint8Array(buffer))))
      .catch((err) => cancelRender(err));
  }, [film]);

  useEffect(() => {
    if (wav) continueRender(handle);
  }, [wav, handle]);

  return <FilmFrame stageRef={stageRef}>{wav && <Artifact filename={SCORE_ARTIFACT} content={wav} />}</FilmFrame>;
};
