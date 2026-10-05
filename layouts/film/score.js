// The film's sound, synthesised with Web Audio so it is part of the code:
// a light cinematic score (pads, plucks, FM bells, soft percussion; D major,
// 100 bpm) and sound design for paper folds, gates, seals and data.
// The same events play live (scheduled ahead of the clock) or render offline
// to a WAV for the MP4.
import { BAR, DURATION } from "./timing";

const BEAT = BAR / 4;
const mtof = (m) => 440 * 2 ** ((m - 69) / 12);

// deterministic randomness, so every render sounds the same
const prng = (seed) => () => {
  seed = (seed * 1664525 + 1013904223) >>> 0;
  return seed / 4294967296;
};

const noiseCache = new WeakMap();
const noise = (ctx) => {
  if (noiseCache.has(ctx)) return noiseCache.get(ctx);
  const rand = prng(7);
  const buf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
  const d = buf.getChannelData(0);
  for (let i = 0; i < d.length; i += 1) d[i] = rand() * 2 - 1;
  noiseCache.set(ctx, buf);
  return buf;
};

// ---------------------------------------------------------------------------
// Mix bus: music and sfx → (dry + reverb + echo) → gentle compressor → out
// ---------------------------------------------------------------------------
export function createBus(ctx, destination = ctx.destination) {
  const out = ctx.createGain();
  out.gain.value = 0.9;
  const comp = ctx.createDynamicsCompressor();
  comp.threshold.value = -16;
  comp.knee.value = 12;
  comp.ratio.value = 3;
  comp.attack.value = 0.01;
  comp.release.value = 0.25;
  const air = ctx.createBiquadFilter();
  air.type = "highshelf";
  air.frequency.value = 5000;
  air.gain.value = 4;
  comp.connect(air).connect(out);
  out.connect(destination);

  const rand = prng(11);
  const len = Math.floor(ctx.sampleRate * 3.2);
  const ir = ctx.createBuffer(2, len, ctx.sampleRate);
  for (let c = 0; c < 2; c += 1) {
    const d = ir.getChannelData(c);
    for (let i = 0; i < len; i += 1) d[i] = (rand() * 2 - 1) * (1 - i / len) ** 3.4;
  }
  const verb = ctx.createConvolver();
  verb.buffer = ir;
  const verbOut = ctx.createGain();
  verbOut.gain.value = 0.32;
  verb.connect(verbOut).connect(comp);

  const echo = ctx.createDelay(2);
  echo.delayTime.value = BEAT * 0.75;
  const fb = ctx.createGain();
  fb.gain.value = 0.32;
  const echoTone = ctx.createBiquadFilter();
  echoTone.type = "lowpass";
  echoTone.frequency.value = 2600;
  echo.connect(echoTone).connect(fb).connect(echo);
  const echoOut = ctx.createGain();
  echoOut.gain.value = 0.35;
  echoTone.connect(echoOut);
  echoOut.connect(comp);
  echoOut.connect(verb);

  const music = ctx.createGain();
  music.gain.value = 0.85;
  music.connect(comp);
  const sfx = ctx.createGain();
  sfx.gain.value = 1.25;
  sfx.connect(comp);
  return { ctx, out, music, sfx, rev: verb, echo };
}

const send = (node, dest, amount) => {
  const g = node.context.createGain();
  g.gain.value = amount;
  node.connect(g).connect(dest);
};

const envGain = (ctx, when, { a = 0.005, peak = 0.1, hold = 0, d = 0.3, curve = "exp" }) => {
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.linearRampToValueAtTime(peak, when + a);
  if (hold) g.gain.setValueAtTime(peak, when + a + hold);
  if (curve === "exp") g.gain.exponentialRampToValueAtTime(0.0001, when + a + hold + d);
  else g.gain.linearRampToValueAtTime(0.0001, when + a + hold + d);
  return g;
};

const osc = (ctx, type, freq, when, stop, detune = 0) => {
  const o = ctx.createOscillator();
  o.type = type;
  o.frequency.setValueAtTime(freq, when);
  o.detune.value = detune;
  o.start(when);
  o.stop(stop);
  return o;
};

const noiseSrc = (ctx, when, dur, offset = 0) => {
  const s = ctx.createBufferSource();
  s.buffer = noise(ctx);
  s.loop = true;
  s.start(when, offset % 1.5);
  s.stop(when + dur);
  return s;
};

const filter = (ctx, type, freq, q = 0.7) => {
  const f = ctx.createBiquadFilter();
  f.type = type;
  f.frequency.value = freq;
  f.Q.value = q;
  return f;
};

