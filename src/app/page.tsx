import Explore from "@/components/Explore";

export const metadata = {
  title: "Hook Music",
  description: "Create your own video music",
};

const page = async () => {
  const hooks = await fetch(
    "http://localhost:3000/api/hooks"
    // {
    //   cache: "no-cache",
    // }
  );
  const data = await hooks.json();
  console.log("page.tsx", data);
  return (
    <div className="">
      <Explore data={data.data} />
    </div>
  );
};

export default page;
