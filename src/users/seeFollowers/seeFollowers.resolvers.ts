import {ResolverPayload, Resolvers} from '../../types';

const seeFollowers = async (...payload: ResolverPayload) => {
  const [_, {username, page}, {prisma}] = payload;
  const pageSize = 5;

  const ok = await prisma.user.findUnique({
    where: {username},
    select: {id: true},
  });
  if (!ok) {
    return {ok: false, error: `There is no matched ${username} username`};
  }

  const followers = await prisma.user
    .findUnique({where: {username}})
    .followers({
      take: pageSize,
      skip: (page - 1) * pageSize,
    });
  const totalFollowerCnt = await prisma.user.count({
    where: {following: {some: {username}}},
  });
  return {
    ok: true,
    followers,
    totalPages: Math.ceil(totalFollowerCnt / pageSize),
  };
};

const resolvers: Resolvers = {
  Query: {
    seeFollowers,
  },
};

export default resolvers;
