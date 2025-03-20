"use client";
import { useEffect } from "react";
import React from "react";

interface Item {
  id: string;
  title: string;
  audio: string;
  comments: number;
  createdAt: string;
  likes: number;
}

// Define the type for the data prop
interface ExploreProps {
  data: Item[];
}

const Explore = ({ data }: ExploreProps) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (count > 3) setCount(0);
  }, [count]);

  return (
    <>
      {data.length === 0 ? (
        <>
          <div className="items-center flex justify-between">Loading ....</div>
        </>
      ) : (
        <div className="p-5 h-screen overflow-auto">
          <div className="flex flex-col justify-center items-center">
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => {}}
                  className="p-5 cursor-pointer rounded-2xl bg-red-50 shadow-lg space-y-2 my-3 justify-center flex flex-col h-[150px] items-center w-[500px]"
                >
                  <h2>{item.title}</h2>
                  <div>{item.audio}</div>
                  <div className="flex gap-2">
                    <div>{item.likes}</div>
                    <div>{item.comments}</div>
                    <div>{item.createdAt}</div>
                    <div
                      className="bg-blue-100 px-2 rounded-2xl"
                      onClick={() => {
                        setCount(count + 1);
                      }}
                    >
                      {count}
                    </div>
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

export default Explore;
