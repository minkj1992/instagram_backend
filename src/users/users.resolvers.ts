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

const isFollowing = async ({id}, _, {prisma, loggedInUser}) => {
  if (!loggedInUser) {
    return false;
  }
  const exists = await prisma.user.count({
    where: {
      username: loggedInUser.username,
      following: {
        some: {
          id,
        },
      },
    },
  });

  return Boolean(exists);
};

const resolvers: Resolvers = {
  User: {
    totalFollowing,
    totalFollowers,
    isMe,
    isFollowing,
  },
};
export default resolvers;
