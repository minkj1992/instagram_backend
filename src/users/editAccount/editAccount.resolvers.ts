import * as bcrypt from 'bcryptjs';
import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const editAccount = async (...payload: ResolverPayload) => {
  const [
    _,
    {firstName, lastName, username, email, password, bio, avatar},
    {prisma, loggedInUser},
  ] = payload;

  const {filename, createReadStream} = await avatar;
  const stream = createReadStream();
  console.log(stream);

  if (!loggedInUser) {
    throw new Error();
  }
  const updatedUser = await prisma.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      ...(password && {
        password: await bcrypt.hash(password, 10),
      }),
      email,
      bio,
    },
  });

  if (updatedUser.id) {
    return {
      ok: true,
    };
  } else {
    return {
      ok: false,
      error: 'Could not update profile',
    };
  }
};

const resolvers: Resolvers = {
  Mutation: {
    editAccount: protectAuthResolver(editAccount),
  },
};

export default resolvers;
