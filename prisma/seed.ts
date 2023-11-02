import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const defaultBlockchain = "Multiversx";

  await prisma.blockChain.upsert({
    create: {
      name: defaultBlockchain,
    },
    update: {},
    where: {
      name: defaultBlockchain,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
