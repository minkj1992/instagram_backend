require("dotenv").config();
import { ApolloServer } from "apollo-server";
import prisma from "./prisma";
import schema from "./schema";
import { getUserId } from "./utils";

const server = new ApolloServer({
  schema,
  context: ({ req }) => ({
    ...req,
    prisma,
    userId: req && req.headers.authorization ? getUserId(req) : null,
  }),
});

const PORT = process.env.PORT || 4000;

server
  .listen(PORT)
  .then(({ url }) => console.log(`Server is running on ${url}`));
