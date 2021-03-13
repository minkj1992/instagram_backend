import movieQueries from "./movies/movies.queries";
import movieMutations from "./movies/movies.mutations";

const resolvers = {
  Query: movieQueries,
  Mutation: movieMutations,
};

export default resolvers;
