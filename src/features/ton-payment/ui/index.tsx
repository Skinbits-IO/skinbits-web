import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { TonIcon } from '../../../shared';
import { AnimatePresence } from 'framer-motion';
import { TonWalletPopup } from './ton-wallet-popup';
import { useState } from 'react';
import { useTonPaymentContext } from '../context';
import { TonPaymentStatus } from '../types';

export const TonConnectButton = () => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  const { setStatus } = useTonPaymentContext();
  const [show, setShow] = useState(false);
  const isConnected = wallet || tonConnectUI.connected;

  return (
    <>
      <AnimatePresence>
        {show && <TonWalletPopup onClose={() => setShow(false)} />}
      </AnimatePresence>
      <button
        className={`flex justify-center items-center gap-2.5 w-full py-4 px-5 text-md font-semibold ${
          isConnected
            ? 'bg-foreground rounded-xl text-background'
            : 'bg-blue-400 rounded-4xl text-white'
        }`}
        onClick={() => {
          if (!isConnected) {
            setStatus(TonPaymentStatus.Connecting);
            tonConnectUI
              .openModal()
              .then(() => {
                setStatus(null);
              })
              .catch((error) => {
                console.log(error);
              });
          } else {
            setShow(true);
          }
        }}
      >
        {isConnected ? (
          <p className="flex-1 truncate">
            {'Your TON wallet: ' + wallet!.account.address}
          </p>
        ) : (
          <>
            <TonIcon className="size-5" />
            <p>Connect TON Wallet</p>
          </>
        )}
      </button>
    </>
  );
};
