import { useEffect } from 'react';
import { Route, Routes } from 'react-router';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';
import { NavigationBar } from './components';
import {
  AccountPage,
  GameUpgradePage,
  HomePage,
  MarketplacePage,
  RankingPage,
} from './pages';
import {
  AuthProvider,
  NotificationWidget,
  StatusNotifications,
} from './features';
import { AnimatePresence } from 'framer-motion';
import { RootState } from './store';
import { useSelector } from 'react-redux';

function App() {
  const notification = useSelector((state: RootState) => state.notification);

  useEffect(() => {
    WebApp.ready();
    WebApp.setHeaderColor('#000000');
    WebApp.lockOrientation();
    WebApp.expand();
  }, []);

  return (
    <div className={styles.safeArea}>
      <div className={styles.app}>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/upgrade" element={<GameUpgradePage />} />

            <Route path="/ranking" element={<RankingPage />} />
            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/referrals" element={<div />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </AuthProvider>
        <NavigationBar />

        <AnimatePresence>
          {notification.show && <NotificationWidget />}
        </AnimatePresence>
        <StatusNotifications />
      </div>
    </div>
  );
}

export default App;
