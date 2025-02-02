import { useEffect } from 'react';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';
import { Route, Routes } from 'react-router';
import { NavigationBar } from './components';
import {
  AccountPage,
  HomePage,
  MarketplacePage,
  ReferralsPage,
  TaskPage,
} from './pages';

function App() {
  useEffect(() => {
    WebApp.setHeaderColor('#000000');
    WebApp.ready();
    WebApp.expand();

    const user = WebApp.initDataUnsafe;
    const userId = user.user!.id;
    const username = user.user!.username;

    console.log(user);
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
        </Routes>
        <NavigationBar />
      </div>
    </div>
  );
}

export default App;
