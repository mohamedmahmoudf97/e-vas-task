import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast'

import '../styles/globals.css';

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Component {...pageProps} />
          <Toaster
            containerStyle={{ zIndex: '1800 !important' }}
            position={'top-right'}
            toastOptions={{ className: 'react-hot-toast', style: { zIndex: '1800 !important' } }}
          />
    </QueryClientProvider>
  );
}

export default MyApp;
