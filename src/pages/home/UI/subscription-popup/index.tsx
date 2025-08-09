import styles from './SubscriptionPopup.module.css';
import { motion } from 'framer-motion';
import { PopupButton, PopupCloseButton } from '../../../../components';
import { useUser } from '../../../../shared';
import { PremiumCard } from '../premium-card';
import { useNavigate } from 'react-router';

interface ISubscriptionPopup {
  onClose: () => void;
}

export const SubscriptionPopup = ({ onClose }: ISubscriptionPopup) => {
  const navigate = useNavigate();
  const { subscription } = useUser();

  return (
    <>
      <motion.div
        className={styles.backdrop}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      <motion.div
        className={styles.background}
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: 'spring', stiffness: 120, damping: 20 }}
      >
        <div className={styles.closeWrapper}>
          <PopupCloseButton onTap={onClose} />
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.title}>Upgrade to Premium?</div>
        </div>

        <div className={styles.plans}>
          {!subscription && <PremiumCard option="free" />}
          {(!subscription ||
            (subscription && subscription.subscriptionType === 'gold')) && (
            <PremiumCard option="gold" />
          )}
          <PremiumCard option="premium" />
        </div>
        <PopupButton text="Get Premium" onClick={() => navigate('/account')} />
      </motion.div>
    </>
  );
};
