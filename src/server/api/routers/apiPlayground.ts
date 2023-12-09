import { v4 as uuidv4 } from "uuid";
import {
  apiKeyProtectedProcedure,
  createTRPCRouter,
  protectedProcedure,
} from "@/server/api/trpc";

export const apiPlaygroundRouter = createTRPCRouter({
  createApiKey: protectedProcedure.mutation(async ({ ctx }) => {
    const randomUUID = uuidv4();

    const date = new Date();
    date.setDate(date.getDate() + 5);

    await ctx.db.apiKey.create({
      data: {
        key: randomUUID,
        expires: date,
        createdBy: ctx.session.user.id,
      },
    });

    return randomUUID;
  }),

  apiKeyTest: apiKeyProtectedProcedure.query(({ ctx }) => {
    return `Your API key is working. Api Key is ${ctx.apiKey}`;
  }),
});
