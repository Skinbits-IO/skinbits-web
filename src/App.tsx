import { useEffect } from 'react';
import styles from './App.module.css';
import WebApp from '@twa-dev/sdk';

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
  }, []);

  return (
    <div className={styles.app}>
      <p>Hello world!</p>
    </div>
  );
}

export default App;
