import { cache } from "react";
import prisma from "../utils/prisma";
import Dashboard from "./ClientPage";

export const revalidate = 86400; // revalidate the data at most every 24 hours

const getAllAngels = cache(async () => {
  const data = await prisma.project.findMany({});
  return data;
});

export default async function HomePage() {
  console.log("loading");

  // const data = await getAllAngels();
  console.log("finish loading");
  const data = [];
  return <Dashboard data={data} />;
}
