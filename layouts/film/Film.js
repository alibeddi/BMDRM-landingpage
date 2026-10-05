"use client";

// BMDRM — the brand film, playable on the site. The stage and its timeline
// live in FilmStage.js (shared with the video composition in
// layouts/film/remotion, which renders the MP4); this adds playback, the
// live score and controls. `capture` exposes window.__film for review tools.
import { useCallback, useEffect, useRef, useState } from "react";
import { Stage, buildFilm, syncCss } from "./FilmStage";
import { LiveScore, renderScore, scoreEvents } from "./score";
import { DURATION, T } from "./timing";

const POSTER = T.end - 1.2;

const fmt = (t) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`;

const Film = ({ capture = false, start }) => {
  const stageRef = useRef(null);
  const wrapRef = useRef(null);
  const filmRef = useRef(null);
  const scoreRef = useRef(null);
  const clock = useRef({ playing: false, t: 0, anchor: 0, base: 0 });
  const rangeRef = useRef(null);
  const timeRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [started, setStarted] = useState(false);
  const [muted, setMuted] = useState(false);
  const [idle, setIdle] = useState(false);

  // fit the 1920×1080 stage into the window
  useEffect(() => {
    const fit = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const s = Math.min(wrap.clientWidth / 1920, wrap.clientHeight / 1080);
      wrap.style.setProperty("--film-scale", s.toFixed(5));
    };
    fit();
    window.addEventListener("resize", fit);
    document.documentElement.classList.add("film-lock");
    return () => {
      window.removeEventListener("resize", fit);
      document.documentElement.classList.remove("film-lock");
    };
  }, []);

  useEffect(() => {
    const film = buildFilm(stageRef.current);
    filmRef.current = film;
    const events = scoreEvents(film.cues);
    scoreRef.current = new LiveScore(events);
    const first = start ?? (capture ? 0 : POSTER);
    film.seek(first);
    clock.current.t = first;
    if (capture) {
      window.__film = {
        duration: DURATION,
        seek: (t) => {
          film.seek(t);
          syncCss(stageRef.current, t);
        },
        renderAudio: async () => {
          const wav = await renderScore(events);
          const bytes = new Uint8Array(wav);
          let bin = "";
          for (let i = 0; i < bytes.length; i += 0x8000) bin += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
          return btoa(bin);
        },
      };
    }
    setReady(true);
    return () => {
      scoreRef.current?.stop();
      film.tl.kill();
    };
  }, [capture, start]);

  // the playback loop: the audio clock leads when sound is on
  useEffect(() => {
    if (capture) return undefined;
    let raf;
    const loop = () => {
      const c = clock.current;
      if (c.playing) {
        const score = scoreRef.current;
        const now = score?.ctx && score.bus ? score.time : c.base + (performance.now() - c.anchor) / 1000;
        c.t = Math.min(DURATION, now);
        filmRef.current?.seek(c.t);
        if (c.t >= DURATION) {
          c.playing = false;
          scoreRef.current?.stop();
          setPlaying(false);
        }
      }
      if (rangeRef.current) rangeRef.current.value = c.t;
      if (timeRef.current) timeRef.current.textContent = `${fmt(c.t)} / ${fmt(DURATION)}`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [capture]);

  const play = useCallback(
    async (from) => {
      const c = clock.current;
      let t = from ?? c.t;
      if (t >= DURATION - 0.05) t = 0;
      c.t = t;
      c.base = t;
      c.anchor = performance.now();
      c.playing = true;
      setPlaying(true);
      setStarted(true);
      if (!muted) await scoreRef.current?.start(t);
    },
    [muted],
  );

  const pause = useCallback(() => {
    clock.current.playing = false;
    scoreRef.current?.stop();
    setPlaying(false);
  }, []);

  const seekTo = useCallback(
    (t) => {
      const c = clock.current;
      c.t = Math.max(0, Math.min(DURATION, t));
      filmRef.current?.seek(c.t);
      if (c.playing) play(c.t);
    },
    [play],
  );

  const toggleMute = useCallback(() => {
    const next = !muted;
    setMuted(next);
    const c = clock.current;
    if (next) {
      scoreRef.current?.stop();
      c.base = c.t;
      c.anchor = performance.now();
    } else if (c.playing) {
      scoreRef.current?.start(c.t);
    }
  }, [muted]);

  const fullscreen = useCallback(() => {
    const el = wrapRef.current;
    if (document.fullscreenElement) document.exitFullscreen?.();
    else el?.requestFullscreen?.();
  }, []);

  // keyboard: space plays/pauses, arrows skip
  useEffect(() => {
    if (capture) return undefined;
    const onKey = (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        if (clock.current.playing) pause();
        else play(started ? undefined : 0);
      } else if (e.code === "ArrowRight") seekTo(clock.current.t + 5);
      else if (e.code === "ArrowLeft") seekTo(clock.current.t - 5);
      else if (e.code === "KeyM") toggleMute();
      else if (e.code === "KeyF") fullscreen();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [capture, pause, play, seekTo, started, toggleMute, fullscreen]);

  // controls fade while the film plays and the pointer rests
  useEffect(() => {
    if (capture) return undefined;
    let timer;
    const wake = () => {
      setIdle(false);
      clearTimeout(timer);
      timer = setTimeout(() => setIdle(true), 2400);
    };
    wake();
    window.addEventListener("pointermove", wake);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointermove", wake);
    };
  }, [capture]);

  return (
    <div ref={wrapRef} className={`film ${capture ? "film-capture" : ""} ${playing && idle ? "film-idle" : ""}`} data-ready={ready || undefined}>
      <div className="film-stage" ref={stageRef}>
        <Stage />
      </div>

      {!capture && (
        <>
          {!started && (
            <button type="button" className="film-start" onClick={() => play(0)} aria-label="Play the BMDRM film">
              <span className="film-start-disc">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
              <span className="film-start-label">Watch the film</span>
              <span className="film-start-meta">{fmt(DURATION)} · sound on</span>
            </button>
          )}
          <div className="film-bar" role="group" aria-label="Film controls">
            <button type="button" className="film-btn" onClick={() => (playing ? pause() : play(started ? undefined : 0))} aria-label={playing ? "Pause" : "Play"}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{playing ? <path d="M7 5h3.5v14H7zM13.5 5H17v14h-3.5z" /> : <path d="M8 5.5v13l11-6.5z" />}</svg>
            </button>
            <input
              ref={rangeRef}
              className="film-range"
              type="range"
              min="0"
              max={DURATION}
              step="0.01"
              defaultValue={POSTER}
              aria-label="Seek"
              onChange={(e) => {
                setStarted(true);
                seekTo(parseFloat(e.target.value));
              }}
            />
            <span ref={timeRef} className="film-time">
              {fmt(POSTER)} / {fmt(DURATION)}
            </span>
            <button type="button" className="film-btn" onClick={toggleMute} aria-label={muted ? "Sound on" : "Sound off"} aria-pressed={muted}>
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 9.5h3.5L12 5.5v13l-4.5-4H4z" />
                {muted ? <path d="M15.5 9.5l5 5m0-5l-5 5" className="film-stroke" /> : <path d="M15.5 9a4.5 4.5 0 0 1 0 6M18 6.5a8 8 0 0 1 0 11" className="film-stroke" />}
              </svg>
            </button>
            <button type="button" className="film-btn" onClick={fullscreen} aria-label="Full screen">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4.5 9V4.5H9M15 4.5h4.5V9M19.5 15v4.5H15M9 19.5H4.5V15" className="film-stroke" />
              </svg>
            </button>
            <a className="film-back" href="/">
              bmdrm.com
            </a>
          </div>
        </>
      )}
    </div>
  );
};

export default Film;
