"use client"; // ✅ Mark as a client component

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then(() => console.log("Service Worker registered! 🎉"))
        .catch((error) =>
          console.error("Service Worker registration failed:", error)
        );
    }
  }, []);

  return null; // No UI needed, just runs the effect
}
