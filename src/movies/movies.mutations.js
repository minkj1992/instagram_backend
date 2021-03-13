export default {
  Mutation: {
    createMovie: async (_, { ...data }, { prisma }) =>
      await prisma.movie.create({ data }),
    updateMovie: async (_, { id, ...data }, { prisma }) =>
      await prisma.movie.update({ where: { id }, data }),
    deleteMovie: async (_, { id }, { prisma }) =>
      await prisma.movie.delete({ where: { id } }),
  },
};
