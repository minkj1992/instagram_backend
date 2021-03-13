import { ApolloServer, gql } from "apollo-server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const typeDefs = gql`
  type Movie {
    id: Int!
    title: String!
    year: Int!
    genre: String
    createdAt: String!
    updatedAt: String!
  }
  type Query {
    movies: [Movie]
    movie(id: Int!): Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    updateMovie(id: Int!, title: String, year: Int, genre: String): Movie
    deleteMovie(id: Int!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => prisma.movie.findMany(),
    movie: (id) => prisma.movie.findUnique({ where: { id } }),
  },
  Mutation: {
    createMovie: async (_, { ...data }) => await prisma.movie.create({ data }),
    updateMovie: async (_, { id, ...data }) =>
      await prisma.movie.update({ where: { id }, data }),
    deleteMovie: async (_, { id }) =>
      await prisma.movie.delete({ where: { id } }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
