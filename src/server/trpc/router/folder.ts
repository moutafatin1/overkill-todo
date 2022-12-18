import { protectedProcedure, router } from "../trpc";

export const folderRouter = router({
  all: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.folder.findMany({
      include: {
        List: true,
      },
    });
  }),
});
