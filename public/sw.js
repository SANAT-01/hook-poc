importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.5.3/workbox-sw.js"
);

if (workbox) {
  console.log("Workbox is loaded 🎉");

  // Skip waiting and claim clients immediately
  self.addEventListener("install", () => self.skipWaiting());
  self.addEventListener("activate", () => self.clients.claim());

  // Precaching (Cache homepage and manifest)
  workbox.precaching.precacheAndRoute([
    { url: "/", revision: null },
    { url: "/manifest.json", revision: null },
    { url: "/logo.png", revision: null },
  ]);

  // Cache API responses
  workbox.routing.registerRoute(
    ({ url }) =>
      url.origin === self.location.origin && url.pathname.startsWith("/api/"),
    new workbox.strategies.NetworkFirst({
      cacheName: "api-cache",
      networkTimeoutSeconds: 10,
    })
  );

  // Cache static assets (JS, CSS, images)
  workbox.routing.registerRoute(
    ({ request }) =>
      request.destination === "style" ||
      request.destination === "script" ||
      request.destination === "image",
    new workbox.strategies.StaleWhileRevalidate({
      cacheName: "static-assets",
      plugins: [
        new workbox.expiration.ExpirationPlugin({
          maxEntries: 50,
          maxAgeSeconds: 86400,
        }),
      ],
    })
  );

  // Offline fallback
  workbox.routing.setCatchHandler(({ event }) => {
    if (event.request.destination === "document") {
      return caches.match("/");
    }
    return Response.error();
  });
} else {
  console.log("Workbox failed to load");
}
