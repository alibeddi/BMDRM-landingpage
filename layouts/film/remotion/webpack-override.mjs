// Lets Remotion's bundler read the site's code: SCSS (the film's styles) and
// the jsconfig path aliases the components import with.
import path from "node:path";
import { enableScss } from "@remotion/enable-scss";

const root = process.cwd();

export const filmWebpackOverride = (config) => {
  const withScss = enableScss(config);
  return {
    ...withScss,
    resolve: {
      ...withScss.resolve,
      alias: {
        ...(withScss.resolve?.alias ?? {}),
        "@layouts": path.join(root, "layouts"),
        "@config": path.join(root, "config"),
        "@lib": path.join(root, "lib"),
      },
    },
  };
};
