import { ValidationError } from "apollo-server-errors";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
    account: async (
      _,
      { firstName, lastName, username, email, password },
      { prisma }
    ) => {
      const q = {
        where: {
          OR: [
            {
              username,
            },
            {
              email,
            },
          ],
        },
      };

      const existingUser = await prisma.user.findFirst(q);
      if (existingUser) {
        return ValidationError(`User already existed [${username}, ${email}] `);
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      return prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        },
      });
    },
  },
};
