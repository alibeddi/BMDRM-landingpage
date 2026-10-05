"use client";

import config from "@config/config.json";
import { Frame } from "@layouts/components/Frame";
import { ArrowIcon, GridIcon, RowsIcon } from "@layouts/components/Icons";
import { gsap, ScrollTrigger } from "@lib/gsap";
import { openChat } from "@lib/utils/chat";
import {
  COUNT_FORMATS,
  formatDuration,
  formatGb,
  formatPrice,
  formatRate,
} from "@lib/utils/pricingFormat";
import { markdownify } from "@lib/utils/textConverter";
import { Flip } from "gsap/dist/Flip";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

if (typeof window !== "undefined") gsap.registerPlugin(Flip);

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

const MOTION_OK = "(prefers-reduced-motion: no-preference)";
const TILT_OK = "(pointer: fine) and (prefers-reduced-motion: no-preference)";

const purchaseHref = (link, pack) =>
  link
    ? `${link}${link.includes("?") ? "&" : "?"}pack=${encodeURIComponent(pack.id)}`
    : null;

const PlanItem = ({ pack, index, data, onPointerMove, onPointerLeave }) => {
  const { labels } = data;
  const headingId = `plan-${pack.id}`;
  const href = purchaseHref(data.purchase_link, pack);
  const extras = [
    formatRate(pack.extraStorage) && `${formatRate(pack.extraStorage)} storage`,
    formatRate(pack.extraBandwidth) &&
      `${formatRate(pack.extraBandwidth)} bandwidth`,
  ].filter(Boolean);

  const cta = (
    <>
      {data.button_label}
      <ArrowIcon className="btn-arrow" />
    </>
  );

  return (
    <article
      className={`plan ${pack.isTrial ? "is-trial" : ""}`}
      data-flip-id={pack.id}
      aria-labelledby={headingId}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div className="plan-cell plan-head" data-flip-id={`${pack.id}-head`}>
        <span className="plan-index">{String(index + 1).padStart(2, "0")}</span>
        <h3 id={headingId} className="plan-name">
          {pack.name}
        </h3>
        {pack.isTrial && <span className="plan-badge">{data.trial_badge}</span>}
      </div>

      <div className="plan-cell plan-price" data-flip-id={`${pack.id}-price`}>
        <span className="plan-label">{labels.price}</span>
        <p className="plan-value">
          <span
            className="plan-amount"
            data-count={pack.amount}
            data-format="price"
          >
            {formatPrice(pack.amount)}
          </span>
          <span className="plan-duration">/ {formatDuration(pack.days)}</span>
        </p>
      </div>

      <div className="plan-cell plan-spec" data-flip-id={`${pack.id}-storage`}>
        <span className="plan-label">{labels.storage}</span>
        <p className="plan-value">
          <span data-count={pack.storage ?? undefined} data-format="gb">
            {formatGb(pack.storage)}
          </span>
        </p>
      </div>

      <div
        className="plan-cell plan-spec"
        data-flip-id={`${pack.id}-bandwidth`}
      >
        <span className="plan-label">{labels.bandwidth}</span>
        <p className="plan-value">
          <span data-count={pack.bandwidth ?? undefined} data-format="gb">
            {formatGb(pack.bandwidth)}
          </span>
        </p>
      </div>

      <div className="plan-cell plan-extra" data-flip-id={`${pack.id}-extra`}>
        <span className="plan-label">{labels.extra}</span>
        {extras.length ? (
          <ul className="plan-extras">
            {extras.map((extra) => (
              <li key={extra}>{extra}</li>
            ))}
          </ul>
        ) : (
          <p className="plan-value is-muted">—</p>
        )}
      </div>

      <div className="plan-cell plan-cta" data-flip-id={`${pack.id}-cta`}>
        {href ? (
          <a
            href={href}
            className="btn btn-primary"
            aria-describedby={headingId}
          >
            {cta}
          </a>
        ) : (
          <button
            type="button"
            className="btn btn-primary"
            aria-describedby={headingId}
            onClick={openChat}
          >
            {cta}
          </button>
        )}
      </div>
    </article>
  );
};

