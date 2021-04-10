import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

type RoomType = {id: number} | null;

const sendMessage = async ([
  _,
  {payload, roomId, userId},
  {prisma, loggedInUser},
]: ResolverPayload) => {
  let room: RoomType = null;
  if (userId) {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
      },
    });
    if (!user) {
      return {
        ok: false,
        error: 'User not Found',
      };
    }
    room = await prisma.room.create({
      data: {
        users: {
          connect: [{id: userId}, {id: loggedInUser}],
        },
      },
    });
  } else if (roomId) {
    room = await prisma.room.findUnique({
      where: {
        id: roomId,
      },
      select: {
        id: true,
      },
    });
    if (!room) {
      return {
        ok: false,
        error: 'Room not found.',
      };
    }
  }
  await prisma.message.create({
    data: {
      payload,
      room: {
        connect: {
          id: roomId.id,
        },
      },
      user: {
        connect: {
          id: loggedInUser.id,
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
    sendMessage: protectAuthResolver(sendMessage),
  },
};

export default resolvers;
