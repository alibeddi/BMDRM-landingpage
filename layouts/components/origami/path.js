// Tagged template for SVG path data: interpolated numbers are rounded to a
// tenth, so computed geometry doesn't bloat the HTML with float noise.
const round = (value) =>
  typeof value === "number" ? Math.round(value * 10) / 10 : value;

export const path = (strings, ...values) =>
  strings.reduce(
    (out, text, i) => out + text + (i < values.length ? round(values[i]) : ""),
    "",
  );
