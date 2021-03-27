import fs from 'fs';
import * as bcrypt from 'bcryptjs';
import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const IMAGE_DIR = `${process.cwd()}/uploads`;

const getUniqueFilename = (userId: number, filename: string) =>
  `${userId}-${Date.now()}-${filename}`;

const editAccount = async (...payload: ResolverPayload) => {
  const [
    _,
    {firstName, lastName, username, email, password, bio, avatar},
    {prisma, loggedInUser},
  ] = payload;

  let avatarUrl;
  if (avatar) {
    const {filename, createReadStream} = await avatar;
    const uniqueFilename = getUniqueFilename(loggedInUser.id, filename);
    const filePath = `${IMAGE_DIR}/${uniqueFilename}`;

    const readStream = createReadStream();
    const writeStream = fs.createWriteStream(filePath);
    readStream.pipe(writeStream);

    avatarUrl = `http://localhost:${
      process.env.PORT || 4000
    }/static/${uniqueFilename}`;
  }

  const updatedUser = await prisma.user.update({
    where: {
      id: loggedInUser.id,
    },
    data: {
      firstName,
      lastName,
      username,
      ...(password && {
        password: await bcrypt.hash(password, 10),
      }),
      ...(avatarUrl && {
        avatar: avatarUrl,
      }),
      email,
      bio,
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
