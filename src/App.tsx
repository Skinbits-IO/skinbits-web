import { useEffect } from 'react';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';
import { Route, Routes } from 'react-router';
import { NavigationBar } from './components';
import {
  AccountPage,
  GameUpgradePage,
  HomePage,
  MarketplacePage,
  ReferralsPage,
  TaskPage,
} from './pages';

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
        <Routes>
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/upgrade" element={<GameUpgradePage />} />
        </Routes>
        <NavigationBar />
      </div>
    </div>
  );
}

export default App;
