import styles from './SubscriptionPopup.module.css';
import { Popup, PopupButton, useUser } from '../../../../shared';
import { PremiumCard } from '../premium-card';
import { useNavigate } from 'react-router';

interface ISubscriptionPopup {
  onClose: () => void;
}

export const SubscriptionPopup = ({ onClose }: ISubscriptionPopup) => {
  const navigate = useNavigate();
  const { subscription } = useUser();

  return (
    <Popup onClose={onClose}>
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
    </Popup>
  );
};
