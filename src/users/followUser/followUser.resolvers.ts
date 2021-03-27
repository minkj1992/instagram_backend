import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const followUser = async (...payload: ResolverPayload) => {
  const [_, {username}, {prisma, loggedInUser}] = payload;
  const ok = await prisma.user.findUnique({where: {username}});
  if (!ok) {
    return {ok: false, error: `There is no matched ${username} username`};
  }

  await prisma.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      following: {
        connect: {
          username,
        },
      },
    },
  });

  return {
    ok: true,
  };
};

const resolvers: Resolvers = {
  Mutation: {
    followUser: protectAuthResolver(followUser),
  },
};
export default resolvers;
