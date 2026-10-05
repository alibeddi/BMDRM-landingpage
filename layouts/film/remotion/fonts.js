// The site's two typefaces (next/font on the site), bundled from @fontsource
// so renders never depend on the network.
import jakarta400 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-400-normal.woff2";
import jakarta500 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-500-normal.woff2";
import jakarta600 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-600-normal.woff2";
import jakarta700 from "@fontsource/plus-jakarta-sans/files/plus-jakarta-sans-latin-700-normal.woff2";
import serif400 from "@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2";
import serif400i from "@fontsource/instrument-serif/files/instrument-serif-latin-400-italic.woff2";
import { loadFont } from "@remotion/fonts";

const FACES = [
  ["Plus Jakarta Sans", jakarta400, "400", "normal"],
  ["Plus Jakarta Sans", jakarta500, "500", "normal"],
  ["Plus Jakarta Sans", jakarta600, "600", "normal"],
  ["Plus Jakarta Sans", jakarta700, "700", "normal"],
  ["Instrument Serif", serif400, "400", "normal"],
  ["Instrument Serif", serif400i, "400", "italic"],
];

let loading;

export const loadFilmFonts = () => {
  loading =
    loading ||
    Promise.all(FACES.map(([family, url, weight, style]) => loadFont({ family, url, weight, style })));
  return loading;
};
