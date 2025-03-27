import DiscoverMore from "@/components/Discover";

export const metadata = {
  title: "Hook Music - Discover",
  description: "Discover and create your own video music",
};

const Discover = async () => {
  const apiData = await new Promise<number[]>((resolve) => {
    setTimeout(async () => {
      const result = [1, 2, 3, 4, 5, 6, 7, 8];
      resolve(result as number[]);
    }, 5000); // 5000 ms = 5 seconds delay
  });

  // console.log(apiData);

  return (
    <div>
      <DiscoverMore apiData={apiData} />
    </div>
  );
};

export default Discover;
