import VideoReels from "@/components/VideoReels";
import { Hook } from "@/types/hooks";

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
};

const fetchHooks = async () => {
  try {
    // Fetch initial hooks list
    const response = await fetch(
      "https://api.develop.hookmusic.com/public/explore/discover",
      { cache: "no-store" } // Forces SSR
      // { cache: "force-cache" } // This caches the data at build time (SSG)
    );

    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    const hooks = data.data.slice(0, 15);

    // Fetch all hook details in parallel using `Promise.all`
    const hookDataPromises = hooks.map((hook: Hook) =>
      fetch(
        `https://api.develop.hookmusic.com/public/hooks/${hook.id}`,
        { cache: "no-store" } // { cache: "force-cache" } // This caches the data at build time (SSG)
      )
        .then((res) => (res.ok ? res.json() : null))
        .then((json) => json?.data.attributes || null)
        .catch((error) => {
          console.error(`Error fetching hook ${hook.id}:`, error);
          return null;
        })
    );

    const hookData = await Promise.all(hookDataPromises);

    return hookData.filter((url) => url !== null);
  } catch (error) {
    console.error("Error fetching signed video URLs:", error);
    return [];
  }
};

export default async function Home() {
  const videos = await fetchHooks();
  // console.log(videos);

  return (
    <div className="main">
      <VideoReels initialData={{ data: videos }} />
    </div>
  );
}
