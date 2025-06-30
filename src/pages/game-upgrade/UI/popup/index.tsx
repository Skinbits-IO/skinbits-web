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

interface IPopupProps {
  card: Card & { price: number; amount?: number };
  onActivate?: () => void;
  onUpgrade: () => void;
  isUpgradeRequestPending?: boolean;
  onExit: () => void;
}

export const Popup = ({
  card,
  onActivate,
  onUpgrade,
  isUpgradeRequestPending,
  onExit,
}: IPopupProps) => {
  const { user } = useUser();
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);

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
        <div className={styles.buttonContainer}>
          {card.amount && onActivate && (
            <PopupButton
              disabled={card.amount === 0}
              text={`Activate (${card.amount})`}
              onClick={() => onActivate()}
            />
          )}
          <PopupButton
            disabled={user!.balance < card.price}
            text={card.amount ? 'Buy' : 'Upgrade'}
            isRequestPending={isUpgradeRequestPending}
            onClick={() => onUpgrade()}
          />
        </div>
      </motion.div>
    </>
  );
};
