"use client";

import React from "react";
import { useRouter, usePathname } from "next/navigation";

const SideBar = () => {
  const navigator = useRouter();
  const pathname = usePathname();

  return (
    <>
      <div className="hidden sm:block">
        <div className="flex flex-col justify-between h-screen bg-gray-200 space-y-3 py-10 px-5 ">
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
                  pathname.includes("/discover") ? "text-blue-500" : ""
                }`}
                onClick={() => {
                  navigator.push("/discover");
                }}
              >
                Discover
              </h3>
            </div>
          </div>
          <div className="py-3 flex flex-col text-sm">
            <span>Company</span>
            <span className="text-gray-500 pt-3">About • Privacy • Terms</span>
            <span className="text-gray-500 pt-5">&copy; 2025 Hook Music</span>
          </div>
        </div>
      </div>
      <div className="flex sm:hidden gap-4 p-3 bg-gray-200 w-full">
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
              pathname.includes("/discover") ? "text-blue-500" : ""
            }`}
            onClick={() => {
              navigator.push("/discover");
            }}
          >
            Discover
          </h3>
        </div>
      </div>
    </>
  );
};

export default SideBar;
