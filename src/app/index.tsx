import { useEffect } from 'react';
import './index.css';
import WebApp from '@twa-dev/sdk';
import { NavigationBar } from '../widgets';
import { AuthProvider, GameProvider, TonPaymentProvider } from '../features';
import { Router } from './router';
import { StatusNotifications } from '../shared';

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.setHeaderColor('#000000');
    WebApp.setBackgroundColor('#000000');
    WebApp.lockOrientation();
    WebApp.disableVerticalSwipes();
    WebApp.expand();
  }, []);

  return (
    <GameProvider>
      <TonPaymentProvider>
        <div
          className="fixed min-w-screen bg-background"
          style={{
            top: 'var(--tg-safe-area-inset-top, 0rem)',
            bottom: 'var(--tg-safe-area-inset-bottom, 0rem)',
            minHeight: `calc(
              (var(--tg-viewport-stable-height, 100vh)) -
              (var(--tg-safe-area-inset-top, 0rem)) -
              (var(--tg-safe-area-inset-bottom, 0rem))
            )`,
          }}
        >
          <div
            className="absolute min-w-full max-w-full"
            style={{
              top: 'var(--tg-content-safe-area-inset-top, 0rem)',
              bottom: 'var(--tg-content-safe-area-inset-bottom, 0rem)',
            }}
          >
            <AuthProvider>
              <Router />
            </AuthProvider>
            <NavigationBar />

            <StatusNotifications />
          </div>
        </div>
      </TonPaymentProvider>
    </GameProvider>
  );
}

export default App;
