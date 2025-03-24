import PersonalInfo from "@/components/Personal";
import { Hook } from "@/types/hooks";

export const metadata = {
  title: "Hook Music - Personal",
  description: "Make changes and create your own video music",
};

const fetchHooks = async (): Promise<Hook[]> => {
  try {
    const response = await fetch(
      "https://api.develop.hookmusic.com/public/explore/discover",
      { cache: "no-store" } // Forces SSR
    );

    if (!response.ok) throw new Error("Failed to fetch videos");

    const data = await response.json();
    return data.data.slice(0, 12);
  } catch (error) {
    console.error("Error fetching hooks:", error);
    return [];
  }
};

export default async function PersonalPage() {
  const hooks = await fetchHooks(); // Fetching on the server
  console.log(hooks);

  return (
    <div>
      <PersonalInfo initialData={hooks} />
    </div>
  );
}
