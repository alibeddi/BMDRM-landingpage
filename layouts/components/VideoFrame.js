import { v4 as uuidv4 } from "uuid";
import { env } from "next-runtime-env";

const VideoFrame = async () => {
  const url = await fetchUrl();

  return (
    <iframe
      style={{
        border: 0,
        width: "100%",
        height: "100%",
        zIndex: 99999,
      }}
      allowFullScreen
      sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
      allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; display-capture *;"
      src={url}
      loading="lazy"
    />
  );
};

export default VideoFrame;
async function fetchUrl() {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      apiKey: env("NEXT_PUBLIC_API_KEY"),
    },
  };

  const response = await fetch(
    `${env("NEXT_PUBLIC_API_URL")}api/Sessions?videoId=${env(
      "NEXT_PUBLIC_VIDEO_ID",
    )}&userId=${uuidv4()}`,
    options,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();
  const generateVideoLink = data.urlToEdge;
  return generateVideoLink;
}
