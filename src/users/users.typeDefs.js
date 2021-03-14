import { gql } from "apollo-server-core";

export default gql`
  type Query {
    account(username: String!): User
  }

  type Mutation {
    account(
      firstName: String!
      lastName: String
      username: String!
      email: String!
      password: String!
    ): User
    login(username: String!, password: String!): LoginResult
  }

  type User {
    id: String!
    firstName: String!
    lastName: String
    username: String!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type LoginResult {
    ok: Boolean!
    token: String
    error: String
  }
`;
