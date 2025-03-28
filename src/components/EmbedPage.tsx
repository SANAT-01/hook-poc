"use client";

import { Hook } from "@/types/hooks";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import {
  BiFullscreen,
  BiPause,
  BiPlay,
  BiVolumeFull,
  BiVolumeMute,
} from "react-icons/bi";

const fetchHooks = async ({ hookId }: { hookId: string }) => {
  try {
    const hookDataPromises = () =>
      fetch(
        `https://api.develop.hookmusic.com/public/hooks/${hookId}`,
        { cache: "no-store" } // SSR`
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => json?.data.attributes || null)
        .catch((error) => {
          console.error(`Error fetching hook ${hookId}:`, error);
          return null;
        });

    const hookData = await hookDataPromises();
    return hookData;
  } catch (error) {
    console.error("Error fetching signed video URLs:", error);
    return null; // Return null in case of an error
  }
};

const EmbedPage = ({}) => {
  const searchParams = useSearchParams();
  console.log(searchParams.get("embedShow"));
  const pathName = usePathname();
  const videoId = pathName.split("/")[2];
  const [videos, setVideos] = useState<Hook | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [embedCode, setEmbedCode] = useState("");

  useEffect(() => {
    // Fetch hook data when the component mounts or `initialData` changes
    const fetchData = async () => {
      const hookData = await fetchHooks({ hookId: videoId }); // Fetch hooks if `initialData` is not available
      if (hookData) {
        setVideos(hookData); // Set fetched hook data
      }
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, [videoId]); // Dependency array ensures the effect runs when `initialData` changes

  useEffect(() => {
    if (!videoId) return;

    const fetchEmbedCode = async () => {
      try {
        const response = await fetch(
          `${
            process.env.NODE_ENV === "development"
              ? "http://localhost:3000"
              : "https://hook-poc.vercel.app"
          }/api/oembed?url=https://dev.media.hookmusic.com/${videoId}`
        );
        const data = await response.json();
        if (data.html) {
          setEmbedCode(data.html);
        }
      } catch (error) {
        console.error("Error fetching embed code:", error);
      }
    };

    fetchEmbedCode();
  }, [videoId]);

  console.log(videos);

  return (
    <div>
      <div className="h-fit">
        <div
          className="relative h-screen w-full flex items-center justify-center"
          style={{
            scrollSnapAlign: "center",
          }}
        >
          {/* Video Wrapper */}
          <div className="relative w-auto max-w-full h-10/12 overflow-hidden rounded-3xl">
            {/* Video Player */}
            <ReactPlayer
              url={videos?.signedVideoUrl} // Dynamically use the fetched video URL
              width="100%"
              height="100%"
              playing={playing}
              loop
              muted={muted}
              controls={false}
              style={{
                position: "relative",
                aspectRatio: "9/16",
              }}
            />
            <div className="absolute flex flex-row gap-4 items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-300">
              <button
                onClick={() => setPlaying((prev) => !prev)}
                className="text-white text-3xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
              >
                {playing ? <BiPause /> : <BiPlay />}
              </button>

              <button
                onClick={() => setMuted((prev) => !prev)}
                className="text-white text-3xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
              >
                {muted ? <BiVolumeMute /> : <BiVolumeFull />}
              </button>

              <button
                // onClick={handleFullscreen}
                className="text-white text-3xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
              >
                <BiFullscreen />
              </button>
            </div>
          </div>
        </div>
      </div>
      {searchParams.get("embedShow") && (
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center rounded-4xl relative w-6/12">
            <h3 className="text-black text-xl font-bold mb-2 text-center">
              Embed Video
            </h3>
            <div className="flex w-full items-center bg-gray-200 rounded-lg p-3 mb-6 justify-center">
              <textarea
                value={embedCode}
                readOnly
                className="w-full h-full text-sm bg-gray-200 outline-none resize-none"
                rows={1}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedPage;