const PlansSkeleton = () => (
  <div className="plans plans-table" aria-busy="true">
    <span className="sr-only" role="status">
      Loading plans…
    </span>
    {Array.from({ length: 4 }, (_, index) => (
      <div key={index} className="plan plan-skeleton" aria-hidden="true">
        {["w-36", "w-24", "w-16", "w-20", "w-28", "h-10 w-32"].map((size) => (
          <div key={size} className="plan-cell">
            <span className={`skeleton ${size}`} />
          </div>
        ))}
      </div>
    ))}
  </div>
);

const PlansMessage = ({ text, onRetry }) => (
  <div className="plans-message" role="status">
    <p>{text}</p>
    <div className="flex flex-wrap justify-center gap-3">
      {onRetry && (
        <button type="button" className="btn btn-primary" onClick={onRetry}>
          Try again
        </button>
      )}
      {config.nav_button.enable && (
        <button type="button" className="btn btn-text" onClick={openChat}>
          {config.nav_button.label}
        </button>
      )}
    </div>
  </div>
);

const PricingPlans = ({ data, initialPacks }) => {
  const [packs, setPacks] = useState(initialPacks ?? []);
  const [status, setStatus] = useState(initialPacks ? "ready" : "loading");
  const [view, setView] = useState("table");
  const sectionRef = useRef(null);
  const listRef = useRef(null);
  const flipState = useRef(null);

  // the server could not reach the pricing API: fetch from the browser instead
  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const response = await fetch("/api/pricing");
      if (!response.ok) throw new Error(response.statusText);
      setPacks(await response.json());
      setStatus("ready");
    } catch (error) {
      console.error("Failed to fetch pricing:", error);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    if (!initialPacks) load();
  }, [initialPacks, load]);

  // entrance: rows rise in 3D behind a scanning line while the numbers count up
  useEffect(() => {
    if (status !== "ready" || !packs.length) return;
    const mm = gsap.matchMedia();

    mm.add(MOTION_OK, () => {
      const list = listRef.current;
      const items = list.querySelectorAll(".plan");
      const tl = gsap.timeline({
        scrollTrigger: { trigger: list, start: "top 82%", once: true },
      });

      tl.from(items, {
        autoAlpha: 0,
        y: 40,
        rotationX: -14,
        transformPerspective: 1100,
        transformOrigin: "50% 0%",
        duration: 1.1,
        ease: "expo.out",
        stagger: 0.08,
      })
        .fromTo(
          list.querySelector(".plans-scan"),
          { top: "0%", autoAlpha: 1 },
          {
            top: "100%",
            duration: 0.7 + items.length * 0.08,
            ease: "power1.inOut",
          },
          0,
        )
        .to(list.querySelector(".plans-scan"), { autoAlpha: 0, duration: 0.3 });

      list.querySelectorAll("[data-count]").forEach((el) => {
        const end = parseFloat(el.dataset.count);
        const format = COUNT_FORMATS[el.dataset.format];
        const text = el.firstChild; // update the text node React owns
        const counter = { value: 0 };
        tl.to(
          counter,
          {
            value: end,
            duration: 1.5,
            ease: "power3.out",
            onUpdate: () => {
              text.nodeValue = format(counter.value, end);
            },
          },
          0.15,
        );
      });

      // reading progress along the sticky table header
      gsap.fromTo(
        sectionRef.current.querySelector(".plans-progress"),
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 120px",
            end: "bottom 75%",
            scrub: true,
          },
        },
      );
    });

    return () => mm.revert();
  }, [status, packs]);

  // switch layouts: the plan boxes morph between rows and cards with Flip
  // while their content steps aside and settles into the new layout
  const switchView = (next) => {
    if (next === view) return;
    const list = listRef.current;
    if (list && window.matchMedia(MOTION_OK).matches) {
      const items = list.querySelectorAll(".plan");
      gsap.killTweensOf(items);
      gsap.set(items, { rotationX: 0, rotationY: 0 });
      flipState.current = Flip.getState([list, ...items], {
        props: "borderRadius",
      });
    }
    setView(next);
  };

  useIsomorphicLayoutEffect(() => {
    const state = flipState.current;
    if (!state) return;
    flipState.current = null;

    const list = listRef.current;
    const content = list.querySelectorAll(".plan-cell, .plans-head");
    gsap.set(content, { autoAlpha: 0 });
    // tint the boxes while they travel so the morph reads on the cream page
    list.classList.add("is-morphing");

    gsap
      .timeline({
        onComplete: () => {
          list.classList.remove("is-morphing");
          ScrollTrigger.refresh();
        },
      })
      .add(
        Flip.from(state, { duration: 0.9, ease: "expo.inOut", stagger: 0.035 }),
        0,
      )
      .fromTo(
        content,
        { autoAlpha: 0, y: 14 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
          stagger: 0.008,
          clearProps: "opacity,visibility,transform",
        },
        0.55,
      );
  }, [view]);

  // cursor spotlight everywhere, plus a gentle tilt on cards
  const handlePointerMove = (event) => {
    const plan = event.currentTarget;
    const rect = plan.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width;
    const y = (event.clientY - rect.top) / rect.height;
    plan.style.setProperty("--mx", `${x * 100}%`);
    plan.style.setProperty("--my", `${y * 100}%`);

    if (view === "cards" && window.matchMedia(TILT_OK).matches) {
      gsap.to(plan, {
        rotationY: (x - 0.5) * 7,
        rotationX: (0.5 - y) * 5,
        transformPerspective: 900,
        duration: 0.5,
        ease: "power2.out",
        overwrite: "auto",
      });
    }
  };

  const handlePointerLeave = (event) => {
    gsap.to(event.currentTarget, {
      rotationX: 0,
      rotationY: 0,
      duration: 0.7,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  const { labels, views } = data;
  const ready = status === "ready" && packs.length > 0;

  return (
    <section id="plans" ref={sectionRef} className="plans-section">
      <Frame as="div" innerClassName="pt-12 pb-16 md:pt-16 md:pb-24">
        <div className="plans-toolbar" data-reveal-stagger>
          <div>
            <p className="kicker">{data.kicker}</p>
            {markdownify(data.title, "h2", "plans-title")}
          </div>

          {ready && (
            <div className="view-toggle" role="group" aria-label="Plan layout">
              <span
                className="view-toggle-thumb"
                data-view={view}
                aria-hidden="true"
              />
              <button
                type="button"
                aria-pressed={view === "table"}
                onClick={() => switchView("table")}
              >
                <RowsIcon className="h-4 w-4" />
                {views.table}
              </button>
              <button
                type="button"
                aria-pressed={view === "cards"}
                onClick={() => switchView("cards")}
              >
                <GridIcon className="h-4 w-4" />
                {views.cards}
              </button>
            </div>
          )}
        </div>

        {status === "loading" && <PlansSkeleton />}
        {status === "error" && (
          <PlansMessage text={data.error} onRetry={load} />
        )}
        {status === "ready" && !packs.length && (
          <PlansMessage text={data.empty} />
        )}

        {ready && (
          <div ref={listRef} className={`plans plans-${view}`}>
            <div className="plans-head" aria-hidden="true">
              <span>{labels.plan}</span>
              <span>{labels.price}</span>
              <span>{labels.storage}</span>
              <span>{labels.bandwidth}</span>
              <span>{labels.extra}</span>
              <span />
              <span className="plans-progress" />
            </div>
            {packs.map((pack, index) => (
              <PlanItem
                key={pack.id}
                pack={pack}
                index={index}
                data={data}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
              />
            ))}
            <span className="plans-scan" aria-hidden="true" />
          </div>
        )}
      </Frame>
    </section>
  );
};

export default PricingPlans;
