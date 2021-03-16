import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export default {
  Mutation: {
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
