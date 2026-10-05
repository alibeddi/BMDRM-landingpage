"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

const svgsOf = (el) =>
  el instanceof SVGSVGElement ? [el] : el.querySelectorAll("svg");

// Keeps origami scenes ([data-scene]) cheap: their CSS and SMIL loops pause
// while off screen, so only what is visible animates. With reduced motion,
// SMIL loops rest on a representative frame (data-still, in seconds) instead.
const SceneObserver = () => {
  const pathname = usePathname();

  useEffect(() => {
    const scenes = document.querySelectorAll("[data-scene]");

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      scenes.forEach((scene) =>
        svgsOf(scene).forEach((svg) => {
          svg.setCurrentTime?.(parseFloat(svg.dataset.still) || 0);
          svg.pauseAnimations?.();
        }),
      );
      return;
    }

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          target.toggleAttribute("data-paused", !isIntersecting);
          svgsOf(target).forEach((svg) =>
            isIntersecting
              ? svg.unpauseAnimations?.()
              : svg.pauseAnimations?.(),
          );
        });
      },
      { rootMargin: "160px 0px" },
    );

    scenes.forEach((scene) => observer.observe(scene));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
};

export default SceneObserver;
