"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const SideBar = () => {
  const navigator = useRouter();
  const pathname = usePathname();
  console.log(pathname);

  return (
    <div className="flex flex-col justify-between h-screen bg-gray-200 space-y-3 py-10 px-10">
      <div className="space-y-5">
        <div className="py-4">
          <h1 className="text-4xl">Hooks</h1>
        </div>
        <div>
          <h3
            className={`cursor-pointer ${
              pathname === "/" ? "text-blue-500" : ""
            }`}
            onClick={() => {
              navigator.push("/");
            }}
          >
            Explore
          </h3>
        </div>
        <div>
          <h3
            className={`cursor-pointer ${
              pathname === "/discover" ? "text-blue-500" : ""
            }`}
            onClick={() => {
              navigator.push("/discover");
            }}
          >
            Discover
          </h3>
        </div>
      </div>
      <div className="py-10 flex flex-col space-y-3 text-sm">
        <span>Company</span>
        <span>About . Privacy . Terms</span>
      </div>
    </div>
  );
};

export default SideBar;
