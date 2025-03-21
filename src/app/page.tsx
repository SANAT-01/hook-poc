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
      { cache: "no-store" }
    );
    console.log(response);

    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    const hooks = data.data;

    const hookData = await Promise.all(
      hooks.map(async (hook: Hook) => {
        const hookId = hook.id;
        const hookResponse = await fetch(
          `https://api.develop.hookmusic.com/public/hooks/${hookId}`,
          { cache: "no-store" }
        );
        if (!hookResponse.ok) return null;

        const hookData = await hookResponse.json();
        return hookData.data.attributes;
      })
    );
    console.log(hookData);

    const validUrls = hookData.filter((url) => url !== null);

    return validUrls;
  } catch (error) {
    console.error("Error fetching signed video URLs:", error);
    return [];
  }
};

const page = async () => {
  const hookData = await fetchHooks();
  console.log(hookData);
  // const data = await new Promise<Item[]>((resolve) => {
  //   setTimeout(async () => {
  //     const response = await fetch(
  //       "https://67dc1dd21fd9e43fe477460e.mockapi.io/hook/hooks"
  //     );
  //     const result = await response.json();
  //     resolve(result as Item[]);
  //   }, 5000); // 5000 ms = 5 seconds delay
  // });

  // console.log("page.tsx", data);

  return (
    <div className="">
      {/* <Explore data={data ?? []} /> */}
      <VideoReels initialData={{ data: hookData }} />
    </div>
  );
};

export default page;
