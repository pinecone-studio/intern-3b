'use client';
'use client';

import { ApolloProvider } from '@apollo/client/react';
import type { ReactNode } from 'react';
import { useMemo } from 'react';
import { makeApolloClient } from './apolloClient';

export default function ApolloWrapper({ children }: { children: ReactNode }) {
  const client = useMemo(() => makeApolloClient(), []);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
