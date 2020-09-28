import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from '@apollo/client';
import { useMemo } from 'react';
import { IncomingMessage, ServerResponse } from 'http';
import fetch from 'isomorphic-unfetch';

export type ResolverContext = {
  req?: IncomingMessage;
  res?: ServerResponse;
};

let apolloClient: ApolloClient<NormalizedCacheObject> = null;

function createIsomorphLink(ctx: ResolverContext = {}) {
  // if (typeof window === 'undefined') {
  //   const { SchemaLink } = require('@apollo/client/link/schema');
  //   const { schema } = require('../schemas');
  //   return new SchemaLink({ schema, context });
  // } else {
  let graphqlUri = `http://localhost:3000/api/graphql`;
  if (typeof window !== 'undefined') {
    graphqlUri = `${document.location.origin}/api/graphql`;
  }
  return new HttpLink({
    uri: graphqlUri,
    credentials: 'include',
    fetch,
    headers: {
      cookie: ctx.req ? ctx.req.headers.cookie : undefined,
    },
  });
  // }
}

function createApolloClient(context?: ResolverContext) {
  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: createIsomorphLink(context),
    cache: new InMemoryCache(),
  });
}

export const initializeApollo = (
  context?: ResolverContext,
  initialState: any = null
): ApolloClient<NormalizedCacheObject> => {
  const _apolloClient = apolloClient ?? createApolloClient(context);

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;

  return _apolloClient;
};

export const useApollo = ({
  initialState,
}: {
  initialState: any;
}): ApolloClient<NormalizedCacheObject> => {
  return useMemo(() => initializeApollo(undefined, initialState), [
    initialState,
  ]);
};
