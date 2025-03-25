/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: {},
  },
  images: {
    domains: ["dev.media.hookmusic.com", "images.unsplash.com"], // Replace with your video/image CDN
    formats: ["image/avif", "image/webp"], // Optimized formats for better performance
  },
  typescript: {
    ignoreBuildErrors: false, // Prevents silent TypeScript errors
  },
  eslint: {
    ignoreDuringBuilds: true, // Avoids ESLint breaking the build
  },
  headers: async () => [
    {
      source: "/manifest.json",
      headers: [{ key: "Content-Type", value: "application/manifest+json" }],
    },
  ],
};

export default nextConfig;
