import { GameWidget } from '../../features';
import styles from './HomePage.module.css';
import { FarmButton } from './UI/farm-button';
import { Header } from './UI/header';
import { Rank } from './UI/rank';
import { Wallet } from './UI/wallet';

export const HomePage = () => {
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <Header avatarUrl="/skinbits-web/avatar.png" username="German" />
        <div className={styles.upperSection}>
          <Rank rank="silver" />
          <Wallet balance={4500000} />
        </div>
      </div>
      <div className={styles.game}>
        <GameWidget />
        <FarmButton progress={70} status="unavailable" />
      </div>
    </div>
  );
};
