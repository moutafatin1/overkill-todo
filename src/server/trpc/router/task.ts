import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import { newTaskSchema } from "./../../../schema/task/newTaskSchema";

export const taskRouter = router({
  all: protectedProcedure
    .input(
      z
        .object({
          filter: z
            .union([
              z.literal("all"),
              z.literal("completed"),
              z.literal("active"),
            ])
            .optional(),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      const filter = input?.filter ?? "all";
      return ctx.prisma.task.findMany({
        where: {
          userId: ctx.session.user.id,
          ...{
            completed:
              filter === "completed"
                ? true
                : filter === "active"
                ? false
                : undefined,
          },
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
