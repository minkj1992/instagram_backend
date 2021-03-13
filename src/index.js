import { ApolloServer } from "apollo-server";
import { gql } from "apollo-server";
import fs from "fs";
import path from "path";

import prisma from "./prisma";
import resolvers from "./resolvers";

const graphqlSchema = fs.readFileSync(
  path.join(__dirname, "schema.graphql"),
  "utf8"
);

const server = new ApolloServer({
  typeDefs: gql`
    ${graphqlSchema}
  `,
  resolvers,
  context: ({ req }) => ({
    ...req,
    prisma,
  }),
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
