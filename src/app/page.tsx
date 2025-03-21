import VideoReels from "@/components/VideoReels";
import { Hook } from "@/types/hooks";

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
};

const fetchHooks = async () => {
  try {
    const response = await fetch(
      "https://api.develop.hookmusic.com/public/explore/discover",
      { cache: "force-cache" } // This caches the data at build time (SSG)
    );

    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    const hooks = data.data;

    // Fetch signed video URLs in parallel
    const hookData = await Promise.all(
      hooks.map(async (hook: Hook) => {
        try {
          const hookId = hook.id;
          const hookResponse = await fetch(
            `https://api.develop.hookmusic.com/public/hooks/${hookId}`,
            { cache: "force-cache" } // Ensures fetched data is cached
          );

          if (!hookResponse.ok) return null;
          const hookData = await hookResponse.json();
          return hookData.data.attributes;
        } catch (error) {
          console.error(`Error fetching hook ${hook.id}:`, error);
          return null;
        }
      })
    );

    return hookData.filter((url) => url !== null);
  } catch (error) {
    console.error("Error fetching signed video URLs:", error);
    return [];
  }
};

export default async function Home() {
  const videos = await fetchHooks();

  return (
    <div>
      <VideoReels initialData={{ data: videos }} />
    </div>
  );
}
