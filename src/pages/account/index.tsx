import { AnimatePresence } from 'framer-motion';
import { DonationModal, Header } from '../../widgets';
import { SteamIcon, useUser } from '../../shared';
import styles from './AccountPage.module.css';
import { PremiumCard, PremiumCardPopup, SteamPopup, Wallet } from './UI';
import { useState } from 'react';
import { PremiumCardProvider, usePremiumCardContext } from './context';
import { TonConnectButton, TonPaymentProvider } from '../../features';

const AccountPageContent = () => {
  const { user, subscription } = useUser();
  const [showSteamPopup, setShowSteamPopup] = useState(false);
  const { show } = usePremiumCardContext();

  return (
    <div className={styles.background}>
      <AnimatePresence>
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
      <DonationModal />
      <div className={styles.plans}>
        {!subscription && <PremiumCard option="free" />}
        {(!subscription ||
          (subscription && subscription.subscriptionType === 'gold')) && (
          <PremiumCard option="gold" />
        )}
        <PremiumCard option="premium" />
      </div>
      <TonConnectButton />
    </div>
  );
};

export const AccountPage = () => {
  return (
    <PremiumCardProvider>
      <TonPaymentProvider>
        <AccountPageContent />
      </TonPaymentProvider>
    </PremiumCardProvider>
  );
};
