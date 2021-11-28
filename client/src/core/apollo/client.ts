import { enableExperimentalFragmentVariables } from "graphql-tag";
import {
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { relayStylePagination } from "@apollo/client/utilities";
import { onError } from "@apollo/client/link/error";
// @ts-ignore
import apolloLogger from "apollo-link-logger";

import generatedIntrospection from "../../__generated__/possible-graph-types";

enableExperimentalFragmentVariables();

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_GRAPHQL_API,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }
  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const link = ApolloLink.from([apolloLogger, errorLink, httpLink]);

export const apolloClient = new ApolloClient({
  connectToDevTools: true,
  link,
  cache: new InMemoryCache({
    possibleTypes: generatedIntrospection.possibleTypes,
    typePolicies: {
      Query: {
        fields: {
        },
      },
    },
  }),
});