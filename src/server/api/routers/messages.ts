import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { z } from "zod";

export const messagesRouter = createTRPCRouter({
  getAllMessages: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.messages.findMany({
      orderBy: [
        {
          id: "desc",
        },
      ],
    });
  }),

  sendMessage: protectedProcedure
    .input(z.object({ message: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { message } = input;

      return ctx.db.messages.create({
        data: {
          message,
          createdBy: ctx.session.user.id,
        },
      });
    }),

  markRead: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.messages.updateMany({
      where: {
        seen: false,
      },
      data: {
        seen: true,
      },
    });
  }),
});
