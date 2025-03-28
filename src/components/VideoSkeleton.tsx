import React from "react";

const VideoSkeleton = () => {
  return (
    <div className="relative w-full h-full bg-gray-800 rounded-3xl overflow-hidden">
      {/* Background with pulse animation */}
      <div className="absolute inset-0 bg-gray-700 animate-pulse duration-2000" />

      {/* Slower shimmer effect */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
        style={{
          animation: "shimmer 3s infinite",
          backgroundSize: "200% 100%",
        }}
      />

      {/* Centered loading spinner */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-16 h-16 rounded-full border-4 border-l-transparent border-t-white border-r-white/30 border-b-white/20 animate-spin duration-2000" />
      </div>
    </div>
  );
};

export default VideoSkeleton;
