const theme = require("./config/theme.json");

let font_base = Number(theme.fonts.font_size.base.replace("px", ""));
let font_scale = Number(theme.fonts.font_size.scale);
let h6 = font_base / font_base;
let h5 = h6 * font_scale;
let h4 = h5 * font_scale;
let h3 = h4 * font_scale;
let h2 = h3 * font_scale;
let h1 = h2 * font_scale;

// Fonts are self-hosted with next/font (see app/layout.js), which exposes them
// as CSS variables. The names from theme.json are the var() fallbacks, so the
// stack stays valid even if a variable is missing.
const { font_family } = theme.fonts;
const fontStack = (variable, name, type) => [
  `var(${variable}, "${name}")`,
  type,
];

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
    "./content/**/*.{md,mdx}",
  ],
  theme: {
    screens: {
      sm: "540px",
      md: "768px",
      lg: "992px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        text: theme.colors.default.text_color.default,
        light: theme.colors.default.text_color.light,
        dark: theme.colors.default.text_color.dark,
        primary: theme.colors.default.theme_color.primary,
        body: theme.colors.default.theme_color.body,
        border: theme.colors.default.theme_color.border,
        "border-secondary": theme.colors.default.theme_color.border_secondary,
        "theme-light": theme.colors.default.theme_color.theme_light,
        "theme-dark": theme.colors.default.theme_color.theme_dark,
        ...theme.colors.palette,
      },
      fontSize: {
        base: font_base + "px",
        h1: h1 + "rem",
        "h1-sm": h1 * 0.8 + "rem",
        h2: h2 + "rem",
        "h2-sm": h2 * 0.8 + "rem",
        h3: h3 + "rem",
        "h3-sm": h3 * 0.8 + "rem",
        h4: h4 + "rem",
        h5: h5 + "rem",
        h6: h6 + "rem",
      },
      fontFamily: {
        sans: fontStack(
          "--font-primary",
          font_family.primary,
          font_family.primary_type,
        ),
        primary: fontStack(
          "--font-primary",
          font_family.primary,
          font_family.primary_type,
        ),
        secondary: fontStack(
          "--font-secondary",
          font_family.secondary,
          font_family.secondary_type,
        ),
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("tailwind-bootstrap-grid")({ generateContainer: false }),
  ],
};
