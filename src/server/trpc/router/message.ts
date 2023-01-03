import { z } from "zod";

import { router, publicProcedure, protectedProcedure } from "../trpc";

export const messageRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.message.findMany();
  }),
  add: protectedProcedure
    .input(
      z.object({
        text: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { text } = input;
      if (!ctx.session?.user?.id || !ctx.session?.user?.name) {
        throw new Error("Not authenticated");
      }
      return ctx.prisma.message.create({
        data: {
          displayName: ctx.session?.user?.name,
          userId: ctx.session?.user?.id,
          text,
        },
      });
    }),
  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().min(1),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input;
      return ctx.prisma.message.delete({
        where: {
          id,
        },
      });
    }),
});
