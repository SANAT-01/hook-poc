import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Hook Music",
    short_name: "Hook",
    description: "Create your own music videos",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/hook-logo-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/hook-logo-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
