import {
  PopupButton,
  PopupCloseButton,
  RocketIcon,
} from '../../../../components';
import { Rank, RANKS } from '../../../../shared';
import styles from './RankingPopup.module.css';
import { motion } from 'framer-motion';

interface IRankingPopupProps {
  rank: Rank;
  onClose: () => void;
}

export const RankingPopup = ({ rank, onClose }: IRankingPopupProps) => {
  const rankInfo = RANKS.get(rank);
  if (!rankInfo) return null;

  const formatedPrice = new Intl.NumberFormat('en-US').format(
    rankInfo.reward ?? 0
  );

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
        <div style={{ marginBottom: '-20px' }}>
          <PopupCloseButton onTap={onClose} />
        </div>
        <div
          className={styles.imageContainer}
          style={{
            backgroundColor:
              RANKS.get(rankInfo.nextRank ?? Rank.bronze)?.color ?? '#000000',
          }}
        >
          <div className={styles.title}>{`New rank: ${
            rankInfo.nextRank ?? ''
          }`}</div>
        </div>
        <div className={styles.description}>
          Congratulations! <br /> You’ve just unlocked a new rank! 🎉 <br />
          As a reward for your achievement, you’re now eligible to claim your
          bonus. Go ahead and grab your reward—keep climbing! 🚀
        </div>
        <div className={styles.priceContainer}>
          <p className={styles.price}>{`+${formatedPrice}`}</p>
          <RocketIcon size={19} color="#D2F7B6" />
        </div>
        <PopupButton text="Claim" onClick={() => {}} />
      </motion.div>
    </>
  );
};
