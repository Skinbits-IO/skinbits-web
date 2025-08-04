import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './reset.css';
import './index.css';
import { store } from './store';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

const queryClient = new QueryClient();

const manifestUrl = window.location.origin + '/tonconnect-manifest.json';

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