const panner = (ctx, pan) => {
  if (!ctx.createStereoPanner) return ctx.createGain();
  const p = ctx.createStereoPanner();
  p.pan.value = pan;
  return p;
};

// ---------------------------------------------------------------------------
// Instruments
// ---------------------------------------------------------------------------
const pad = (bus, when, dur, notes, { gain = 0.03, cutoff = 1400, attack = 1.6, release = 2.4, skip = 0 } = {}) => {
  const { ctx } = bus;
  const start = when + skip;
  const att = skip > 0 ? 0.4 : attack;
  const end = when + dur;
  notes.forEach((n, i) => {
    const f = mtof(n);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, start);
    g.gain.linearRampToValueAtTime(gain, start + att);
    g.gain.setValueAtTime(gain, Math.max(start + att, end));
    g.gain.linearRampToValueAtTime(0.0001, Math.max(start + att, end) + release);
    const lp = filter(ctx, "lowpass", cutoff * 0.7, 0.6);
    lp.frequency.setValueAtTime(cutoff * 0.6, start);
    lp.frequency.linearRampToValueAtTime(cutoff, start + att + 1);
    const stop = Math.max(start + att, end) + release + 0.1;
    osc(ctx, "sawtooth", f, start, stop, -7 + i).connect(lp);
    osc(ctx, "triangle", f, start, stop, 6 - i).connect(lp);
    const p = panner(ctx, ((i % 3) - 1) * 0.35);
    lp.connect(g).connect(p);
    p.connect(bus.music);
    send(p, bus.rev, 0.6);
  });
};

const pluck = (bus, when, note, vel = 1, { bright = 1, pan = 0, echo = 0.5 } = {}) => {
  const { ctx } = bus;
  const f = mtof(note);
  const g = envGain(ctx, when, { a: 0.004, peak: 0.105 * vel, d: 0.9 });
  const lp = filter(ctx, "lowpass", 4800 * bright, 0.5);
  osc(ctx, "sine", f, when, when + 1).connect(lp);
  const g2 = ctx.createGain();
  g2.gain.value = 0.22;
  osc(ctx, "triangle", f * 2, when, when + 1).connect(g2).connect(lp);
  const g3 = envGain(ctx, when, { a: 0.002, peak: 0.05 * vel, d: 0.12 });
  osc(ctx, "sine", f * 4.01, when, when + 0.2).connect(g3).connect(lp);
  const p = panner(ctx, pan);
  lp.connect(g).connect(p);
  p.connect(bus.music);
  send(p, bus.echo, echo);
  send(p, bus.rev, 0.35);
};

const bell = (bus, when, note, vel = 1, { decay = 3.2, pan = 0, dest } = {}) => {
  const { ctx } = bus;
  const f = mtof(note);
  const mod = osc(ctx, "sine", f * 3.5, when, when + decay);
  const modGain = ctx.createGain();
  modGain.gain.setValueAtTime(f * 2.4, when);
  modGain.gain.exponentialRampToValueAtTime(f * 0.05, when + 1.4);
  mod.connect(modGain);
  const car = osc(ctx, "sine", f, when, when + decay);
  modGain.connect(car.frequency);
  const g = envGain(ctx, when, { a: 0.003, peak: 0.06 * vel, d: decay });
  const p = panner(ctx, pan);
  car.connect(g).connect(p);
  p.connect(dest || bus.music);
  send(p, bus.rev, 0.8);
};

const bass = (bus, when, dur, note, vel = 1) => {
  const { ctx } = bus;
  const f = mtof(note);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.linearRampToValueAtTime(0.062 * vel, when + 0.03);
  g.gain.setValueAtTime(0.062 * vel, when + dur - 0.05);
  g.gain.linearRampToValueAtTime(0.0001, when + dur + 0.25);
  const lp = filter(ctx, "lowpass", 420, 0.8);
  osc(ctx, "sine", f, when, when + dur + 0.3).connect(lp);
  const g2 = ctx.createGain();
  g2.gain.value = 0.35;
  osc(ctx, "triangle", f, when, when + dur + 0.3).connect(g2).connect(lp);
  lp.connect(g).connect(bus.music);
};

const kick = (bus, when, vel = 1) => {
  const { ctx } = bus;
  const o = osc(ctx, "sine", 120, when, when + 0.45);
  o.frequency.exponentialRampToValueAtTime(44, when + 0.13);
  const g = envGain(ctx, when, { a: 0.003, peak: 0.3 * vel, d: 0.3 });
  o.connect(g).connect(bus.music);
  // a soft beater click so the kick reads on small speakers
  const s = noiseSrc(ctx, when, 0.03, when * 2);
  const hp = filter(ctx, "bandpass", 3200, 1.5);
  const g2 = envGain(ctx, when, { a: 0.001, peak: 0.05 * vel, d: 0.02 });
  s.connect(hp).connect(g2).connect(bus.music);
};

