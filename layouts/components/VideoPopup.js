"use client";

import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import ImageFallback from "./ImageFallback";
import Button from "@layouts/shortcodes/Button";

function VideoPopup({ id, thumbnail, width = 700, height = 394 }) {
  const handleMove = () => {
    const targetUrl = `/demo`;

    window.location.href = targetUrl;
  };
  return (
    <div className="animate relative  flex overflow-hidden rounded-2xl">
      <div className="relative inline-block w-full">
        <ImageFallback
          className="w-full"
          src={"/images/cover.png"}
          width={width}
          height={height}
          alt=""
        />
        <div
          onClick={handleMove}
          className="intro-play-btn cursor-pointer absolute left-1/2 top-1/2 inline-flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-2xl text-body lg:h-[90px] lg:w-[90px]"
        >
          <FeatherIcon icon="play" size={32} />
        </div>
      </div>
    </div>
  );
}

export default VideoPopup;
