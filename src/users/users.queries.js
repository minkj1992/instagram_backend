import { prisma } from "@prisma/client";

export default {
  Query: {
    account: (_, { username }, { prisma }) =>
      prisma.user.findUnique({
        where: {
          username,
        },
      }),
  },
};
