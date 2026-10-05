import { Frame } from "@layouts/components/Frame";
import { LockIcon, PlayIcon } from "@layouts/components/Icons";
import Image from "next/image";

// Framed demo cover; the whole card opens the live demo page.
const ShortIntro = ({ intro }) => {
  return (
    <Frame innerClassName="py-12 md:py-16">
      <div className="mx-auto max-w-[56rem]" data-reveal="clip">
        <a
          href={intro.link}
          className="video-card group"
          aria-label="Watch the BMDRM demo"
        >
          <div className="video-card-bar">
            <span className="video-card-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="kicker">{intro.subtitle}</span>
            <span className="video-card-badge">
              <LockIcon className="h-3.5 w-3.5" />
              Encrypted
            </span>
          </div>
          <div className="video-card-media">
            <Image
              src={intro.thumbnail}
              alt=""
              width={1077}
              height={604}
              sizes="(min-width: 1024px) 56rem, 100vw"
              className="video-card-image"
            />
            <span className="video-card-play" aria-hidden="true">
              <PlayIcon className="h-7 w-7 translate-x-0.5" />
            </span>
          </div>
        </a>
      </div>
    </Frame>
  );
};

export default ShortIntro;
