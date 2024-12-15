import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import App from './App.tsx';
import './reset.css';
import './index.css';

import { store } from './state/store.ts';
import { Provider } from 'react-redux';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter basename="/skinbits-web/">
        <App />
      </BrowserRouter>
    </Provider>
  </StrictMode>
);
