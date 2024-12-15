import { useEffect } from 'react';
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
  useEffect(() => {
    WebApp.setHeaderColor('#000000');
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div className={styles.app}>
      <Routes>
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/task" element={<Task />} />
        <Route path="/" element={<Home />} />
        <Route path="/referrals" element={<Referrals />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      <NavigationBar />
    </div>
  );
}

export default App;
