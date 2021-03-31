import {gql} from 'apollo-server';

export default gql`
  type Mutation {
    uploadPhoto(image: Upload!, caption: String): Photo
  }
`;
