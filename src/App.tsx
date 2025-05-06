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
} from './pages';
import { AuthProvider, StatusNotifications } from './features';

function App() {
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

            <Route path="/marketplace" element={<MarketplacePage />} />
            <Route path="/task" element={<div />} />
            <Route path="/referrals" element={<div />} />
            <Route path="/account" element={<AccountPage />} />
          </Routes>
        </AuthProvider>
        <NavigationBar />
        <StatusNotifications />
      </div>
    </div>
  );
}

export default App;
