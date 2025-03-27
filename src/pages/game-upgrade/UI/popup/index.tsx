import { motion } from 'framer-motion';
import styles from './Popup.module.css';
import { BoostCard, UpgradeCard } from '../../../../types';
import {
  CloseIcon,
  PopupButton,
  PopupCloseButton,
  RocketIcon,
} from '../../../../components';

interface IPopupProps {
  card: BoostCard | UpgradeCard;
  onExit: () => void;
}

const isBoostCard = (card: BoostCard | UpgradeCard): card is BoostCard => {
  return (card as BoostCard).amount !== undefined;
};

export const Popup = ({ card, onExit }: IPopupProps) => {
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);
  const isBoost = isBoostCard(card);

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => onExit()}
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
        <div className={styles.description}>{card.description}</div>
        <div className={styles.priceContainer}>
          <RocketIcon size={19} color="#D2F7B6" />
          <p className={styles.price}>{formatedPrice}</p>
        </div>
        <div className={styles.buttonContainer}>
          {isBoost && (
            <PopupButton
              text={`Activate (${card.amount})`}
              onClick={() => console.log('Boost Activated')}
            />
          )}
          <PopupButton
            text={isBoost ? 'Buy' : 'Upgrade'}
            onClick={() => console.log(isBoost ? 'Boost Tap' : 'Upgrade Tap')}
          />
        </div>
      </motion.div>
    </>
  );
};
