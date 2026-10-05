import config from "@config/config.json";
import ChatButton from "@layouts/components/ChatButton";
import { Divider, Frame } from "@layouts/components/Frame";
import { ArrowIcon } from "@layouts/components/Icons";
import { HangingBanner, OrigamiScene } from "@layouts/components/origami";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";

// heraldic banner hanging from the section's top rule
const Banner = ({ delay = 0 }) => (
  <OrigamiScene viewBox="0 0 80 190" className="cta-banner">
    <g className="o-part" data-fold="down">
      <HangingBanner x={40} y={8} w={46} h={150} delay={delay} />
    </g>
  </OrigamiScene>
);

// `data` overrides config.call_to_action for a single page
const Cta = ({ data }) => {
  const { enable, kicker, title, content, button, secondary_button } = {
    ...config.call_to_action,
    ...data,
  };
  if (!enable) return null;

  return (
    <>
      <Divider />
      <Frame className="cta" innerClassName="cta-inner py-20 md:py-28">
        <div className="cta-banners" aria-hidden="true">
          <Banner />
          <Banner delay={2.5} />
        </div>
        <div className="cta-content" data-reveal-stagger>
          {kicker && <p className="kicker">{kicker}</p>}
          {markdownify(title, "h2", "cta-title")}
          {markdownify(content, "p", "cta-text")}
          <div className="cta-actions">
            <ChatButton className="btn btn-pattern">
              {button.label}
              <ArrowIcon className="btn-arrow" />
            </ChatButton>
            {secondary_button && (
              <Link href={secondary_button.link} className="btn btn-text">
                {secondary_button.label}
              </Link>
            )}
          </div>
        </div>
      </Frame>
      <Divider flip />
    </>
  );
};

export default Cta;
