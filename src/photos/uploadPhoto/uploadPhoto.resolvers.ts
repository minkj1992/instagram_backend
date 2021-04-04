import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const _parseCaptionHashtags = (caption: string) => caption.match(/#[\w]+/g);

const _getHashtagObjs = hashtags =>
  hashtags?.map(tag => ({where: {tag}, create: {tag}}));

const uploadPhoto = async ([
  _,
  {image, caption},
  {prisma, loggedInUser},
]: ResolverPayload) => {
  if (caption) {
    const parsedHashtags = _parseCaptionHashtags(caption);
    const hashtagObjs = _getHashtagObjs(parsedHashtags);
    if (parsedHashtags) {
      return prisma.photo.create({
        data: {
          image,
          caption,
          user: {
            connect: {
              id: loggedInUser.id,
            },
          },
          ...(hashtagObjs.length > 0 && {
            hashtags: {
              connectOrCreate: hashtagObjs,
            },
          }),
        },
      });
    }
    // create photo
    // add photo to hashtags
    // save a photo
  }

  return 'It must be developed';
};

const resolvers: Resolvers = {
  Mutation: {
    uploadPhoto: protectAuthResolver(uploadPhoto),
  },
};

export default resolvers;
