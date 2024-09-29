import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import VideoFrame from "./VideoFrame";

function VideoPopupServer({ id, thumbnail, width = 700, height = 394 }) {
  return (
    <div className="animate relative  flex overflow-hidden rounded-2xl">
      <div className="aspect-video w-full">
        {" "}
        <VideoFrame />{" "}
      </div>
    </div>
  );
}

export default VideoPopupServer;
