"use client";
import { Hook } from "@/types/hooks";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

const SelectionMore = ({ apiData }: { apiData: Hook[] }) => {
  const pathname = usePathname();

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
            <h2 className="p-5 bg-blue-50">
              {pathname.split("/").slice(-1).join().replaceAll("-", " ")}
            </h2>

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

export default SelectionMore;
