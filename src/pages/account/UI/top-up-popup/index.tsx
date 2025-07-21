import { motion } from 'framer-motion';
import styles from './TopUpPopup.widget.module.css';
import { Devider, PopupCloseButton } from '../../../../components';
import { Card, ModeSwitcher } from './UI';
import { useState } from 'react';
import { DONATIONS_PRICE } from '../../../../shared';
import { useDonation } from '../../hooks';

interface ITopUpPopupProps {
  onClose: () => void;
}

export const TopUpPopup = ({ onClose }: ITopUpPopupProps) => {
  const [mode, setMode] = useState<'ton' | 'star'>('ton');
  const { createMutation, isPending } = useDonation();

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      ></motion.div>
      <motion.div
        className={styles.background}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <PopupCloseButton onTap={onClose} />
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
      </motion.div>
    </>
  );
};
