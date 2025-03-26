"use client";
import React, { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { MixpanelTracking } from "../../services/mixpanel";
import { faker } from "@faker-js/faker";

const DiscoverMore = ({ apiData }: { apiData: number[] }) => {
  const navigation = useRouter();
  const isInitialized = useRef(false); // Prevents duplicate execution

  const randomName = faker.person.fullName(); // Rowan Nikolaus
  const randomEmail = faker.internet.email(); // Kassandra.Haley@erich.biz
  const userId = faker.database.mongodbObjectId(); // 'e175cac316a79afdd0ad3afb'

  useEffect(() => {
    if (isInitialized.current) return; // Run only once
    isInitialized.current = true;
    const mixpanelInstance = MixpanelTracking.getInstance();

    // Identify user
    mixpanelInstance.identifyUser(userId, randomName, randomEmail);

    // Track page view
    mixpanelInstance.track("Page View", { page: "/discover" });
  }, [randomEmail, randomName, userId]);

  return (
    <>
      {apiData.length === 0 ? (
        <>
          <div className="items-center flex justify-between">Loading ....</div>
        </>
      ) : (
        <div className="h-screen overflow-y-auto ">
          <h2 className="p-5 bg-blue-50">Discover</h2>
          {/* Challenges */}
          <div className="flex overflow-x-auto space-x-3 px-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  onClick={() => {
                    navigation.push(`/discover/challenges-${item}`);
                  }}
                  className="cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[150px] items-center w-[400px] flex-shrink-0"
                >
                  <h2>Title</h2>
                  <div>Audio</div>
                  <div className="flex gap-2">
                    <div>Likes</div>
                    <div>Comments</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Trending Hooks */}
          <div className="flex justify-between px-5">
            <h3 className="">Trending Hooks</h3>
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigation.push(`/discover/trending-hook`);
              }}
            >
              More
            </span>
          </div>
          <div className="flex overflow-x-auto space-x-3 px-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  className="cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[400px] items-center w-[200px] flex-shrink-0"
                >
                  <h2>Title</h2>
                  <div>Audio</div>
                  <div className="flex gap-2">
                    <div>Likes</div>
                    <div>Comments</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Trending song to remix */}
          <div className="flex justify-between px-5">
            <h3 className="">Trending song to remix</h3>
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigation.push(`/discover/trending-song`);
              }}
            >
              More
            </span>
          </div>
          <div className="grid grid-cols-2 gap-x-1 p-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  className="cursor-pointer rounded-2xl bg-red-50 shadow-lg my-1 justify-center flex py-4 items-center"
                >
                  <h2>Title</h2>
                  <div>Audio</div>
                </div>
              );
            })}
          </div>
          {/* Hook LeaderBoard */}
          <div className="flex justify-between px-5">
            <h3 className="">Hook LeaderBoard</h3>
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigation.push(`/discover/hook-leaderboard`);
              }}
            >
              More
            </span>
          </div>
          <div className="flex overflow-x-auto space-x-3 px-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  className="cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[200px] items-center w-[200px] flex-shrink-0"
                >
                  <h2>Title</h2>
                  <div>Audio</div>
                  <div className="flex gap-2">
                    <div>Likes</div>
                    <div>Comments</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Top Filters */}
          <div className="flex justify-between px-5">
            <h3 className="">Top Filters</h3>
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigation.push(`/discover/top-filters`);
              }}
            >
              More
            </span>
          </div>
          <div className="flex overflow-x-auto space-x-3 px-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  className="cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[200px] items-center w-[200px] flex-shrink-0"
                >
                  <h2>Title</h2>
                  <div>Audio</div>
                  <div className="flex gap-2">
                    <div>Likes</div>
                    <div>Comments</div>
                  </div>
                </div>
              );
            })}
          </div>
          {/* Top Mashups */}{" "}
          <div className="flex justify-between px-5">
            <h3 className="">Top Mashups</h3>
            <span
              className="text-blue-600 cursor-pointer"
              onClick={() => {
                navigation.push(`/discover/top-mashups`);
              }}
            >
              More
            </span>
          </div>
          <div className="flex overflow-x-auto space-x-3 px-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  className="cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[400px] items-center w-[200px] flex-shrink-0"
                >
                  <h2>Title</h2>
                  <div>Audio</div>
                  <div className="flex gap-2">
                    <div>Likes</div>
                    <div>Comments</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default DiscoverMore;
