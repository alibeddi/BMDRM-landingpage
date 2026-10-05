// Remotion settings for the BMDRM film (layouts/film/remotion).
//   npm run film:preview   → Remotion Studio
//   npm run film:render    → exports/BMDRM-Film.mp4
// Applies to the CLI and to renders started from the Studio.
import { Config } from "@remotion/cli/config";
import { filmWebpackOverride } from "./layouts/film/remotion/webpack-override.mjs";

Config.setEntryPoint("./layouts/film/remotion/index.js");
Config.overrideWebpackConfig(filmWebpackOverride);

// client-ready master: H.264 High, near-lossless frames, BT.709 colour so the
// brand purples look the same in every player, AAC audio
Config.setVideoImageFormat("jpeg");
Config.setJpegQuality(95);
Config.setCodec("h264");
Config.setCrf(16);
Config.setX264Preset("slow");
Config.setPixelFormat("yuv420p");
Config.setColorSpace("bt709");
Config.setAudioBitrate("256k");
Config.setOverwriteOutput(true);
Config.setDelayRenderTimeoutInMilliseconds(120000);
