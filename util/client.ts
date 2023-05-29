import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { registerApolloClient } from '@apollo/experimental-nextjs-app-support/rsc';

// Query graphql with apollo client in nextjs server component
export const { getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({
      uri: 'https://api.github.com/graphql',
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_GIT_HUB_API}`,
      },
    }),
  });
});
