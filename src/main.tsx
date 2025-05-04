import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './reset.css';
import './index.css';

import { store } from './state/store.ts';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CookiesProvider } from 'react-cookie';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <CookiesProvider>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <BrowserRouter basename="/skinbits-web/">
          <App />
        </BrowserRouter>
      </Provider>
    </QueryClientProvider>
  </CookiesProvider>
);
