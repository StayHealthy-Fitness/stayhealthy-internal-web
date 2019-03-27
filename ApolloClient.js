import { InMemoryCache } from "apollo-cache-inmemory";
import { ApolloClient } from "apollo-client";
import { HttpLink } from "apollo-link-http";
import { onError } from "apollo-link-error";
import { ApolloLink } from "apollo-link";

const GRAPHQL_ENDPOINT = "https://localhost:3000";

const apolloClientSetup = () => {
  const errorLink = onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        // eslint-disable-next-line no-console
        console.log(
          `[GraphQL Error]: Message: ${message}, Location: ${locations}, Path: ${path}`
        )
      );
    }

    if (networkError) {
      // eslint-disable-next-line no-console
      console.log(`[Network Error]: ${networkError}`);
    }
  });

  const networkLink = new HttpLink({
    uri: GRAPHQL_ENDPOINT
  });

  const apolloClient = new ApolloClient({
    cache: new InMemoryCache(),
    link: ApolloLink.from([errorLink, networkLink])
  });

  return apolloClient;
};

export default apolloClientSetup;
