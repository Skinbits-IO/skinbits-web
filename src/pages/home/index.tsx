import { useEffect, useState } from 'react';
import styles from './HomePage.module.css';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import WebApp from '@twa-dev/sdk';

export const HomePage = () => {
  const [version, setVersion] = useState<string | null>();

  useEffect(() => {
    setVersion(WebApp.version);
  }, []);

  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Header avatarUrl="../../../avatar.jpg" username="German" />
        <div>
          <Rank rank="silver" />
        </div>
        <h1>{version}</h1>
      </div>
    </div>
  );
};
