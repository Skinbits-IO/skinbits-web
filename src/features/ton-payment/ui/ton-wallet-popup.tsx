import { useTonConnectUI, useTonWallet } from '@tonconnect/ui-react';
import { Popup, PopupButton } from '../../../shared';

interface ITonWalletPopupProps {
  onClose: () => void;
}

export const TonWalletPopup = ({ onClose }: ITonWalletPopupProps) => {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();

  return (
    <Popup onClose={onClose}>
      <div className="relative h-[100px] w-full rounded-xl bg-white/15">
        <div
          className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-xl text-white text-[28px]"
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
          }}
        >
          Your TON Wallet Connected
        </div>
      </div>

      <div className="p-4 border border-dashed border-white/15 rounded-lg text-center text-sm text-accent font-medium">
        <p className="font-semibold">Address:</p>
        <p className="break-all">{wallet?.account.address}</p>
        <p className="text-xs text-muted mt-2">
          You are currently connected with your TON wallet.
        </p>
      </div>

      <PopupButton
        text="Disconnect Wallet"
        onClick={() => {
          tonConnectUI.disconnect().then(onClose);
        }}
      />
    </Popup>
  );
};
