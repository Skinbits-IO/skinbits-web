import styles from './HomePage.module.css';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';

export const HomePage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Header avatarUrl="../../../avatar.jpg" username="German" />
        <div className={styles.upperSection}>
          <Rank rank="silver" />
          <Wallet balance={4500000} />
        </div>
      </div>
    </div>
  );
};
