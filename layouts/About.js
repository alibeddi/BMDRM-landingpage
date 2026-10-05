import Banner from "./components/Banner";
import Cta from "./components/Cta";
import { Divider, Frame } from "./components/Frame";
import { LockIcon, PlayIcon } from "./components/Icons";
import { OrigamiFigure } from "./components/origami";
import AboutVideoScene from "./components/scenes/AboutVideoScene";
import WatchtowerScene from "./components/scenes/WatchtowerScene";
import WhoWeAreScene from "./components/scenes/WhoWeAreScene";
import { markdownify } from "@lib/utils/textConverter";

const About = ({ data }) => {
  const { frontmatter } = data;
  const { title, about_us, works, video } = frontmatter;

  return (
    <>
      <Banner title={title} scene="kingdom" />

      {/* who we are */}
      <Frame innerClassName="py-16 md:py-24">
        <div className="about-intro">
          <div className="about-intro-content" data-reveal-stagger>
            <p className="kicker">{about_us.subtitle}</p>
            {markdownify(about_us.title, "h2")}
            {markdownify(about_us.content, "p", "about-intro-text")}
          </div>
          <figure className="about-photo" data-reveal="clip">
            <div className="about-photo-mat">
              <div className="about-photo-clip">
                <WhoWeAreScene />
              </div>
            </div>
            <figcaption className="about-caption">
              <span>Fig. 02</span>
              <span>Secure video hosting</span>
            </figcaption>
          </figure>
        </div>
      </Frame>

      {/* what we do */}
      <Divider flip />
      <Frame innerClassName="py-16 md:py-24">
        <div className="about-works-head">
          <div data-reveal-stagger>
            <p className="kicker">{works.subtitle}</p>
            {markdownify(works.title, "h2", "mt-5")}
            {markdownify(works.content, "p", "mt-5 max-w-[30rem] text-ink/60")}
          </div>
          <div className="about-guard" aria-hidden="true">
            <WatchtowerScene />
          </div>
        </div>

        <ol className="about-works" data-reveal-stagger>
          {works.list.map((work, index) => (
            <li key={work.title} className="about-work">
              <span className="plan-index">
                {String(index + 1).padStart(2, "0")}
              </span>
              {markdownify(work.title, "h3", "about-work-title")}
              {markdownify(work.content, "p", "about-work-text")}
            </li>
          ))}
        </ol>
      </Frame>

      {/* short video */}
      <Divider />
      <Frame innerClassName="py-16 md:py-24">
        <div className="about-video">
          <div className="about-video-content" data-reveal-stagger>
            <p className="kicker">{video.subtitle}</p>
            {markdownify(video.title, "h2")}
            {markdownify(video.description, "p", "text-ink/60")}
          </div>
          <div className="about-video-media">
            {/* a scout on the card's edge, searching the horizon */}
            <div className="about-scout" aria-hidden="true">
              <OrigamiFigure name="scout" />
            </div>
            <div data-reveal="clip">
              <a
                href="/demo"
                className="video-card"
                aria-label="Watch the BMDRM demo"
              >
                <div className="video-card-bar">
                  <span className="video-card-dots" aria-hidden="true">
                    <i />
                    <i />
                    <i />
                  </span>
                  <span className="video-card-badge">
                    <LockIcon className="h-3.5 w-3.5" />
                    Encrypted
                  </span>
                </div>
                <div className="video-card-media">
                  <AboutVideoScene />
                  <span className="video-card-play" aria-hidden="true">
                    <PlayIcon className="h-7 w-7 translate-x-0.5" />
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </Frame>

      <Cta />
    </>
  );
};

export default About;
