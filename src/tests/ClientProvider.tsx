import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactNode } from 'react';

type ClientProviderProps = { children: ReactNode };
export const ClientProvider = ({ children }: ClientProviderProps) => {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
