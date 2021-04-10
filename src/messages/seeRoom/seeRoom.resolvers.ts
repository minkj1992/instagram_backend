import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const seeRoom = async ([_, {id}, {prisma, loggedInUser}]: ResolverPayload) => {
  prisma.room.findFirst({
    where: {
      id,
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });
};

const resolvers: Resolvers = {
  Query: {
    seeRoom: protectAuthResolver(seeRoom),
  },
};

export default resolvers;
