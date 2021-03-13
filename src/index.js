import { ApolloServer } from "apollo-server";
import prisma from "./prisma";
import schema from "./schema";

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
