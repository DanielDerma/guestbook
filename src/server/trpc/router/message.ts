import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const messageRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  add: publicProcedure
    .input(
      z.object({
        text: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { text } = input;
      if (!ctx.session?.user?.id) {
        throw new Error("Not authenticated");
      }
      return ctx.prisma.message.create({
        data: {
          userId: ctx.session?.user?.id,
          text,
        },
      });
    }),
});
