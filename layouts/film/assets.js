// Files the film loads at runtime (a pattern tile, the client logos). On the
// site they are served from /public; the video composition swaps in
// Remotion's staticFile() (see layouts/film/remotion/index.js).
let resolve = (file) => `/${file}`;

export const asset = (file) => resolve(file);

export const setAssetResolver = (fn) => {
  resolve = fn;
};
