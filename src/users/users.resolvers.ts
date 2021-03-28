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

const isMe = ({id}, _, {loggedInUser}) => {
  if (!loggedInUser) {
    return false;
  }
  return id === loggedInUser.id;
};

const resolvers: Resolvers = {
  User: {
    totalFollowing,
    totalFollowers,
    isMe,
  },
};
export default resolvers;
