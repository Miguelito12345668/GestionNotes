import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: (count, err: unknown) => {
        const status = (err as { status?: number })?.status;
        if (status === 401 || status === 403) return false;
        return count < 2;
      },
      staleTime: 30_000,
    },
  },
});