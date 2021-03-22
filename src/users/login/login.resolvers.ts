import * as jwt from 'jsonwebtoken';
import * as bcrypt from 'bcryptjs';
import {Resolvers, ResolverPayload} from '../../types';

const resolvers: Resolvers = {
  Mutation: {
    login: async ({
      args: {username, password},
      context: {prisma},
    }: ResolverPayload) => {
      const user = await prisma.user.findFirst({where: {username}});
      if (!user) {
        return {
          ok: false,
          error: 'User not found.',
        };
      }
      // check password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: 'Incorrect password.',
        };
      }

      // sign token
      const token = await jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY as jwt.Secret
      );
      return {
        ok: true,
        token,
      };
    },
  },
};

export default resolvers;
