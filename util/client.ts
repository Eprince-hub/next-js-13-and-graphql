import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

export const { getClient } = registerApolloClient(() => {
  const githubLink = new HttpLink({
    uri: 'https://api.github.com/graphql',
    headers: {
      authorization: `Bearer ${process.env.NEXT_PUBLIC_GIT_HUB_API}`,
    },
  });

  const localLink = new HttpLink({
    // uri: '/api/graphql',
    uri: 'http://localhost:3000/api/graphql',
    // credentials: 'same-origin',
  });

  const link = split(
    // Split based on the target URI
    ({ operationName }) => {
      return operationName.startsWith('Github');
    },
    githubLink,
    localLink,
  );

  return new ApolloClient({
    cache: new InMemoryCache(),
    link,
  });
});
