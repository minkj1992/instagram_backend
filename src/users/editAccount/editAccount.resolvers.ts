import * as bcrypt from 'bcryptjs';
import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const editAccount = async ({args, context}: ResolverPayload) => {
  const {firstName, lastName, username, email, password} = args;
  const {prisma, loggedInUser} = context;
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
      email,
      ...(password && {
        password: await bcrypt.hash(password, 10),
      }),
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
