import { motion } from 'framer-motion';
import styles from './PremiumCardPopup.module.css';
import { PopupButton, PopupCloseButton } from '../../../../components';
import { useSubscription } from '../../hooks';
import { usePremiumCardContext } from '../../context';

export const PremiumCardPopup = () => {
  const { item, setShow } = usePremiumCardContext();
  const { createMutation, isPending } = useSubscription();

  const handleTonPayment = () => {
    createMutation.mutate({
      subscriptionType: item!.option,
      amount: item!.price.ton,
      currency: 'TON',
      paymentMethod: 'ton',
      notes: 'Monthly subscription via TON',
    });
  };

  const handleTelegramPayment = () => {
    createMutation.mutate({
      subscriptionType: item!.option,
      amount: item!.price.star,
      currency: 'XTR',
      paymentMethod: 'telegram',
      notes: 'Monthly subscription via Telegram',
    });
  };

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
          <PopupCloseButton onTap={() => setShow(false)} />
        </div>

        <div className={styles.imageContainer}>
          <div className={styles.title}>Choose Your Payment Method</div>
        </div>

        <div className={styles.description}>
          Select how you’d like to pay for your premium subscription.
        </div>

        <div className={styles.buttonRow}>
          <PopupButton text="Pay with TON" onClick={handleTonPayment} />
          <PopupButton text="Pay with Stars" onClick={handleTelegramPayment} />
        </div>

        {isPending && (
          <div className={styles.loaderOverlay}>
            <div className={styles.spinner} />
          </div>
        )}
      </motion.div>
    </>
  );
};
