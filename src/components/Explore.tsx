"use client";
import Image from "next/image";
import image from "@/assets/images.jpg";
import { useEffect } from "react";
import React from "react";

const Explore = ({ data }: { data: unknown }) => {
  const [count, setCount] = React.useState(0);

  useEffect(() => {
    if (count > 3) setCount(0);
  }, [count]);
  // console.log(data);
  return (
    <div className="p-5 h-screen overflow-auto">
      <div className="flex flex-col justify-center items-center">
        {data.map(
          (item: {
            id: string;
            title: string;
            audio: string;
            comments: number;
            createdAt: string;
            likes: number;
          }) => {
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

                {/* <Image
                src={image}
                width={1000}
                height={500}
                alt="Picture of the author"
              /> */}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Explore;
