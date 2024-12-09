

import { graphql } from "../../gql";

export const verifyUserGoogleTokenQuery = graphql(
  /* GraphQL */ `
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogletokens(token: $token)
  }

`)