const rim = (bus, when, vel = 1) => {
  const { ctx } = bus;
  const s = noiseSrc(ctx, when, 0.08, when);
  const bp = filter(ctx, "bandpass", 1900, 5);
  const g = envGain(ctx, when, { a: 0.002, peak: 0.2 * vel, d: 0.06 });
  s.connect(bp).connect(g);
  const p = panner(ctx, 0.15);
  g.connect(p);
  p.connect(bus.music);
  send(p, bus.rev, 0.4);
};

const shaker = (bus, when, vel = 1, pan = -0.2) => {
  const { ctx } = bus;
  const s = noiseSrc(ctx, when, 0.12, when * 3);
  const hp = filter(ctx, "highpass", 6200, 0.7);
  const g = envGain(ctx, when, { a: 0.012, peak: 0.075 * vel, d: 0.07 });
  const p = panner(ctx, pan);
  s.connect(hp).connect(g).connect(p);
  p.connect(bus.music);
};

const swell = (bus, when, dur, { from = 400, to = 6000, peak = 0.07, type = "bandpass" } = {}) => {
  const { ctx } = bus;
  const s = noiseSrc(ctx, when, dur + 0.1, when);
  const f = filter(ctx, type, from, 1.2);
  f.frequency.setValueAtTime(from, when);
  f.frequency.exponentialRampToValueAtTime(to, when + dur);
  const g = ctx.createGain();
  g.gain.setValueAtTime(0.0001, when);
  g.gain.exponentialRampToValueAtTime(peak, when + dur * 0.95);
  g.gain.linearRampToValueAtTime(0.0001, when + dur + 0.08);
  s.connect(f).connect(g).connect(bus.music);
  send(g, bus.rev, 0.5);
};

// ---------------------------------------------------------------------------
// Sound design (cue name → voice)
// ---------------------------------------------------------------------------
const paperTick = (bus, when, { freq = 2600, gain = 0.1, dur = 0.07, pan = 0 } = {}) => {
  const { ctx } = bus;
  const s = noiseSrc(ctx, when, dur + 0.02, when * 7);
  const bp = filter(ctx, "bandpass", freq, 1.1);
  const g = envGain(ctx, when, { a: 0.003, peak: gain, d: dur });
  const p = panner(ctx, pan);
  s.connect(bp).connect(g).connect(p);
  p.connect(bus.sfx);
  send(p, bus.rev, 0.25);
};

