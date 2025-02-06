import { BoostCard, UpgradeCard } from '../../../../types';
import styles from './Card.module.css';
import { ArrowIcon } from '../../../../components';
import { useEffect } from 'react';

interface ICardProps {
  type: string;
  card: BoostCard | UpgradeCard;
}

const preloadImage = (url: string) => {
  const img = new Image();
  img.src = url;
};

const isUpgradeCard = (card: BoostCard | UpgradeCard): card is UpgradeCard => {
  return (card as UpgradeCard).level !== undefined;
};

const isBoostCard = (card: BoostCard | UpgradeCard): card is BoostCard => {
  return (card as BoostCard).amount !== undefined;
};

export const Card = ({ type, card }: ICardProps) => {
  const imageUrl = window.location.origin + card.photoUrl;
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);
  const levelPercentage = isUpgradeCard(card)
    ? Math.min(card.level / 25, 1) * 100
    : 0;

  useEffect(() => {
    preloadImage(imageUrl);
  }, [imageUrl]);

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <img src={imageUrl} className={styles.image} loading="lazy" />
        <div className={styles.textContainer}>
          <p className={styles.title}>{card.title}</p>
          <p className={styles.price}>{formatedPrice}</p>
        </div>
      </div>
      <div className={styles.row}>
        {type === 'upgrade' && isUpgradeCard(card) && card.level !== 0 && (
          <div
            className={styles.levelWrapper}
            style={{
              background: `conic-gradient(#D2F7B6 ${levelPercentage}%, rgba(217, 217, 217, 0.1) ${levelPercentage}% 100%)`,
            }}
          >
            <div className={styles.levelContainer}>{card.level}</div>
          </div>
        )}
        {type === 'boost' && isBoostCard(card) && (
          <div className={styles.amountText}>{card.amount}</div>
        )}
        <button className={styles.button}>
          <ArrowIcon size={14} />
        </button>
      </div>
    </div>
  );
};
