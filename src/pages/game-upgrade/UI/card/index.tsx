import { BoostCard, UpgradeCard } from '../../../../types';
import styles from './Card.module.css';
import { ArrowIcon } from '../../../../components';

interface ICardProps {
  type: string;
  card: BoostCard | UpgradeCard;
}

const isUpgradeCard = (card: BoostCard | UpgradeCard): card is UpgradeCard => {
  return (card as UpgradeCard).level !== undefined;
};

const isBoostCard = (card: BoostCard | UpgradeCard): card is BoostCard => {
  return (card as BoostCard).amount !== undefined;
};

export const Card = ({ type, card }: ICardProps) => {
  const formatedPrice = new Intl.NumberFormat('en-US').format(card.price);
  const levelPercentage = isUpgradeCard(card)
    ? Math.min(card.level / 25, 1) * 100
    : 0;

  return (
    <div className={styles.background}>
      <div className={styles.content}>
        <img
          src={window.location.origin + card.photoUrl}
          className={styles.image}
        />
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
          <ArrowIcon size={100} />
        </button>
      </div>
    </div>
  );
};
