import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const seeRooms = async ([_, __, {prisma, loggedInUser}]: ResolverPayload) =>
  prisma.room.findMany({
    where: {
      users: {
        some: {
          id: loggedInUser.id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  Query: {
    seeRooms: protectAuthResolver(seeRooms),
  },
};

export default resolvers;
