import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import { store } from './app/store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import App from './app';

const queryClient = new QueryClient();

const manifestUrl =
  'https://skinbits-web-dev-production.up.railway.app/tonconnect-manifest.json';
//window.location.origin + '/tonconnect-manifest.json';

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter>
          <TonConnectUIProvider manifestUrl={manifestUrl}>
            <App />
          </TonConnectUIProvider>
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </CookiesProvider>
);
