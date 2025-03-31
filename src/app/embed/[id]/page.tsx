import EmbedPage from "@/components/EmbedPage";

export const metadata = {
  title: "Checkout this new video!",
  description: "Learn how people are creating their own video music",
  openGraph: {
    title: "Hook Music - Checkout this new video!",
    description: "Experience the best music creation platform with Hook Music.",
    url: "https://dev.media.hookmusic.com/hook_1296e219-7486-4183-8849-53ebf0f92968.jpg",
    siteName: "Hook Music - Vieo Music",
    images: [
      {
        url: "https://dev.media.hookmusic.com/hook_1296e219-7486-4183-8849-53ebf0f92968.jpg", // Ensure this image exists
        width: 1200,
        height: 630,
        alt: "Hook Music Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Checkout this new video!",
    description: "Learn how people are creating their own video music",
    images: [
      "https://dev.media.hookmusic.com/hook_1296e219-7486-4183-8849-53ebf0f92968.jpg",
    ], // Twitter preview image
  },
};

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
