import styles from './PremiumCardPopup.module.css';
import { useSubscription } from '../../hooks';
import { usePremiumCardContext } from '../../context';
import { Popup, PopupButton } from '../../../../shared';

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
    <Popup onClose={() => setShow(false)}>
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
    </Popup>
  );
};
