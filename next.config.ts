import withPWAInit from "@ducanh2912/next-pwa";

const withPWA = withPWAInit({
  dest: "public",
});

export default withPWA({
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ["dev.media.hookmusic.com", "images.unsplash.com"], // Replace with your video/image CDN
    formats: ["image/avif", "image/webp"], // Optimized formats for better performance
  },
  headers: async () => [
    {
      source: "/manifest.json",
      headers: [{ key: "Content-Type", value: "application/manifest+json" }],
    },
  ],
});
