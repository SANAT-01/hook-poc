import { NextResponse as res } from "next/server";

export const GET = () => {
  return res.json({ message: "Welcome to login", success: true });
};
