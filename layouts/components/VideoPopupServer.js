import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import VideoFrame from "./VideoFrame";

function VideoPopupServer({ id, thumbnail, width = 700, height = 394 }) {
  //animate
  return (
    <div className=" relative  flex overflow-hidden">
      <div className="aspect-video w-full">
        {" "}
        <VideoFrame />{" "}
      </div>
    </div>
  );
}

export default VideoPopupServer;
