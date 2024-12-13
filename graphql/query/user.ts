

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
  }
}`)