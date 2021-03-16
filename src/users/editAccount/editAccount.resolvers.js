import bcrypt from "bcryptjs";

export default {
  Mutation: {
    editAccount: async (
      _,
      { firstName, lastName, username, email, password: newPassword },
      { prisma }
    ) => {
      const updatedUser = await prisma.user.update({
        where: {
          id: 3,
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
