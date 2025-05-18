import { AnimatePresence } from 'framer-motion';
import { Header, SteamIcon } from '../../components';
import { useUser } from '../../shared';
import styles from './AccountPage.module.css';
import { PremiumCard, TopUp, TopUpPopup, Wallet } from './UI';
import { useState } from 'react';

export const AccountPage = () => {
  const { user } = useUser();
  const [showDonationPopup, setShowDonationPopup] = useState(false);

  return (
    <div className={styles.background}>
      <AnimatePresence>
        {showDonationPopup && (
          <TopUpPopup onClose={() => setShowDonationPopup(false)} />
        )}
      </AnimatePresence>
      <Header
        children={
          <button
            className={styles.steamButton}
            onClick={() => console.log('steam')}
          >
            <SteamIcon />
          </button>
        }
      />
      <Wallet balance={user!.balance} />
      <TopUp onClick={() => setShowDonationPopup(true)} />
      <div className={styles.plans}>
        <PremiumCard option="free" />
        <PremiumCard option="gold" />
        <PremiumCard option="premium" />
      </div>
    </div>
  );
};
