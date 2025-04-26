import { useEffect } from 'react';
import { useLocation, Route, Routes } from 'react-router';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';
import { NavigationBar } from './components';
import {
  AccountPage,
  AuthenticationPage,
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

  const location = useLocation();
  const isAuthRoute = ['/', '/login'].includes(location.pathname);

  return (
    <div className={styles.safeArea}>
      <Routes>
        <Route path="/" element={<AuthenticationPage />} />
        <Route path="/login" element={<AuthenticationPage />} />
      </Routes>

      <div className={styles.app}>
        <Routes>
          <Route path="/home" element={<HomePage />} />
          <Route path="/upgrade" element={<GameUpgradePage />} />
          <Route path="/marketplace" element={<MarketplacePage />} />
          <Route path="/task" element={<TaskPage />} />
          <Route path="/referrals" element={<ReferralsPage />} />
          <Route path="/account" element={<AccountPage />} />
        </Routes>
        {!isAuthRoute && <NavigationBar />}
      </div>
    </div>
  );
}

export default App;
