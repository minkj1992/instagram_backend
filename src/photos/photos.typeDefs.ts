import {gql} from 'apollo-server';

export default gql`
  type Photo {
    id: String!
    user: User!
    image: String!
    caption: String
    hashtags: [Hashtag]!
    createdAt: String!
    updatedAt: String!
  }

  type Hashtag {
    id: String!
    tag: String!
    photos: [Photo]!
    createdAt: String!
    updatedAt: String!
  }
`;
