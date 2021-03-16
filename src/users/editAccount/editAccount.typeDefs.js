import { gql } from "apollo-server-core";

export default gql`
  type EditAccountResult {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editAccount(
      firstName: String
      lastName: String
      username: String
      email: String
      password: String
    ): EditAccountResult!
  }
`;
