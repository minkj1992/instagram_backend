import * as bcrypt from 'bcryptjs';
import {Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const resolvers: Resolvers = {
  Mutation: {
    editAccount: protectAuthResolver(
      async (
        _,
        {firstName, lastName, username, email, password: newPassword},
        {prisma, loggedInUser}
      ) => {
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
            ...(newPassword && {
              password: await bcrypt.hash(newPassword, 10),
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
      }
    ),
  },
};

export default resolvers;
