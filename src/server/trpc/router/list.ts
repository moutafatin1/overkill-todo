import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const listRouter = router({
  new: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        folderId: z.string(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.list.create({
        data: {
          name: input.name,
          folderId: input.folderId,
          userId: ctx.session.user.id,
        },
      });
    }),

  delete: protectedProcedure.input(z.string()).mutation(({ ctx, input }) => {
    return ctx.prisma.list.delete({
      where: {
        id: input,
      },
    });
  }),
});
