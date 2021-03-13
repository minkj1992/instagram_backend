export default {
  movies: async (_, __, { prisma }) => await prisma.movie.findMany(),
  movie: async (_, { id }, { prisma }) =>
    await prisma.movie.findUnique({ where: { id } }),
};
