"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import ReactPlayer from "react-player";
import {
  BiPlay,
  BiPause,
  BiVolumeMute,
  BiVolumeFull,
  BiFullscreen,
  BiChevronUp,
  BiChevronDown,
} from "react-icons/bi";
import {
  AiOutlineHeart,
  AiFillHeart,
  AiOutlineComment,
  AiOutlineShareAlt,
  AiFillPlusCircle,
} from "react-icons/ai";
import { IoIosMore } from "react-icons/io";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { Hook } from "@/types/hooks";
import { FaCirclePlus } from "react-icons/fa6";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface VideoReelsProps {
  initialData: { data: Hook[] };
}

const VideoReels: React.FC<VideoReelsProps> = ({ initialData }) => {
  const navigation = useRouter();
  const [videos, setVideos] = useState<Hook[]>([]);
  const [playingIndex, setPlayingIndex] = useState(0);
  const playerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoPlayerRefs = useRef<(ReactPlayer | null)[]>([]);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [likedVideos, setLikedVideos] = useState<boolean[]>([]);
  const [isScrolling, setIsScrolling] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [progress, setProgress] = useState<number[]>([]);
  const [isSeeking] = useState(false);
  // Initialize with SSR data or fetch data on the client
  useEffect(() => {
    if (initialData?.data) {
      setVideos(initialData?.data);
      setLikedVideos(Array(initialData.data.length).fill(false));
      setProgress(Array(initialData.data.length).fill(0));
    } else {
      // Fetch data if not provided from SSR
      fetch("/api/videos")
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setVideos(data.data);
            setLikedVideos(Array(data.data.length).fill(false));
            setProgress(Array(data.data.length).fill(0));
          }
        })
        .catch((error) => console.error("Error fetching videos:", error));
    }
  }, [initialData]);

  const togglePlayPause = () => setPlaying((prev) => !prev);
  const toggleMute = () => setMuted((prev) => !prev);

  const toggleLike = (index: number) => {
    setLikedVideos((prev) => {
      const newLiked = [...prev];
      newLiked[index] = !newLiked[index];
      return newLiked;
    });
  };

  const handleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      document.documentElement.requestFullscreen();
    }
  };

  // Function to handle scroll
  const scrollToIndex = (index: number) => {
    if (index >= 0 && index < videos.length) {
      setPlayingIndex(index);
      playerRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  };

  // Scroll with Mouse Wheel (Throttled)
  const handleScroll = useCallback(
    (e: WheelEvent) => {
      if (isScrolling) return;
      setIsScrolling(true);

      if (e.deltaY > 0 && playingIndex < videos.length - 1) {
        scrollToIndex(playingIndex + 1);
      } else if (e.deltaY < 0 && playingIndex > 0) {
        scrollToIndex(playingIndex - 1);
      }

      setTimeout(() => {
        setIsScrolling(false);
      }, 200); // Adding a timeout value here
    },
    [playingIndex, videos.length, isScrolling]
  );

  // Update progress for the current video
  const handleProgress = (state: { played: number }, index: number) => {
    if (!isSeeking) {
      // Only update progress if not seeking
      setProgress((prev) => {
        const newProgress = [...prev];
        newProgress[index] = state.played;
        return newProgress;
      });
    }
  };

  useEffect(() => {
    window.addEventListener("wheel", handleScroll);
    return () => {
      window.removeEventListener("wheel", handleScroll);
    };
  }, [handleScroll]);

  return (
    <>
      {videos.length === 0 ? (
        <></>
      ) : (
        <>
          <svg width="0" height="0">
            <defs>
              <clipPath id="flowerClip" clipPathUnits="objectBoundingBox">
                <path
                  d="M0.967,0.389c-0.015-0.023-0.035-0.043-0.058-0.058c0.003-0.013,0.004-0.027,0.004-0.041
        c0-0.052-0.02-0.104-0.06-0.144c-0.04-0.04-0.092-0.06-0.144-0.06c-0.014,0-0.027,0.002-0.041,0.004
        c-0.015-0.023-0.034-0.043-0.058-0.058C0.579,0.012,0.542,0,0.5,0C0.458,0,0.421,0.012,0.389,0.034
        c-0.023,0.015-0.043,0.035-0.058,0.058c-0.014-0.003-0.027-0.004-0.041-0.004c-0.052,0-0.104,0.02-0.144,0.06
        c-0.04,0.04-0.06,0.092-0.06,0.144c0,0.014,0.002,0.027,0.004,0.041c-0.023,0.015-0.043,0.035-0.058,0.058
        C0.012,0.421,0,0.458,0,0.5c0,0.042,0.012,0.079,0.034,0.111c0.015,0.023,0.035,0.043,0.058,0.058
        c-0.003,0.014-0.004,0.027-0.004,0.041c0,0.052,0.02,0.104,0.06,0.144c0.04,0.04,0.092,0.06,0.144,0.06
        c0.014,0,0.027-0.002,0.041-0.004c0.015,0.023,0.035,0.043,0.058,0.058C0.421,0.988,0.458,1,0.5,1
        c0.042,0,0.079-0.012,0.111-0.034c0.023-0.015,0.043-0.035,0.058-0.058c0.014,0.003,0.027,0.004,0.041,0.004
        c0.052,0,0.104-0.02,0.144-0.06c0.04-0.04,0.06-0.092,0.06-0.144c0-0.014-0.002-0.027-0.004-0.041
        c0.023-0.015,0.043-0.035,0.058-0.058C0.988,0.579,1,0.542,1,0.5C1,0.458,0.988,0.421,0.967,0.389z"
                />
              </clipPath>
            </defs>
          </svg>
          <div className="h-screen overflow-hidden">
            {videos.map((video, index) => (
              <div
                key={index}
                ref={(el) => {
                  playerRefs.current[index] = el;
                }}
                className="relative h-screen w-full flex items-center justify-center"
                style={{
                  scrollSnapAlign: "center",
                }}
              >
                {/* Video Wrapper */}
                <div
                  className="relative w-auto max-w-full h-10/12 overflow-hidden rounded-3xl"
                  onMouseEnter={() =>
                    playingIndex === index && setShowControls(true)
                  }
                  onMouseLeave={() => setShowControls(false)}
                >
                  {/* Video Player */}
                  <ReactPlayer
                    ref={(player) => {
                      videoPlayerRefs.current[index] = player;
                    }}
                    url={
                      "https://cdn.pixabay.com/video/2024/06/17/217122_large.mp4"
                    }
                    width="100%"
                    height="100%"
                    playing={playingIndex === index && playing}
                    loop
                    muted={muted}
                    controls={false}
                    style={{
                      position: "relative",
                      aspectRatio: "9/16",
                    }}
                    onProgress={(state) => handleProgress(state, index)}
                  />
                  <div className="absolute top-9 left-5 text-white z-10 flex gap-3 justify-center items-center">
                    <Image
                      className="w-15 h-15 rounded-xl object-cover"
                      src={video.user.attributes.thumbnails.original}
                      alt={`${video.user.attributes.username}'s profile`}
                      width={15}
                      height={15}
                      layout="intrinsic"
                    />
                    <h3 className="font-bold text-lg">
                      {video.user.attributes.username}
                    </h3>
                    {video.user.attributes.isVerified && (
                      <span className="bg-blue-500 text-white text-xs px-1 rounded-full">
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Vertical TikTok-Style Buttons */}
                  <div className="absolute right-4 top-120 transform -translate-y-1/2 flex flex-col gap-3 items-center justify-center z-10">
                    <button
                      onClick={() => toggleLike(index)}
                      className="text-white text-3xl"
                    >
                      {likedVideos[index] ? (
                        <AiFillHeart className="text-red-500" />
                      ) : (
                        <AiOutlineHeart />
                      )}
                    </button>
                    <span className="text-white text-sm">
                      {video.likeCount.toLocaleString()}
                    </span>

                    <button className="text-white text-3xl">
                      <AiOutlineComment />
                    </button>
                    <span className="text-white text-sm">
                      {video.commentCount.toLocaleString()}
                    </span>

                    <button className="text-white text-3xl">
                      <AiOutlineShareAlt />
                    </button>
                    <span className="text-white text-sm">
                      {video.shareCount.toLocaleString()}
                    </span>

                    <button className="text-white text-3xl">
                      <AiFillPlusCircle />
                    </button>
                    <span className="text-white text-sm">
                      {video.reHookCount.toLocaleString()}
                    </span>

                    <button className="text-white text-3xl">
                      <IoIosMore />
                    </button>
                  </div>

                  <div className="absolute bottom-22 left-5 text-white z-10">
                    <p className="font-medium text-sm">{video.title}</p>
                    {video.description && (
                      <p className="text-sm opacity-80">{video.description}</p>
                    )}

                    {/* Song information */}
                    {video.hookSongs && video.hookSongs.length > 0 && (
                      <div className="flex items-center mt-2">
                        <div className="mr-2">
                          <Image
                            src={
                              video.hookSongs[0].attributes.song.attributes
                                .coverartUrl
                            }
                            alt="Song cover"
                            className="w-6 h-6 rounded-md"
                            layout="intrinsic"
                            width={10}
                            height={10}
                          />
                        </div>
                        <div>
                          <p className="text-xs">
                            {
                              video.hookSongs[0].attributes.song.attributes
                                .title
                            }{" "}
                            •
                            {video.hookSongs[0].attributes.song.attributes.artists.map(
                              (artist, i) => (
                                <span key={artist.id}>
                                  {i > 0 ? ", " : " "}
                                  {artist.attributes.displayName}
                                </span>
                              )
                            )}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Centered Video Controls */}
                  {showControls && playingIndex === index && (
                    <div className="absolute flex flex-row gap-4 items-center justify-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 transition-opacity duration-300">
                      <button
                        onClick={togglePlayPause}
                        className="text-white text-3xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
                      >
                        {playing ? <BiPause /> : <BiPlay />}
                      </button>

                      <button
                        onClick={toggleMute}
                        className="text-white text-3xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
                      >
                        {muted ? <BiVolumeMute /> : <BiVolumeFull />}
                      </button>

                      <button
                        onClick={handleFullscreen}
                        className="text-white text-3xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
                      >
                        <BiFullscreen />
                      </button>
                    </div>
                  )}

                  {/* User profiles */}
                  <div className="absolute bottom-6 left-6 text-white z-10 flex gap-3 justify-center items-center">
                    {/* First Profile Image with Progress Bar */}
                    <div className="relative w-12 h-12 flex items-center justify-center">
                      <div className="absolute w-full h-full scale-[1.4]">
                        <CircularProgressbar
                          value={progress[playingIndex] * 100}
                          strokeWidth={4}
                          styles={buildStyles({
                            pathColor: "#FFFFFF",
                            trailColor: "#727372",
                            strokeLinecap: "round",
                          })}
                        />
                      </div>

                      <div className="absolute w-full h-full left-10 top-7 z-20">
                        <FaCirclePlus
                          className="w-auto h-auto cursor-pointer"
                          style={{ color: "#9785FF" }}
                          onClick={() => {
                            navigation.push("/personal");
                          }}
                        />
                      </div>
                      <Image
                        className="w-12 h-12 rounded-full object-cover relative"
                        src={video.user.attributes.thumbnails.original}
                        style={{
                          clipPath: "url(#flowerClip)",
                        }}
                        alt="User profile"
                        layout="intrinsic"
                        width={12}
                        height={12}
                      />
                    </div>

                    {/* You can add more profile pictures here or generate them dynamically */}
                    {/* For now, just showing some sample profile images */}
                    <Image
                      className="w-12 h-12 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      style={{
                        clipPath: "url(#flowerClip)",
                      }}
                      alt="Sample profile"
                      width={15}
                      height={15}
                    />

                    <Image
                      className="w-12 h-12 rounded-full object-cover"
                      src="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                      alt="Sample profile"
                      style={{
                        clipPath: "url(#flowerClip)",
                      }}
                      width={15}
                      height={15}
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Scroll Up & Down Buttons */}
            <div className="absolute right-5 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 items-center z-20">
              {/* Scroll Up Button */}
              <button
                onClick={() => scrollToIndex(playingIndex - 1)}
                className="text-white text-4xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
                disabled={playingIndex === 0}
              >
                <BiChevronUp />
              </button>

              {/* Scroll Down Button */}
              <button
                onClick={() => scrollToIndex(playingIndex + 1)}
                className="text-white text-4xl p-3 rounded-full bg-black/40 hover:bg-black/60 transition"
                disabled={playingIndex === videos.length - 1}
              >
                <BiChevronDown />
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default VideoReels;
