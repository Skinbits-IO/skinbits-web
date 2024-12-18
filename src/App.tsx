import { useEffect, useState } from 'react';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';
import NavigationBar from './components/NavigationBar/NavigationBar';
import { Route, Routes } from 'react-router';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Referrals from './pages/Referrals';
import Task from './pages/Task';
import Account from './pages/Account';

function App() {
  const [top, setTop] = useState(0);
  const [bottom, setBottom] = useState(0);
  const [contentTop, setContentTop] = useState(0);
  const [contentBottom, setContentBottom] = useState(0);
  const [stableHeight, setStableHeight] = useState(0);

  useEffect(() => {
    WebApp.setHeaderColor('#000000');
    WebApp.ready();
    WebApp.expand();

    setTop(WebApp.safeAreaInset.top);
    setBottom(WebApp.safeAreaInset.bottom);
    setStableHeight(WebApp.viewportStableHeight);
    setContentTop(WebApp.contentSafeAreaInset.top);
    setContentBottom(WebApp.contentSafeAreaInset.bottom);
  }, []);

  return (
    <div className={styles.safeArea}>
      <div className={styles.app}>
        <Routes>
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/task" element={<Task />} />
          <Route path="/" element={<Home />} />
          <Route path="/referrals" element={<Referrals />} />
          <Route path="/account" element={<Account />} />
        </Routes>
        <div>
          {'top: ' + top + ', bottom: ' + bottom + ', height: ' + stableHeight}
        </div>
        <div>{'top content: ' + top + ', bottom content: ' + bottom}</div>
        <NavigationBar />
      </div>
    </div>
  );
}

export default App;