const SFX = {
  fold(bus, when, { gain = 0.5, pitch = 1 }) {
    paperTick(bus, when, { freq: 2400 * pitch, gain: 0.16 * gain, dur: 0.09 });
    paperTick(bus, when + 0.035, { freq: 3600 * pitch, gain: 0.09 * gain, dur: 0.05 });
    const { ctx } = bus;
    const g = envGain(ctx, when, { a: 0.004, peak: 0.12 * gain, d: 0.09 });
    osc(ctx, "sine", 190 * pitch, when, when + 0.12).connect(g).connect(bus.sfx);
  },
  pop(bus, when, { gain = 0.5, pitch = 1 }) {
    const { ctx } = bus;
    const o = osc(ctx, "sine", 520 * pitch, when, when + 0.12);
    o.frequency.exponentialRampToValueAtTime(980 * pitch, when + 0.06);
    const g = envGain(ctx, when, { a: 0.003, peak: 0.1 * gain, d: 0.09 });
    o.connect(g).connect(bus.sfx);
    send(g, bus.rev, 0.3);
  },
  click(bus, when, { gain = 0.6, pitch = 1 }) {
    paperTick(bus, when, { freq: 4200 * pitch, gain: 0.12 * gain, dur: 0.012 });
    const { ctx } = bus;
    const g = envGain(ctx, when, { a: 0.001, peak: 0.07 * gain, d: 0.03 });
    osc(ctx, "sine", 2100 * pitch, when, when + 0.05).connect(g).connect(bus.sfx);
  },
  tick(bus, when, { gain = 0.5, pitch = 1 }) {
    const { ctx } = bus;
    const g = envGain(ctx, when, { a: 0.002, peak: 0.06 * gain, d: 0.08 });
    const p = panner(ctx, 0.2);
    osc(ctx, "sine", 1760 * pitch, when, when + 0.1).connect(g).connect(p);
    p.connect(bus.sfx);
    send(p, bus.rev, 0.4);
  },
  ui(bus, when, { gain = 0.5, pitch = 1 }) {
    const { ctx } = bus;
    [0, 0.07].forEach((dt, i) => {
      const g = envGain(ctx, when + dt, { a: 0.003, peak: 0.05 * gain, d: 0.12 });
      osc(ctx, "sine", (i ? 1318.5 : 880) * pitch, when + dt, when + dt + 0.15).connect(g).connect(bus.sfx);
      send(g, bus.rev, 0.3);
    });
  },
  whoosh(bus, when, { gain = 0.6, dur = 1.0, rise = false }) {
    const { ctx } = bus;
    const s = noiseSrc(ctx, when, dur + 0.1, when * 5);
    const bp = filter(ctx, "bandpass", rise ? 380 : 1800, 0.9);
    bp.frequency.setValueAtTime(rise ? 380 : 1800, when);
    bp.frequency.exponentialRampToValueAtTime(rise ? 2600 : 420, when + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.12 * gain, when + dur * (rise ? 0.8 : 0.35));
    g.gain.linearRampToValueAtTime(0.0001, when + dur);
    const p = panner(ctx, 0);
    if (p.pan) {
      p.pan.setValueAtTime(-0.5, when);
      p.pan.linearRampToValueAtTime(0.5, when + dur);
    }
    s.connect(bp).connect(g).connect(p);
    p.connect(bus.sfx);
    send(p, bus.rev, 0.3);
  },
  swish(bus, when, { gain = 0.7, dur = 1.2 }) {
    SFX.whoosh(bus, when, { gain: gain * 0.8, dur });
    for (let i = 0; i < 5; i += 1) paperTick(bus, when + dur * (0.3 + i * 0.09), { freq: 3000 + i * 300, gain: 0.05 * gain, dur: 0.04, pan: -0.4 + i * 0.2 });
  },
  flutter(bus, when, { gain = 0.6, dur = 1 }) {
    const rand = prng(Math.floor(when * 100));
    const n = Math.floor(dur * 26);
    for (let i = 0; i < n; i += 1) {
      const t = when + (i / n) * dur + rand() * 0.02;
      paperTick(bus, t, { freq: 2200 + rand() * 2400, gain: (0.03 + rand() * 0.04) * gain, dur: 0.03 + rand() * 0.03, pan: -0.8 + (i / n) * 1.6 });
    }
    SFX.whoosh(bus, when, { gain: gain * 0.5, dur });
  },
  unlock(bus, when, { gain = 0.7 }) {
    bell(bus, when, 93, 0.35 * gain, { decay: 0.6, dest: bus.sfx });
    bell(bus, when + 0.05, 98, 0.3 * gain, { decay: 0.7, dest: bus.sfx });
    SFX.click(bus, when, { gain: 0.8 * gain, pitch: 0.7 });
  },
  impact(bus, when, { gain = 0.5 }) {
    const { ctx } = bus;
    const o = osc(ctx, "sine", 72, when, when + 1.4);
    o.frequency.exponentialRampToValueAtTime(38, when + 1.0);
    const g = envGain(ctx, when, { a: 0.006, peak: 0.3 * gain, d: 1.2 });
    o.connect(g).connect(bus.sfx);
    const s = noiseSrc(ctx, when, 0.5, 0.3);
    const lp = filter(ctx, "lowpass", 260, 0.7);
    const g2 = envGain(ctx, when, { a: 0.004, peak: 0.15 * gain, d: 0.4 });
    s.connect(lp).connect(g2).connect(bus.sfx);
    send(g2, bus.rev, 0.5);
  },
  gate(bus, when, { gain = 0.6, close = false }) {
    const { ctx } = bus;
    for (let i = 0; i < 9; i += 1) {
      const t = when + i * 0.085;
      paperTick(bus, t, { freq: 1300 + (close ? -i : i) * 60, gain: 0.05 * gain, dur: 0.035 });
    }
    const s = noiseSrc(ctx, when, 0.9, 0.7);
    const lp = filter(ctx, "lowpass", 160, 0.8);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.12 * gain, when + 0.2);
    g.gain.linearRampToValueAtTime(0.0001, when + 0.85);
    s.connect(lp).connect(g).connect(bus.sfx);
    if (close) SFX.stamp(bus, when + 0.78, { gain: gain * 0.7 });
  },
  pulse(bus, when, { gain = 0.5, pitch = 1 }) {
    const { ctx } = bus;
    const o = osc(ctx, "sine", 660 * pitch, when, when + 0.4);
    const g = envGain(ctx, when, { a: 0.01, peak: 0.07 * gain, d: 0.32 });
    o.connect(g).connect(bus.sfx);
    send(g, bus.rev, 0.7);
    send(g, bus.echo, 0.4);
  },
  data(bus, when, { gain = 0.5, dur = 1.5 }) {
    const rand = prng(Math.floor(when * 31));
    const n = Math.floor(dur * 22);
    const { ctx } = bus;
    for (let i = 0; i < n; i += 1) {
      const t = when + (i / n) * dur;
      const g = envGain(ctx, t, { a: 0.002, peak: (0.012 + rand() * 0.02) * gain, d: 0.025 });
      const p = panner(ctx, rand() * 1.4 - 0.7);
      osc(ctx, "sine", 2200 + rand() * 1600, t, t + 0.04).connect(g).connect(p);
      p.connect(bus.sfx);
    }
  },
  shield(bus, when, { gain = 0.8 }) {
    const { ctx } = bus;
    [
      [440, 880],
      [659.3, 1318.5],
    ].forEach(([a, b]) => {
      const o = osc(ctx, "sine", a, when, when + 1.4);
      o.frequency.exponentialRampToValueAtTime(b, when + 0.6);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, when);
      g.gain.linearRampToValueAtTime(0.04 * gain, when + 0.5);
      g.gain.exponentialRampToValueAtTime(0.0001, when + 1.3);
      o.connect(g).connect(bus.sfx);
      send(g, bus.rev, 0.8);
    });
    swell(bus, when, 0.6, { from: 900, to: 5200, peak: 0.05 * gain });
    [74, 78, 81, 86].forEach((n, i) => bell(bus, when + 0.55 + i * 0.03, n, 0.45 * gain, { decay: 3.5, pan: -0.3 + i * 0.2, dest: bus.sfx }));
    SFX.impact(bus, when + 0.55, { gain: gain * 0.4 });
  },
  stamp(bus, when, { gain = 0.6 }) {
    const { ctx } = bus;
    const s = noiseSrc(ctx, when, 0.2, 0.9);
    const lp = filter(ctx, "lowpass", 520, 0.8);
    const g = envGain(ctx, when, { a: 0.003, peak: 0.22 * gain, d: 0.12 });
    s.connect(lp).connect(g).connect(bus.sfx);
    const g2 = envGain(ctx, when, { a: 0.003, peak: 0.16 * gain, d: 0.14 });
    osc(ctx, "sine", 150, when, when + 0.2).connect(g2).connect(bus.sfx);
  },
  step(bus, when, { gain = 0.25 }) {
    const { ctx } = bus;
    const s = noiseSrc(ctx, when, 0.1, when * 13);
    const lp = filter(ctx, "lowpass", 380, 0.7);
    const g = envGain(ctx, when, { a: 0.004, peak: 0.25 * gain, d: 0.07 });
    s.connect(lp).connect(g).connect(bus.sfx);
  },
  hoof(bus, when, { gain = 0.2 }) {
    const { ctx } = bus;
    const s = noiseSrc(ctx, when, 0.08, when * 17);
    const bp = filter(ctx, "bandpass", 700, 1.4);
    const g = envGain(ctx, when, { a: 0.002, peak: 0.3 * gain, d: 0.05 });
    s.connect(bp).connect(g).connect(bus.sfx);
  },
  patter(bus, when, { gain = 0.14 }) {
    paperTick(bus, when, { freq: 3400, gain: 0.12 * gain, dur: 0.015 });
  },
  rise(bus, when, { gain = 0.6 }) {
    const { ctx } = bus;
    const o = osc(ctx, "sine", 520, when, when + 0.7);
    o.frequency.exponentialRampToValueAtTime(1040, when + 0.55);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, when);
    g.gain.linearRampToValueAtTime(0.05 * gain, when + 0.3);
    g.gain.exponentialRampToValueAtTime(0.0001, when + 0.7);
    o.connect(g).connect(bus.sfx);
    send(g, bus.rev, 0.7);
  },
  chime(bus, when, { gain = 0.6, notes = [81, 86] }) {
    notes.forEach((n, i) => bell(bus, when + i * 0.09, n, 0.6 * gain, { decay: 3, pan: -0.2 + i * 0.3, dest: bus.sfx }));
  },
  deny(bus, when, { gain = 0.6 }) {
    const { ctx } = bus;
    [
      [0, 329.6],
      [0.13, 246.9],
    ].forEach(([dt, f]) => {
      const g = envGain(ctx, when + dt, { a: 0.008, peak: 0.07 * gain, d: 0.22 });
      const lp = filter(ctx, "lowpass", 1400, 0.7);
      osc(ctx, "triangle", f, when + dt, when + dt + 0.3).connect(lp).connect(g).connect(bus.sfx);
      send(g, bus.rev, 0.4);
    });
    SFX.stamp(bus, when, { gain: gain * 0.5 });
  },
  layer(bus, when, { gain = 0.5, pitch = 1 }) {
    const scale = [62, 66, 69, 74, 78, 81];
    const n = scale[Math.min(scale.length - 1, Math.round((pitch - 1) / 0.12))];
    bell(bus, when, n, 0.5 * gain, { decay: 2.4, dest: bus.sfx });
    SFX.whoosh(bus, when - 0.05, { gain: gain * 0.35, dur: 0.45 });
  },
  shuffle(bus, when, { gain = 0.5, dur = 1 }) {
    const rand = prng(Math.floor(when * 17));
    const n = 14;
    for (let i = 0; i < n; i += 1) paperTick(bus, when + (i / n) * dur + rand() * 0.02, { freq: 2600 + rand() * 1800, gain: 0.06 * gain, dur: 0.03, pan: rand() - 0.5 });
  },
  bloom(bus, when, { gain = 0.7 }) {
    swell(bus, when, 0.55, { from: 1200, to: 7000, peak: 0.05 * gain, type: "highpass" });
    [86, 90, 93].forEach((n, i) => bell(bus, when + 0.45 + i * 0.04, n, 0.35 * gain, { decay: 2.8, dest: bus.sfx }));
  },
  shimmer(bus, when, { gain = 0.5 }) {
    [86, 90, 93, 98].forEach((n, i) => bell(bus, when + i * 0.07, n, 0.3 * gain, { decay: 2, pan: -0.4 + i * 0.25, dest: bus.sfx }));
  },
};

