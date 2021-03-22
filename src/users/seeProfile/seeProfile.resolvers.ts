export default {
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
