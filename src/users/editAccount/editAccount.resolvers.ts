import bcrypt from "bcryptjs";
import { protectAuthResolver } from "../../utils/users";

export default {
  Mutation: {
    editAccount: protectAuthResolver(
      async (
        _,
        { firstName, lastName, username, email, password: newPassword },
        { prisma, loggedInUser }
      ) => {
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
            error: "Could not update profile",
          };
        }
      }
    ),
  },
};
