import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { SnackbarProvider } from 'notistack';
import queryClient from './config/queryClient';
import { useAuth } from './hooks/useAuth';
import { routeTree } from './routeTree.gen';

const router = createRouter({
  routeTree,
  context: { authentication: undefined! },
  defaultErrorComponent: () => <div>Erro</div>,
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const authentication = useAuth();
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <SnackbarProvider maxSnack={3}>
        <RouterProvider router={router} context={{ authentication }} />
      </SnackbarProvider>
    </QueryClientProvider>
  );
}
