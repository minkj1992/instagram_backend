import { ValidationError } from "apollo-server-errors";
import jwt from "jsonwebtoken";
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
        return new ValidationError(
          `User already existed [${username}, ${email}] `
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      return await prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        },
      });
    },

    login: async (_, { username, password }, { prisma }) => {
      const user = await prisma.user.findFirst({ where: { username } });
      if (!user) {
        return {
          ok: false,
          error: "User not found.",
        };
      }
      // check password
      const passwordOk = await bcrypt.compare(password, user.password);
      if (!passwordOk) {
        return {
          ok: false,
          error: "Incorrect password.",
        };
      }

      // sign token
      const token = await jwt.sign(
        {
          id: user.id,
        },
        process.env.SECRET_KEY
      );
      return {
        ok: true,
        token,
      };
    },
  },
};
