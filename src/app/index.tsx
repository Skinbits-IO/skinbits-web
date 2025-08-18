import { useEffect } from 'react';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';
import { NavigationBar, NotificationWidget } from '../widgets';
import { AuthProvider, GameProvider } from '../features';
import { AnimatePresence } from 'framer-motion';
import { Router } from './router';
import { StatusNotifications, useAppSelector } from '../shared';

function App() {
  const notification = useAppSelector((state) => state.notification);

  useEffect(() => {
    WebApp.ready();
    WebApp.setHeaderColor('#000000');
    WebApp.lockOrientation();
    WebApp.expand();
  }, []);

  return (
    <GameProvider>
      <div className={styles.safeArea}>
        <div className={styles.app}>
          <AuthProvider>
            <Router />
          </AuthProvider>
          <NavigationBar />

          <AnimatePresence>
            {notification.show && <NotificationWidget />}
          </AnimatePresence>
          <StatusNotifications />
        </div>
      </div>
    </GameProvider>
  );
}

export default App;
