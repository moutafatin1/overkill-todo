import { router } from "../trpc";
import { authRouter } from "./auth";
import { taskRouter } from "./task";

export const appRouter = router({
  auth: authRouter,
  task: taskRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
