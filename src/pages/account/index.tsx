import { AnimatePresence } from 'framer-motion';
import { Header, SteamIcon } from '../../components';
import { useUser } from '../../shared';
import styles from './AccountPage.module.css';
import {
  PremiumCard,
  PremiumCardPopup,
  SteamPopup,
  TopUp,
  TopUpPopup,
  Wallet,
} from './UI';
import { useState } from 'react';
import { PremiumCardProvider, usePremiumCardContext } from './context';

const AccountPageContent = () => {
  const { user } = useUser();

  const [showDonationPopup, setShowDonationPopup] = useState(false);
  const [showSteamPopup, setShowSteamPopup] = useState(false);

  const { show } = usePremiumCardContext();

  return (
    <div className={styles.background}>
      <AnimatePresence>
        {showDonationPopup && (
          <TopUpPopup onClose={() => setShowDonationPopup(false)} />
        )}
        {showSteamPopup && (
          <SteamPopup onClose={() => setShowSteamPopup(false)} />
        )}
        {show && <PremiumCardPopup />}
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

export const AccountPage = () => {
  return (
    <PremiumCardProvider>
      <AccountPageContent />
    </PremiumCardProvider>
  );
};
