import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SideBar from "@/components/SideBar";
import ServiceWorkerRegister from "@/components/service"; // ✅ Import the client component
//
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Fix: Correct manifest path
export const metadata: Metadata = {
  title: "Hook Music - PWA",
  description: "Create your own video music",
  manifest: "/manifest.json",
};

export const viewport = {
  themeColor: "#000000", // ✅ Correct placement
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ServiceWorkerRegister />
        {/* ✅ Client component for service worker registration */}
        <div className="grid grid-cols-9 sm:grid-cols-12">
          <div className="col-span-9 sm:col-span-3">
            <SideBar />
          </div>
          <div className="col-span-9">{children}</div>
        </div>
        {/* <div>
          <PWAInstallButton />
        </div> */}
      </body>
    </html>
  );
}
