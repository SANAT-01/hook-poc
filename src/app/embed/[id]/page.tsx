import EmbedPage from "@/components/EmbedPage";

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
  openGraph: {
    title: "Hook Music - Create Your Own Video Music",
    description: "Experience the best music creation platform with Hook Music.",
    url: "https://yourdomain.com/show-embed",
    siteName: "Hook Music",
    images: [
      {
        url: "https://yourdomain.com/preview-image.jpg", // Ensure this image exists
        width: 1200,
        height: 630,
        alt: "Hook Music Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hook Music",
    description: "Create your own video music",
    images: ["https://yourdomain.com/preview-image.jpg"], // Twitter preview image
  },
};

export default async function ShowEmbed() {
  return (
    <>
      <div className="h-screen overflow-y-auto">
        <EmbedPage />
      </div>
    </>
  );
}
