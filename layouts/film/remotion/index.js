// Remotion entry point for the BMDRM film (see remotion.config.js).
//   npm run film:preview   → Remotion Studio
//   npm run film:render    → exports/BMDRM-Film.mp4
import { registerRoot, staticFile } from "remotion";
import { setAssetResolver } from "../assets";
import { RemotionRoot } from "./Root";

setAssetResolver((file) => staticFile(file));
registerRoot(RemotionRoot);
