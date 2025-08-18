import styles from './TopUpPopup.widget.module.css';
import { Card, ModeSwitcher } from './UI';
import { useState } from 'react';
import { Devider, DONATIONS_PRICE, Popup } from '../../../../shared';
import { useDonation } from '../../hooks';

interface ITopUpPopupProps {
  onClose: () => void;
}

export const TopUpPopup = ({ onClose }: ITopUpPopupProps) => {
  const [mode, setMode] = useState<'ton' | 'star'>('ton');
  const { createMutation, isPending } = useDonation();

  return (
    <Popup onClose={onClose}>
      <div className={styles.description}>
        <h5>Buy Rockets</h5>
        <p>Get some more Rockets to get cool skins</p>
      </div>
      <ModeSwitcher mode={mode} onChange={setMode} />
      <Devider />
      <div className={styles.cardPrices}>
        {(mode === 'ton' ? DONATIONS_PRICE.ton : DONATIONS_PRICE.star).map(
          (prices, index) => {
            return (
              <Card
                key={index}
                rockets={prices.rockets}
                price={prices.price}
                mode={mode}
                onClick={() => {
                  createMutation.mutate({
                    donationAmount: prices.rockets,
                    amount: prices.price as number,
                    currency: mode === 'star' ? 'XTR' : 'TON',
                    paymentMethod: 'telegram',
                    notes: 'Buy in-game rockets to collect the best skins',
                  });
                }}
              />
            );
          }
        )}

        {isPending && (
          <div className={styles.loaderOverlay}>
            <div className={styles.spinner} />
          </div>
        )}
      </div>
    </Popup>
  );
};
