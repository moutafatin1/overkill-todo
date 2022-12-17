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
            .optional()
            .default("all"),
        })
        .optional()
    )
    .query(({ ctx, input }) => {
      return ctx.prisma.task.findMany({
        where: {
          userId: ctx.session.user.id,
          completed:
            input?.filter === "completed"
              ? true
              : input?.filter === "active"
              ? false
              : undefined,
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
