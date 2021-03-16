import path from "path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeResolvers, mergeTypeDefs } from "@graphql-tools/merge";
import { makeExecutableSchema } from "@graphql-tools/schema";

const loadedTypes = loadFilesSync(path.join(__dirname, "./**/*.typeDefs.js"));
const loadedResolvers = loadFilesSync(
  path.join(__dirname, "./**/*.resolvers.js")
);

const typeDefs = mergeTypeDefs(loadedTypes);
const resolvers = mergeResolvers(loadedResolvers);

const schema = makeExecutableSchema({ typeDefs, resolvers });

export default schema;
