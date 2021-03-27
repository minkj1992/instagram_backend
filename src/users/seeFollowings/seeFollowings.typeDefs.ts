import {gql} from 'apollo-server';

export default gql`
  type SeeFollowingsResult {
    ok: Boolean!
    error: String
    following: [User]
  }
  type Query {
    seeFollowings(username: String!, cursor: Int): SeeFollowingsResult!
  }
`;
