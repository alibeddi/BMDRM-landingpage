// The film itself, shared by the /film page and the video composition
// (layouts/film/remotion): the 1920×1080 stage (SVG art + HTML captions) and
// the one seekable timeline that drives it. Whoever mounts the stage calls
// buildFilm() once, then film.seek(seconds) for every frame.
import { memo } from "react";
import { asset } from "./assets";
import { Captions } from "./Captions";
import { createEngine } from "./engine";
import { T } from "./timing";
import { WorldArt } from "./World";
import { buildWorld } from "./buildWorld";
import { AccessArt, buildAccess } from "./shots/Access";
import { buildFinale } from "./shots/Finale";
import { IngestArt, buildIngest } from "./shots/Ingest";
import { IntroArt, buildIntro } from "./shots/Intro";
import { LayersArt, buildLayers } from "./shots/Layers";
import { LibraryArt, buildLibrary } from "./shots/Library";
import { OAuthArt, buildOAuth } from "./shots/OAuth";
import { PlayerArt, buildPlayer } from "./shots/Player";
import { SHIELD_CARD, ShieldArt, buildShield } from "./shots/Shield";
import { BlueprintFrame, Bloom, FacetWipe, FoldWipe, buildBloom, buildFacetWipe, buildFoldWipe } from "./shots/Transitions";

// the art never re-renders: playback only touches the DOM through GSAP
export const Stage = memo(function Stage() {
  return (
    <>
      <svg className="film-svg o-tone-day" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs>
          <pattern id="fp-stripes" patternUnits="userSpaceOnUse" width="360" height="360">
            <image href={asset("images/patterns/stripes-lilac.svg")} width="360" height="360" />
          </pattern>
        </defs>
        <rect width="1920" height="1080" className="sh-cream" />
        <WorldArt />
        <IntroArt />
        <IngestArt />
        <OAuthArt />
        <ShieldArt />
        <LayersArt />
        <AccessArt />
        <LibraryArt />
        <PlayerArt />
        <BlueprintFrame k="frame" />
        <Bloom k="bloom" />
        <FacetWipe k="facets-a" />
        <FacetWipe k="facets-b" />
        <FoldWipe k="fold-a" />
        <FoldWipe k="fold-b" />
      </svg>
      <Captions />
    </>
  );
});

export const buildFilm = (root) => {
  const film = createEngine(root);
  buildWorld(film);
  buildIntro(film);
  buildIngest(film);
  buildOAuth(film);
  buildShield(film);
  buildLayers(film);
  buildAccess(film);
  buildLibrary(film);
  buildPlayer(film);
  buildFinale(film);
  buildFacetWipe(film, "facets-a", T.ingest);
  buildFoldWipe(film, "fold-a", T.shield);
  buildBloom(film, "bloom", T.layers, { x: SHIELD_CARD.x, y: SHIELD_CARD.y });
  buildFoldWipe(film, "fold-b", T.road);
  buildFacetWipe(film, "facets-b", T.player);
  return film;
};

// The CSS idle loops (flags, capes, trees, sentries…) run on wall-clock time
// in the browser; for exact frames they are paused and set to the film clock.
export const syncCss = (root, t) => {
  root.getAnimations({ subtree: true }).forEach((a) => {
    a.pause();
    a.currentTime = t * 1000;
  });
};
