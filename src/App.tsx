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
  ReferralsPage,
  TaskPage,
} from './pages';
import { AuthGuard, AuthProvider, StatusNotifications } from './features';

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
            <Route
              path="/"
              element={
                <AuthGuard>
                  <HomePage />
                </AuthGuard>
              }
            />
            <Route
              path="/upgrade"
              element={
                <AuthGuard>
                  <GameUpgradePage />
                </AuthGuard>
              }
            />

            <Route
              path="/marketplace"
              element={
                <AuthGuard>
                  <MarketplacePage />
                </AuthGuard>
              }
            />
            <Route
              path="/task"
              element={
                <AuthGuard>
                  <TaskPage />
                </AuthGuard>
              }
            />
            <Route
              path="/referrals"
              element={
                <AuthGuard>
                  <ReferralsPage />
                </AuthGuard>
              }
            />
            <Route
              path="/account"
              element={
                <AuthGuard>
                  <AccountPage />
                </AuthGuard>
              }
            />
          </Routes>
        </AuthProvider>
        <NavigationBar />
        <StatusNotifications />
      </div>
    </div>
  );
}

export default App;
