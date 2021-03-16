import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  Mutation: {
    editAccount: async (
      _,
      { firstName, lastName, username, email, password: newPassword, token },
      { prisma }
    ) => {
      const { id } = await jwt.verify(token, process.env.SECRET_KEY);

      const updatedUser = await prisma.user.update({
        where: {
          id,
        },
        data: {
          firstName,
          lastName,
          username,
          email,
          ...(newPassword && { password: await bcrypt.hash(newPassword, 10) }),
        },
      });

      if (updatedUser.id) {
        return {
          ok: true,
        };
      } else {
        return {
          ok: false,
          error: "Could not update profile",
        };
      }
    },
  },
};
