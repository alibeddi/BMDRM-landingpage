"use client";

import { gsap } from "@lib/gsap";
import { ScrambleTextPlugin } from "gsap/dist/ScrambleTextPlugin";
import { useEffect, useRef } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrambleTextPlugin);

// Renders `text` as-is (server-rendered, readable without JS), then scrambles
// through random characters and settles back on it once mounted.
const Scramble = ({
  text,
  as: Tag = "span",
  chars = "upperCase",
  delay = 0,
  duration = 1.1,
  className = "",
}) => {
  const ref = useRef(null);

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.to(ref.current, {
        delay,
        duration,
        ease: "none",
        scrambleText: { text, chars, speed: 0.6, revealDelay: duration * 0.35 },
      });
    });
    return () => mm.revert();
  }, [text, chars, delay, duration]);

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  );
};

export default Scramble;
