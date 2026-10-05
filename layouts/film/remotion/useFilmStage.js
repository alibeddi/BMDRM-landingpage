// Mounts the film's stage for Remotion: waits for the fonts and every image
// (a missing asset fails the render instead of rendering a blank), then
// builds the timeline once. Frames are applied by the caller.
import { useLayoutEffect, useRef, useState } from "react";
import { cancelRender, delayRender } from "remotion";
import { buildFilm } from "../FilmStage";
import { loadFilmFonts } from "./fonts";

const preloadImages = (root) =>
  Promise.all(
    [...root.querySelectorAll("img, image")].map((el) => {
      const src = el.getAttribute("src") || el.getAttribute("href");
      const img = new Image();
      img.src = src;
      return img.decode().catch(() => {
        throw new Error(`The film could not load ${src}`);
      });
    }),
  );

export const useFilmStage = (label, timeoutInMilliseconds = 120000) => {
  const stageRef = useRef(null);
  const [film, setFilm] = useState(null);
  const [handle] = useState(() => delayRender(label, { timeoutInMilliseconds }));

  useLayoutEffect(() => {
    let alive = true;
    let built;
    loadFilmFonts()
      .then(() => preloadImages(stageRef.current))
      .then(() => {
        if (!alive) return;
        built = buildFilm(stageRef.current);
        setFilm(built);
      })
      .catch((err) => cancelRender(err));
    return () => {
      alive = false;
      built?.tl.kill();
    };
  }, []);

  return { stageRef, film, handle };
};
