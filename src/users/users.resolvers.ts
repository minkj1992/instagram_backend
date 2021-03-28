import {Resolvers} from '../types';

const totalFollowing = ({id}, _, {prisma}) =>
  prisma.user.count({
    where: {
      followers: {
        some: {
          id,
        },
      },
    },
  });

const totalFollowers = ({id}, _, {prisma}) =>
  prisma.user.count({
    where: {
      following: {
        some: {
          id,
        },
      },
    },
  });

const resolvers: Resolvers = {
  User: {
    totalFollowing,
    totalFollowers,
  },
};
export default resolvers;
