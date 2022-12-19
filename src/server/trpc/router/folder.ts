import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const folderRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.folder.findMany({
      include: {
        List: true,
      },
    });
  }),
  new: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "folder name is required"),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.folder.create({
        data: {
          name: input.name,
          userId: ctx.session.user.id,
        },
      });
    }),
  deleteById: protectedProcedure
    .input(z.string())
    .mutation(({ ctx, input }) => {
      return ctx.prisma.folder.delete({
        where: {
          id: input,
        },
      });
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string().optional(),
      })
    )
    .mutation(({ ctx, input }) => {
      return ctx.prisma.folder.update({
        data: {
          name: input.name,
        },
        where: {
          id: input.id,
        },
      });
    }),
});