// ---------------------------------------------------------------------------
// The score
// ---------------------------------------------------------------------------
const CH = {
  D: { pad: [50, 57, 64, 66, 73], bass: 38, arp: [62, 66, 69, 73, 76, 78, 76, 73], top: [78, 81] },
  Bm: { pad: [47, 54, 62, 66, 69, 73], bass: 35, arp: [59, 62, 66, 69, 73, 74, 73, 69], top: [78, 73] },
  G: { pad: [43, 50, 57, 59, 66], bass: 31, arp: [59, 62, 66, 67, 69, 74, 69, 66], top: [74, 78] },
  A: { pad: [45, 52, 59, 62, 67], bass: 33, arp: [57, 62, 64, 67, 69, 71, 69, 64], top: [76, 73] },
  Em: { pad: [40, 47, 54, 55, 62], bass: 28, arp: [55, 59, 62, 66, 67, 71, 67, 62], top: [71, 74] },
};
const LOOP = ["D", "D", "Bm", "Bm", "G", "G", "A", "A"];
const OVERRIDE = { 32: "G", 33: "Em", 34: "G", 35: "A", 44: "G", 45: "A", 46: "D", 47: "D", 48: "D" };
const chordAt = (b) => CH[OVERRIDE[b] || LOOP[b % 8]];
const inRange = (b, ranges) => ranges.some(([a, z]) => b >= a && b < z);
const BARS = 49;

