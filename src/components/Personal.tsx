"use client";
import { Hook } from "@/types/hooks";
import React, { useState } from "react";

const PersonalInfo = ({ initialData }: { initialData: Hook[] }) => {
  const [apiData] = useState<Hook[]>(initialData);

  return (
    <div className="h-screen overflow-y-auto">
      <h2 className="p-5 bg-blue-50">My Hooks</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 px-5 py-3">
        {apiData.map((item: Hook) => (
          <div
            key={item.id}
            className="cursor-pointer rounded-2xl bg-red-50 shadow-lg justify-center flex py-4 items-center h-[400px]"
          >
            <img
              src={item.thumbnailUrl}
              alt="Hooks-thumbnail"
              className="w-fit h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PersonalInfo;
