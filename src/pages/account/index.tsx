import { AnimatePresence } from 'framer-motion';
import { Header, SteamIcon } from '../../components';
import { useUser } from '../../shared';
import styles from './AccountPage.module.css';
import { PremiumCard, SteamPopup, TopUp, TopUpPopup, Wallet } from './UI';
import { useState } from 'react';

export const AccountPage = () => {
  const { user } = useUser();

  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [showSteamPopup, setShowSteamPopup] = useState(false);

  return (
    <div className={styles.background}>
      <AnimatePresence>
        {showDonationPopup && (
          <TopUpPopup onClose={() => setShowDonationPopup(false)} />
        )}
        {showSteamPopup && (
          <SteamPopup onClose={() => setShowSteamPopup(false)} />
        )}
      </AnimatePresence>
      <Header
        children={
          <button
            className={styles.steamButton}
            onClick={() => setShowSteamPopup(true)}
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
