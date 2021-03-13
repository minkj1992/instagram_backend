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
    movie: Movie
  }
  type Mutation {
    createMovie(title: String!, year: Int!, genre: String): Movie
    updateMovie(title: String!): Movie
  }
`;

const resolvers = {
  Query: {
    movies: () => prisma.movie.findMany(),
    movie: () => ({ title: "dummy movie", year: 2021 }),
  },
  Mutation: {
    createMovie: async (_, { title, year, genre }) => {
      return await prisma.movie.create({
        data: {
          title,
          year,
          genre,
        },
      });
    },

    updateMovie: (_, { title }) => {
      console.log(title);
      return true;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
