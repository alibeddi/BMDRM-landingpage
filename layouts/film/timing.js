// The film's clock. Shots start on the downbeat of a bar of the score
// (100 bpm, 4/4: one bar = 2.4 s), so every cut lands on the music.
export const BPM = 100;
export const BAR = (60 / BPM) * 4;
export const bar = (n) => Math.round(n * BAR * 1000) / 1000;

export const T = {
  kingdom: bar(0), // the kingdom unfolds, "Your content has value"
  intro: bar(4), // through the gate: BMDRM, Protect. Control. Deliver.
  ingest: bar(7), // roads from every source converge on one gate
  oauth: bar(10), // Google Drive: authorize, select, import
  shield: bar(14), // the knight's shield seals the video
  layers: bar(17), // layered defences, inside out
  access: bar(20), // the royal seal: token-gated access
  denied: bar(23), // the mouse without a pass
  road: bar(25), // the rider carries the sealed video
  cdn: bar(28), // edge castles serve viewers
  scale: bar(30), // the kingdom grows
  library: bar(32), // the archive: video management
  tower: bar(35), // the watchtower: analytics
  player: bar(37), // the player, themed and watermarked
  capture: bar(40), // a capture attempt is turned away
  kingdomAll: bar(42), // the whole kingdom, one system
  finale: bar(45), // back to the castle, the logo
  end: bar(49) + 0.4,
};

export const DURATION = T.end;
