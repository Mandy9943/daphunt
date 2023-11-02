import { cache } from "react";
import prisma from "../utils/prisma";
import Dashboard from "./ClientPage";

export const revalidate = 300; // revalidate the data at most every 5 min

const getAllAngels = cache(async () => {
  const data = await prisma.project.findMany({
    include: {
      _count: {
        select: {
          votedUp: true,
        },
      },
    },
  });
  return data;
});

export default async function HomePage() {
  console.log("loading");

  const data = await getAllAngels();
  console.log("finish loading");
  // const data = [];
  return <Dashboard data={data} />;
}
