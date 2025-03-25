"use client";
import { useEffect, useState } from "react";

export default function PWAInstallButton() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: any) => {
      event.preventDefault();
      setDeferredPrompt(event);
    };

    const checkIfInstalled = () => {
      if (window.matchMedia("(display-mode: standalone)").matches) {
        setIsInstalled(true);
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", () => setIsInstalled(true));
    checkIfInstalled();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  // const handleInstallClick = () => {
  //   if (deferredPrompt) {
  //     deferredPrompt.prompt();
  //     deferredPrompt.userChoice.then((choiceResult: any) => {
  //       if (choiceResult.outcome === "accepted") {
  //         console.log("User accepted the PWA install");
  //       }
  //       setDeferredPrompt(null);
  //     });
  //   }
  // };

  // return (
  //   !isInstalled &&
  //   deferredPrompt && (
  //     <button
  //       onClick={handleInstallClick}
  //       className="bg-blue-500 text-white px-4 py-2 rounded-md fixed bottom-4 right-4"
  //     >
  //       Download App
  //     </button>
  //   )
  // );
}
