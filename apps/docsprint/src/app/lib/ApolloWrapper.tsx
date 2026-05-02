'use client';

import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { makeApolloClient } from './apolloClient';
import { ApolloProvider } from '@apollo/client/react';

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = useMemo(() => makeApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
