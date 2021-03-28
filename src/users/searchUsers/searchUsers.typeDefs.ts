import {gql} from 'apollo-server';

export default gql`
  type SearchUsersResult {
    ok: Boolean!
    error: String
    users: [User]
  }

  type Query {
    searchUsers(keyword: String!, cursor: Int): SearchUsersResult!
  }
`;
