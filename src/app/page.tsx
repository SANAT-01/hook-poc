import Explore from "@/components/Explore";

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
};

const page = async () => {
  const hooks = await fetch(
    "https://67dc1dd21fd9e43fe477460e.mockapi.io/hook/hooks"
    // {
    //   cache: "no-cache",
    // }
  );
  const data = await hooks.json();
  console.log("page.tsx", data);
  return (
    <div className="">
      <Explore data={data ?? []} />
    </div>
  );
};

export default page;
