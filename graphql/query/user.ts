

import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(
  /* GraphQL */ `
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogletokens(token: $token)
  }

`)
export const getCurrentUserQuery = graphql(`query GetCurrentUser {
  getCurrentUser {
    profileImageURL
    lastName
    id
    firstName
    email
    tweets {
    id
    content
    author{
    firstName
    lastName
    profileImageURL
    }
    }
  }
}`)


export const getCurrentUserIdQuery = graphql(`query GetUserById($id: ID!) {
  getUserById(id: $id) {
    email
    firstName
    id
    lastName
    profileImageURL
    tweets {
      imageURL
      id
      content
      author {
        firstName
        lastName
        profileImageURL
      }
    }
  }
}`)