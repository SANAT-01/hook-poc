"use client";
import React, { useEffect, useState } from "react";

const data = [1, 2, 3, 4, 5];

const DiscoverMore = () => {
  const [apiData, setApiData] = useState<number[]>([]);

  useEffect(() => {
    setTimeout(async () => {
      setApiData(data);
    }, 5000);
  }, []);

  console.log(apiData);

  return (
    <>
      {apiData.length === 0 ? (
        <>
          <div className="items-center flex justify-between">Loading ....</div>
        </>
      ) : (
        <div className="h-screen overflow-auto">
          <h2 className="p-5 bg-blue-50">Discover</h2>
          <div className="flex overflow-y-auto space-x-3 px-3">
            {apiData.map((item) => {
              return (
                <div
                  key={item}
                  className="p-5 cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[150px] items-center w-[500px]"
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
          <div className="p-5">
            <div className="flex flex-col justify-center items-center">
              {apiData.map((item) => {
                return (
                  <div
                    key={item}
                    className="p-5 cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[150px] items-center w-[500px]"
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
        </div>
      )}
    </>
  );
};

export default DiscoverMore;
