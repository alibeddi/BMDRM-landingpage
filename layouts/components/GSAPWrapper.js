"use client";

import { gsap } from "@lib/gsap";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const EASE = "expo.out";

// Scroll-driven motion, declared with data attributes:
//   data-reveal[="up|fade|clip"]  fade/rise (or clip open) once in view
//   data-reveal-stagger           reveal the element's children one by one
//   data-parallax="0.1"           drift while scrolling (negative = upwards)
//   data-scrub-words              light up .split-word children with scroll
//   data-origami                  paper parts (.o-part) unfold along data-fold
//   data-depth="0.4"              scene layer drifting with scroll (origami
//                                 scenes; SVG units, relative to the scene)
//   data-advance="60"             traveller moving sideways while its scene
//                                 scrolls through the viewport
// Section dividers draw their chamfers in when they enter the viewport.
// Queries are global so the header and footer are included.
const GSAPWrapper = ({ children }) => {
  const main = useRef();
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      //fade
      const fadeElements = document.querySelectorAll(".fade");
      fadeElements.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          scrollTrigger: el,
          duration: 0.3,
        });
      });

      //gsap animation (inner pages)
      const elements = document.querySelectorAll(".animate");
      elements.forEach((el) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: el,
            start: "top bottom",
          },
        });

        if (el.classList.contains("from-left")) {
          tl.from(el, { opacity: 0, x: -60, duration: 1, ease: EASE });
        } else if (el.classList.contains("from-right")) {
          tl.from(el, { opacity: 0, x: 60, duration: 1, ease: EASE });
        } else {
          tl.from(el, { opacity: 0, y: 40, duration: 1, ease: EASE });
        }
      });

      //background animation
      const animatedBgs = document.querySelectorAll(".bg-theme");
      animatedBgs.forEach((bg) => {
        gsap.to(bg, {
          scrollTrigger: {
            trigger: bg,
            toggleClass: "bg-animate",
            once: true,
          },
        });
      });

      // reveal
      document.querySelectorAll("[data-reveal]").forEach((el) => {
        const type = el.dataset.reveal || "up";
        const scrollTrigger = { trigger: el, start: "top 88%", once: true };

        if (type === "clip") {
          gsap.fromTo(
            el,
            { clipPath: "inset(8% 6% 8% 6% round 14px)", autoAlpha: 0, y: 40 },
            {
              clipPath: "inset(0% 0% 0% 0% round 0px)",
              autoAlpha: 1,
              y: 0,
              duration: 1.4,
              ease: EASE,
              clearProps: "clipPath",
              scrollTrigger,
            },
          );
          return;
        }

        gsap.from(el, {
          autoAlpha: 0,
          y: type === "fade" ? 0 : 32,
          duration: 1.2,
          ease: EASE,
          scrollTrigger,
        });
      });

      // staggered children
      document.querySelectorAll("[data-reveal-stagger]").forEach((group) => {
        gsap.from(group.children, {
          autoAlpha: 0,
          y: 28,
          duration: 1.1,
          ease: EASE,
          stagger: 0.09,
          scrollTrigger: { trigger: group, start: "top 88%", once: true },
        });
      });

      // parallax drift
      document.querySelectorAll("[data-parallax]").forEach((el) => {
        const speed = parseFloat(el.dataset.parallax) || 0.1;
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      // words lighting up as the statement scrolls in; the whole text is lit
      // by the time its first line reaches the middle of the screen
      document.querySelectorAll("[data-scrub-words]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll(".split-word"),
          { opacity: 0.2 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 50%",
              scrub: 0.4,
            },
          },
        );
      });

      // origami figures: each paper part springs open from its hinge edge
      const HINGE = {
        up: "50% 100%",
        down: "50% 0%",
        left: "100% 50%",
        right: "0% 50%",
      };
      const sideways = (el) =>
        el.dataset.fold === "left" || el.dataset.fold === "right";
      // (large scenes share the same overall build-up time)
      document.querySelectorAll("[data-origami]").forEach((figure) => {
        const parts = figure.querySelectorAll(".o-part");
        if (!parts.length) return;
        gsap.from(parts, {
          autoAlpha: 0,
          scaleX: (i, el) => (sideways(el) ? 0 : 1),
          scaleY: (i, el) => (sideways(el) ? 1 : 0),
          transformOrigin: (i, el) => HINGE[el.dataset.fold] || "50% 50%",
          duration: 0.9,
          ease: "back.out(1.6)",
          stagger: Math.min(0.07, 1.6 / parts.length),
          scrollTrigger: { trigger: figure, start: "top 85%", once: true },
        });
      });

      // origami scenes: layers drift at their own depth, travellers advance
      const scene = (el) => el.closest("[data-scene]") || el;
      document.querySelectorAll("[data-depth]").forEach((layer) => {
        const depth = parseFloat(layer.dataset.depth) || 0;
        gsap.fromTo(
          layer,
          { y: -depth * 30 },
          {
            y: depth * 30,
            ease: "none",
            scrollTrigger: {
              trigger: scene(layer),
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });

      document.querySelectorAll("[data-advance]").forEach((traveller) => {
        gsap.fromTo(
          traveller,
          { x: 0 },
          {
            x: parseFloat(traveller.dataset.advance) || 0,
            ease: "none",
            scrollTrigger: {
              trigger: scene(traveller),
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
            },
          },
        );
      });

      // blueprint dividers: chamfers draw from their corner squares
      document.querySelectorAll(".divider").forEach((divider) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: divider, start: "top 94%", once: true },
        });
        tl.from(divider.querySelectorAll(".divider-node"), {
          scale: 0,
          duration: 0.5,
          ease: "back.out(3)",
        }).from(
          divider.querySelectorAll(".divider-diag i"),
          { scaleX: 0, duration: 1.1, ease: EASE },
          "<0.1",
        );
      });
    });

    return () => mm.revert();
  }, [pathname]);

  return <main ref={main}>{children}</main>;
};

export default GSAPWrapper;
