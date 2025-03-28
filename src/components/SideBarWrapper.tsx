"use client";

import { usePathname } from "next/navigation";
import SideBar from "@/components/SideBar";
import React from "react";

export default function SideBarWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isEmbedPage = pathname.startsWith("/embed");

  if (isEmbedPage) {
    return <>{children}</>;
  }

  return (
    <div className="grid grid-cols-9 sm:grid-cols-12">
      <div className="col-span-9 sm:col-span-3">
        <SideBar />
      </div>
      <div className="col-span-9 sm:col-span-9">{children}</div>
    </div>
  );
}
