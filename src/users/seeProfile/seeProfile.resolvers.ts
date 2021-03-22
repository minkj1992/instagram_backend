import {ResolverPayload, Resolvers} from '../../types';

const seeProfile = async ({args, context}: ResolverPayload) => {
  const {username} = args;
  const {prisma} = context;
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
