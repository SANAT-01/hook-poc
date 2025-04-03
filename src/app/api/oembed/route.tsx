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

  const videoId = url.split("/").pop()?.split("?")[0];

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
    thumbnail_width: 350,
    thumbnail_height: 500,
    html: `
      <blockquote class="hookmusic-embed" data-embed-id="${videoId}">
        <a href="https://hookmusic.com/video/${videoId}">Watch on Hook Music</a>
        <br /> by <a href="https://hookmusic.com">Hook Music</a>
      </blockquote>
      <script async src="${
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://hook-poc.vercel.app"
      }/embed-sdk.js"></script>
    `,
  };

  return NextResponse.json(videoData);
}