const musicEvents = () => {
  const ev = [];
  const push = (t, dur, play) => ev.push({ t, dur, play });
  const tb = (b, beat = 0) => b * BAR + beat * BEAT;
  const rand = prng(3);

  // pads, merged across repeated chords; brightness follows the story
  const cutoffAt = (b) => (b < 4 ? 900 : b < 14 ? 1400 : b < 32 ? 2100 : b < 35 ? 800 : b < 42 ? 1500 : 2300);
  let b = 0;
  while (b < BARS) {
    const name = OVERRIDE[b] || LOOP[b % 8];
    let e = b + 1;
    while (e < BARS && (OVERRIDE[e] || LOOP[e % 8]) === name && e - b < 2) e += 1;
    const last = e >= BARS;
    const dur = last ? DURATION - tb(b) - 2.6 : tb(e) - tb(b) + 0.4;
    const cutoff = cutoffAt(b);
    const notes = CH[name].pad;
    push(tb(b), dur + 2.4, (bus, when, skip) => pad(bus, when, dur, notes, { cutoff, gain: b < 4 ? 0.028 : 0.034, skip, release: last ? 3 : 2.2 }));
    b = e;
  }

  for (let bar = 0; bar < BARS; bar += 1) {
    const c = chordAt(bar);
    // music box intro: a few high notes
    if (bar < 4) {
      [1, 2.5, 3].forEach((beat, i) => {
        if ((bar + i) % 2 === 0 || beat === 1) push(tb(bar, beat), 1, (bus, when) => pluck(bus, when, c.arp[(bar * 3 + i * 2) % 8] + 12, 0.5, { pan: 0.3 - i * 0.3 }));
      });
    }
    // eighth-note arps through the intro, sixteenths once the story moves
    if (bar >= 4 && bar < 7) {
      for (let s = 0; s < 8; s += 1) push(tb(bar, s / 2), 1, (bus, when) => pluck(bus, when, c.arp[s], 0.45 + (s % 2 ? 0 : 0.15), { bright: 0.7, pan: s % 2 ? 0.25 : -0.25 }));
    }
    if (inRange(bar, [[7, 32], [35, 46]])) {
      const soft = inRange(bar, [[7, 10], [35, 37]]) ? 0.6 : 1;
      for (let s = 0; s < 16; s += 1) {
        const accent = s % 4 === 0 ? 1 : s % 2 === 0 ? 0.75 : 0.55;
        const v = (0.38 + rand() * 0.08) * accent * soft;
        const note = c.arp[s % 8] + (s >= 8 && bar % 2 ? 12 : 0);
        push(tb(bar, s / 4), 1, (bus, when) => pluck(bus, when, note, v, { bright: 0.8, pan: (s % 4) * 0.2 - 0.3, echo: 0.25 }));
      }
    }
    // library breakdown: sparse, warm plucks
    if (inRange(bar, [[32, 35]])) {
      [0, 1.5, 2.5, 3.25].forEach((beat, i) => push(tb(bar, beat), 1, (bus, when) => pluck(bus, when, c.arp[(i * 3 + bar) % 8], 0.62, { bright: 0.6, echo: 0.7 })));
      push(tb(bar), 2, (bus, when) => bass(bus, when, BAR * 0.9, c.bass, 0.45));
    }
    // finale: a slow descending line under the logo
    if (bar >= 46) {
      const line = [[86, 0], [81, 1.5], [78, 2.5], [74, 3.5]];
      if (bar < 48) line.forEach(([n, beat]) => push(tb(bar, beat), 1, (bus, when) => pluck(bus, when, n - (bar - 46) * 5, 0.42, { bright: 0.7, echo: 0.6 })));
    }
    // bass
    if (inRange(bar, [[7, 32], [37, 46]])) {
      const lift = inRange(bar, [[7, 14], [37, 40]]) ? 0.55 : 1;
      push(tb(bar), 1.5, (bus, when) => bass(bus, when, BEAT * 2.2, c.bass, 0.9 * lift));
      push(tb(bar, 2.5), 1, (bus, when) => bass(bus, when, BEAT * 1.2, c.bass, 0.7 * lift));
      if (bar % 2) push(tb(bar, 3.5), 0.5, (bus, when) => bass(bus, when, BEAT * 0.45, c.bass + 12, 0.5 * lift));
    }
    // percussion
    if (inRange(bar, [[10, 23], [25, 32], [37, 45]])) {
      for (let s = 0; s < 8; s += 1) push(tb(bar, s / 2), 0.2, (bus, when) => shaker(bus, when, s % 2 ? 1 : 0.6));
    }
    if (inRange(bar, [[14, 23], [25, 32], [38, 45]])) {
      push(tb(bar, 0), 0.5, (bus, when) => kick(bus, when, 0.9));
      push(tb(bar, 2), 0.5, (bus, when) => kick(bus, when, 0.7));
      if (inRange(bar, [[25, 32], [42, 45]])) push(tb(bar, 2.75), 0.5, (bus, when) => kick(bus, when, 0.45));
      push(tb(bar, 1), 0.2, (bus, when) => rim(bus, when, 0.7));
      push(tb(bar, 3), 0.2, (bus, when) => rim(bus, when, 0.8));
    }
    if (inRange(bar, [[25, 32], [42, 45]])) {
      for (let s = 0; s < 16; s += 1) if (s % 2) push(tb(bar, s / 4), 0.1, (bus, when) => shaker(bus, when, s % 4 === 3 ? 0.9 : 0.5, 0.35));
    }
    // a bell line over the shield and the whole kingdom
    if (inRange(bar, [[14, 20], [42, 45]]) && bar % 2 === 0) {
      const [a, z] = c.top;
      push(tb(bar, 0), 3, (bus, when) => bell(bus, when, a, 0.55, { decay: 2.6, pan: -0.2 }));
      push(tb(bar, 1.5), 3, (bus, when) => bell(bus, when, z, 0.45, { decay: 2.6, pan: 0.2 }));
    }
  }

  // lifts and landings
  push(tb(24), BAR, (bus, when) => swell(bus, when, BAR, { peak: 0.05 }));
  push(tb(44), BAR, (bus, when) => swell(bus, when, BAR, { peak: 0.06, to: 8000, type: "highpass", from: 1500 }));
  // the logo lands on the downbeat of bar 46; "Deliver." gets the last bell
  push(tb(46), 4, (bus, when) => {
    [62, 69, 74, 78, 81].forEach((n, i) => bell(bus, when + 0.02 + i * 0.05, n, 0.6, { decay: 5, pan: -0.4 + i * 0.2 }));
    SFX.impact(bus, when + 0.02, { gain: 0.5 });
  });
  push(tb(45) + 5.3, 4, (bus, when) => bell(bus, when, 74, 0.5, { decay: 5 }));
  push(DURATION - 4.4, 5, (bus, when) => bell(bus, when, 86, 0.3, { decay: 4.5, pan: 0.3 }));
  return ev;
};

