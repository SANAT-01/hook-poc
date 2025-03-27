"use client";

import { Hook } from "@/types/hooks";
import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";

interface VideoReelsProps {
  initialData: { data: Hook[] };
}

const VideosScroll: React.FC<VideoReelsProps> = ({ initialData }) => {
  const [videos, setVideos] = useState<Hook[]>([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoPlayerRefs = useRef<(ReactPlayer | null)[]>([]);
  console.log(playingIndex, playerRefs, videoPlayerRefs);

  const [embedCode, setEmbedCode] = useState("");
  const [buffering] = useState(false); // Track buffering state

  const handleCopyEmbed = (index: number) => {
    const embed = `<iframe width="340" height="600" src="${window.location.origin}/video/${index}" frameborder="0" style="overflow:hidden; border:none;"></iframe>`;
    navigator.clipboard.writeText(embed);
    setEmbedCode(embed);
  };

  useEffect(() => {
    if (initialData?.data) {
      setVideos(initialData?.data);
    }
  }, [initialData]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = playerRefs.current.indexOf(
            entry.target as HTMLDivElement
          );
          if (entry.isIntersecting && index !== -1) {
            setPlayingIndex(index);
          }
        });
      },
      { threshold: 0.9, rootMargin: "200px 0px 300px 0px" } // Adjust rootMargin for smoother scrolling
    );

    playerRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    // Ensure the first video is observed immediately
    if (playerRefs.current[0]) {
      observer.observe(playerRefs.current[0]);
    }

    return () => {
      playerRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, [videos]);

  return (
    <div
      style={{
        height: "100vh",
        overflowY: "scroll",
        scrollSnapType: "y mandatory",
      }}
    >
      {videos.map((item, index) => (
        <div
          key={index}
          ref={(el) => {
            playerRefs.current[index] = el;
          }}
          style={{
            height: "100vh",
            scrollSnapAlign: "start",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "opacity 0.3s ease-in-out", // Smooth transition
          }}
        >
          <ReactPlayer
            ref={(player) => {
              videoPlayerRefs.current[index] = player;
            }}
            url={item.signedVideoUrl}
            width="100%"
            height="100%"
            playing={playingIndex === index}
            loop
            muted={false}
            controls={false}
            style={{
              position: "relative",
              aspectRatio: "9/16",
            }}
            // onProgress={(state) => handleProgress(state, index)}
          />
          {buffering && (
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                padding: "10px",
                borderRadius: "5px",
                color: "white",
              }}
            >
              Loading...
            </div>
          )}
          <div>
            <button
              onClick={() => handleCopyEmbed(index)}
              style={{ marginTop: "10px", padding: "10px", cursor: "pointer" }}
            >
              Copy Embed Code
            </button>
            {embedCode && (
              <div
                style={{
                  marginTop: "20px",
                  backgroundColor: "#f4f4f4",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              >
                <strong>Embed Code:</strong>
                <p>{embedCode}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosScroll;
