import config from "@config/config.json";
import AnchorLink from "@layouts/components/AnchorLink";
import ChatButton from "@layouts/components/ChatButton";
import { Frame } from "@layouts/components/Frame";
import { ArrowDownIcon } from "@layouts/components/Icons";
import PricingArt from "@layouts/components/PricingArt";
import Scramble from "@layouts/components/Scramble";
import SplitWords from "@layouts/components/SplitWords";
import { formatGb } from "@lib/utils/pricingFormat";

const maxOf = (packs, key) => Math.max(...packs.map((pack) => pack[key] ?? 0));

const PricingHero = ({ hero, packs }) => {
  const { nav_button } = config;

  // headline numbers straight from the live packs
  const stats = packs?.length
    ? [
        {
          label: hero.stats.plans,
          value: String(packs.length).padStart(2, "0"),
        },
        { label: hero.stats.storage, value: formatGb(maxOf(packs, "storage")) },
        {
          label: hero.stats.bandwidth,
          value: formatGb(maxOf(packs, "bandwidth")),
        },
      ]
    : null;

  return (
    <Frame className="pricing-hero" innerClassName="pricing-hero-inner">
      <div className="pricing-hero-content">
        <Scramble
          as="p"
          text={hero.kicker}
          className="kicker rise"
          delay={0.2}
        />
        <SplitWords
          as="h1"
          text={hero.title}
          className="split-mask rise-words"
        />
        <p className="pricing-hero-text rise" style={{ "--i": 3 }}>
          {hero.description}
        </p>
        <div className="hero-actions rise" style={{ "--i": 4 }}>
          <AnchorLink href={hero.button.link} className="btn btn-primary">
            {hero.button.label}
            <ArrowDownIcon className="btn-arrow btn-arrow-down" />
          </AnchorLink>
          {nav_button.enable && (
            <ChatButton className="btn btn-text">{nav_button.label}</ChatButton>
          )}
        </div>

        {stats && (
          <dl className="pricing-stats rise" style={{ "--i": 5 }}>
            {stats.map((stat, index) => (
              <div key={stat.label} className="pricing-stat">
                <dt>{stat.label}</dt>
                <dd>
                  <Scramble
                    text={stat.value}
                    chars="0123456789"
                    delay={0.8 + index * 0.15}
                  />
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>

      <div className="pricing-hero-art" aria-hidden="true" data-scene>
        <div data-parallax="0.08">
          <PricingArt />
        </div>
      </div>
    </Frame>
  );
};

export default PricingHero;
