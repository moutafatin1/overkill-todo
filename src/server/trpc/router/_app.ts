import { router } from "../trpc";
import { authRouter } from "./auth";
import { folderRouter } from "./folder";
import { listRouter } from "./list";
import { taskRouter } from "./task";

export const appRouter = router({
  auth: authRouter,
  task: taskRouter,
  folder: folderRouter,
  list: listRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
