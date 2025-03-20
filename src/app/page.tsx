import Explore from "@/components/Explore";

interface Item {
  id: string;
  title: string;
  audio: string;
  comments: number;
  createdAt: string;
  likes: number;
}

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
};

const page = async () => {
  // Delay the fetch call by 5 seconds using setTimeout
  const data = await new Promise<Item[]>((resolve) => {
    setTimeout(async () => {
      const response = await fetch(
        "https://67dc1dd21fd9e43fe477460e.mockapi.io/hook/hooks"
      );
      const result = await response.json();
      resolve(result as Item[]);
    }, 5000); // 5000 ms = 5 seconds delay
  });

  console.log("page.tsx", data);

  return (
    <div className="">
      <Explore data={data ?? []} />
    </div>
  );
};

export default page;
