"use client";

import { useSearchParams } from "next/navigation";
import ReactPlayer from "react-player";

export default function EmbedPage() {
  const searchParams = useSearchParams(); // Get the search parameters from the URL
  console.log(searchParams);

  return (
    <div className="h-fit">
      <ReactPlayer
        //   ref={(player) => {
        //     videoPlayerRefs.current[index] = player;
        //   }}
        url={"https://cdn.pixabay.com/video/2024/06/17/217122_large.mp4"}
        width="100%"
        height="100%"
        //   playing={playingIndex === index && playing}
        playing={true}
        loop
        muted={false}
        controls={false}
        style={{
          position: "relative",
          aspectRatio: "9/16",
        }}
        //   onProgress={(state) => handleProgress(state, index)}
      />
    </div>
  );
}
