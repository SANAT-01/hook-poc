"use client";

import { Hook } from "@/types/hooks";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

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
  const pathName = usePathname();
  console.log(pathName.split("/")[2]);
  const [videos, setVideos] = useState<Hook | null>(null);

  useEffect(() => {
    // Fetch hook data when the component mounts or `initialData` changes
    const fetchData = async () => {
      const hookData = await fetchHooks({ hookId: pathName.split("/")[2] }); // Fetch hooks if `initialData` is not available
      if (hookData) {
        setVideos(hookData); // Set fetched hook data
      }
    };

    fetchData(); // Call the fetchData function inside useEffect
  }, [pathName]); // Dependency array ensures the effect runs when `initialData` changes

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
              playing={true}
              loop
              muted={false}
              controls={false}
              style={{
                position: "relative",
                aspectRatio: "9/16",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmbedPage;
