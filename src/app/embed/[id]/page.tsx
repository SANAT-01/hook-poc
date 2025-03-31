import EmbedPage from "@/components/EmbedPage";

interface HookData {
  title: string;
  description: string;
  thumbnailUrl: string;
}

const fetchHookData = async (hookId: string): Promise<HookData | null> => {
  try {
    const response = await fetch(
      `https://api.develop.hookmusic.com/public/hooks/${hookId}`,
      { cache: "no-store" } // Ensure SSR
    );

    if (!response.ok) return null;
    const json = await response.json();
    return json?.data?.attributes || null;
  } catch (error) {
    console.error(`Error fetching hook ${hookId}:`, error);
    return null;
  }
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const hookData = await fetchHookData(params.id);
  const imageUrl = hookData?.thumbnailUrl;

  return {
    title: hookData?.title || "Checkout this new video!",
    description:
      hookData?.description ||
      "Learn how people are creating their own video music",
    openGraph: {
      title: hookData?.title || "Hook Music - Checkout this new video!",
      description:
        hookData?.description || "Experience the best music creation platform.",
      url: imageUrl,
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
      title: hookData?.title || "Checkout this new video!",
      description:
        hookData?.description ||
        "Learn how people are creating their own video music",
      images: [imageUrl], // Dynamic Twitter preview image
    },
  };
}

export default async function ShowEmbed({
  params,
}: {
  params: { id: string };
}) {
  const hookData = await fetchHookData(params.id);
  console.log(hookData);

  return (
    <div className="h-screen overflow-y-auto">
      <EmbedPage />
    </div>
  );
}
