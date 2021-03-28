import {Context, Resolvers} from '../../types';

const searchUsers = async (_, {keyword, cursor}, {prisma}: Context) => {
  const pageSize = 5;

  if (keyword.length < 1) {
    return {
      ok: false,
      error: 'You shold type keyword',
    };
  }
  console.log(keyword.toLowerCase());
  const users = await prisma.user.findMany({
    where: {
      username: {
        startsWith: keyword.toLowerCase(),
      },
    },
    take: pageSize,
    skip: cursor ? 1 : 0,
    ...(cursor && {cursor: {id: cursor}}),
  });
  return {
    ok: true,
    users,
  };
};

const resolvers: Resolvers = {
  Query: {
    searchUsers,
  },
};

export default resolvers;
