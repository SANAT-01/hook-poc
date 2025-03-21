import VideoReels from "@/components/VideoReels";
import { Hook } from "@/types/hooks";
// import https from "https";

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
};

const fetchHooks = async () => {
  try {
    // const isServer = typeof window === "undefined";
    // const agent = isServer
    //   ? new https.Agent({ rejectUnauthorized: false })
    //   : undefined;

    // First API call - get all hooks
    const response = await fetch(
      "https://api.develop.hookmusic.com/public/explore/discover?limit=10" // Added limit parameter
      // {
      //   cache: "no-store",
      //   ...(isServer && { agent }),
      // } as RequestInit
    );

    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    const hooks = data.data;

    // Use Promise.all for parallel fetching but limit concurrent requests
    const batchSize = 5; // Process 5 hooks at a time
    const hookData = [];

    for (let i = 0; i < hooks.length; i += batchSize) {
      const batch = hooks.slice(i, i + batchSize);
      const batchResults = await Promise.all(
        batch.map(async (hook: Hook) => {
          try {
            const hookId = hook.id;
            const hookResponse = await fetch(
              `https://api.develop.hookmusic.com/public/hooks/${hookId}`
              // {
              //   cache: "no-store",
              //   ...(isServer && { agent }),
              // } as RequestInit
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

      hookData.push(...batchResults);
    }

    const validUrls = hookData.filter((url) => url !== null);
    return validUrls;
  } catch (error) {
    console.error("Error fetching signed video URLs:", error);
    return [];
  }
};

const page = async () => {
  // Add loading state
  let hookData: Hook[] = [];

  try {
    hookData = await fetchHooks();
  } catch (error) {
    console.error("Error in page component:", error);
  }

  return (
    <div className="">
      <VideoReels
        initialData={{
          data: hookData,
        }}
      />
    </div>
  );
};

export default page;
