import { AnimatePresence } from 'framer-motion';
import { SteamIcon, useUser } from '../../../shared';
import { useState } from 'react';
import { SteamPopup } from './steam-popup';
import { DonationModal, Header, SubscriptionList } from '../../../widgets';
import { Wallet } from './wallet';
import { TonConnectButton } from '../../../features';

export const AccountPage = () => {
  const { user } = useUser();
  const [showSteamPopup, setShowSteamPopup] = useState(false);

  return (
    <div className="relative flex flex-col items-center justify-start h-full w-[calc(100%-1.875rem)] gap-[1.875rem] m-[0.9375rem] pb-[100px] overflow-y-auto overflow-x-hidden scrollbar bg-transparent">
      <AnimatePresence>
        {showSteamPopup && (
          <SteamPopup onClose={() => setShowSteamPopup(false)} />
        )}
      </AnimatePresence>

      <Header
        children={
          <button
            onClick={() => setShowSteamPopup(true)}
            className="h-[2.1875rem] w-[2.1875rem] bg-transparent border-none p-0"
          >
            <SteamIcon />
          </button>
        }
      />
      <Wallet balance={user!.balance} />
      <DonationModal />
      <SubscriptionList />
      <TonConnectButton />
    </div>
  );
};
