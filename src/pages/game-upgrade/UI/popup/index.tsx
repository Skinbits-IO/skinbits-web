import { motion } from 'framer-motion';
import styles from './Popup.module.css';
import {
  Description,
  PopupButton,
  PopupCloseButton,
  RocketIcon,
} from '../../../../components';
import { Card } from '../../types';
import { useUser } from '../../../../shared';
import { useEffect, useState } from 'react';

interface IPopupProps {
  card: Card & { price: number; amount?: number };
  onActivate?: () => void;
  onUpgrade: () => void;
  isRequestPending?: boolean;
  onExit: () => void;
}

export const Popup = ({
  card,
  onActivate,
  onUpgrade,
  isRequestPending,
  onExit,
}: IPopupProps) => {
  const { user } = useUser();

  const [activateLoading, setActivateLoading] = useState(false);
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);
  const isBoost = card.amount !== undefined;

  useEffect(() => {
    if (!isRequestPending) setActivateLoading(false);
  }, [isRequestPending]);

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className={styles.popup}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        <div style={{ marginBottom: '-20px' }}>
          <PopupCloseButton onTap={onExit} />
        </div>
        <div className={styles.imageContainer}>
          <img
            src={window.location.origin + card.photoUrl}
            className={styles.image}
            alt={card.title}
          />
          <div className={styles.title}>{card.title}</div>
        </div>
        <Description text={card.description} />
        <div className={styles.priceContainer}>
          <RocketIcon size={19} color="#D2F7B6" />
          <p className={styles.price}>{formatedPrice}</p>
        </div>
        <div
          className={styles.buttonContainer}
          style={{ gridTemplateColumns: isBoost ? '1fr 1fr' : '1fr' }}
        >
          {isBoost && onActivate && (
            <PopupButton
              disabled={card.amount === 0}
              text={`Activate (${card.amount})`}
              isRequestPending={activateLoading}
              onClick={() => {
                setActivateLoading(true);
                onActivate();
              }}
            />
          )}
          <PopupButton
            disabled={user!.balance < card.price}
            text={isBoost ? 'Buy' : 'Upgrade'}
            isRequestPending={isRequestPending && !activateLoading}
            onClick={() => onUpgrade()}
          />
        </div>
      </motion.div>
    </>
  );
};
