import { Resolvers } from "../../types";

const resolvers: Resolvers = {
  Query: {
    seeProfile: async (_, { username }, { prisma }) => {
      return await prisma.user.findUnique({
        where: {
          username,
        },
      });
    },
  },
};

export default resolvers;
