import config from "@config/config.json";
import ChatButton from "@layouts/components/ChatButton";
import HeroArt from "@layouts/components/HeroArt";
import SplitWords from "@layouts/components/SplitWords";
import { ArrowIcon } from "@layouts/components/Icons";

const HomeHero = ({ hero }) => {
  const { nav_button } = config;

  return (
    <section className="hero">
      <div className="hero-content">
        <p className="kicker rise" style={{ "--i": 0 }}>
          {hero.kicker}
        </p>
        <SplitWords
          as="h1"
          text={hero.title}
          className="hero-title split-mask rise-words"
        />
        <p className="hero-text rise" style={{ "--i": 3 }}>
          {hero.description}
        </p>
        <div className="hero-actions rise" style={{ "--i": 4 }}>
          <a href={hero.button.link} className="btn btn-primary">
            {hero.button.label}
            <ArrowIcon className="btn-arrow" />
          </a>
          {nav_button.enable && (
            <ChatButton className="btn btn-text">{nav_button.label}</ChatButton>
          )}
        </div>
      </div>

      <div className="hero-art-wrap" aria-hidden="true" data-scene>
        <div className="hero-art-layer" data-parallax="0.12">
          <HeroArt />
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
