import EmbedPage from "@/components/EmbedPage";
import { Metadata } from "next/types";

const fetchHookData = async (hookId: string) => {
  try {
    const response = await fetch(
      `https://api.develop.hookmusic.com/public/hooks/${hookId}`,
      { cache: "no-store" } // Ensures metadata is fresh on each request
    );

    if (!response.ok) return null;
    const json = await response.json();
    return json?.data?.attributes || null;
  } catch (error) {
    console.error(`Error fetching hook ${hookId}:`, error);
    return null;
  }
};
interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  // Fetch hook data based on the ID
  const hookData = await fetchHookData(id);

  // If no data is found, return default metadata
  if (!hookData) {
    return {
      title: "Checkout this Hook",
      description: "Learn how people are creating their own video music",
    };
  }

  // Use the hook data to create dynamic metadata
  const title = hookData.title || "Checkout this new video!";
  const description =
    hookData.description ||
    "Learn how people are creating their own video music";
  const imageUrl = hookData.thumbnailUrl;
  console.log(hookData, title, description, imageUrl);
  return {
    title,
    description,
    openGraph: {
      title: `Hook Music - ${title}`,
      description,
      url: `https://hookmusic.com/hook/${id}`,
      siteName: "Hook Music - Video Music",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: "Hook Music Preview",
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
    },
  };
}

export default async function ShowEmbed({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  console.log(id);
  return (
    <>
      <div className="h-screen overflow-y-auto">
        <EmbedPage />
      </div>
    </>
  );
}
