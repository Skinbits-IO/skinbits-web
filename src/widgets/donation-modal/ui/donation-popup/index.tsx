import { useEffect, useState } from 'react';
import { Devider, DONATIONS_PRICE, Popup } from '../../../../shared';
import { useCreateDonation } from '../../../../entities';
import { ModeSwitcher } from './mode-switcher';
import { Card } from './card';
import { useTonConnectUI } from '@tonconnect/ui-react';
import {
  TonPaymentStatus,
  useTonPayment,
  useTonPaymentContext,
} from '../../../../features';

interface IDonationPopupProps {
  onClose: () => void;
}

export const DonationPopup = ({ onClose }: IDonationPopupProps) => {
  const [mode, setMode] = useState<'ton' | 'star'>('star');
  const [tonConnectUI] = useTonConnectUI();

  const { payWithTon } = useTonPayment();
  const { status } = useTonPaymentContext();

  const { mutate, isPending } = useCreateDonation(payWithTon);

  useEffect(() => {
    if (tonConnectUI.connected) {
      setMode('ton');
    }
  }, [tonConnectUI]);

  return (
    <Popup onClose={onClose}>
      <div className="space-y-5 w-full">
        {/* Description header */}
        <div
          className="w-full p-6 rounded-2xl flex flex-col items-center justify-center gap-[10px] bg-center bg-cover bg-no-repeat"
          style={{ backgroundImage: `url('/donation-popup-background.png')` }}
        >
          <h5 className="text-white text-[16px] font-bold">Buy Rockets</h5>
          <p className="text-[#C1C1C1] text-[14px] font-medium text-center">
            Get some more Rockets to get cool skins
          </p>
        </div>

        <ModeSwitcher mode={mode} onChange={setMode} />
        <Devider />

        {/* Card list */}
        <div className="w-full flex-1 flex flex-col items-center gap-[15px] overflow-y-auto relative">
          {(mode === 'ton' ? DONATIONS_PRICE.ton : DONATIONS_PRICE.star).map(
            (prices, index) => (
              <Card
                key={index}
                rockets={prices.rockets}
                price={prices.price}
                mode={mode}
                onClick={() => {
                  mutate({
                    amount: prices.price as number,
                    currency: mode === 'star' ? 'XTR' : 'TON',
                    paymentMethod: 'telegram',
                    notes: 'Buy in-game rockets to collect the best skins',
                  });
                }}
              />
            )
          )}

          {/* Spinner overlay */}
          {(isPending || status === TonPaymentStatus.Processing) && (
            <div className="absolute top-0 left-0 w-full h-full bg-black/50 z-10 flex items-center justify-center">
              <div className="w-[40px] h-[40px] border-[4px] border-white/80 border-t-transparent rounded-full animate-spin" />
            </div>
          )}
        </div>
      </div>
    </Popup>
  );
};