// every cue the shots registered, plus the score, sorted by time
export function scoreEvents(cues) {
  const ev = musicEvents();
  cues.forEach((c) => {
    const voice = SFX[c.name];
    if (!voice) return;
    ev.push({ t: c.t, dur: (c.dur || 0.5) + 0.5, play: (bus, when) => voice(bus, when, c) });
  });
  return ev.sort((a, b) => a.t - b.t);
}

// fade at the very end
const masterFade = (bus, t0, offset) => {
  const fadeAt = DURATION - 1.6;
  const g = bus.out.gain;
  const now = t0 + Math.max(0, fadeAt - offset);
  g.setValueAtTime(0.9, Math.max(bus.ctx.currentTime, now));
  g.linearRampToValueAtTime(0.0001, t0 + DURATION - offset);
};

// live playback: schedules a little ahead of the clock
export class LiveScore {
  constructor(events) {
    this.events = events;
    this.ctx = null;
    this.bus = null;
    this.timer = null;
  }

  get time() {
    return this.ctx ? this.ctx.currentTime - this.t0 + this.offset : 0;
  }

  async start(offset) {
    if (!this.ctx) this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    if (this.ctx.state === "suspended") await this.ctx.resume();
    this.stop();
    const ctx = this.ctx;
    this.bus = createBus(ctx);
    this.offset = offset;
    this.t0 = ctx.currentTime + 0.08;
    this.cursor = 0;
    masterFade(this.bus, this.t0, offset);
    // long notes already sounding (pads) come in softly
    this.events.forEach((e, i) => {
      if (e.t < offset && e.t + e.dur > offset && e.dur > 2) e.play(this.bus, this.t0 + (e.t - offset), offset - e.t);
      if (e.t < offset) this.cursor = i + 1;
    });
    const tick = () => {
      const horizon = ctx.currentTime - this.t0 + offset + 1.2;
      while (this.cursor < this.events.length && this.events[this.cursor].t <= horizon) {
        const e = this.events[this.cursor];
        if (e.t >= offset - 0.02) e.play(this.bus, this.t0 + (e.t - offset), 0);
        this.cursor += 1;
      }
    };
    tick();
    this.timer = setInterval(tick, 200);
  }

