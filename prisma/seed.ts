import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
async function seed() {
  const user = await prisma.user.findUnique({
    where: {
      email: "moutafatin3@gmail.com",
    },
  });

  if (!user) throw new Error("User should exists to seed data");

  const programmingFolder = await prisma.folder.create({
    data: {
      name: "Programming",
      userId: user.id,
    },
  });
  const learningFolder = await prisma.folder.create({
    data: {
      name: "Learning",
      userId: user.id,
    },
  });
  const todoProjectList = await prisma.list.create({
    data: {
      name: "tasks app",
      userId: user.id,
      folderId: programmingFolder.id,
    },
  });
  const learningAIList = await prisma.list.create({
    data: {
      name: "learning AI",
      userId: user.id,
      folderId: learningFolder.id,
    },
  });
  const task1 = await prisma.task.create({
    data: {
      text: "Do coding challenges",
      userId: user.id,
      listId: todoProjectList.id,
    },
  });
  const task2 = await prisma.task.create({
    data: {
      text: "Finish migrating this app",
      userId: user.id,
      listId: todoProjectList.id,
    },
  });
  const task3 = await prisma.task.create({
    data: {
      text: "Refactor this app",
      userId: user.id,
      listId: todoProjectList.id,
    },
  });

  const task4 = await prisma.task.create({
    data: {
      text: "Starting getting an idea about AI",
      userId: user.id,
      listId: learningAIList.id,
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
