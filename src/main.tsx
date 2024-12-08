import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './reset.css';

import WebApp from '@twa-dev/sdk';
import { store } from './state/store.ts';
import { Provider } from 'react-redux';

WebApp.ready();
WebApp.expand();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
