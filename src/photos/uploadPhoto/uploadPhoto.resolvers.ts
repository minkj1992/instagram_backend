import {ResolverPayload, Resolvers} from '../../types';
import {protectAuthResolver} from '../../utils/users';

const _parseCaptionHashtags = (caption: string) => {
  return caption;
};

const uploadPhoto = async ([
  _,
  {image, caption},
  {prisma, loggedInUser},
]: ResolverPayload) => {
  if (caption) {
    const parsedHashtags = _parseCaptionHashtags(caption);
    if (parsedHashtags) {
      // get or create Hashtag
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