  stop() {
    clearInterval(this.timer);
    this.timer = null;
    if (this.bus) {
      const { out } = this.bus;
      const now = this.ctx.currentTime;
      out.gain.cancelScheduledValues(now);
      out.gain.setValueAtTime(out.gain.value, now);
      out.gain.linearRampToValueAtTime(0.0001, now + 0.08);
      const old = out;
      setTimeout(() => old.disconnect(), 200);
      this.bus = null;
    }
  }
}

// offline render → interleaved 16-bit WAV bytes
export async function renderScore(events, duration = DURATION, sampleRate = 48000) {
  const ctx = new OfflineAudioContext(2, Math.ceil(duration * sampleRate), sampleRate);
  const bus = createBus(ctx);
  masterFade(bus, 0, 0);
  events.forEach((e) => e.play(bus, Math.max(0, e.t), 0));
  const buf = await ctx.startRendering();
  const n = buf.length;
  const out = new DataView(new ArrayBuffer(44 + n * 4));
  const str = (o, s) => [...s].forEach((ch, i) => out.setUint8(o + i, ch.charCodeAt(0)));
  str(0, "RIFF");
  out.setUint32(4, 36 + n * 4, true);
  str(8, "WAVE");
  str(12, "fmt ");
  out.setUint32(16, 16, true);
  out.setUint16(20, 1, true);
  out.setUint16(22, 2, true);
  out.setUint32(24, sampleRate, true);
  out.setUint32(28, sampleRate * 4, true);
  out.setUint16(32, 4, true);
  out.setUint16(34, 16, true);
  str(36, "data");
  out.setUint32(40, n * 4, true);
  const l = buf.getChannelData(0);
  const r = buf.getChannelData(1);
  for (let i = 0; i < n; i += 1) {
    out.setInt16(44 + i * 4, Math.max(-1, Math.min(1, l[i])) * 32767, true);
    out.setInt16(46 + i * 4, Math.max(-1, Math.min(1, r[i])) * 32767, true);
  }
  return out.buffer;
}
