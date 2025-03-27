import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  console.log(request.url, "my url");
  const url = searchParams.get("url"); // The URL of the resource being embedded
  //   const format = searchParams.get("format") || "json"; // Optional: json/xml (supporting only JSON for now)

  if (!url) {
    return NextResponse.json(
      { error: "Missing URL parameter" },
      { status: 400 }
    );
  }

  // Extracting ID from URL (assuming structure like: https://hookmusic.com/video/123)
  const videoId = url.split("/").pop();
  //   console.log("firstPart", videoId);

  // Fetch video details (mocking it here, replace with actual API call)
  const videoData = {
    id: videoId,
    title: "Sample Music Hook",
    author_name: "Hook Artist",
    author_url: "https://hookmusic.com/artist/hook-artist",
    type: "video",
    version: "1.0",
    provider_name: "Hook Music",
    provider_url: "https://hookmusic.com",
    thumbnail_url: "https://hookmusic.com/thumbnail.jpg",
    thumbnail_width: 640,
    thumbnail_height: 360,
    html: `<iframe width="560" height="315" src="${request.url.replace(
      "api/oembed?url=https://dev.media.hookmusic.com",
      "embed"
    )}" frameborder="0" allowfullscreen></iframe>`,
  };

  return NextResponse.json(videoData);
}
