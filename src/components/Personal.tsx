"use client";
import { Hook } from "@/types/hooks";
import React, { useEffect, useState } from "react";
import Image from "next/image";

const PersonalInfo = () => {
  const [apiData, setApiData] = useState<Hook[]>([]);

  useEffect(() => {
    const fetchHooks = async () => {
      try {
        const response = await fetch(
          "https://api.develop.hookmusic.com/public/explore/discover",
          { cache: "force-cache" } // This caches the data at build time (SSG)
        );

        if (!response.ok) throw new Error("Failed to fetch videos");

        const data = await response.json();
        const hooks = data.data.slice(0, 12); // because otherwise all 20 data will be there

        // Fetch signed video URLs in parallel
        const hookData = await Promise.all(
          hooks.map(async (hook: Hook) => {
            try {
              const hookId = hook.id;
              const hookResponse = await fetch(
                `https://api.develop.hookmusic.com/public/hooks/${hookId}`,
                { cache: "force-cache" } // Ensures fetched data is cached
              );

              if (!hookResponse.ok) return null;
              const hookData = await hookResponse.json();
              return hookData.data.attributes;
            } catch (error) {
              console.error(`Error fetching hook ${hook.id}:`, error);
              return null;
            }
          })
        );

        const timer = setTimeout(() => {
          setApiData(hookData.filter((url) => url !== null)); // Filter and set apiData
        }, 3000); // Wait 3000ms (3 seconds)

        // Cleanup timeout if component is unmounted before the timeout completes
        return () => clearTimeout(timer);
      } catch (error) {
        console.error("Error fetching signed video URLs:", error);
        return [];
      }
    };
    fetchHooks();
  }, []);

  console.log(apiData);

  return (
    <>
      {apiData.length === 0 ? (
        <>
          <div className="items-center flex justify-between">Loading ....</div>
        </>
      ) : (
        <>
          <div className="h-screen overflow-y-auto ">
            <h2 className="p-5 bg-blue-50">My Hooks</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-5 py-3">
              {apiData.map((item: Hook) => {
                return (
                  <div
                    key={item.id}
                    className="cursor-pointer rounded-2xl bg-red-50 shadow-lg justify-center flex py-4 items-center h-[400px]"
                  >
                    <Image
                      src={item.thumbnailUrl}
                      alt={"Hooks-thumbnails"}
                      layout="intrinsic"
                      width={200}
                      height={200}
                      className="w-fit h-full"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default PersonalInfo;
