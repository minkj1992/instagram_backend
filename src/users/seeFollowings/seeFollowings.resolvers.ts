import {ResolverPayload, Resolvers} from '../../types';

const seeFollowings = async (...payload: ResolverPayload) => {
  const [_, {username, cursor: lastId}, {prisma}] = payload;
  const pageSize = 5;

  const ok = await prisma.user.findUnique({
    where: {username},
    select: {id: true},
  });
  if (!ok) {
    return {ok: false, error: `There is no matched ${username} username`};
  }

  const following = await prisma.user
    .findUnique({where: {username}})
    .following({
      take: pageSize,
      skip: 1,
      ...(lastId && {cursor: {id: lastId}}),
    });

  return {
    ok: true,
    following,
  };
};

const resolvers: Resolvers = {
  Query: {
    seeFollowings,
  },
};

export default resolvers;
