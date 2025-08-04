import { CheckIcon, StarIcon, TonIcon } from '../../../../components';
import { PREMIUM_PLANS, useUser } from '../../../../shared';
import { usePremiumCardContext } from '../../context';
import styles from './PremiumCard.module.css';

interface IPremiumCardProps {
  option: 'free' | 'gold' | 'premium';
}

export const PremiumCard = ({ option }: IPremiumCardProps) => {
  let plans;
  let backgroundColor;
  let color;
  let title;
  let description;

  switch (option) {
    case 'free': {
      plans = PREMIUM_PLANS.free;
      backgroundColor = '#000000';
      color = 'rgba(255, 255, 255, 0.8)';
      title = 'Free';
      description = 'For beginner users:';
      break;
    }
    case 'gold': {
      plans = PREMIUM_PLANS.gold;
      backgroundColor = '#EBCA77FF';
      color = '#000000';
      title = 'Gold';
      description = 'For experienced users:';
      break;
    }
    case 'premium': {
      plans = PREMIUM_PLANS.premium;
      backgroundColor = '#89C6D4FF';
      color = '#000000';
      title = 'Premium';
      description = 'For advanced users:';
      break;
    }
  }

  const { setShow, setItem } = usePremiumCardContext();
  const { subscription } = useUser();

  const activeBought =
    subscription &&
    subscription.subscriptionType === option &&
    subscription.isActive;

  const activeFree = !activeBought && option === 'free';

  return (
    <div
      className={styles.background}
      style={{ backgroundColor: backgroundColor }}
    >
      <div className={styles.text}>
        <h5 style={{ color: option === 'free' ? '#FFFFFF' : color }}>
          {title}
        </h5>
        <div className={styles.prices}>
          <span className={styles.priceItem}>
            <TonIcon color={option === 'free' ? '#FFFFFF' : color} size={22} />
            <h3 style={{ color: option === 'free' ? '#FFFFFF' : color }}>
              {plans.price.ton}
            </h3>
          </span>
          <span
            className={styles.priceItem}
            style={{ marginBottom: '0.125rem' }}
          >
            <StarIcon color={color} size={18} />
            <h3
              style={{
                color: color,
                fontSize: '0.875rem',
              }}
            >
              {plans.price.star}
            </h3>
          </span>
        </div>
        <p style={{ color: color }}>per user/month, billed monthly</p>
      </div>
      <div className={styles.benefits}>
        <span style={{ color: color }}>{description}</span>
        {plans.bonuses.map((value, index) => {
          return (
            <div key={index} className={styles.benefitsItem}>
              <CheckIcon
                size={18}
                bgColor={option === 'free' ? 'rgba(255, 255, 255, 0.4)' : color}
              />
              <span style={{ color: color }}>{value}</span>
            </div>
          );
        })}
      </div>
      <button
        className={styles.button}
        style={{
          color: option === 'free' ? '#000000' : '#FFFFFF',
          backgroundColor: option === 'free' ? '#FFFFFF' : '#000000',
        }}
        disabled={(activeFree || activeBought) ?? false}
        onClick={() => {
          setItem({
            option: option as 'gold' | 'premium',
            price: {
              ton: plans.price.ton,
              star: plans.price.star,
            },
          });
          setShow(true);
        }}
      >
        {activeBought || activeFree ? 'Current plan' : 'Get started'}
      </button>
    </div>
  );
};
