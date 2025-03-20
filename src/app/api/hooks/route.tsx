import { NextResponse as res } from "next/server";

export const GET = async () => {
  const hooks = await fetch(
    "https://67dc1dd21fd9e43fe477460e.mockapi.io/hook/hooks",
    { cache: "no-cache" }
  );
  const data = await hooks.json();
  return res.json({ message: "Hello World!", data: data, success: true });
};
