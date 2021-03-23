import {ResolverPayload, Resolvers} from '../../types';

const seeProfile = async (...payload: ResolverPayload) => {
  const [_, {username}, {prisma}] = payload;
  return await prisma.user.findUnique({
    where: {
      username,
    },
  });
};

const resolvers: Resolvers = {
  Query: {
    seeProfile,
  },
};

export default resolvers;
