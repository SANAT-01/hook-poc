"use client";
import React, { useState } from "react";

const SelectionMore = () => {
  const [apiData, setApiData] = useState<number[]>([]);
  React.useEffect(() => {
    const fetchData = async () => {
      const result = await new Promise<number[]>((resolve) => {
        setTimeout(async () => {
          const result = [1, 2, 3, 4, 5];
          resolve(result as number[]);
        }, 5000); // 5000 ms = 5 seconds delay
      });
      setApiData(result);
    };
    fetchData();
  }, []);

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
        </div>
      )}
    </>
  );
};

export default SelectionMore;
