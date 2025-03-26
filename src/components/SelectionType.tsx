"use client";
import { User } from "@/types/hooks";
import React, { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { MixpanelTracking } from "../../services/mixpanel";
import { faker } from "@faker-js/faker";

const SelectionMore = ({ apiData }: { apiData: User[] }) => {
  const pathname = usePathname();

  console.log(apiData);

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
    mixpanelInstance.track("Page View", { page: pathname });
  }, [pathname, randomEmail, randomName, userId]);

  return (
    <>
      {apiData.length === 0 ? (
        <>
          <div className="items-center flex justify-between">Loading ....</div>
        </>
      ) : (
        <>
          <div className="h-screen overflow-y-auto ">
            <h2 className="p-5 bg-blue-50">
              {pathname.split("/").slice(-1).join().replaceAll("-", " ")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-5 py-3">
              {apiData.map((item: User) => {
                return (
                  <div
                    key={item.id}
                    className="cursor-pointer rounded-2xl bg-red-50 shadow-lg justify-center flex py-4 items-center h-[400px]"
                  >
                    <Image
                      src={item.attributes.thumbnailUrl}
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

export default SelectionMore;
