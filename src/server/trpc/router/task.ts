import { protectedProcedure, router } from "../trpc";
import { newTaskSchema } from "./../../../schema/task/newTaskSchema";

export const taskRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.task.findMany({
      where: {
        userId: ctx.session.user.id,
      },
    });
  }),
  new: protectedProcedure.input(newTaskSchema).mutation(({ ctx, input }) => {
    return ctx.prisma.task.create({
      data: {
        text: input.text,
        userId: ctx.session.user.id,
      },
    });
  }),
});
