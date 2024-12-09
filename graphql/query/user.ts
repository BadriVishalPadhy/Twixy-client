

import { graphql } from "../../gql";

const verifyUserGoogleTokenQuery = graphql(
  /* GraphQL */ `
  query VerifyUserGoogleToken($token: String!) {
    verifyGoogletokens(token: $token)
  }

`)
