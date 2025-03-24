import SelectionMore from "@/components/SelectionType";
import { User } from "@/types/hooks";

export const metadata = {
  title: "Hook Music - Discover- Selection Type",
  description: "Make changes and create your own video music",
};

const fetchHooks = async () => {
  try {
    const response = await fetch(
      "https://api.develop.hookmusic.com/public/explore/discover"
    );
    if (!response.ok) throw new Error("Failed to fetch videos");
    const data = await response.json();
    return data.data.slice(0, 10); // Limit to 10 items
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};

// Generate static paths for dynamic pages in SSG
export const generateStaticParams = async () => {
  // Here, you would fetch or define the types you want to statically generate
  const types = [
    "top-filters",
    "hook-leaderboard",
    "trending-song",
    "trending-hook",
    "top-mashups",
  ];
  return types.map((type) => ({ type })); // Generate the params for each type
};

const SelectionType = async () => {
  const videos: User[] = await new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchHooks();
      resolve(data);
    }, 5000); // 3-second delay
  });

  console.log("videos", videos);
  return (
    <div>
      <SelectionMore apiData={videos} />
    </div>
  );
};

export default SelectionType;
