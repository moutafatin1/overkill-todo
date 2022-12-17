import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function seed() {
  const user = await prisma.user.findUnique({
    where: {
      email: "moutafatin3@gmail.com",
    },
  });

  if (!user) throw new Error("User should exists to seed data");

  const task1 = await prisma.task.create({
    data: {
      text: "Do coding challenges",
      userId: user.id,
    },
  });
  const task2 = await prisma.task.create({
    data: {
      text: "Finish migrating this app",
      userId: user.id,
    },
  });
  const task3 = await prisma.task.create({
    data: {
      text: "Refactor this app",
      userId: user.id,
    },
  });
}

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
