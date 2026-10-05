import { Divider, Frame } from "@layouts/components/Frame";
import { LockIcon } from "@layouts/components/Icons";
import VideoPopupServer from "@layouts/components/VideoPopupServer";
import { markdownify } from "@lib/utils/textConverter";

// Demo page with the live BMDRM player. DRM playback relies on the browser
// handing the protected video to a hardware overlay that screen recording
// and screen sharing can't read. Any effect on the player or its ancestors
// (transforms, opacity, filters, rounded clipping, animations) pushes it back
// through the page compositor, where it can be captured, so the player sits
// in a plain frame that never animates (see .secure-player in home.scss).
const ShortIntroServer = () => {
  return (
    <>
      <Frame innerClassName="pt-16 pb-12 md:pt-20 md:pb-16">
        <div className="mx-auto max-w-[40rem] text-center">
          <p className="kicker rise" style={{ "--i": 0 }}>
            View Demo
          </p>
          <div className="rise mt-5" style={{ "--i": 1 }}>
            {markdownify("Video Hosting with **BMDRM**", "h2")}
          </div>
          <div className="rise" style={{ "--i": 2 }}>
            {markdownify(
              "Our secure video hosting platform ensures your content is protected with advanced encryption and seamless streaming",
              "p",
              "mx-auto mt-5 max-w-[32rem] text-ink/60",
            )}
          </div>
        </div>

        <div className="secure-player mx-auto mt-10 max-w-[56rem]">
          <div className="video-card-bar">
            <span className="video-card-dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="kicker">BMDRM Player</span>
            <span className="video-card-badge">
              <LockIcon className="h-3.5 w-3.5" />
              Encrypted
            </span>
          </div>
          <div className="secure-player-media">
            <VideoPopupServer />
          </div>
        </div>
      </Frame>
      <Divider flip />
    </>
  );
};

export default ShortIntroServer;
