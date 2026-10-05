// Renders the film's score to public/film/bmdrm-film-score.wav, the audio
// track of the video composition.
//
// The score is synthesised with Web Audio from the film's own sound cues, so
// it is rendered in Remotion's headless Chrome — the "BMDRM-Film-Score" tool
// composition, the same synthesis /film plays live — which emits the WAV as
// an artifact. Here it is brought to web loudness (about -16 LUFS, peaks
// under -1.5 dBFS). Skips when the WAV is newer than the film's code; pass
// --force to redo it.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";
import { filmWebpackOverride } from "../layouts/film/remotion/webpack-override.mjs";

const root = process.cwd();
const OUT = path.join(root, "public/film/bmdrm-film-score.wav");
const SOURCES = [path.join(root, "layouts/film"), path.join(root, "styles/film.scss"), path.join(root, "styles/origami.scss")];

const newest = (p) => {
  const stat = fs.statSync(p);
  if (!stat.isDirectory()) return stat.mtimeMs;
  return Math.max(0, ...fs.readdirSync(p).map((f) => newest(path.join(p, f))));
};

if (!process.argv.includes("--force") && fs.existsSync(OUT) && fs.statSync(OUT).mtimeMs > Math.max(...SOURCES.map(newest))) {
  console.log(`score: up to date (${path.relative(root, OUT)})`);
  process.exit(0);
}

console.log("score: bundling the film…");
const serveUrl = await bundle({
  entryPoint: path.join(root, "layouts/film/remotion/index.js"),
  webpackOverride: filmWebpackOverride,
  publicDir: path.join(root, "public"),
});
const composition = await selectComposition({ serveUrl, id: "BMDRM-Film-Score", logLevel: "error" });

console.log("score: rendering with Web Audio (about a minute and a half)…");
let wav = null;
await renderStill({
  composition,
  serveUrl,
  output: path.join(os.tmpdir(), "bmdrm-film-score.png"),
  timeoutInMilliseconds: 600000,
  logLevel: "error",
  // the WAV arrives as base64 text (see layouts/film/remotion/FilmScore.js)
  onArtifact: ({ filename, content }) => {
    if (filename !== "bmdrm-film-score.wav.b64") return;
    const text = typeof content === "string" ? content : Buffer.from(content).toString("utf8");
    wav = Buffer.from(text, "base64");
  },
});
if (!wav) throw new Error("score: the score composition did not emit a WAV");

// --- loudness: fixed gain, then a look-ahead peak limiter -------------------
const GAIN = 10 ** (4.6 / 20);
const CEILING = 0.84;
const sampleRate = wav.readUInt32LE(24);
const frames = (wav.length - 44) / 4;
const l = new Float32Array(frames);
const r = new Float32Array(frames);
for (let i = 0; i < frames; i += 1) {
  l[i] = (wav.readInt16LE(44 + i * 4) / 32768) * GAIN;
  r[i] = (wav.readInt16LE(46 + i * 4) / 32768) * GAIN;
}
const look = Math.round(sampleRate * 0.005);
const release = 1 - Math.exp(-1 / (sampleRate * 0.06));
// peak over the next `look` samples (monotonic deque)
const peakAhead = new Float32Array(frames);
const q = [];
for (let i = frames - 1; i >= 0; i -= 1) {
  const v = Math.max(Math.abs(l[i]), Math.abs(r[i]));
  while (q.length && q[q.length - 1][1] <= v) q.pop();
  q.push([i, v]);
  while (q[0][0] > i + look) q.shift();
  peakAhead[i] = q[0][1];
}
let g = 1;
const out = Buffer.alloc(wav.length);
wav.copy(out, 0, 0, 44);
for (let i = 0; i < frames; i += 1) {
  const target = Math.min(1, CEILING / Math.max(peakAhead[i], 1e-9));
  g = target < g ? target : g + (target - g) * release;
  out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, l[i] * g)) * 32767), 44 + i * 4);
  out.writeInt16LE(Math.round(Math.max(-1, Math.min(1, r[i] * g)) * 32767), 46 + i * 4);
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, out);
console.log(`score: wrote ${path.relative(root, OUT)} (${(frames / sampleRate).toFixed(1)} s)`);
