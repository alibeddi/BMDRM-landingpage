import VideoFrame from "./VideoFrame";

// 16:9 box for the player; no clipping or effects (see ShortIntroServer)
function VideoPopupServer() {
  return (
    <div className="aspect-video w-full">
      <VideoFrame />
    </div>
  );
}

export default VideoPopupServer;
