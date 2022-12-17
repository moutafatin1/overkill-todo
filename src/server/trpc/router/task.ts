import { protectedProcedure, router } from "../trpc";

export const taskRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
});
