import bcrypt from "bcryptjs";

export default {
  Mutation: {
    createAccount: async (
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
        return {
          ok: false,
          error: `User already existed [${username}, ${email}] `,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          firstName,
          lastName,
          username,
          email,
          password: hashedPassword,
        },
      });

      return {
        ok: true,
        user,
      };
    },
  },
};
