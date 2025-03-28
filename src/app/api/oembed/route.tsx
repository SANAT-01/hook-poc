import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url"); // The URL of the resource being embedded
  //   const format = searchParams.get("format") || "json"; // Optional: json/xml (supporting only JSON for now)

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 }
    );
  }

  // Extracting ID from URL (assuming structure like: https://hookmusic.com/video/123)
  const videoId = url.split("/").pop()?.split("?")[0];
  console.log("firstPart", videoId);
  console.log(url);

  // Fetch video details (mocking it here, replace with actual API call)
  const videoData = {
    id: videoId,
    title: "Music Hook",
    author_name: "Hook Music Artist",
    author_url: "https://hookmusic.com",
    type: "video",
    version: "1.0",
    provider_name: "Hook Music",
    provider_url: "https://hook-poc.vercel.app",
    thumbnail_url: "https://hookmusic.com/thumbnail.jpg",
    thumbnail_width: 640,
    thumbnail_height: 360,
    html: `<iframe width="560" height="315" src="${
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://hook-poc.vercel.app"
    }/embed/${
      videoId?.split(".")[0]
    }" frameborder="0" allowfullscreen></iframe>`,
  };

  return NextResponse.json(videoData);
}
