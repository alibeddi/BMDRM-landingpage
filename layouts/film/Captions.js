// Every line of copy in the film, in the landing page's type: an uppercase
// kicker in brand purple, a light Plus Jakarta Sans title with one serif
// italic accent (*word*) and bold (**word**). Claims stay within what the
// site and the public docs say.
import { LogoMark } from "@layouts/components/LogoMark";
import { asset } from "./assets";
import { Fragment } from "react";

export const CAPTIONS = [
  { id: "cap-value", title: "Your content has *value*." },
  { id: "cap-protect", title: "It deserves *protection*." },
  { id: "cap-ingest", kicker: "Ingest", title: "Your sources. One secure *gate*." },
  { id: "cap-oauth", kicker: "Google Drive · OAuth", title: "Only what you *authorize* comes in.", pos: "tr" },
  { id: "cap-shield", kicker: "Protection", title: "Protect your content *before* it reaches your audience.", narrow: true },
  { id: "cap-layers", kicker: "Layered security", title: "Defense in *depth*.", pos: "tl" },
  { id: "cap-access", kicker: "Token-gated access", title: "Every request is *verified* before playback." },
  { id: "cap-denied", kicker: "Access control", title: "Only authorized viewers get *through*." },
  { id: "cap-road", kicker: "Secure delivery", title: "We protect the *road*, not just the destination." },
  { id: "cap-cdn", kicker: "CDN", title: "Distributed delivery, *closer* to your viewers." },
  { id: "cap-scale", kicker: "Scalable hosting", title: "From a few videos to a large *library*." },
  { id: "cap-library", kicker: "Video management", title: "Your whole library, *organized*." },
  { id: "cap-tower", kicker: "Real-time analytics", title: "Watch over every *view*." },
  { id: "cap-player", kicker: "Customizable player", title: "Your content. Your *experience*." },
  { id: "cap-watermark", kicker: "Watermarking", title: "Add a *watermark* to protected playback." },
  { id: "cap-capture", kicker: "Capture protection", title: "Designed to help prevent unauthorized capture and *redistribution*.", small: true },
  { id: "cap-system", kicker: "BMDRM", title: "One kingdom. One *system*." },
];

// "Video Hosting with **BMDRM**" → words with their emphasis
const words = (text) =>
  text.split(" ").map((raw) => {
    if (raw.startsWith("**")) return { w: raw.replace(/\*\*/g, ""), tag: "strong" };
    if (raw.startsWith("*")) return { w: raw.replace(/\*/g, ""), tag: "em" };
    return { w: raw, tag: null };
  });

const Title = ({ text }) => (
  <h2 className="cap-title">
    {words(text).map(({ w, tag }, i) => {
      const Tag = tag || "span";
      return (
        <Fragment key={i}>
          <span className="cap-w">
            <Tag>{w}</Tag>
          </span>{" "}
        </Fragment>
      );
    })}
  </h2>
);

export const Captions = () => (
  <div className="film-captions">
    {/* a soft band of sky behind captions over busy ground (the road shot) */}
    <div data-k="cap-scrim" className="cap-scrim" />
    {CAPTIONS.map(({ id, kicker, title, pos = "top", small, narrow }) => (
      <div key={id} data-k={id} className={`cap cap-${pos} ${small ? "cap-small" : ""} ${narrow ? "cap-narrow" : ""}`}>
        {kicker && <p className="cap-kicker">{kicker}</p>}
        <Title text={title} />
      </div>
    ))}

    <div data-k="cap-logo-intro" className="cap cap-logo cap-logo-intro">
      <div className="logo-pair">
        <LogoMark className="logo-mark" />
        <LogoMark className="logo-word" />
      </div>
      <p className="logo-kicker">Secure Video Hosting</p>
      <p className="logo-tag">
        <span>Protect.</span> <span>Control.</span> <span>Deliver.</span>
      </p>
    </div>

    <div data-k="cap-eco" className="cap cap-eco">
      <p className="cap-kicker">In use at</p>
      <div className="eco-logos">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("images/clients/brand/ostedhy.svg")} alt="Ostedhy" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={asset("images/clients/brand/taki.svg")} alt="Taki Academy" />
      </div>
    </div>

    <div data-k="cap-logo-final" className="cap cap-logo cap-logo-final">
      <div className="logo-pair">
        <LogoMark className="logo-mark" />
        <LogoMark className="logo-word" />
      </div>
      <p className="logo-kicker">Secure Video Hosting</p>
      <p className="logo-tag">
        <span>Protect.</span> <span>Control.</span> <span>Deliver.</span>
      </p>
    </div>
  </div>
);
